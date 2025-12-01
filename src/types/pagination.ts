export interface Pagination<T> {
  data: T[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
export interface IPrams {
  limit?: number;
  page?: number;
}
