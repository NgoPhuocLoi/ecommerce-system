"use client";

import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Separator } from "@repo/ui/components/ui/separator";
import { getSubCategories } from "app/actions/categories";
import { selectedCategoryAtom } from "app/atoms/category-atom";
import { Category, CategoryResponse } from "app/interfaces/category";
import { useAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ICategoryListProps {
  topLevelCategories: Category[];
  initialCategory?: CategoryResponse;
  title?: string;
}

const CategoryList = ({
  topLevelCategories,
  initialCategory,
  title,
}: ICategoryListProps) => {
  const [displayedCategories, setDisplayedCategories] =
    useState<Category[]>(topLevelCategories);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);
  const [previousParents, setPreviousParents] = useState<(Category | null)[]>(
    [],
  );
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom);

  useEffect(() => {
    if (initialCategory) {
      console.log({ initialCategory });
      handleLoadSubCategory(initialCategory.parent_id);
    }
  }, [initialCategory]);

  const handleLoadSubCategory = async (parentId: number) => {
    console.log("HERE");
    setPreviousParents((prev) => [
      ...prev,
      parentCategory !== null ? parentCategory : null,
    ]);
    const res = (await getSubCategories(parentId)).metadata;
    console.log({ res });
    setParentCategory(
      displayedCategories.find((category) => category.id === parentId) ?? null,
    );
    setDisplayedCategories(res);
  };

  const handleBack = async () => {
    const previousParent = previousParents.pop();
    if (previousParent === undefined) {
      return;
    }

    if (previousParent === null) {
      setPreviousParents([]);
      setDisplayedCategories(topLevelCategories);
      setParentCategory(null);
      return;
    }

    const res = (await getSubCategories(previousParent.id)).metadata;
    setParentCategory(previousParent);
    setDisplayedCategories(res);
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="category">{title ?? "Danh mục"}</Label>
      <Select
        defaultValue={initialCategory?.id + ""}
        onValueChange={(value) => {
          const selectedCategory = displayedCategories.find(
            (category) => category.id === Number(value),
          );
          console.log({ selectedCategory, displayedCategories });
          setSelectedCategory(selectedCategory);
        }}
        name="categoryId"
      >
        <SelectTrigger id="category" aria-label="Select category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {parentCategory && (
            <>
              <div className="cursor-pointer" onClick={handleBack}>
                {previousParents.length > 1 && (
                  <>
                    <div className="pl-8 pt-2 text-xs text-gray-400">
                      {previousParents
                        .slice(1)
                        .map((parent) => parent?.name)
                        .join(" > ")}
                    </div>
                  </>
                )}
                <div className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-100">
                  <ChevronLeft size={16} />
                  <span className="font-semibold">{parentCategory?.name}</span>
                </div>
              </div>
              <Separator className="my-2" />
            </>
          )}
          {displayedCategories.map((category) => (
            <div key={category.id} className="flex w-full items-center">
              <SelectItem key={category.id} value={category.id + ""}>
                <div className="flex w-full items-center gap-2">
                  <span>{category.name}</span>
                </div>
              </SelectItem>
              {category.hasChild && (
                <div
                  onClick={() => {
                    handleLoadSubCategory(category.id);
                  }}
                  className="ml-10 cursor-pointer rounded-md p-2 hover:bg-gray-200"
                >
                  <ChevronRight size={16} className="ml-auto" />
                </div>
              )}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryList;
