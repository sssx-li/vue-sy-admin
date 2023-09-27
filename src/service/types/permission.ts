import type { RouteComponent } from 'vue-router';

// 权限类型： 菜单权限-menu   功能权限-button
export type PermissionType = 'menu' | 'button';

export interface RouteMeta {
  title: string;
  icon: string;
  component: string | null;
}

// 权限项
export interface PermissionItem {
  pid: string | number | null; // 上级id
  id: string | number;
  path: string;
  name: string;
  meta: RouteMeta | null;
  type: PermissionType;
  component: RouteComponent | string | null;
}

export interface PermissionResItem extends PermissionItem {
  updateTime: string;
  createTime: string;
}

export interface PermissionUIItem extends PermissionResItem {
  children: PermissionUIItem[];
}
