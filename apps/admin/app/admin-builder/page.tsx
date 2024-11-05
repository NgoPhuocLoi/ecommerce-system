import { getTheme } from "@repo/common/actions/themes";
import { Theme } from "@repo/common/interfaces/themes";
import PageBuilder from "@repo/ui/components/builder/page-builder";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { themeId: string; pageId: string };
}) => {
  const theme: Theme = await getTheme(searchParams.themeId);
  if (!theme) {
    return redirect("/admin/themes");
  }
  console.log({ theme, searchParams });
  if (!searchParams.pageId) {
    if (theme.defaultPages?.length === 0) {
      return redirect(
        `/admin-builder?themeId=${searchParams.themeId}&pageId=defaultLayout`,
      );
    }
    return redirect(
      `/admin-builder?themeId=${searchParams.themeId}&pageId=${theme.defaultPages[0]?.id}`,
    );
  }
  return (
    <div>
      <PageBuilder
        shouldDisplayLayoutEditor={searchParams.pageId === "defaultLayout"}
        isAdminBuilder
        pages={theme.defaultPages}
        products={[]}
        returnLink="/admin/themes"
        defaultHeaderLayout={theme.defaultHeaderLayout}
        defaultFooterLayout={theme.defaultFooterLayout}
      />
    </div>
  );
};

export default Page;
