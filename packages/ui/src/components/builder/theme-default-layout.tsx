"use client";
import { Editor, Frame } from "@craftjs/core";
import PagePlaceholder from "@repo/ui/components/builder/page-placeholder";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import lz from "lz-string";
import * as editableComponents from "../../components/editable/components";

interface IThemeDefaultLayoutProps {
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
}

const ThemeDefaultLayout = ({
  defaultFooterLayout,
  defaultHeaderLayout,
}: IThemeDefaultLayoutProps) => {
  const decompressedHeaderLayout = lz.decompressFromBase64(
    defaultHeaderLayout ?? "",
  );
  const decompressedFooterLayout = lz.decompressFromBase64(
    defaultFooterLayout ?? "",
  );
  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <Label className="mt-auto">Layout mặc định</Label>
      </div>
      <div className="rounded-md border px-4 py-6">
        {!decompressedFooterLayout && !decompressedHeaderLayout ? (
          <div className="flex flex-col gap-2">
            <p className="text-center">Chủ đề này chưa có layout mặc định!</p>
            <Button className="mx-auto">+ Thêm layout mặc định</Button>
          </div>
        ) : (
          <>
            <Editor resolver={{ ...editableComponents }} enabled={false}>
              <Frame json={decompressedHeaderLayout}></Frame>
            </Editor>

            <PagePlaceholder />

            <Editor resolver={{ ...editableComponents }} enabled={false}>
              <Frame json={decompressedFooterLayout}></Frame>
            </Editor>
          </>
        )}
      </div>
    </div>
  );
};

export default ThemeDefaultLayout;
