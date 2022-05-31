import { omit, pick } from "lodash";
import { useRouter as useNextRouter } from "next/router";
import { parseUrl } from "query-string";
import { useMemo } from "react";
import { Queries } from "~/src/router";

module Type {
  export type Query = Queries.MultiLangs;
  export type Params = {};
}

export function useRouter() {
  const nextRouter = useNextRouter();

  const parsed = parseUrl(nextRouter.asPath);

  const router = useMemo(
    () => ({
      ...nextRouter,
      url: parsed.url,
      query: pick(nextRouter.query, Object.keys(parsed.query)) as Type.Query,
      params: omit(nextRouter.query, Object.keys(parsed.query)) as Type.Params,
    }),
    [nextRouter]
  );

  return { router };
}
