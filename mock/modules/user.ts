import Mock from 'mockjs';

import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { UserInfo } from '@/service/types';

const { getCache, setCache } = useLocalCache();

// token
const loginRes = Mock.mock({
  'token|30': /[a-zA-Z0-9]/,
});

const userMocks: MockItem[] = [
  // 用户信息
  {
    url: UserEnum.INFO,
    method: 'get',
    response: () => {
      const store = useUserStore();
      const userInfo = getCache('userInfo');
      store.userInfo = userInfo;
      return createResponse<UserInfo>(userInfo);
    },
  },
  // 登录
  {
    url: UserEnum.LOGIN,
    method: 'post',
    response: (schema, request) => {
      const body = JSON.parse(request.requestBody);
      const store = useUserStore();
      const user = store.userList.find(
        (item) => item.username === body.username
      ) as UserInfo;
      if (!user) {
        return createResponse('error', 203, '不存在该用户，请检查账号是否正确');
      }
      setCache('userInfo', toRaw(user));
      return createResponse(loginRes);
    },
    options: { timing: 1000 }, // 接口响应时间
  },
  // 用户权限菜单
  {
    url: UserEnum.PERMISSIONS,
    method: 'get',
    response: () => {
      const userInfo = getCache('userInfo');
      const { role, permission } = useStore();
      const userPermissions = role.roleList
        .find((item) => item.type === userInfo.role)!
        .ids.map((id) => {
          return permission.permissions.find((_item) => _item.id === id);
        });
      return createResponse(userPermissions);
    },
  },
];

export default userMocks;
