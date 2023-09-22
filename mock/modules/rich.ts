import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { RichUploadImgRes } from '@/service/types';

let htmlRes = '';

const richMocks: MockItem[] = [
  // 获取数据
  {
    url: RichEnum.GET_RESULT,
    method: 'get',
    response: () => {
      return createResponse<string>(htmlRes);
    },
  },
  // 图片上传
  {
    url: RichEnum.UPRODE_IMG,
    method: 'post',
    response: async (schema, request) => {
      const file = (request.requestBody as any).get('file');
      return createResponse<RichUploadImgRes>({
        url: await imgToBase64(file),
      });
    },
  },
  // 保存
  {
    url: RichEnum.SAVE,
    method: 'post',
    response: async (schema, request) => {
      htmlRes = JSON.parse(request.requestBody).data;
      return createResponse('success');
    },
  },
];

export default richMocks;
