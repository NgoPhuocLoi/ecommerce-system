import { useNode } from "@craftjs/core";

export const useSetting = () => {
  const {
    actions: { setProp },
    ...props
  } = useNode((node) => {
    return { ...node.data.props };
  });

  const handlePropChange = (key: string, value: any) => {
    setProp((prop: any) => (prop[key] = value));
  };

  return { props, handlePropChange };
};
