import Mock, { Random } from 'mockjs';

import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { DashboardCountInfo, DashboardStatistic } from '@/service/types';

// 统计信息
const countInfo = Mock.mock({
  'interviews|10000-100000': 1,
  'messages|1000-10000': 1,
  'follows|1000-10000': 1,
});

// 访问量统计数据
const currentDate = new Date();
const interviewStatistics: Omit<DashboardStatistic, 'name'>[] = [];
for (let i = 6; i >= 0; i--) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  interviewStatistics.push({
    count: Random.integer(100, 1000),
    time: useDateFormat(date, 'MM-DD').value,
  });
}
console.log('interviewStatistics', interviewStatistics);

// 关注人群统计数据
const agesArr = ['青少年', '青年', '中年', '老年'];
const followStatistics: Omit<DashboardStatistic, 'time'>[] = [];
agesArr.forEach((item) => {
  followStatistics.push({
    name: item,
    count: Random.integer(10, 100),
  });
});

const dashboardMocks: MockItem[] = [
  {
    url: DashboardEnum.COUNT_INFO,
    method: 'get',
    response: () => {
      return createResponse<DashboardCountInfo>(countInfo);
    },
  },
  {
    url: DashboardEnum.INTERVIEW_STATISTICS,
    method: 'get',
    response: () => {
      return createResponse<Omit<DashboardStatistic, 'name'>[]>(
        interviewStatistics
      );
    },
  },
  {
    url: DashboardEnum.FOLLOW_STATISTICS,
    method: 'get',
    response: () => {
      return createResponse<Omit<DashboardStatistic, 'time'>[]>(
        followStatistics
      );
    },
  },
];

export default dashboardMocks;
