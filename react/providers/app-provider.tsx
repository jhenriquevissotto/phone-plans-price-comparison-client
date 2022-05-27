import { StyleProvider } from "./style-provider";

export function AppProvider({ children }) {
  return <StyleProvider>{children}</StyleProvider>;
}
