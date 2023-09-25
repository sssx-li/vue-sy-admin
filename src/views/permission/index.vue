<template>
  <el-form @submit.prevent :inline="true" :model="searchForm">
    <el-form-item label="名称">
      <el-input v-model="searchForm.name" placeholder="请输入名称" />
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
    :data="UISource"
    row-key="id"
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="path" label="路径" />
    <el-table-column prop="type" label="类型">
      <template #default="{ row }">
        {{ row.type === 'menu' ? '菜单权限' : '功能权限' }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="修改时间" />
    <el-table-column prop="handler" label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          link
          @click="dialogRef?.openDialog('edit', scope.row)"
        >
          编辑
        </el-button>
        <el-button type="danger" link @click="handleDelete(scope.row)">
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
  <editDialog @callback="getPageData" ref="dialogRef" />
</template>

<script setup lang="ts">
import { hasRoute } from '@/router';

import editDialog from './editDialog.vue';

import type { PermissionResItem } from '@/service/types';

const route = useRoute();
const router = useRouter();
const { permissionMenus } = storeToRefs(usePermissionStore());

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
  handleDelete,
} = usePage<PermissionResItem>({
  url: PermissionEnum.PERMISSIONS,
  searchForm,
});

const UISource = computed(() => permissionJson2permissiontree(dataSource.data));

watch(
  permissionMenus,
  (val) => {
    // 如果当前路由没有权限 则跳转到第一个有权限的路由
    if (!hasRoute(route.name!)) {
      router.push({ path: val[0].path, replace: true });
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
