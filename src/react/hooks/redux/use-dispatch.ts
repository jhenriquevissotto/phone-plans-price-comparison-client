import { useDispatch as useReduxDispatch } from "react-redux";
import { Store } from "~/src/redux/store";

export function useDispatch() {
  const dispatch = useReduxDispatch<Store.Dispatch>();
  return { dispatch };
}
