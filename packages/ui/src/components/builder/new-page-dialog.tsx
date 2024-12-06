"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPage } from "@repo/common/actions/online-shop";
import { createPageInTheme } from "@repo/common/actions/themes";
import { Page } from "@repo/common/interfaces/online-shop";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const createPageFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên trang phải trên 2 ký tự")
    .max(50, "Tên trang không được quá 50 ký tự"),
  link: z.string().startsWith("/", "Link phải bắt đầu bằng dấu /"),
  showInNavigation: z.boolean(),
});

interface INewPageDialogProps {
  existingPages: Page[];
  isAdminBuilder?: boolean;
  onPageCreated: (page: Page) => void;
}

const NewPageDialog = ({
  existingPages,
  isAdminBuilder,
  onPageCreated,
}: INewPageDialogProps) => {
  const themeId = useSearchParams().get("themeId");
  const [openCreateNewPageForm, setOpenCreateNewPageForm] = useState(false);

  const form = useForm<z.infer<typeof createPageFormSchema>>({
    resolver: zodResolver(createPageFormSchema),
    defaultValues: {
      name: "",
      link: "",
      showInNavigation: true,
    },
  });

  const onSubmitForm = async (values: z.infer<typeof createPageFormSchema>) => {
    console.log({ values, existingPages });
    if (existingPages.some((page) => page.link === values.link)) {
      form.setError("link", {
        type: "manual",
        message: "Link đã tồn tại",
      });
      return;
    }
    if (isAdminBuilder && themeId) {
      console.log(
        themeId,
        {
          name: values.name,
          link: values.link,
          showInNavigation: values.showInNavigation,
        },
        themeId,
      );
      const newPage = await createPageInTheme(themeId, {
        name: values.name,
        link: values.link,
        showInNavigation: values.showInNavigation,
      });
      if (newPage.id) {
        onPageCreated(newPage);
      }
    } else {
      alert("Create page in shop builder");
      const newPage = await createPage({
        name: values.name,
        link: values.link,
        showInNavigation: values.showInNavigation,
        position: existingPages.length,
        layout: "",
      });

      if (newPage.id) {
        onPageCreated(newPage);
      }
    }

    form.reset();
    setOpenCreateNewPageForm(false);
  };
  return (
    <Dialog
      open={openCreateNewPageForm}
      onOpenChange={setOpenCreateNewPageForm}
    >
      <DialogTrigger asChild>
        <Button>Thêm trang mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo trang mới</DialogTitle>
          <DialogDescription>Tạo trang mới cho chủ đề</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên trang</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showInNavigation"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                  <FormLabel className="mt-0">Hiển thị trong menu</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="ml-auto" type="submit">
              Tạo
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPageDialog;
