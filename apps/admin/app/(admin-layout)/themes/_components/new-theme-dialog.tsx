"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTheme } from "@repo/common/actions/themes";
import { Category } from "@repo/common/interfaces/category";
import { Button } from "@repo/ui/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createThemeFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên trang phải trên 2 ký tự")
    .max(50, "Tên trang không được quá 50 ký tự"),
  description: z.string(),
  recommendedForCategoryId: z.string().optional(),
});

interface INewThemeDialogProps {
  topLevelCategories: Category[];
}

const NewThemeDialog = ({ topLevelCategories }: INewThemeDialogProps) => {
  const [openCreateNewPageForm, setOpenCreateNewPageForm] = useState(false);

  const form = useForm<z.infer<typeof createThemeFormSchema>>({
    resolver: zodResolver(createThemeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      recommendedForCategoryId: undefined,
    },
  });

  const onSubmitForm = async (
    values: z.infer<typeof createThemeFormSchema>,
  ) => {
    const res = await createTheme({
      name: values.name,
      description: values.description,
      recommendedForCategoryId: values.recommendedForCategoryId
        ? Number(values.recommendedForCategoryId)
        : undefined,
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
        <Button>Thêm chủ đề</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo chủ đề mới</DialogTitle>
          <DialogDescription>
            Tạo chủ đề mới để bắt đầu thiết kế
          </DialogDescription>
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
                  <FormLabel>Tên chủ đề</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendedForCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đề xuất cho danh mục</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục đề xuất" />
                      </SelectTrigger>
                    </FormControl>
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

export default NewThemeDialog;
