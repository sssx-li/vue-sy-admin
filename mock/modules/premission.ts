import { createResponse } from '../utils';
import { PermissionEnum } from '@/constants/apiEnum';

import type { MockItem } from '../types';

const userMocks: MockItem[] = [
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
      // 模糊搜索 + 分页
      resData.data = resData.data
        .filter((item) => {
          if (!name) return true;
          return item.name.indexOf(name) !== -1;
        })
        .slice((+currentPage - 1) * +pageSize, +currentPage * +pageSize);
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
      await store.$patch((store) => {
        store.permissions[index] = {
          ...query,
          updateTime: useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss').value,
        };
        // 更新不同角色的权限表
        const adminIndex = store.adminPermissions.findIndex(
          (item) => item.id === query.id
        );
        if (adminIndex !== -1) {
          store.adminPermissions[adminIndex] = query;
        }
        const normalIndex = store.normalPermissions.findIndex(
          (item) => item.id === query.id
        );
        if (normalIndex !== -1) {
          store.normalPermissions[adminIndex] = query;
        }
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
      store.$patch((store) => {
        store.permissions.unshift({
          ...query,
          id: query.path,
          createTime: useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss').value,
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
        store.permissions = store.permissions.filter((item) => item.id !== id);
        // 更新不同角色的权限表
        store.adminPermissions = store.adminPermissions.filter(
          (item) => item.id !== id
        );
        store.normalPermissions = store.normalPermissions.filter(
          (item) => item.id !== id
        );
      });
      await store.getPermissionMenus();
      return createResponse('success');
    },
  },
];

export default userMocks;
