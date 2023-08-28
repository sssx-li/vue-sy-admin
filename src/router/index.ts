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
