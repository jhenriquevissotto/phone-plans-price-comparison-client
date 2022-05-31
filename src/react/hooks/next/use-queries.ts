import { queries } from "~/src/router";
import { useRouter, useTranslation } from "~/src/react/hooks";

export function useQueries() {
  const { lang } = useTranslation();
  const { router } = useRouter();
  return {
    queries: queries(router, lang),
  };
}
