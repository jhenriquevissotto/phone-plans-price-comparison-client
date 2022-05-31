import { TrPriceStatements } from "~/database/resources/statements";
import { KnexResolver } from "../../backend/libs";

export module SelectAllTrPrice {
  export type Req = void;
  export type Response =
    KnexResolver.Return<TrPriceStatements.SelectAll.Result>;
}

export const selectAllTrPrice = {
  name: "selectAllTrPrice",
  method: "get",
  endpoint: "/database/select-all-tr-price",
};
