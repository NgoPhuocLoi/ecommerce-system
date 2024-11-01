import { useEditor } from "@craftjs/core";

export const useEditorCreate = () => {
  const {
    connectors: { create },
  } = useEditor();

  const createElement = (ref: any, component: any) => create(ref, component);

  return { createElement };
};
