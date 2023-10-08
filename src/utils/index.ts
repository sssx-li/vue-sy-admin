import i18n, { langObj } from '@/i18n';

import type { KeyInLang } from '@/typing';

type I18nKeyPrefix = KeyInLang | keyof typeof langObj;

export function keyInI18n(key: string, prefix?: I18nKeyPrefix) {
  if (!prefix) return key in langObj;
  let res: string | Record<string, any> = '';
  const prefixArr = prefix.split('.');
  prefixArr.forEach((item) => {
    res = (langObj as Record<string, any>)[item];
  });
  return typeof res === 'string' ? key === res : key in res;
}

export function i18nKey2Text(key: string, prefix?: I18nKeyPrefix) {
  if (!keyInI18n(key, prefix)) return key;
  const { t } = i18n.global;
  return prefix ? t(`${prefix}.${key}`) : t(key);
}
