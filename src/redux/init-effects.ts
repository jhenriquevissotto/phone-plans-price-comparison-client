import { toast } from "~/src/redux/stores/application";
import { table } from "~/src/redux/stores/components";

export function initEffects() {
  // application
  toast.initEffects();
  // components
  table.initEffects();
}
