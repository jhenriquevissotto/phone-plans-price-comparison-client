import { useDispatch, useSelector } from "~/src/react/hooks/redux";
import { Store } from "~/src/redux/store";
import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useEffect } from "react";
import { globalConstant } from "~/src/constants/global-constant";

export module Toast {
  export type State = {
    showErrorToast: boolean;
  };
  export module Actions {}
}

export const toast = (() => {
  const name = "toast";

  const initialState: Toast.State = {
    showErrorToast: false,
  };

  const slice = createSlice({
    name,
    initialState,
    extraReducers(builder) {
      // @ts-ignore
      builder.addCase(HYDRATE, (state, { payload }) => ({
        ...state,
        ...payload["application"][name],
      }));
    },
    reducers: {
      showErrorToast(localState: Toast.State) {
        localState.showErrorToast = true;
      },
      hideErrorToast(localState: Toast.State) {
        localState.showErrorToast = false;
      },
    },
  });

  const selectors = {
    getState: createDraftSafeSelector(
      [(storeState: Store.State) => storeState.application.toast],
      (localState) => {
        return localState;
      }
    ),
  };

  function initEffects() {
    const { dispatch } = useDispatch();
    const { showErrorToast } = useSelector(toast.selectors.getState);

    useEffect(() => {
      if (showErrorToast) {
        setTimeout(() => {
          dispatch(toast.actions.hideErrorToast());
        }, globalConstant.errorToastTimeout);
      }
    }, [showErrorToast]);
  }

  return { ...slice, selectors, initEffects };
})();
