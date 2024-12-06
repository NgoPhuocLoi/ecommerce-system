import { zodResolver } from "@hookform/resolvers/zod";
import { updatePagesPositionInTheme } from "@repo/common/actions/themes";
import { pagesAtom, selectedPageAtom } from "@repo/common/atoms/page-atom";
import { Page } from "@repo/common/interfaces/online-shop";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { Separator } from "@repo/ui/components/ui/separator";
import clsx from "clsx";
import { useAtom } from "jotai";
import { ChevronDown, LayoutTemplate, Search, StickyNote } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NewPageDialog from "./new-page-dialog";

const createPageFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên trang phải trên 2 ký tự")
    .max(50, "Tên trang không được quá 50 ký tự"),
});

const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PagesPopover = ({ isAdminBuilder }: { isAdminBuilder?: boolean }) => {
  const [pages, setPages] = useAtom(pagesAtom);
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const [openCreateNewPageForm, setOpenCreateNewPageForm] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pageId = searchParams.get("pageId");
    console.log({ pageId });

    if (!pageId) {
      return;
    }

    if (pageId === "defaultLayout") {
      console.log("RUN HERE");
      setSelectedPage({
        id: -1,
        name: "Layout mặc định",
        layout: "",
      });
      return;
    }

    const page = pages?.find((page) => page.id === parseInt(pageId));
    if (page) {
      setSelectedPage(page);
      console.log({ selectedPage: page });
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof createPageFormSchema>>({
    resolver: zodResolver(createPageFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSelectPage = (page: Page | null) => {
    setSelectedPage(page);
    setOpenPopover(false);
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reOrderedPages = reorder(
      pages,
      result.source.index,
      result.destination.index,
    );
    setPages(reOrderedPages);
    await updatePagesPositionInTheme(
      searchParams.get("themeId") as string,
      reOrderedPages.map((page) => page.id),
    );
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="ghost">
          {selectedPage ? (
            <>
              <StickyNote size={16} />
              <span>{selectedPage?.name}</span>
            </>
          ) : (
            <>
              <LayoutTemplate size={16} />
              <span>Layout mặc định</span>
            </>
          )}

          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <div className="relative ml-auto w-full flex-1">
            <Search size={16} className="absolute left-2 top-2" />
            <Input
              type="search"
              placeholder="Search..."
              className="bg-background h-8 w-full rounded-lg py-1 pl-8"
            />
          </div>

          <div
            onClick={() => {
              onSelectPage(null);
              const urlToReplace = isAdminBuilder
                ? `/admin-builder?themeId=${searchParams.get("themeId")}&pageId=defaultLayout`
                : `/shop-builder?pageId=defaultLayout`;
              router.replace(urlToReplace);
            }}
            className={clsx(
              "flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100",
              {
                "bg-gray-100": selectedPage === null,
              },
            )}
          >
            <LayoutTemplate size={16} />
            <p className="text-sm">Layout mặc định</p>
          </div>
          <Separator />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {pages?.map((page, index) => (
                    <Draggable
                      key={page.id}
                      draggableId={page.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={clsx(
                            "flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100",
                            {
                              "bg-gray-100": selectedPage?.id === page.id,
                            },
                          )}
                          onClick={() => {
                            const urlToReplace = isAdminBuilder
                              ? `/admin-builder?themeId=${searchParams.get("themeId")}&pageId=${page.id}`
                              : `/shop-builder?pageId=${page.id}`;
                            onSelectPage(page);
                            router.replace(urlToReplace);
                          }}
                          style={{
                            ...provided.draggableProps.style,

                            backgroundColor: snapshot.isDragging
                              ? "#ccc"
                              : "#fff",
                            left: 0,
                          }}
                        >
                          <StickyNote size={16} />
                          <p className="text-sm">{page.name}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {pages.map((page) => (
            <div
              onClick={() => {
                onSelectPage(page);
                router.replace(
                  `/admin-builder?themeId=${searchParams.get("themeId")}&pageId=${page.id}`,
                );
              }}
              key={page.id}
              className={clsx(
                "flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100",
                {
                  "bg-gray-100": selectedPage?.id === page.id,
                },
              )}
            >
              <StickyNote size={16} />
              <p className="text-sm">{page.name}</p>
            </div>
          ))} */}

          <Separator />
          <NewPageDialog
            isAdminBuilder={isAdminBuilder}
            existingPages={pages}
            onPageCreated={(pageCreated) => {
              onSelectPage(pageCreated);
              setPages([...pages, pageCreated]);
              const urlToReplace = isAdminBuilder
                ? `/admin-builder?themeId=${searchParams.get("themeId")}&pageId=${pageCreated.id}`
                : `/shop-builder?pageId=${pageCreated.id}`;
              router.replace(urlToReplace);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PagesPopover;
