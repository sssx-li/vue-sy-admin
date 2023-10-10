// 获取用户菜单权限
export function roleGetList() {
  return ApiRequest.get({
    url: RoleEnum.ROLE,
  });
}
