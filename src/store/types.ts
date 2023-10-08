import type {
  PermissionItem,
  PermissionUIItem,
  RoleItem,
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
  permissionMenus: Array<PermissionUIItem | RouteRecordRaw>;
}

export interface RoleStore {
  roleList: RoleItem[];
}
