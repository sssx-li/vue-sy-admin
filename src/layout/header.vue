<template>
  <div class="header-container h-50px px-20px">
    <div class="flex justify-center items-center">
      <el-icon
        :size="24"
        class="cursor-pointer mr-14px"
        @click="emits('update:isCollapse', !isCollapse)"
      >
        <i-ep:fold v-if="!isCollapse" />
        <i-ep:expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-if="index !== breadcrumbs.length - 1"
          >
            {{ item.title }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ item.title }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="flex justify-center items-center">
      <el-icon :size="22" class="cursor-pointer">
        <svg-icon
          :name="!isFullscreen ? 'full-screen' : 'exit-screen'"
          @click="toggle"
        />
      </el-icon>
      <el-switch
        v-model="isDark"
        inline-prompt
        :active-text="$t('nav.dark')"
        size="large"
        :inactive-text="$t('nav.light')"
        @change="() => toggleDark"
        class="theme-switch ml-14px"
      />
      <select-lang class="mx-14px" />
      <el-dropdown @command="handleCommand">
        <span class="flex justify-center items-center outline-none">
          <el-image
            :src="getImgUrl('avatar.png')"
            class="w-40px h-40px b-rd-50%"
          ></el-image>
          <span class="ml-4px">{{ userInfo.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <i-ep:switch-button class="mr-4px" />
              {{ $t('nav.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutHeader',
  inheritAttrs: false,
});

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

const { removeCache } = useLocalCache();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const layoutRoutes = computed(
  () => router.getRoutes().find((item) => item.name === 'layout')?.children
);
const breadcrumbs = computed(() => {
  const breadcrumbArr: Array<{
    path: string;
    title: string;
    subTitle?: string;
  }> = [];
  const findBreadcrumb = (
    routes: Array<RouteRecordRaw>,
    parentRoute: RouteRecordRaw | null = null
  ) => {
    for (let index = 0; index < routes.length; index++) {
      const item = routes[index];
      if (item.path === route.path && item.meta?.title) {
        // 父级title
        parentRoute &&
          parentRoute.meta &&
          breadcrumbArr.push({
            title: parentRoute!.meta.subTitle
              ? t(`nav.${parentRoute!.meta.title}`, {
                  subTitle: parentRoute!.meta.subTitle,
                })
              : t(`nav.${parentRoute!.meta.title}`),
            path: parentRoute.path,
          });
        // 当前路由title
        breadcrumbArr.push({
          title: item.meta.subTitle
            ? t(`nav.${item.meta.title}`, {
                subTitle: item.meta.subTitle,
              })
            : t(`nav.${item.meta.title}`),
          path: item.path,
        });
        break;
      } else if (item.children && item.children.length > 0) {
        findBreadcrumb(item.children, item);
      }
    }
  };
  layoutRoutes.value && findBreadcrumb(layoutRoutes.value);
  return breadcrumbArr;
});
const { userInfo } = storeToRefs(useUserStore());

const handleCommand = (command: string) => {
  if (command === 'logout') {
    removeCache('token');
    removeCache('userInfo');
    window.location.reload();
  }
};

// 主题色切换 暗黑模式
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 全屏
const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="scss" scoped>
.header-container {
  @include flex(center, space-between);

  border-bottom: 1px solid #ccc;

  .theme-switch {
    --el-switch-on-color: #313136;
  }
}
</style>
