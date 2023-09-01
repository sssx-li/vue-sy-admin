import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { RichUploadImgRes } from '@/service/types';

let htmlRes = '';

const richMocks: MockItem[] = [
  {
    url: RichEnum.GET_RESULT,
    method: 'get',
    response: () => {
      return createResponse<string>(htmlRes);
    },
  },
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
  {
    url: RichEnum.SAVE,
    method: 'post',
    response: async (schema, request) => {
      htmlRes = JSON.parse(request.requestBody).data;
      return createResponse<string>('保存成功');
    },
  },
];

export default richMocks;
