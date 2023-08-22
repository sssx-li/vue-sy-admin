import { TableEnum } from '.';
import { Request } from '..';

export function tableGetList(name = '') {
  return Request.get({
    url: TableEnum.LIST,
    params: { name },
  });
}
