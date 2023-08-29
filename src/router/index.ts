import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard' },
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/table',
        name: 'table',
        meta: { title: 'table', icon: 'table' },
        component: () => import('@/views/table/index.vue'),
      },
      {
        path: '/menu',
        name: 'menu',
        meta: { title: 'menus', icon: 'menu' },
        component: () => import('@/views/menu/index.vue'),
        redirect: '/menu/one',
        children: [
          {
            path: '/menu/one',
            name: 'menuOne',
            meta: { title: 'menu', subTitle: '1' },
            component: () => import('@/views/menu/one/index.vue'),
            redirect: '/menu/one/one',
            children: [
              {
                path: '/menu/one/one',
                name: 'menuOneOne',
                meta: { title: 'menu', subTitle: '1-1' },
                component: () => import('@/views/menu/one/one.vue'),
              },
            ],
          },
          {
            path: '/menu/two',
            name: 'menuTwo',
            meta: { title: 'menu', subTitle: '2' },
            component: () => import('@/views/menu/two.vue'),
          },
        ],
      },
      {
        path: '/rich',
        name: 'rich',
        meta: { title: 'rich', icon: 'rich' },
        component: () => import('@/views/rich/index.vue'),
      },
      {
        path: '/watermarks',
        name: 'watermarks',
        meta: { title: 'watermarks', icon: 'watermarks' },
        component: () => import('@/views/watermarks/index.vue'),
      },
      {
        path: '/autograph',
        name: 'autograph',
        meta: { title: 'autograph', icon: 'autograph' },
        component: () => import('@/views/autograph/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
