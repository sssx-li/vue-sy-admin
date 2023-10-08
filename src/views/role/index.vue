<template>
  <el-form @submit.prevent :inline="true" :model="searchForm">
    <el-form-item label="名称">
      <el-input v-model="searchForm.name" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="refreshData"> 搜索 </el-button>
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="dialogRef?.openDialog('create')">
        添加
      </el-button>
    </el-form-item> -->
  </el-form>
  <el-table
    :data="dataSource.data"
    row-key="id"
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="type" label="类型">
      <template #default="{ row }">
        {{ roleDict[row.type] }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="updateTime" label="更新时间" />
    <el-table-column prop="handler" label="操作" width="200px" fixed="right">
      <template #default="scope">
        <el-button
          type="primary"
          link
          @click="dialogRef?.openDialog('edit', scope.row)"
        >
          编辑
        </el-button>
        <!-- <el-button type="danger" link @click="handleDelete(scope.row)">
          删除
        </el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="flex justify-center mt-14px">
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="dataSource.count"
    />
  </div>
  <editDialog
    :permissionOptions="permissionOptions"
    @callback="getPageData"
    ref="dialogRef"
  />
</template>

<script setup lang="ts">
import editDialog from './editDialog.vue';

import type { PermissionUIItem, RoleItem } from '@/service/types';

const dialogRef = ref<InstanceType<typeof editDialog>>();
const searchForm = reactive({
  name: '',
});

const {
  loading,
  dataSource,
  pageInfo,
  getPageData,
  refreshData,
  pageSizeChange,
  currentPageChange,
} = usePage<RoleItem>({
  url: RoleEnum.ROLE,
  searchForm,
});

// 所有权限数据
const permissionOptions = ref<PermissionUIItem[]>([]);
const getAllPermission = async () => {
  const { code, data } = await useHandleApiRes(permissionGetList());
  if (code === ResponseStatusCodeEnum.success) {
    permissionOptions.value = permissionJson2permissiontree(
      data.data,
      null,
      false
    );
  }
};
getAllPermission();
</script>

<style lang="scss" scoped></style>
