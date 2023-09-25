import Fetch from './fetch';
import i18n from '@/i18n';
const { t } = i18n.global;

const { getCache, removeCache } = useLocalCache();
const { error } = useMessage();
const whiteApis = ['/login']; // 接口白名单

export const ApiRequest = new Fetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    beforeFetch({ options, cancel, url }) {
      const token = getCache('token');
      if (!whiteApis.find((item) => url.includes(item)) && !token) {
        cancel();
      }
      options.headers = {
        ...options.headers,
        Authorization: token,
      };
      return { options };
    },
    afterFetch(ctx) {
      // 这里做统一错误处理
      const { code, message } = ctx.data;
      if (code === ResponseStatusCodeEnum.tokenInvalid) {
        error(t('requestErrorTips.login_expired'));
        removeCache('token');
        removeCache('userInfo');
        location.reload();
      } else if (code !== ResponseStatusCodeEnum.success) {
        error(message || t('requestErrorTips.request_failed'));
      }
      return ctx;
    },
    onFetchError(ctx) {
      const { code, message } = ctx.error;
      if (code === ResponseStatusCodeEnum.aborted) {
        error(message || t('requestErrorTips.request_canceled'));
      } else {
        error(t('requestErrorTips.require_error'));
      }
      return ctx;
    },
    timeout: 10000,
  },
});
