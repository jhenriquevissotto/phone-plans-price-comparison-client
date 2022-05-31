export module KnexResolver {
  export type Return<D = any, E = any> = {
    isError: boolean;
    data: null | D;
    error: null | E;
  };
}

export function knexResolver<D = any, E = any>(
  database: any,
  fallbackData?: D
) {
  return database
    .then(([data]: [D]) => {
      return {
        isError: false,
        data,
        error: null,
      };
    })
    .catch((error: E) => {
      console.error(error);
      return {
        isError: true,
        data: null || fallbackData,
        error,
      };
    }) as Promise<KnexResolver.Return<D, E>>;
}
