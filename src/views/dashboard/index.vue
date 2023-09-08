<template>
  <div class="dashboard-container overflow-y-auto overflow-x-hidden">
    <!-- 统计信息 -->
    <CountInfo />
    <!-- echarts 图表 -->
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" class="mb-20px">
        <InterviewChart />
      </el-col>
      <el-col :xs="24" :md="12">
        <FollowChart />
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
