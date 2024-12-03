import clsx from "clsx";
import { EllipsisVertical, GripVertical, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

import { useEditor } from "@craftjs/core";
import { useSetting } from "@repo/common/hooks/useSetting";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import CollapsibleSettingWrapper from "../settings/collapsible-setting-wrapper";
import { InputSetting } from "../settings/input-setting";
import { Button } from "../../ui/button";
import {
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as ShaDCNCarousel,
} from "../../ui/carousel";

interface ICarouselProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  contentAlign?: "flex-start" | "center" | "flex-end";
  activeIndex?: number;
  slides?: {
    id: string;
    title: string;
    description: string;
    button: string;
    link: string;
    imageUrl: string;
  }[];
}

export const CarouselSetting = () => {
  const { props, handlePropChange } = useSetting();

  const { bgColor, slides, activeIndex } = props;
  const [selectedSlideId, setSelectedSlideId] = useState(slides[0].id);
  const selectedSlide = useMemo(() => {
    console.log({ selectedSlideId, slides });
    return slides.find((s: any) => s.id === selectedSlideId);
  }, [selectedSlideId, slides]);

  return (
    <div className="flex flex-col gap-4">
      <CollapsibleSettingWrapper
        topRight={
          <div
            className="ml-auto rounded-md p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              handlePropChange("slides", [
                ...slides,
                {
                  id: v4(),
                  title: "Trang mới",
                  description: "",
                  button: "Shop now",
                  link: "",
                  imageUrl:
                    "https://images.unsplash.com/photo-1517840600399-c7c2ff4c0fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
                },
              ]);
            }}
          >
            <Plus size={14} />
          </div>
        }
        openByDefault
        label="Slides"
      >
        <div className="flex flex-col gap-2">
          {slides.map((slide: any, index: any) => (
            <div
              onClick={() => {
                setSelectedSlideId(slide.id);
                handlePropChange("activeIndex", index);
              }}
              className={clsx(
                "flex cursor-pointer items-center gap-1 rounded-md p-1 hover:shadow-md",
                {
                  "shadow-lg": slide.id === selectedSlideId,
                },
              )}
              key={index}
            >
              <GripVertical size={16} />
              <div>
                <Image
                  alt="slide"
                  src={slide.imageUrl}
                  width={40}
                  height={40}
                />
              </div>
              <div className="text-sm">Trang {index + 1}</div>
              <EllipsisVertical className="ml-auto" size={16} />
            </div>
          ))}
        </div>
      </CollapsibleSettingWrapper>

      <CollapsibleSettingWrapper
        openByDefault
        label={`Slide ${activeIndex + 1}`}
      >
        <div className="flex flex-col gap-4">
          <InputSetting
            title="Tiêu đề"
            value={selectedSlide.title}
            onChange={(value) => {
              handlePropChange(
                "slides",
                slides.map((slide: any) =>
                  slide.id === selectedSlideId
                    ? { ...slide, title: value }
                    : slide,
                ),
              );
            }}
            id={"shop-common-carousel-title"}
            description={""}
          />
          {/* <InputSetting
            label="Description"
            value={selectedSlide.description}
            onChange={(value) => {
              handlePropChange(
                "slides",
                slides.map((slide) =>
                  slide.id === selectedSlideId
                    ? { ...slide, description: value }
                    : slide,
                ),
              );
            }}
          />
          <InputSetting
            label="Button"
            value={selectedSlide.button}
            onChange={(value) => {
              handlePropChange(
                "slides",
                slides.map((slide) =>
                  slide.id === selectedSlideId
                    ? { ...slide, button: value }
                    : slide,
                ),
              );
            }}
          />
          <InputSetting
            label="Link"
            value={selectedSlide.link}
            onChange={(value) => {
              handlePropChange(
                "slides",
                slides.map((slide) =>
                  slide.id === selectedSlideId
                    ? { ...slide, link: value }
                    : slide,
                ),
              );
            }}
          />
          <ColorSetting
            label="Background Color"
            value={selectedSlide.bgColor}
            onChange={(value) => {
              handlePropChange(
                "slides",
                slides.map((slide) =>
                  slide.id === selectedSlideId
                    ? { ...slide, bgColor: value }
                    : slide,
                ),
              );
            }}
          /> */}
        </div>
      </CollapsibleSettingWrapper>
    </div>
  );
};

export const Carousel = ({ activeIndex, slides }: ICarouselProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const { applyRef } = useApplyRef();

  useEffect(() => {
    if (carouselApi && activeIndex !== undefined) {
      carouselApi?.scrollTo(activeIndex);
    }
  }, [activeIndex, carouselApi]);

  return (
    <div ref={applyRef} className="">
      <ShaDCNCarousel
        setApi={setCarouselApi}
        className={clsx("w-full", { "pointer-events-none": enabled })}
      >
        <CarouselContent>
          {slides?.map((slide, index) => (
            <CarouselItem className="min-h-[500px]" key={slide.id}>
              <div
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  backgroundPosition: "center",
                }}
                className="flex h-full w-full items-center justify-center overflow-hidden border"
              >
                <div className="flex w-2/3 flex-col items-center gap-6 bg-white p-8 text-gray-700">
                  <h1 className="text-4xl">{slide.title}</h1>
                  <p className="text-center text-xl">{slide.description}</p>

                  <Button className="w-fit text-xl" size="lg">
                    {slide.button}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </ShaDCNCarousel>
    </div>
  );
};

Carousel.craft = {
  props: {
    bgColor: "#aaa",
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
    contentAlign: "center",
    activeIndex: 0,
    slides: [
      {
        id: v4(),
        title: "Tiêu đề Carousel 1",
        description:
          "Thêm mô tả cho slide của bạn. Bạn có thể sử dụng nó để quảng cáo nhiều khuyến mãi.",
        button: "Shop now",
        link: "",
        imageUrl:
          "https://images.unsplash.com/photo-1517840600399-c7c2ff4c0fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      },
      {
        id: v4(),
        title: "Tiêu đề Carousel 2",
        description:
          "Thêm mô tả cho slide của bạn. Bạn có thể sử dụng nó để quảng cáo nhiều khuyến mãi.",
        button: "Shop now",
        link: "",
        imageUrl:
          "https://images.unsplash.com/photo-1517840600399-c7c2ff4c0fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      },
    ],
  },
  related: {
    setting: CarouselSetting,
  },
  data: {
    name: "Carousel",
  },
};
