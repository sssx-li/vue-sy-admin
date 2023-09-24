import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

import router from '@/router';
import Layout from '@/layout/index.vue';

let isLoad = false;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = useLocalCache().getCache('token');
  const isToLogin = to.path === '/login';
  if (token) {
    if (isToLogin) {
      next({ path: '/' });
      return;
    }
    if (!isLoad) {
      const acceptRoutes = await useUserStore().getLocalData();
      if (!acceptRoutes || acceptRoutes!.length === 0) {
        next({ path: '/404' });
        isLoad = true;
        return;
      }
      const layoutRoutes = {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: acceptRoutes[0].path,
        children: [...acceptRoutes],
      };
      router.addRoute(layoutRoutes);
      isLoad = true;
      next({ path: to.path, replace: true });
    } else {
      next();
    }
  } else {
    if (!isToLogin) {
      next({ path: '/login' });
      NProgress.done();
    } else {
      next();
    }
  }
});
router.beforeEach(() => {
  NProgress.done();
});

export default router;
