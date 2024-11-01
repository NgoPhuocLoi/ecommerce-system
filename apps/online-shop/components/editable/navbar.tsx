import { useAtom } from "jotai";
import { ShoppingCart, User } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "./link";
import { Column } from "@repo/ui/components/editable/components/column";
import { Text } from "@repo/ui/components/editable/components/text";
import { pagesAtom } from "@repo/common/atoms/page-atom";

export const Navbar = () => {
  const [pages] = useAtom(pagesAtom);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    // <Element is={Column} id="nav-bar" canvas>
    <Column
      bgColor="#000"
      padding="16px"
      flexDirection="row"
      contentAlign="flex-start"
    >
      <Text
        content="Home"
        bgColor="transparent"
        padding="8px"
        textColor="#fff"
        fontWeight="700"
        fontSize={24}
      />

      {pages
        .filter((page) => page.showInNavigation)
        .map((page) => {
          const themeId = searchParams.get("themeId");

          const params = new URLSearchParams();
          if (themeId) {
            params.append("themeId", themeId);
          }

          params.append("pageId", page.id.toString());

          const urlToNavigate = `.${page.link}`;
          console.log({ urlToNavigate });
          return (
            <Link
              key={page.id}
              url={urlToNavigate}
              content={page.name}
              padding="8px"
              bgColor="transparent"
              textColor="white"
              fontSize={16}
            />
          );
        })}

      <div className="ml-auto flex gap-4">
        <Link isIcon url="/xac-thuc" bgColor="transparent" textColor="#fff">
          <User size={24} />
        </Link>
        <Link isIcon url="/gio-hang" bgColor="transparent" textColor="#fff">
          <ShoppingCart size={24} />
        </Link>
      </div>
    </Column>
    // </Element>
  );
};
