import { Queries } from "~/src/router";

export module Routes {
  export module PhonePlansPriceComparator {
    export type Queries = {
      en: Pick<Queries.Keys.EN, "from" | "to" | "time" | "plan">;
      br: Pick<Queries.Keys.BR, "origem" | "destino" | "tempo" | "plano">;
    };
  }
}

export const routes = {
  phonePlansPriceComparator() {
    const url = {
      en: "/phone-plans-price-comparator",
      br: "/comparador-de-precos-de-planos-de-telefonia",
    };

    // @ts-ignore
    const queries: Routes.PhonePlansPriceComparator.Queries;

    return { url, queries };
  },
};
