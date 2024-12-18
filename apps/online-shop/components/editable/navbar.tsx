import { pagesAtom } from "@repo/common/atoms/page-atom";
import { Column } from "@repo/ui/components/editable/components/column";
import { Text } from "@repo/ui/components/editable/components/text";
import { useAtom } from "jotai";
import { ShoppingCart } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "./link";
import CustomerAuthDialog from "../customer-auth-dialog";
import { currentCustomerAtom } from "../../atom/current-customer";
import CustomerAccount from "../customer-account";
import { cartCountAtom } from "../../atom/cart";

export const Navbar = () => {
  const [pages] = useAtom(pagesAtom);
  const [currentCustomer] = useAtom(currentCustomerAtom);
  const [cartCount] = useAtom(cartCountAtom);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    // <Element is={Column} id="nav-bar" canvas>
    <Column
      bgColor="#000"
      padding="0 16px"
      flexDirection="row"
      contentAlign="flex-start"
    >
      <Text
        content="Home"
        bgColor="transparent"
        padding="24px 8px"
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
          return (
            <Link
              key={page.id}
              url={urlToNavigate}
              content={page.name}
              padding="24px 8px"
              bgColor="transparent"
              textColor="white"
              fontSize={16}
            />
          );
        })}

      <div className="ml-auto flex gap-4 items-center">
        {currentCustomer ? (
          <CustomerAccount currentCustomer={currentCustomer} />
        ) : (
          <CustomerAuthDialog />
        )}
        <Link isIcon url="/gio-hang" bgColor="transparent" textColor="#fff">
          <div className="relative">
            <ShoppingCart size={24} />
            <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </div>
          </div>
        </Link>
      </div>
    </Column>
    // </Element>
  );
};
