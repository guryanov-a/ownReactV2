import { reconcile } from "../reconcile";
import { withPerformanceDomChange } from "../../utils/withPerformance";
import { applyNewComponentInstanceData } from "./applyNewComponentInstanceData";
import { prepareDataForReconciliation } from "./prepareDataForReconciliation";
import { ComponentElement, ComponentInstance } from "../../types/types";

export interface Params {
  container: HTMLElement;
  instance: ComponentInstance;
  element: ComponentElement;
}
export type UpdateComponentInstance = (params: Params) => ComponentInstance;
const updateComponentInstance: UpdateComponentInstance = (dataForUpdate) => {
  const dataForReconciliation = prepareDataForReconciliation(dataForUpdate);

  const { container } = dataForUpdate;
  const newChildInstance = reconcile({ container, ...dataForReconciliation });

  const { instance, element } = dataForUpdate;
  return applyNewComponentInstanceData({ instance, element, newChildInstance });
};

const updateComponentInstanceHofed = withPerformanceDomChange(
  updateComponentInstance
);

export { updateComponentInstanceHofed as updateComponentInstance };
