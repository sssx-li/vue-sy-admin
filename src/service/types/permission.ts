// 权限类型： 菜单权限-menu   功能权限-button
export type PermissionType = 'menu' | 'button';

// 权限项
export interface PermissionItem {
  pid: string | null; // 上级id
  id: string;
  path: string;
  name: string;
  icon: string;
  type: PermissionType;
}
