"use client";
import { deleteTheme } from "@repo/common/actions/themes";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import DeleteAlertDialog from "../../../_components/common/delete-alert-dialog";

const DetailThemeAction = () => {
  const themeId = useParams().themeId as string;
  const router = useRouter();
  const formStatus = useFormStatus();

  const handleDeleteTheme = async () => {
    await deleteTheme(themeId);
    router.push("/admin/themes");
  };

  return (
    <div className="flex gap-2">
      <Button disabled={formStatus.pending} type="submit">
        {formStatus.pending ? "Đang lưu..." : "Lưu"}
      </Button>
      <Button asChild type="button" variant={"secondary"}>
        <Link href={`/admin-builder?themeId=${themeId}`}>Chỉnh sửa</Link>
      </Button>
      {/* <Button variant="destructive">Xóa</Button> */}
      <DeleteAlertDialog
        title="Bạn có chắc muốn xoá chủ đề này không?"
        description="Hành động này không thể hoàn tác, chủ đề bị xoá sẽ không thể khôi phục."
        onConfirmed={handleDeleteTheme}
        TriggerComponent={
          <div>
            <Button type="button" variant="destructive">
              Xóa
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default DetailThemeAction;
