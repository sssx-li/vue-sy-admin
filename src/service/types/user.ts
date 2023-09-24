export interface UserLogin {
  password: string;
  username: string;
}

// 登录返回信息
export interface UserLoginRes {
  token: string;
}

// 用户角色
export type UserRoleTypes = 'admin' | 'normal';

// 用户基本信息
export interface UserInfo {
  username: string;
  avatar: string;
  sex?: 0 | 1;
  role: UserRoleTypes;
  [propName: string]: any;
}

// 用户列表项
export interface UserItem {
  id: number;
  username: string;
  avatar?: string;
  sex?: 0 | 1;
  role: UserRoleTypes;
}
