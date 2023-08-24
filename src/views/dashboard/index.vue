<template>
  <div class="dashboard-container overflow-y-auto overflow-x-hidden">
    <!-- 统计信息 -->
    <DashboardCountInfo />
    <!-- echarts 图表 -->
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" class="mb-20px">
        <DashboardInterviewChart />
      </el-col>
      <el-col :xs="24" :md="12">
        <DashboardFollowChart />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'dashboard',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
