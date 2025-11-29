export type ApiError<T> = {
  errors?: {
    [K in keyof T]?: string;
  };
  message?: string;
};
