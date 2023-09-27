<template>
  <el-form @submit.prevent :inline="true" :model="searchForm">
    <el-form-item :label="$t('table.username')">
      <el-input
        v-model="searchForm.name"
        :placeholder="$t('table.tips.enter_username')"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="refreshData">
        {{ $t('table.search') }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="dialogRef?.openDialog('create')">
        {{ $t('table.create') }}
      </el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataSource.data" style="width: 100%" v-loading="loading">
    <el-table-column prop="name" :label="$t('table.username')" />
    <el-table-column prop="age" :label="$t('table.age')" />
    <el-table-column prop="sex" :label="$t('table.sex')">
      <template #default="scope">
        {{ scope.row.sex === 1 ? $t('table.man') : $t('table.woman') }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" :label="$t('table.create_time')" />
    <el-table-column prop="handler" :label="$t('table.operate')">
      <template #default="scope">
        <el-button
          type="primary"
          link
          @click="dialogRef?.openDialog('edit', scope.row)"
        >
          {{ $t('table.edit') }}
        </el-button>
        <el-button type="danger" link @click="handleDelete(scope.row)">
          {{ $t('table.delete') }}
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
import editDialog from './editDialog.vue';

import type { TableItem } from '@/service/types';

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
} = usePage<TableItem>({
  url: TableEnum.LIST,
  searchForm,
});
</script>

<style lang="scss" scoped>
.el-table {
  height: calc(100vh - 220px);
}
</style>
