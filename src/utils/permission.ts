import { permissionRoutes } from '@/router';

import type {
  PermissionItem,
  PermissionResItem,
  PermissionUIItem,
} from '@/service/types';

// 权限路由转扁平数组
export function routes2permissionJson(
  routes: Array<RouteRecordRaw>,
  pid: string | null = null
): PermissionItem[] {
  const arr: PermissionItem[] = routes.reduce((per, cur) => {
    const { path, name, meta, children } = cur;
    per.push({
      pid,
      id: path,
      path: path,
      name: name as string,
      icon: meta?.icon as string,
      type: 'menu',
    });
    if (children && children.length > 0) {
      const _arr = routes2permissionJson(children, cur.path);
      return per.concat(_arr);
    }
    return per;
  }, [] as PermissionItem[]);
  return arr;
}

// 生成动态权限路由
export function generatePermissionRoutes(
  arr: PermissionItem[],
  permissions: Array<RouteRecordRaw>
): Array<RouteRecordRaw> {
  function generateRoutes(routes: Array<RouteRecordRaw>) {
    const _routes: Array<RouteRecordRaw> = [];
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      const arrItem = arr.find((item) => item.path === route.path);
      if (!arrItem) continue;
      const acceptRoute = {
        ...route,
        meta: {
          ...route.meta,
          title: arrItem.name,
          icon: arrItem.icon,
        },
      };
      if (!route.children || route.children.length === 0) {
        _routes.push(acceptRoute);
      } else {
        const children = generateRoutes(route.children);
        // 如果 children 为空数组， 跳出本次循环
        if (!children || children.length === 0) continue;
        _routes.push({
          ...acceptRoute,
          redirect: children[0].path, // 重定向
          children,
        });
      }
    }
    return _routes;
  }
  return generateRoutes(permissions);
}

// 扁平数组转权限树
export function permissionJson2permissiontree(
  data: Array<PermissionResItem>,
  pid: string | null = null
) {
  const arr: PermissionUIItem[] = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    if (item.pid === pid) {
      arr.push({
        ...item,
        children: permissionJson2permissiontree(data, item.id),
      });
    }
  }
  return arr;
}

export default routes2permissionJson(permissionRoutes);
