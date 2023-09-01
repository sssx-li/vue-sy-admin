export * from './user';
export * from './table';
export * from './dashboard';
export * from './rich';

export interface FeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
