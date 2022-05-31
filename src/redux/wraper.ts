import { createWrapper } from "next-redux-wrapper";
import { createStore } from "~/src/redux/create-store";

export const wrapper = createWrapper(createStore);
