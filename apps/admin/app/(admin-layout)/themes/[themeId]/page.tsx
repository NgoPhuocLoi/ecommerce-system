import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import ServerTextField from "@repo/ui/components/ui/server-text-field";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import PagesInTheme from "../_components/pages-in-theme";
import DetailThemeAction from "./_components/detail-theme-actions";
import { Category } from "@repo/common/interfaces/category";
import { Theme } from "@repo/common/interfaces/themes";
import { getTopLevelCategories } from "@repo/common/actions/categories";
import { getTheme, updateTheme } from "@repo/common/actions/themes";
import ServerTextArea from "@repo/ui/components/ui/server-textarea";
import ThemeDefaultLayout from "@repo/ui/components/builder/theme-default-layout";

const Page = async ({ params }: { params: { themeId: string } }) => {
  const [topLevelCategories, theme]: [Category[], Theme] = await Promise.all([
    getTopLevelCategories(),
    getTheme(params.themeId),
  ]);

  const handleUpdateTheme = async (data: FormData) => {
    "use server";
    const updatedData = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      recommendedForCategoryId: Number(data.get("recommendedForCategoryId")),
    };
    const result = await updateTheme(params.themeId, updatedData);
    console.log({ result });
  };

  return (
    <form action={handleUpdateTheme}>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-1 text-lg font-semibold md:text-2xl">
            <Button asChild type="button" variant={"ghost"} size={"icon"}>
              <Link href={"/admin/themes"}>
                <ChevronLeft />
              </Link>
            </Button>
            Chi tiết chủ đề
          </h1>

          <DetailThemeAction />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <ServerTextField
              name={"name"}
              label={"Tên chủ đề"}
              id={"theme-detail-name"}
              type={"text"}
              defaultValue={theme.name}
            />

            <div className="flex flex-col gap-3">
              <Label>Đề xuất cho danh mục</Label>
              <Select
                name="recommendedForCategoryId"
                defaultValue={theme.recommendedForCategoryId?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục đề xuất" />
                </SelectTrigger>
                <SelectContent>
                  {topLevelCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ServerTextArea
            name={"description"}
            label={"Mô tả chủ đề"}
            id={"theme-detail-description"}
            defaultValue={theme.description}
          />
          <PagesInTheme pages={theme.defaultPages} />

          <ThemeDefaultLayout
            defaultFooterLayout={theme.defaultFooterLayout}
            defaultHeaderLayout={theme.defaultHeaderLayout}
          />
        </div>
      </main>
    </form>
  );
};

export default Page;
