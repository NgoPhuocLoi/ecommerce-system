import { useEditor } from "@craftjs/core";
import { selectedPageAtom } from "@repo/common/atoms/page-atom";
import { useAtom } from "jotai";
import { ExternalLink, Eye, EyeOff, LogOut, Redo2, Undo2 } from "lucide-react";
import lz from "lz-string";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { DEFAULT_LAYOUT } from "./editor-body";
import { updatePageInTheme, updateTheme } from "@repo/common/actions/themes";
import {
  updateDefaultLayout,
  updatePage,
} from "@repo/common/actions/online-shop";
import PagesPopover from "./pages-popover";
import { Button } from "../ui/button";

interface IEditorHeaderProps {
  returnLink?: string;
  isAdminBuilder?: boolean;
  actionsComponent?: ReactNode;
  typeOfLayout?: "defaultHeaderLayout" | "defaultFooterLayout";
  domain?: string;
}

const EditorHeader = ({
  returnLink,
  isAdminBuilder,
  actionsComponent,
  typeOfLayout,
  domain,
}: IEditorHeaderProps) => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleSave = async () => {
    setLoading(true);
    const themeId = searchParams.get("themeId") as string;
    const pageId = searchParams.get("pageId") as string;
    try {
      const json = query.serialize();
      const encoded = lz.compressToBase64(json);
      if (!selectedPage && pageId !== DEFAULT_LAYOUT) return;

      if (pageId === DEFAULT_LAYOUT) {
        if (isAdminBuilder) {
          await updateTheme(themeId, {
            [typeOfLayout as string]: encoded,
          });
        } else {
          const res = await updateDefaultLayout({
            [typeOfLayout as string]: encoded,
          });
          console;
        }

        return;
      }

      if (isAdminBuilder) {
        console.log("RUN HERE");
        console.log({
          themeId,
          selectedPage: selectedPage!.id,
          layout: encoded,
        });
        await updatePageInTheme(themeId, selectedPage!.id.toString(), {
          layout: encoded,
        });
      } else {
        // alert("RUN HERE");
        const updatedRes = await updatePage(selectedPage!.id, {
          layout: encoded,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
      <Link
        href={returnLink || "/dashboard"}
        className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
      >
        <LogOut className="h-5 rotate-180" />
      </Link>

      <div className="cursor-pointer">
        <PagesPopover isAdminBuilder={isAdminBuilder} />
      </div>
      {actionsComponent ? (
        actionsComponent
      ) : (
        <div className="flex gap-4 items-center">
          {!isAdminBuilder && domain && (
            <>
              <a
                title="Xem trang web của bạn"
                href={`http://${domain}.my-ecommerce.live`}
                target="_blank"
              >
                <ExternalLink className="h-5" />
              </a>
            </>
          )}
          <div className="flex items-center gap-1">
            <div
              onClick={() => {
                console.log("RUN HERE");
                actions.setOptions((options) => {
                  options.enabled = !options.enabled;
                });
              }}
              title="View your online shop"
              className="mr-6 cursor-pointer rounded-md px-1 py-2 hover:bg-gray-100"
            >
              {enabled ? <Eye className="h-5" /> : <EyeOff className="h-5" />}
            </div>
          </div>
          <Button disabled={loading} onClick={handleSave}>
            {" "}
            {loading ? "Đang lưu...." : "Lưu"}
          </Button>
        </div>
      )}
    </header>
  );
};

export default EditorHeader;
