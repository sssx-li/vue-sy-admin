import permissions from '@/utils/permission';

import type { RoleStore } from '../types';

export const useRoleStore = defineStore('role', {
  state: (): RoleStore => {
    return {
      roleList: [
        {
          name: '超级管理员',
          id: 1,
          type: 'admin',
          createTime: '2023-10-7 09:15:00',
          updateTime: '2023-10-7 09:15:00',
          ids: permissions.map((item) => +item.id),
        },
        {
          name: '普通用户',
          id: 2,
          type: 'normal',
          createTime: '2023-10-8 17:06:00',
          updateTime: '2023-10-8 17:06:00',
          ids: permissions.slice(0, 2).map((item) => +item.id),
        },
      ],
    };
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['roleList'],
      },
    ],
  },
});
