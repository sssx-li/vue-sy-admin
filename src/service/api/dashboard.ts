import { DashboardEnum } from '.';
import { Request } from '..';

export function dashboardCountInfo() {
  return Request.get({
    url: DashboardEnum.COUNT_INFO,
  });
}
