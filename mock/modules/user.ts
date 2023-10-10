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
  // 用户列表
  {
    url: UserEnum.USER,
    method: 'get',
    response: async (schema, request) => {
      const { username, currentPage, pageSize } = request.queryParams;
      const { userList } = useUserStore();
      const resData = {
        data: toRaw(userList),
        count: 0,
      };
      const renderData = (resData.data = resData.data.filter((item) => {
        if (!username) return true;
        return item.username.indexOf(username) !== -1;
      }));
      // 模糊搜索 + 分页(如果 pageSize 不存在时，返回所有数据)
      if (!pageSize) {
        resData.data = renderData;
      } else {
        resData.data = renderData.slice(
          (+currentPage - 1) * +pageSize,
          +currentPage * +pageSize
        );
      }
      resData.count = resData.data.length;
      return createResponse(resData);
    },
  },
  // 修改项
  {
    url: UserEnum.USER,
    method: 'put',
    response: async (schema, request) => {
      const store = useUserStore();
      const query = JSON.parse(request.requestBody);
      const index = store.userList.findIndex((item) => item.id === query.id);
      await store.$patch((store) => {
        store.userList[index] = {
          ...query,
          updateTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
        };
      });
      return createResponse('success');
    },
  },
  // 新增项
  {
    url: UserEnum.USER,
    method: 'post',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      const store = useUserStore();
      const maxId = Math.max(...store.userList.map((item) => +item.id));
      store.$patch((store) => {
        store.userList.unshift({
          ...query,
          id: maxId + 1,
          createTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
        });
      });
      return createResponse('success');
    },
  },
  // 删除项
  {
    url: UserEnum.USER,
    method: 'delete',
    response: async (schema, request) => {
      const { id } = request.queryParams;
      if (+id === 1) {
        return createResponse('error', 201, '不能删除管理员');
      }
      const store = useUserStore();
      await store.$patch((store) => {
        store.userList = store.userList.filter((item) => item.id !== +id);
      });
      return createResponse('success');
    },
  },
];

export default userMocks;
