import { NextRouter } from "next/router";
import { AvailableLocales } from "~/src/locales/available-locales";
import qs from "query-string";

export module Queries {
  // export module Lists {
  //   export type EN = "from" | "to" | "time" | "plan";
  //   export type BR = "origem" | "destino" | "tempo" | "plano";
  //   export type MultiLangs = Queries.Lists.EN | Queries.Lists.BR;
  // }

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

  export type MultiLangs = Queries.EN & Queries.BR;
}

export const queries = {
  get(router: NextRouter, lang: AvailableLocales) {
    const routerQuery = router.query as Queries.MultiLangs;

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

    const queries: Queries.EN = { from, to, time, plan };
    return queries;
  },

  set(router: NextRouter, lang: AvailableLocales) {
    const url = router.asPath;

    const from = (value: string) => {
      const query = {
        en: {
          from: value,
          origem: undefined,
        },
        br: {
          from: undefined,
          origem: value,
        },
      }[lang];

      const asPath = qs.stringifyUrl({ url, query });
      return { asPath };
    };

    const to = (value: string) => {
      const query = {
        en: {
          to: value,
          destino: undefined,
        },
        br: {
          to: undefined,
          destino: value,
        },
      }[lang];

      const asPath = qs.stringifyUrl({ url, query });
      return { asPath };
    };

    const time = (value: string) => {
      const query = {
        en: {
          time: value,
          tempo: undefined,
        },
        br: {
          time: undefined,
          tempo: value,
        },
      }[lang];

      const asPath = qs.stringifyUrl({ url, query });
      return { asPath };
    };

    const plan = (value: string) => {
      const query = {
        en: {
          plan: value,
          plano: undefined,
        },
        br: {
          plan: undefined,
          plano: value,
        },
      }[lang];

      const asPath = qs.stringifyUrl({ url, query });
      return { asPath };
    };

    const setters = { from, to, time, plan };
    return setters;
  },
};
