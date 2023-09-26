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

const routesModules: Record<string, any> = import.meta.glob(
  '../views/**/**.vue'
);

// 生产权限路由
export function generatePermissionRoutes(arr: PermissionItem[]) {
  const _arr = arr.filter((item) => item.type === 'menu');
  const routes: PermissionItem[] = [];
  for (let index = 0; index < _arr.length; index++) {
    const route = _arr[index];
    const asyncComponent = routesModules[route.meta!.component as string];
    if (asyncComponent) {
      routes.push({ ...route, component: asyncComponent });
    }
  }
  return routes;
}

// 扁平数组转权限树 | 动态生成权限路由树
export function permissionJson2permissiontree<
  T extends PermissionItem = PermissionResItem,
  U extends PermissionItem = PermissionUIItem
>(data: Array<T>, pid: string | number | null = null, isMenu = false): U[] {
  const arr: U[] = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index] as any as U;
    if (item.pid === pid) {
      let asyncComponent;
      if (item.meta!.component) {
        asyncComponent = routesModules[item.meta!.component as string];
      }
      // 如果没有匹配到文件路径 则跳过当前循环
      if (isMenu && !asyncComponent) continue;
      arr.push({
        ...item,
        children: permissionJson2permissiontree(data, item.id, isMenu),
      });
    }
  }
  return arr;
}

export default routes2permissionJson(permissionRoutes);
