import type { Component } from 'vue';
import type { Filter } from '../src/filters/types';
import type { ObjKeysToUnion } from '@/typing';
import type { LangTypes } from '@/i18n';
import type { Directives } from '@/directives/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component, Directives {
    $filters: Filter;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
