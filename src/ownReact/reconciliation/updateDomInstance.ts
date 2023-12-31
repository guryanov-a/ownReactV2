import { updateDomProperties } from "./updateDomProperties";
import { reconcileChildren } from "./reconcileChildren";
import { withPerformanceDomChange } from "../utils/withPerformance";
import { DomElement, DomInstance, Instance } from "../types/types";

interface Params {
  instance: DomInstance;
  element: DomElement;
}
type UpdateDomInstance = (params: Params) => Instance;
const updateDomInstance: UpdateDomInstance = ({ instance, element }) => {
  updateDomProperties(instance.dom, instance.element.props, element.props);
  instance.childInstances = reconcileChildren({ instance, element });
  instance.element = element;
  return instance;
};

const updateInstanceHofed = withPerformanceDomChange(updateDomInstance);

export { updateInstanceHofed as updateDomInstance };
