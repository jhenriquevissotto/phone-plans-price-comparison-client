import { ReduxProvider } from "~/src/react/providers/redux-provider";
import { StyleProvider } from "~/src/react/providers/style-provider";

export function AppProvider({ children }) {
  return (
    <ReduxProvider>
      <StyleProvider>{children}</StyleProvider>
    </ReduxProvider>
  );
}
