import { AxiosResponse, AxiosError } from "axios";

export module AxiosResolver {
  export type Return<T = any, D = any> = {
    isError: boolean;
    data: T;
    status: number;
    error: null | Omit<AxiosError<T, D>, "response">;
  };
}

export function axiosResolver<T = any, D = any>(
  request: any,
  fallbackData?: T
) {
  return request
    .then((response: AxiosResponse<T, D>) => {
      return {
        isError: false,
        data: response.data,
        status: response.status,
        error: null,
      };
    })
    .catch(({ response, ...error }: AxiosError<T, D>) => {
      console.error(error);
      return {
        isError: true,
        data: response.data || fallbackData,
        status: response.status,
        error,
      };
    }) as Promise<AxiosResolver.Return<T, D>>;
}
