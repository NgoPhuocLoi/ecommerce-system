import { Page } from "@repo/common/interfaces/online-shop";
import { Label } from "@repo/ui/components/ui/label";
import clsx from "clsx";
import NewPageDialog from "./new-page-dialog";
import PageItem from "./page-item";

interface IPagesInThemeProps {
  pages: Page[];
}

const PagesInTheme = ({ pages }: IPagesInThemeProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <Label className="mt-auto">Trang mặc định</Label>
        <NewPageDialog />
      </div>
      <div>
        <div className="grid grid-cols-9 rounded-tl-md rounded-tr-md border bg-gray-100">
          <Label className="col-span-3 flex-1 p-3 text-sm">Tên trang</Label>
          <Label className="col-span-3 w-fit p-3 text-sm">Đường dẫn</Label>
          <Label className="col-span-2 w-fit p-3 text-center text-sm">
            Hiển trị trên menu
          </Label>
          <Label className="w-fit p-3 text-sm">Thao tác</Label>
        </div>

        {pages.length === 0 && (
          <div
            className={clsx(
              "grid grid-cols-9 rounded-bl-md rounded-br-md border border-t-0 text-sm",
            )}
          >
            <div className="text-md col-span-9 flex-1 p-3 text-center">
              Không có trang nào
            </div>
          </div>
        )}

        {pages.map((page) => (
          <PageItem
            key={page.id}
            page={page}
            isLastPage={page.id === pages[pages.length - 1]?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PagesInTheme;
