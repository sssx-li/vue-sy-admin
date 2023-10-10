<template>
  <el-form @submit.prevent :inline="true" :model="searchForm">
    <el-form-item label="名称">
      <el-input v-model="searchForm.username" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="refreshData"> 搜索 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="dialogRef?.openDialog('create')">
        添加
      </el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="dataSource.data"
    row-key="id"
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="role" label="角色">
      <template #default="{ row }">
        {{ roleList.find((item) => item.type === row.role)?.name }}
      </template>
    </el-table-column>
    <el-table-column prop="sex" label="性别">
      <template #default="{ row }">
        {{ row.sex === 0 ? '女' : '男' }}
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
        <el-button
          type="danger"
          :disabled="userInfo.id === scope.row.id"
          link
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
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
  <editDialog :roleList="roleList" @callback="getPageData" ref="dialogRef" />
</template>

<script setup lang="ts">
import editDialog from './editDialog.vue';

import type { RoleItem, TableRes, UserItem } from '@/service/types';

const { userInfo } = useUserStore();
const dialogRef = ref<InstanceType<typeof editDialog>>();
const searchForm = reactive({
  username: '',
});

const {
  loading,
  dataSource,
  pageInfo,
  getPageData,
  refreshData,
  pageSizeChange,
  currentPageChange,
  handleDelete,
} = usePage<UserItem>({
  url: UserEnum.USER,
  searchForm,
});

// 角色列表
const roleList = ref<RoleItem[]>([]);
async function getRoleList() {
  const { code, data } = await useHandleApiRes<TableRes<RoleItem>>(
    roleGetList()
  );
  if (code === ResponseStatusCodeEnum.success) {
    roleList.value = data.data;
  }
}
getRoleList();
</script>

<style lang="scss" scoped></style>
