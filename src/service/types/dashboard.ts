export interface DashboardCountInfo {
  interviews: number; // 访问量
  messages: number; // 留言量
  follows: number; // 关注量
}

export interface DashboardStatistic {
  count: number; // 总数
  time?: string; // 时间
  name?: string; // 名称
}
