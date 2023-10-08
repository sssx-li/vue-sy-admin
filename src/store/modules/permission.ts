import permissions from '@/utils/permission';
import { addRoute } from '@/router';

import Layout from '@/layout/index.vue';

import type { PermissionStore } from '../types';
import type { PermissionItem } from '@/service/types';

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionStore => {
    return {
      permissions,
      permissionMenus: [],
    };
  },
  actions: {
    async getPermissionList() {
      const { data } = await useHandleApiRes<PermissionItem[]>(
        permissionGetList()
      );
      this.permissions = data;
    },
    async getPermissionMenus() {
      const { data } = await useHandleApiRes<PermissionItem[]>(
        userGetUserPermissionMenus()
      );
      // 这里不使用树形是因为菜单可能分配到其它各个菜单下，因为部分文件可能没有<router-view>组件，会导致无法展示正确的内容
      // 当然 如果固定菜单(即菜单不能分配到其它菜单下) 可以使用 permissionMenus 的数据来加载路由
      const routes = generatePermissionRoutes(data) as any as RouteRecordRaw[];
      const layoutRoutes = {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: routes[0].path,
        children: [...routes] as any as RouteRecordRaw[],
      };
      addRoute(layoutRoutes, true);
      const menus = permissionJson2permissiontree(
        data.filter((item) => item.type === 'menu'),
        null,
        true
      );
      // const layoutRoutes = {
      //   path: '/',
      //   name: 'layout',
      //   component: Layout,
      //   redirect: menus[0].path,
      //   children: [...menus] as any as RouteRecordRaw[],
      // };
      // addRoute(layoutRoutes, true);
      this.permissionMenus = menus;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['permissions'],
      },
    ],
  },
});
