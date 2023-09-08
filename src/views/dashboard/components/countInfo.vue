<!-- 统计信息 -->
<template>
  <el-row :gutter="20">
    <el-col
      :xs="24"
      :sm="12"
      :lg="8"
      v-for="item in UICountInfos"
      :key="item.icon"
      class="mb-20px"
    >
      <el-card shadow="always">
        <el-icon :size="50" :color="item.color">
          <svg-icon :name="item.icon" />
        </el-icon>
        <div class="text-center text-16px">
          <div class="c-#909399 text-18px font-600 mb-4px">
            {{ item.title }}
          </div>
          <span>{{ item.count }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useCount } from '../hooks';

defineOptions({
  name: 'DashboardCountInfo',
});

const { UICountInfos } = useCount();
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  @include flex(center, space-between);
}
</style>
