import { createI18n } from 'vue-i18n';

import jsonText from './lang.json';

const { getCache } = useLocalCache();

const messages = {
  en: jsonText.en,
  zh: jsonText.zh,
};

export type LangTypes = typeof messages.zh;
export type LangType = keyof typeof messages;

const i18n = createI18n({
  locale: getCache('lang'),
  fallbackLocale: 'zh', // 设置备用                                                                                                                                                                                               语言
  legacy: false, // 使用Composition API,必须将其设置为false
  messages,
});

export default i18n;
