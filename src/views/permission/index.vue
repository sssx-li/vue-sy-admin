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
    <el-table-column prop="meta.title" label="名称" />
    <el-table-column prop="meta.icon" label="名称">
      <template #default="{ row }">
        <svg-icon :name="row.meta.icon"></svg-icon>
      </template>
    </el-table-column>
    <el-table-column prop="path" label="路径" />
    <el-table-column prop="type" label="类型">
      <template #default="{ row }">
        {{ row.type === 'menu' ? '菜单权限' : '功能权限' }}
      </template>
    </el-table-column>
    <el-table-column prop="updateTime" label="修改时间" width="180px" />
    <el-table-column prop="handler" label="操作" width="200px" fixed="right">
      <template #default="scope">
        <el-button type="primary" link @click="addSubPermission(scope.row)">
          添加下级
        </el-button>
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
  <editDialog
    :permissionOptions="permissionOptions"
    v-model:disableTreeSelect="disableTreeSelect"
    @callback="getPageData"
    ref="dialogRef"
  />
</template>

<script setup lang="ts">
import { hasRoute } from '@/router';

import editDialog from './editDialog.vue';

import type { PermissionResItem, PermissionUIItem } from '@/service/types';

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

const disableTreeSelect = ref(false);
// 添加下级
const addSubPermission = (row: Record<string, any>) => {
  disableTreeSelect.value = true;
  dialogRef.value?.openDialog('create', { pid: row.id });
};

watch(
  permissionMenus,
  (val) => {
    // 如果当前路由没有权限 则跳转到第一个有权限的路由
    console.log(route.name!, !hasRoute(route.name!));
    if (!hasRoute(route.name!)) {
      router.push({ path: val[0].path, replace: true });
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
