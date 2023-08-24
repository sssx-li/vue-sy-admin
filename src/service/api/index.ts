export enum ResponseStatusCodeEnum {
  success = 0, // 成功
  aborted = 20, // aborted 请求取消
  tokenInvalid = 102, // token过期
}

export enum UserEnum {
  LOGIN = '/login',
  INFO = '/info',
}

export enum TableEnum {
  LIST = '/list',
}

export enum DashboardEnum {
  COUNT_INFO = '/dashboard/countInfo',
  INTERVIEW_STATISTICS = '/dashboard/interviewStatistics',
  FOLLOW_STATISTICS = '/dashboard/followStatistics',
}
