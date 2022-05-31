import { Provider } from "react-redux";
import { store } from "~/src/redux/store";
import { initEffects } from "~/src/redux/init-effects";

function StoreEffects({ children }) {
  initEffects();
  return children;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreEffects>{children}</StoreEffects>
    </Provider>
  );
}
