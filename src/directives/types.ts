import type { Directive } from 'vue';

type EventTypes = 'click' | 'input';

export interface ELType extends HTMLElement {
  __fn__: () => any;
}

export interface Directives {
  vFocus: Directive; // 聚焦
  vDebounce: Directive<
    any,
    {
      type?: EventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >; // 防抖
  vThrottle: Directive<
    any,
    {
      type?: EventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >; // 节流
  vWatermarks: Directive<
    any,
    {
      text: string;
      styles?: {
        width?: number;
        height?: number;
        rotate?: number;
        font?: string;
        fillStyle?: string;
      };
    }
  >; // 水印
}

export type Keys = keyof Directives;

type LowerDirectiveName<T extends Keys> = T extends `v${infer V}`
  ? Lowercase<V>
  : never;

export interface DirectiveOptions<T extends Keys> {
  name: LowerDirectiveName<T>;
  directive: Directives[T];
}
