export class BaseResponse<T> {
  total: number;
  limit: number;
  skip: number;
  data: T[];
}
