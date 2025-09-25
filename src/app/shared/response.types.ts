export interface IResponse<T> {
  data: T;
  meta: {
    code: number;
    status: string;
    message: string;
  }
}