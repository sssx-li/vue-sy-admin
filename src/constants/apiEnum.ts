export enum ResponseStatusCodeEnum {
  success = 0, // 成功
  aborted = 20, // aborted 请求取消
  tokenInvalid = 102, // token过期
}

// 用户
export enum UserEnum {
  LOGIN = '/user/login',
  INFO = '/user/info',
  PERMISSIONS = 'user/permissions',
  USER = '/user',
}

// 权限
export enum PermissionEnum {
  PERMISSIONS = '/permissions',
}

// 角色
export enum RoleEnum {
  ROLE = '/role',
}

// 首页
export enum DashboardEnum {
  COUNT_INFO = '/dashboard/countInfo',
  INTERVIEW_STATISTICS = '/dashboard/interviewStatistics',
  FOLLOW_STATISTICS = '/dashboard/followStatistics',
}

// 表格
export enum TableEnum {
  LIST = '/table/list',
}

// 富文本
export enum RichEnum {
  UPRODE_IMG = '/rich/uprodeImg',
  SAVE = '/rich/save',
  GET_RESULT = '/rich/getResult',
}
