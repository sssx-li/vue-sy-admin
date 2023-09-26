import type {
  PermissionItem,
  PermissionUIItem,
  UserInfo,
  UserItem,
} from '@/service/types';

export interface UserStore {
  userList: UserItem[];
  userInfo: UserInfo;
  isLoad: boolean;
}

export interface PermissionStore {
  permissions: PermissionItem[];
  permissionMenus: Array<PermissionUIItem>;
  adminPermissions: PermissionItem[];
  normalPermissions: PermissionItem[];
}
