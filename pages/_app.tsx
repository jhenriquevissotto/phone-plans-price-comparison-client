import { AppProvider } from "~/react/providers/app-provider";

export default function MyApp({ Component: Page, pageProps }) {
  return (
    <AppProvider>
      <Page {...pageProps} />
    </AppProvider>
  );
}
