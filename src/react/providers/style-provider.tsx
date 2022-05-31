import { Fragment as AppProvider } from "react";
import { CustomGlobalStyle, ResetGlobalStyle } from "~/src/design/style";

export function StyleProvider({ children }) {
  return (
    <AppProvider>
      <ResetGlobalStyle />
      <CustomGlobalStyle />
      {children}
    </AppProvider>
  );
}
