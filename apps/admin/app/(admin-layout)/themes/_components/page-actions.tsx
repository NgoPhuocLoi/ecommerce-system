"use client";
import { Page } from "@repo/common/interfaces/online-shop";
import DeleteAlertDialog from "../../_components/common/delete-alert-dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { deletePageInTheme } from "@repo/common/actions/themes";

interface IPageActionsProps {
  page: Page;
}

const PageActions = ({ page }: IPageActionsProps) => {
  const themeId = useParams().themeId as string;

  const handleDeletePage = async () => {
    await deletePageInTheme(themeId, page.id.toString());
  };

  return (
    <div>
      <DeleteAlertDialog
        title="Bạn có chắc muốn xoá trang này không?"
        description="Hành động này không thể hoàn tác, trang bị xoá sẽ không thể khôi phục."
        onConfirmed={handleDeletePage}
        TriggerComponent={
          <Button size="icon" variant="ghost">
            <Trash color="red" size={20} />
          </Button>
        }
      />
      {/* <Button className="ml-4" size="icon" variant={"ghost"}>
        <Trash color="red" size={20} />
      </Button> */}
    </div>
  );
};

export default PageActions;
