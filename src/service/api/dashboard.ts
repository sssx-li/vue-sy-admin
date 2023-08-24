// 统计信息
export function dashboardCountInfo() {
  return ApiRequest.get({
    url: DashboardEnum.COUNT_INFO,
  });
}

// 访问量统计
export function dashboardInterviewStatistics() {
  return ApiRequest.get({
    url: DashboardEnum.INTERVIEW_STATISTICS,
  });
}

// 关注人群统计
export function dashboardFollowStatistics() {
  return ApiRequest.get({
    url: DashboardEnum.FOLLOW_STATISTICS,
  });
}
