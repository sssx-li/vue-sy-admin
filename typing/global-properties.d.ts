import { Component } from 'vue';
import type { IFilters } from '../src/filters/types';

import { ObjKeysToUnion } from '@/typing';
import { LangTypes } from '@/i18n/lang/en';
import { Directives } from '@/directives/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component, Directives {
    $filters: IFilters;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
