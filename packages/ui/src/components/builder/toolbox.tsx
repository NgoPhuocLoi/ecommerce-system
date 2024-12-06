import { Element } from "@craftjs/core";
import { useEditorCreate } from "@repo/common/hooks/useEditorCreate";
import { icons } from "@repo/common/icons/index";
import Image from "next/image";
import {
  Carousel,
  Column,
  Image as EditableImage,
  HeroBanner,
  Layout,
  Link,
  Navbar,
  Product,
  Spacer,
  Text,
  Button,
} from "../editable/components";
import { Divider } from "../editable/components/divider";

const ELEMEMENTS = [
  {
    id: 1,
    label: "Layout",
    icon: icons.layout,
    component: Layout,
    hasChildren: true,
  },
  {
    id: 14,
    label: "Column",
    icon: icons.column,
    component: Column,
  },
  {
    id: 2,
    label: "Text",
    icon: icons.text,
    component: Text,
  },
  {
    id: 3,
    label: "Image",
    icon: icons.image,
    component: EditableImage,
  },
  {
    id: 4,
    label: "Hero Banner",
    icon: icons.heroBanner,
    component: HeroBanner,
  },
  {
    id: 5,
    label: "Carousel",
    icon: icons.carousel,
    component: Carousel,
  },
  // {
  //   id: 6,
  //   label: "Video",
  //   icon: icons.video,
  //   component: Layout,
  // },
  {
    id: 7,
    label: "Product",
    icon: icons.product,
    component: Product,
  },
  // {
  //   id: 8,
  //   label: "Product Set",
  //   icon: icons.productSet,
  //   component: Layout,
  // },
  {
    id: 9,
    label: "Button",
    icon: icons.button,
    component: Button,
  },
  // {
  //   id: 10,
  //   label: "HTML",
  //   icon: icons.html,
  //   component: Layout,
  // },
  {
    id: 11,
    label: "Spacer",
    icon: icons.spacer,
    component: Spacer,
  },
  {
    id: 12,
    label: "Divider",
    icon: icons.divider,
    component: Divider,
  },
  {
    id: 13,
    label: "Link",
    icon: icons.link,
    component: Link,
  },

  {
    id: 15,
    label: "Navbar",
    icon: icons.navbar,
    component: Navbar,
  },
];

const Toolbox = () => {
  const { createElement } = useEditorCreate();

  return (
    <div className="fixed right-0 top-14 h-full w-[264px] bg-white shadow">
      <div className="grid grid-cols-2 gap-2 p-2">
        {ELEMEMENTS.map((element) => (
          <div
            ref={(ref) => {
              if (element.hasChildren) {
                return createElement(
                  ref,
                  <element.component>Hello</element.component>,
                );
              }

              if (element.label === "Column") {
                return createElement(
                  ref,
                  <Element id="column-aa" is={Column} canvas />,
                );
              }

              return createElement(ref, <element.component />);
            }}
            key={element.id}
            className="flex h-fit cursor-pointer flex-col items-center gap-1 rounded-md border border-transparent p-2 hover:border-gray-100 hover:shadow-md"
          >
            <Image alt="img" className="min-h-7" src={element.icon} />
            <p className="text-sm">{element.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
