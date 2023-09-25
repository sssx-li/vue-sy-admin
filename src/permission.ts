import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

import router from '@/router';

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = useLocalCache().getCache('token');
  const isToLogin = to.path === '/login';
  if (token) {
    if (isToLogin) {
      next({ path: '/' });
      return;
    }
    const store = useUserStore();
    if (!store.isLoad) {
      await store.getLocalData();
      const { permissionMenus } = usePermissionStore();
      if (!permissionMenus || permissionMenus.length === 0) {
        next({ path: '/404' });
        store.isLoad = true;
        return;
      }
      store.isLoad = true;
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
