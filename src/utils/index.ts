import { langObj } from '@/i18n';
import { KeyInLang } from '@/typing';

export function keyInI18n(
  key: string,
  prefix?: KeyInLang | keyof typeof langObj
) {
  if (!prefix) return key in langObj;
  let res: string | Record<string, any> = '';
  const prefixArr = prefix.split('.');
  prefixArr.forEach((item) => {
    res = (langObj as Record<string, any>)[item];
  });
  return typeof res === 'string' ? key === res : key in res;
}
