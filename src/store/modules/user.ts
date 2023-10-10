import type { UserInfo } from '@/service/types';
import type { UserStore } from '../types';

export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      userList: [
        {
          id: 1,
          username: 'admin',
          role: 'admin',
          sex: 1,
          createTime: '2023-10-10 10:31:00',
        },
        {
          id: 2,
          username: 'normal',
          role: 'normal',
          sex: 0,
          createTime: '2023-10-10 10:31:00',
        },
      ],
      userInfo: {
        username: '',
        avatar: '',
        role: 'admin',
        sex: 1,
      },
      isLoad: false,
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
      const { getPermissionMenus } = usePermissionStore();
      await this.getUserInfoAction();
      await getPermissionMenus();
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['userList'] }],
  },
});
