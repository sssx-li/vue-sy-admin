import { useLocalStorage } from '@vueuse/core';

import type { ThemeTypes } from './useTheme';
import type { LangType } from '@/i18n';
import type { UserInfo } from '@/service/types';

interface LocalCacheValueType {
  token: string;
  theme: ThemeTypes;
  userInfo: UserInfo;
  lang: LangType;
}

const defCache: LocalCacheValueType = {
  token: '',
  theme: 'defaultTheme',
  userInfo: { username: '', avatar: '', role: 'normal', sex: 0 },
  lang: 'zh',
};

type Keys = keyof LocalCacheValueType;

export function useLocalCache() {
  // 1.获取cache
  function getCache<T extends Keys>(key: T): LocalCacheValueType[T] {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache<T extends Keys>(key: T, value: LocalCacheValueType[T]) {
    useLocalStorage(key, defCache[key]).value = value;
  }
  // 3.移除cache
  function removeCache(key: Keys) {
    useLocalStorage(key, defCache[key]).value = null;
  }
  // 4.清除所有cache
  function clearCache() {
    localStorage.clear();
  }
  return { getCache, setCache, removeCache, clearCache };
}
