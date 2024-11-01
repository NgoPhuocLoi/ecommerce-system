import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import lz from "lz-string";
import { useEffect } from "react";
import * as editableComponents from "../editable/components";
import RenderNode from "./render-node";

interface IDefaultLayoutRendererProps {
  defaultLayout?: string;
}

const Wrapper = ({ defaultLayout }: { defaultLayout: string }) => {
  const { actions } = useEditor();

  useEffect(() => {
    if (defaultLayout) {
      const decompressedLayout = lz.decompressFromBase64(defaultLayout);
      actions.deserialize(decompressedLayout);
    }
  }, [defaultLayout]);

  return (
    <Frame>
      <Element is={editableComponents.PlaceholderContainer} canvas>
        <editableComponents.PlaceholderContainer />
      </Element>
    </Frame>
  );
};

const DefaultLayoutRenderer = ({
  defaultLayout,
}: IDefaultLayoutRendererProps) => {
  return (
    <div className="">
      <Editor
        enabled={false}
        onRender={RenderNode}
        resolver={{
          ...editableComponents,
        }}
      >
        <Wrapper defaultLayout={defaultLayout ?? ""} />
      </Editor>
    </div>
  );
};

export default DefaultLayoutRenderer;
