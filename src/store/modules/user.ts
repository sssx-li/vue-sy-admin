import { useHandleApiRes, useMessage } from '@/hooks';
import { ResponseStatusCodeEnum, userGetUserInfo } from '@/service/api';

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
  },
});
