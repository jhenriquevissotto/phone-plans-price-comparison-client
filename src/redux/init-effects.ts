import { tdPlan, tdRegion, trPrice } from "~/src/redux/stores/database";
import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";

export function initEffects() {
  // database
  tdPlan.initEffects();
  tdRegion.initEffects();
  trPrice.initEffects();
  // application
  toast.initEffects();
  // components
  table.initEffects();
}
