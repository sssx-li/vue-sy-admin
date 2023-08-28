import type { Directive } from 'vue';

type EventTypes = 'click' | 'input';

export interface Directives {
  vFocus: Directive;
  vDebounce: Directive<
    any,
    {
      type?: EventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
  vThrottle: Directive<
    any,
    {
      type?: EventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
  vWatermarks: Directive<
    any,
    {
      text: string;
      textColor?: string;
      styles?: {
        width?: number;
        height?: number;
        rotate?: number;
        [key: string]: any;
      };
    }
  >;
}

export type Keys = keyof Directives;
type DirectiveName<T extends Keys> = T extends `v${infer V}`
  ? `${Lowercase<V>}`
  : never;

export interface DirectiveOptions<T extends Keys> {
  name: DirectiveName<T>;
  directive: Directives[T];
}
