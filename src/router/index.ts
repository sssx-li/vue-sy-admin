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
        redirect: '/table/first',
        children: [
          {
            path: '/table/first',
            name: 'tableFirst',
            meta: { title: 'table', subTitle: 1 },
            component: () => import('@/views/table/first.vue'),
          },
        ],
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
