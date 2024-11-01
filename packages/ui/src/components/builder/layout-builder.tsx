import { Editor } from "@craftjs/core";
import { useState } from "react";
import { RenderEditor } from "./editor-body";
import EditorHeader from "./editor-header";
import RenderNode from "./render-node";
// import * as theme2 from "@/components/editable/theme-2";
import clsx from "clsx";
import lz from "lz-string";
import SettingPanel from "./setting-panel";
import Toolbox from "./toolbox";
import PagePlaceholder from "./page-placeholder";
import * as editableComponents from "../editable/components";

interface ILayoutBuilderProps {
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
}

const LayoutBuilder = ({
  defaultFooterLayout,
  defaultHeaderLayout,
}: ILayoutBuilderProps) => {
  const [activePart, setActivePart] = useState<"header" | "footer">("header");

  return (
    <div className="page-container max-w-[calc(100%-280px)] pt-[80px]">
      <Editor
        enabled={activePart === "header"}
        onRender={RenderNode}
        resolver={{ ...editableComponents }}
      >
        {activePart === "header" && (
          <>
            <EditorHeader
              returnLink={"/admin/themes"}
              isAdminBuilder={true}
              typeOfLayout={"defaultHeaderLayout"}
            />
            <Toolbox />
            <SettingPanel />
          </>
        )}

        <div className="bg-white"></div>
        <div
          className={clsx("relative mx-2 border", {
            "border-blue-500": activePart === "header",
            "cursor-pointer border-dashed border-black":
              activePart !== "header",
          })}
          onClick={() => {
            setActivePart("header");
          }}
        >
          <RenderEditor
            isAdminBuilder={true}
            loading={false}
            jsonLayout={lz.decompressFromBase64(defaultHeaderLayout ?? "")}
          />

          <div
            className={clsx(
              "z-2 absolute left-0 top-0 h-full w-full py-4 text-center text-sm text-gray-600",
              {
                block: activePart !== "header",
                hidden: activePart === "header",
              },
            )}
            style={{
              background:
                'linear-gradient(0deg, rgba(158, 179, 252, 0.4), rgba(158, 179, 252, 0.4)), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+DQogIDxyZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nd2hpdGUnLz4NCiAgPHBhdGggZD0nTS0xLDEgbDIsLTINCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMA0KICAgICAgICAgICBNOSwxMSBsMiwtMicgc3Ryb2tlPScjY2NjJyBzdHJva2Utd2lkdGg9JzEnIHN0cm9rZS1kYXNoYXJyYXk9JzEsMScvPg0KPC9zdmc+DQo=")',
            }}
          >
            Bấm vào để bắt đầu chỉnh sửa Header
            <div className="absolute left-0 top-0 flex gap-1">
              <div className="rounded-br-md bg-black px-3 py-1 text-white">
                Header
              </div>
            </div>
          </div>
        </div>
      </Editor>

      <PagePlaceholder />

      <Editor
        enabled={activePart === "footer"}
        onRender={RenderNode}
        resolver={{ ...editableComponents }}
      >
        {activePart === "footer" && (
          <>
            <EditorHeader
              returnLink={"/admin/themes"}
              isAdminBuilder={true}
              typeOfLayout={"defaultFooterLayout"}
            />
            <Toolbox />
            <SettingPanel />
          </>
        )}
        <div
          className={clsx("relative mx-2", {
            "border border-blue-500": activePart === "footer",
            "cursor-pointer bg-gray-200": activePart !== "footer",
          })}
          onClick={() => {
            setActivePart("footer");
          }}
        >
          <RenderEditor
            isAdminBuilder={true}
            loading={false}
            jsonLayout={lz.decompressFromBase64(defaultFooterLayout ?? "")}
          />

          <div
            className={clsx(
              "z-2 absolute left-0 top-0 h-full w-full py-4 text-center text-sm text-gray-600",
              {
                block: activePart !== "footer",
                hidden: activePart === "footer",
              },
            )}
            style={{
              background:
                'linear-gradient(0deg, rgba(158, 179, 252, 0.4), rgba(158, 179, 252, 0.4)), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+DQogIDxyZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nd2hpdGUnLz4NCiAgPHBhdGggZD0nTS0xLDEgbDIsLTINCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMA0KICAgICAgICAgICBNOSwxMSBsMiwtMicgc3Ryb2tlPScjY2NjJyBzdHJva2Utd2lkdGg9JzEnIHN0cm9rZS1kYXNoYXJyYXk9JzEsMScvPg0KPC9zdmc+DQo=")',
            }}
          >
            Bấm vào để bắt đầu chỉnh sửa Footer
            <div className="absolute left-0 top-0 flex gap-1">
              <div className="rounded-br-md bg-black px-3 py-1 text-white">
                Footer
              </div>
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
};

export default LayoutBuilder;
