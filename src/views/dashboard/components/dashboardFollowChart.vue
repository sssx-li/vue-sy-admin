<template>
  <el-card class="box-card">
    <template #header> 访问量统计 </template>
    <div id="interview-chart" class="h-450px" ref="followChartRef"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useCharts } from '../hooks';

defineOptions({
  name: 'DashboardFollowChart',
  inheritAttrs: false,
});

const { followChartRef, getFollowData } = useCharts();
getFollowData();
</script>

<style lang="scss" scoped></style>
