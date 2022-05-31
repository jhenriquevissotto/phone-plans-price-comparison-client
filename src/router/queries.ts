import { NextRouter } from "next/router";
import { AvailableLocales } from "~/src/locales/available-locales";

export module Queries {
  // export module Lists {
  //   export type EN = "from" | "to" | "time" | "plan";
  //   export type BR = "origem" | "destino" | "tempo" | "plano";
  //   export type MultiLangs = Queries.Lists.EN | Queries.Lists.BR;
  // }

  export module Keys {
    export type EN = {
      from?: string;
      to?: string;
      time?: string;
      plan?: string;
    };

    export type BR = {
      origem?: string;
      destino?: string;
      tempo?: string;
      plano?: string;
    };

    export type MultiLangs = Queries.Keys.EN & Queries.Keys.BR;
  }
}

export function queries(router: NextRouter, lang: AvailableLocales) {
  const routerQuery = router.query as Queries.Keys.MultiLangs;

  const from = {
    en: routerQuery?.from || routerQuery?.origem,
    br: routerQuery?.origem || routerQuery?.from,
  }[lang];

  const to = {
    en: routerQuery?.to || routerQuery?.destino,
    br: routerQuery?.destino || routerQuery?.to,
  }[lang];

  const time = {
    en: routerQuery?.time || routerQuery?.tempo,
    br: routerQuery?.tempo || routerQuery?.time,
  }[lang];

  const plan = {
    en: routerQuery?.plan || routerQuery?.plano,
    br: routerQuery?.plano || routerQuery?.plan,
  }[lang];

  const queries: Queries.Keys.EN = { from, to, time, plan };

  return queries;
}
