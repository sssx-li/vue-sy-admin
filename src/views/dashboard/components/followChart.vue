<template>
  <el-card class="box-card">
    <template #header> 访问人群统计 </template>
    <div id="interview-chart" class="h-450px" ref="followChartRef"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useCharts } from '../hooks';

defineOptions({
  name: 'DashboardFollowChart',
});

const { followChartRef, getFollowData } = useCharts();
getFollowData();
</script>

<style lang="scss" scoped></style>
