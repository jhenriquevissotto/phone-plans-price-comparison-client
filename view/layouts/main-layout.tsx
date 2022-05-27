import { Fragment as Page } from "react";
import { Header } from "./partials";

export function MainLayout({ children }) {
  return (
    <Page>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </Page>
  );
}
