import { TdPlanStatements } from "~/database/resources/statements";
import { KnexResolver } from "../../backend/libs";

export module SelectAllTdPlan {
  export type Req = void;
  export type Response = KnexResolver.Return<TdPlanStatements.SelectAll.Result>;
}

export const selectAllTdPlan = {
  name: "selectAllTdPlan",
  method: "get",
  endpoint: "/database/select-all-td-plan",
};
