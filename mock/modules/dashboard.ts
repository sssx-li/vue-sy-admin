import Mock from 'mockjs';

import { DashboardEnum } from '@/service/api';
import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { DashboardCountInfo } from '@/service/types';

const countInfo = Mock.mock({
  'interviews|10000-100000': 1,
  'messages|1000-10000': 1,
  'follows|1000-10000': 1,
});

const dashboardMocks: MockItem[] = [
  {
    url: DashboardEnum.COUNT_INFO,
    method: 'get',
    response: () => {
      return createResponse<DashboardCountInfo>(countInfo);
    },
    options: { timing: 1000 },
  },
];

export default dashboardMocks;
