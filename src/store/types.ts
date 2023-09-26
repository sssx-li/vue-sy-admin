import type {
  PermissionItem,
  PermissionUIItem,
  UserInfo,
  UserItem,
} from '@/service/types';
import { RouteRecordRaw } from 'vue-router';

export interface UserStore {
  userList: UserItem[];
  userInfo: UserInfo;
  isLoad: boolean;
}

export interface PermissionStore {
  permissions: PermissionItem[];
  permissionMenus: Array<PermissionUIItem | RouteRecordRaw>;
  adminPermissions: PermissionItem[];
  normalPermissions: PermissionItem[];
}
