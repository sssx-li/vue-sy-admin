<template>
  <el-card class="box-card">
    <template #header> 关注人群统计 </template>
    <div id="interview-chart" class="h-450px" ref="interviewChartRef"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useCharts } from '../hooks';

defineOptions({
  name: 'DashboardInterviewChart',
  inheritAttrs: false,
});

const { interviewChartRef, getInterviewData } = useCharts();
onMounted(() => {
  getInterviewData();
});
</script>

<style lang="scss" scoped></style>
