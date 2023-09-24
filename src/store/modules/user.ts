import type { UserInfo } from '@/service/types';
import type { UserStore } from '../types';

export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      userList: [{ id: 1, username: 'admin', role: 'admin' }],
      userInfo: {
        username: '',
        avatar: '',
        role: 'normal',
        sex: 1,
      },
    };
  },
  actions: {
    async getUserInfoAction() {
      const { error } = useMessage();
      const { code, data, message } = await useHandleApiRes<UserInfo>(
        userGetUserInfo()
      );
      if (code === ResponseStatusCodeEnum.success) {
        this.userInfo = data;
      } else {
        error(message);
      }
    },
    async getLocalData() {
      const { getCache } = useLocalCache();
      if (!getCache('token')) return;
      const { getPermissionList, getPermissionMenus } = usePermissionStore();
      await this.getUserInfoAction();
      await getPermissionList();
      const acceptRoutes = await getPermissionMenus();
      return acceptRoutes;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userList'] }],
  },
});
