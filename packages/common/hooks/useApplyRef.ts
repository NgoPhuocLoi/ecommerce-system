import { useNode } from "@craftjs/core";

export const useApplyRef = () => {
  const {
    connectors: { connect, drag },
    isActive,
    actions,
    isHover,
    editable,
    dom,
  } = useNode((node) => {
    return {
      isActive: node.events.selected,
      isHover: node.events.hovered,
      editable: node.data.props.editable !== false,
      dom: node.dom,
    };
  });
  const applyRef = (tag: any) => connect(drag(tag!)) as any;
  return { applyRef, isActive, actions, isHover, editable, dom };
};
