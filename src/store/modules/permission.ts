import permissions from '@/utils/permission';

import type { PermissionStore } from '../types';
import { PermissionItem } from '@/service/types';
import { permissionRoutes } from '@/router';

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
      const routes = generatePermissionRoutes(
        data.filter((item) => item.type === 'menu'),
        permissionRoutes
      );
      this.permissionMenus = routes;
      return routes;
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
