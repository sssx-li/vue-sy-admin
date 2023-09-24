// 表格项
export interface TableItem {
  id: number;
  name: string;
  sex: 0 | 1;
  age: number;
  createTime: string;
}

// 表格返回信息
export interface TableRes<T = TableItem> {
  data: T[];
  count: number;
}
