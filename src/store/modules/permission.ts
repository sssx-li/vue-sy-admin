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
      adminPermissions: permissions,
      normalPermissions: permissions.slice(0, 5),
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
      const routes = permissionJson2permissiontree<PermissionItem>(
        data.filter((item) => item.type === 'menu'),
        null,
        true
      ) as any as RouteRecordRaw[];
      this.permissionMenus = routes;
      const layoutRoutes = {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: routes[0].path,
        children: [...routes],
      };
      addRoute(layoutRoutes, true);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['permissions', 'adminPermissions', 'normalPermissions'],
      },
    ],
  },
});
