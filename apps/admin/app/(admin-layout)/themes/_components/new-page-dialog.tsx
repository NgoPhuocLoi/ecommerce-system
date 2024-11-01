"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPageInTheme } from "@repo/common/actions/themes";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createPageFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên trang phải trên 2 ký tự")
    .max(50, "Tên trang không được quá 50 ký tự"),
  link: z.string(),
  showInNavigation: z.boolean(),
});

const NewPageDialog = () => {
  const themeId = useParams().themeId as string;
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
    console.log({ values });
    const res = await createPageInTheme(themeId, {
      name: values.name,
      link: values.link,
      showInNavigation: values.showInNavigation,
    });
    console.log({ res });
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
