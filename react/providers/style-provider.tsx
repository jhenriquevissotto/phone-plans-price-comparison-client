import { Fragment as AppProvider } from "react";
import { CustomGlobalStyle, ResetGlobalStyle } from "~/design/style";

export function StyleProvider({ children }) {
  return (
    <AppProvider>
      <ResetGlobalStyle />
      <CustomGlobalStyle />
      {children}
    </AppProvider>
  );
}
