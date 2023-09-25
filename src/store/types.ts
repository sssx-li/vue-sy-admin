import type { PermissionItem, UserInfo, UserItem } from '@/service/types';

export interface UserStore {
  userList: UserItem[];
  userInfo: UserInfo;
  isLoad: boolean;
}

export interface PermissionStore {
  permissions: PermissionItem[];
  permissionMenus: Array<RouteRecordRaw>;
  adminPermissions: PermissionItem[];
  normalPermissions: PermissionItem[];
}
