// 获取表格数据
export function tableGetList(name = '') {
  return ApiRequest.get({
    url: TableEnum.LIST,
    params: { name },
  });
}
