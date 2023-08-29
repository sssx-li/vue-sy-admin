import type { UserInfo } from '@/service/types';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: { username: 'sy', avatar: '' } as UserInfo,
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
      await this.getUserInfoAction();
    },
  },
});
