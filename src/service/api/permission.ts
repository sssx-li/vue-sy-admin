// 获取权限列表
export function permissionGetList() {
  return ApiRequest.get({
    url: PermissionEnum.PERMISSIONS,
  });
}
