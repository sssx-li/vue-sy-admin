import type { Component } from 'vue';
import type { Filter } from '../src/filters/types';
import type { KeyInLang } from '@/typing';
import type { Directives } from '@/directives/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component, Directives {
    $filters: Filter;
    $t(key: KeyInLang): string;
  }
}
