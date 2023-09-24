<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="defaultActive"
    class="h-100% w-250px"
    router
  >
    <div class="text-center p-10px">
      <el-icon :size="isCollapse ? 30 : 40">
        <i-sy-vue />
      </el-icon>
    </div>
    <MenuItem
      :routes="permissionMenus"
      v-if="permissionMenus && permissionMenus.length > 0"
    />
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './menuItem.vue';

defineProps<{ isCollapse?: boolean }>();

const route = useRoute();
const { permissionMenus } = storeToRefs(usePermissionStore());

const defaultActive = computed(() => route.path);
</script>

<style lang="scss" scoped></style>
