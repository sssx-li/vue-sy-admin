import { createResponse } from '../utils';

import type { MockItem } from '../types';

const permissionMocks: MockItem[] = [
  // 权限列表
  {
    url: PermissionEnum.PERMISSIONS,
    method: 'get',
    response: async (schema, request) => {
      const { name, currentPage, pageSize } = request.queryParams;
      const { permissions } = usePermissionStore();
      const resData = {
        data: toRaw(permissions),
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
    url: PermissionEnum.PERMISSIONS,
    method: 'put',
    response: async (schema, request) => {
      const store = usePermissionStore();
      const query = JSON.parse(request.requestBody);
      const index = store.permissions.findIndex((item) => item.id === query.id);
      const cur = {
        ...query,
        pid: query.pid || null,
      };
      await store.$patch((store) => {
        store.permissions[index] = {
          ...cur,
          updateTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
        };
      });
      await store.getPermissionMenus();
      return createResponse('success');
    },
  },
  // 新增项
  {
    url: PermissionEnum.PERMISSIONS,
    method: 'post',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      const store = usePermissionStore();
      const maxId = Math.max(...store.permissions.map((item) => +item.id));
      store.$patch((store) => {
        store.permissions.unshift({
          ...query,
          pid: query.pid || null,
          id: maxId + 1,
          createTime: useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss').value,
        });
      });
      return createResponse('success');
    },
  },
  // 删除项
  {
    url: PermissionEnum.PERMISSIONS,
    method: 'delete',
    response: async (schema, request) => {
      const { id } = request.queryParams;
      const store = usePermissionStore();
      await store.$patch((store) => {
        store.permissions = store.permissions.filter((item) => item.id !== +id);
      });
      const roleStore = useRoleStore();
      roleStore.roleList.forEach((item) => {
        const index = item.ids.findIndex((item) => item === +id);
        if (index !== -1) {
          item.ids.splice(index, 1);
        }
      });
      await store.getPermissionMenus();
      return createResponse('success');
    },
  },
];

export default permissionMocks;
