import { AppProvider } from "~/src/react/providers/app-provider";
import { wrapper } from "~/src/redux/wraper";

function MyApp({ Component: Page, pageProps }) {
  return (
    <AppProvider>
      <Page {...pageProps} />
    </AppProvider>
  );
}

export default wrapper.withRedux(MyApp);
