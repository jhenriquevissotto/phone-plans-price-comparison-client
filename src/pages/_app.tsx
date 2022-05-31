import setLanguage from "next-translate/setLanguage";
import { AppProvider } from "~/src/react/providers/app-provider";
import { wrapper } from "~/src/redux/wraper";
import { useRouter } from "~/src/react/hooks";
import { useEffect } from "react";
import { routes } from "~/src/router";

function MyApp({ Component: Page, pageProps }) {
  const { router } = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if ([routes.phonePlansPriceComparator().url.br].includes(asPath)) {
      setLanguage("br");
    }
  }, []);

  return (
    <AppProvider>
      <Page {...pageProps} />
    </AppProvider>
  );
}

export default wrapper.withRedux(MyApp);
