import { createResponse } from '../utils';
import permissions from '@/utils/permission';

import { PermissionEnum } from '@/constants/apiEnum';

import type { MockItem } from '../types';

const userMocks: MockItem[] = [
  // 权限列表
  {
    url: PermissionEnum.PERMISSIONS,
    method: 'get',
    response: () => {
      return createResponse(permissions);
    },
  },
];

export default userMocks;
