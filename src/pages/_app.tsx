import { useUpdateEffect } from "react-use";
import setLanguage from "next-translate/setLanguage";
import { AppProvider } from "~/src/react/providers/app-provider";
import { wrapper } from "~/src/redux/wraper";
import { useQueries, useRouter, useTranslation } from "~/src/react/hooks";
import { useEffect } from "react";
import { routes } from "~/src/router";

function MyApp({ Component: Page, pageProps }) {
  const { lang } = useTranslation();
  const { queries, setQuery } = useQueries();
  const { router } = useRouter();
  const { asPath } = router;

  // const tdPlanRowById = useSelector(tdPlan.selectors.getTdPlanRowBySlug(queries.plan));

  useEffect(() => {
    if ([routes.phonePlansPriceComparator.url.br].includes(asPath)) {
      setLanguage("br");
    }
  }, []);

  useUpdateEffect(() => {
    let _asPath = `${router.asPath}`;
    // const planSlug = { en: tdPlanRowById?.slug_en, pt: tdPlanRowById?.slug_pt }[lang];

    if (queries.from) {
      _asPath = setQuery.from(queries.from, _asPath).asPath;
    }
    if (queries.plan) {
      _asPath = setQuery.plan(queries.plan, _asPath).asPath;
    }
    if (queries.time) {
      _asPath = setQuery.time(queries.time, _asPath).asPath;
    }
    if (queries.to) {
      _asPath = setQuery.to(queries.to, _asPath).asPath;
    }

    if (_asPath !== router.asPath) router.push(_asPath);
  }, [lang]);

  return (
    <AppProvider>
      <Page {...pageProps} />
    </AppProvider>
  );
}

export default wrapper.withRedux(MyApp);
