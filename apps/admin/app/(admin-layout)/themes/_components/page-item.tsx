"use client";

import { Page } from "@repo/common/interfaces/online-shop";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import clsx from "clsx";
import PageActions from "./page-actions";
import { useParams } from "next/navigation";
import { updatePageInTheme } from "@repo/common/actions/themes";

interface IPageItemProps {
  page: Page;
  isLastPage: boolean;
}

const PageItem = ({ page, isLastPage }: IPageItemProps) => {
  const themeId = useParams().themeId as string;

  const handleChangeShowInNavigation = async (showInNavigation: boolean) => {
    await updatePageInTheme(themeId, page.id.toString(), {
      showInNavigation,
    });
  };

  return (
    <div
      className={clsx("grid grid-cols-9 border border-t-0 text-sm", {
        "rounded-bl-md rounded-br-md": isLastPage,
      })}
    >
      <div className="text-md col-span-3 flex-1 p-3">{page.name}</div>
      <div className="text-md col-span-3 w-fit p-3">{page.link}</div>
      <div className="text-md col-span-2 flex w-full justify-between p-3">
        <Checkbox
          className="ml-10"
          onCheckedChange={handleChangeShowInNavigation}
          defaultChecked={page.showInNavigation}
        />
      </div>
      <PageActions page={page} />
    </div>
  );
};

export default PageItem;
