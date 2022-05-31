import { TdRegionModel } from ".";

export type TrPriceModel = {
  fk_from: Pick<TdRegionModel, "id_code">;
  fk_to: Pick<TdRegionModel, "id_code">;
  feePerMin: Number;
};
