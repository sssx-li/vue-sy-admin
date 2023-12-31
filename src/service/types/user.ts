import type { RoleType } from './role';

export interface UserLogin {
  password: string;
  username: string;
}

// 登录返回信息
export interface UserLoginRes {
  token: string;
}

// 用户基本信息
export interface UserInfo {
  username: string;
  avatar: string;
  sex?: 0 | 1;
  role: RoleType;
  [propName: string]: any;
}

// 用户列表项
export interface UserItem {
  id: number;
  username: string;
  avatar?: string;
  sex?: 0 | 1;
  role: RoleType;
  createTime?: string;
  updateTime?: string;
}
