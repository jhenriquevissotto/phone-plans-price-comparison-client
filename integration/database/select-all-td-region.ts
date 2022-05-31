import { TdRegionStatements } from "~/database/resources/statements";
import { KnexResolver } from "../../backend/libs";

export module SelectAllTdRegion {
  export type Req = void;
  export type Response =
    KnexResolver.Return<TdRegionStatements.SelectAll.Result>;
}

export const selectAllTdRegion = {
  name: "selectAllTdRegion",
  method: "get",
  endpoint: "/database/select-all-td-region",
};
