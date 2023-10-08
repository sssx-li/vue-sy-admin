import { createResponse } from '../utils';

import type { MockItem } from '../types';

const roleMocks: MockItem[] = [
  // 角色列表
  {
    url: RoleEnum.ROLE,
    method: 'get',
    response: async (schema, request) => {
      const { name, currentPage, pageSize } = request.queryParams;
      const { roleList } = useRoleStore();
      const resData = {
        data: toRaw(roleList),
        count: 0,
      };
      const renderData = (resData.data = resData.data.filter((item) => {
        if (!name) return true;
        return item.name.indexOf(name) !== -1;
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
    url: RoleEnum.ROLE,
    method: 'put',
    response: async (schema, request) => {
      const store = useRoleStore();
      const query = JSON.parse(request.requestBody);
      const index = store.roleList.findIndex((item) => item.id === query.id);
      await store.$patch((store) => {
        store.roleList[index] = {
          ...query,
          updateTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
        };
      });
      const { getPermissionMenus } = usePermissionStore();
      await getPermissionMenus();
      return createResponse('success');
    },
  },
  // 新增项
  {
    url: RoleEnum.ROLE,
    method: 'post',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      const store = useRoleStore();
      const maxId = Math.max(...store.roleList.map((item) => +item.id));
      store.$patch((store) => {
        store.roleList.unshift({
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
    url: RoleEnum.ROLE,
    method: 'delete',
    response: async (schema, request) => {
      const { id } = request.queryParams;
      const store = useRoleStore();
      await store.$patch((store) => {
        store.roleList = store.roleList.filter((item) => item.id !== +id);
      });
      return createResponse('success');
    },
  },
];

export default roleMocks;
