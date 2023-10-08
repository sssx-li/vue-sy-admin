import type { RoleType } from '@/service/types';

export const roleOptions: Array<{ value: RoleType; label: string }> = [
  { value: 'admin', label: '管理员' },
  { value: 'normal', label: '用户' },
];

export const roleDict = arr2map(roleOptions);
