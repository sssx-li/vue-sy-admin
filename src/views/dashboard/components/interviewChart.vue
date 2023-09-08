<template>
  <el-card class="box-card">
    <template #header> 关注量统计 </template>
    <div id="interview-chart" class="h-450px" ref="interviewChartRef"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useCharts } from '../hooks';

defineOptions({
  name: 'DashboardInterviewChart',
});

const { interviewChartRef, getInterviewData } = useCharts();
getInterviewData();
</script>

<style lang="scss" scoped></style>
