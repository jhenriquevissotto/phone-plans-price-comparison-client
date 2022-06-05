import { Queries as _Queries } from "~/src/router";

export module Routes {
  export module PhonePlansPriceComparator {
    export module Queries {
      export type EN = Pick<_Queries.EN, "from" | "to" | "time" | "plan">;
      export type BR = Pick<
        _Queries.BR,
        "origem" | "destino" | "tempo" | "plano"
      >;
    }
  }
}

export const routes = {
  phonePlansPriceComparator: {
    url: {
      en: "/phone-plans-price-comparator",
      br: "/comparador-de-precos-de-planos-de-telefonia",
    },
  },
};
