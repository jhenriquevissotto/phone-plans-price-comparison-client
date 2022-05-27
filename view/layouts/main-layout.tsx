import { Fragment as Page } from "react";
import { Footer, Header } from "./partials";

export function MainLayout({ children }) {
  return (
    <Page>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </Page>
  );
}
