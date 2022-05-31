import { Fragment as Page } from "react";
import { css } from "~/src/libs/css";
import { Header, Toast } from "./partials";

const S = {
  Toast: css({
    position: "fixed",
    zIndex: 1,
  }),
};

export function MainLayout({ children }) {
  return (
    <Page>
      <Toast style={S.Toast} />
      <Header />
      <main>{children}</main>
    </Page>
  );
}
