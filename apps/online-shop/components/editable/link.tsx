"use client";
import { useEditor } from "@craftjs/core";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useAtom } from "jotai";
import RouterLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ILinkProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  content?: string;
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  fontWeight?: "300" | "400" | "700";
  fontSize?: number;
  url?: string;
  children?: React.ReactNode;
  isIcon?: boolean;
}

export const Link = ({
  bgColor = "#aaa",
  padding,
  margin,
  content,
  textAlign,
  textColor,
  fontWeight,
  fontSize,
  url,
  children,
  isIcon,
}: ILinkProps) => {
  const { enabled } = useEditor((state) => {
    return {
      enabled: state.options.enabled,
    };
  });
  const { applyRef } = useApplyRef();
  const [pages] = useAtom(pagesAtom);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <RouterLink
      onClick={(e) => {
        if (enabled) {
          e.preventDefault();
          return;
        }

        // if (isIcon) {
        //   e.preventDefault();
        //   const pageToNavigate = pages.find((page) => page.link === url);
        //   // console.log(pageToNavigate);
        //   if (pageToNavigate) {
        //     const params = new URLSearchParams();
        //     const themeId = searchParams.get("themeId");
        //     if (themeId) {
        //       params.append("themeId", themeId);
        //     }
        //     params.append("pageId", pageToNavigate.id.toString());
        //     const urlToNavigate = `${pathname}?${params.toString()}`;
        //     router.replace(urlToNavigate);
        //   }
        // }
      }}
      href={`${url}`}
      ref={applyRef}
      className={`w-fit`}
      style={{
        backgroundColor: bgColor,
        padding,
        margin,
        textAlign,
        color: textColor,
      }}
    >
      {children ? (
        children
      ) : (
        <p
          style={{
            fontWeight: fontWeight,
            fontSize: fontSize + "px",
          }}
        >
          {content}
        </p>
      )}
    </RouterLink>
  );
};

Link.craft = {
  props: {
    bgColor: "transparent",
    gap: 8,
    cols: 2,
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
    content: "Link",
    textAlign: "center",
    textColor: "blue",
    fontWeight: "400",
    fontSize: 16,
    url: "",
  },
};
