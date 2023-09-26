import { permissionRoutes } from '@/router';

import type {
  PermissionItem,
  PermissionResItem,
  PermissionUIItem,
} from '@/service/types';

// 权限路由转扁平数组
export function routes2permissionJson(
  routes: Array<RouteRecordRaw>,
  pid: string | number | null = null,
  id = 0
): PermissionItem[] {
  const arr: PermissionItem[] = routes.reduce((per, cur) => {
    id++;
    const { path, name, meta, children } = cur;
    per.push({
      pid,
      id,
      path: path,
      name: name as string,
      type: 'menu',
      meta: meta as any,
      component: null,
    });
    if (children && children.length > 0) {
      const _arr = routes2permissionJson(children, id, id * 10);
      return per.concat(_arr);
    }
    return per;
  }, [] as PermissionItem[]);
  return arr;
}

const routesModules = import.meta.glob('../views/**/**.vue');
// 扁平数组转权限树 | 动态生成权限路由树
export function permissionJson2permissiontree<
  T extends PermissionItem = PermissionResItem,
  U extends PermissionItem = PermissionUIItem
>(data: Array<T>, pid: string | number | null = null, isRouter = false): U[] {
  const arr: U[] = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index] as any as U;
    const createRouteComponent = isRouter && item!.meta?.component;
    if (item.pid === pid) {
      if (createRouteComponent) {
        item.component = routesModules[item.meta!.component as string];
      }
      // 如果没有匹配得文件路径 则跳过当前循环
      if (isRouter && (!item!.meta?.component || !item.component)) continue;
      arr.push({
        ...item,
        component: createRouteComponent ? item.component : null,
        children: permissionJson2permissiontree(data, item.id, isRouter),
      });
    }
  }
  return arr;
}

export default routes2permissionJson(permissionRoutes);
