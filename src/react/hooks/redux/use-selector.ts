import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

import { Store } from "~/src/redux/store";

export const useSelector: TypedUseSelectorHook<Store.State> = useReduxSelector;
