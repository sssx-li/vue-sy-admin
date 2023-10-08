export type RoleType = 'admin' | 'normal';
export interface RoleItem {
  name: string;
  id: number;
  type: RoleType;
  createTime: string;
  updateTime: string;
  ids: number[];
}
