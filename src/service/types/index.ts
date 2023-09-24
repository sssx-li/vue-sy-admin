export * from './user';
export * from './permission';

export * from './dashboard';
export * from './table';
export * from './rich';

export interface FeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
