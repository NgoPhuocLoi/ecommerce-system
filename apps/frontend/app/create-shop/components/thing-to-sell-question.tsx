import { getThemes } from "@repo/common/actions/themes";
import { Category } from "@repo/common/interfaces/category";
import { Theme } from "@repo/common/interfaces/themes";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import TextSelection from "@repo/ui/components/ui/text-selection";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Label } from "@repo/ui/components/ui/label";

const PLACEHOLDER_IMAGE_URL =
  "https://bc-stencil-production.s3.amazonaws.com/m/55cbfb30-4c33-013d-7a5c-52329bccbb28/large_thumb_screenshot.png";

interface IThingToSellQuestionProps {
  value: string;
  onValueChange: (value: string) => void;
  categories: Category[];
  selectedThemeId: string;
  onThemeSelect: (themeId: string) => void;
}

const ThingToSellQuestion = ({
  onValueChange,
  categories,
  value: selectedCategoryId,
  onThemeSelect: setSelectedThemeId,
  selectedThemeId,
}: IThingToSellQuestionProps) => {
  const [suggestedThemes, setSuggestedThemes] = useState<Theme[]>([]);
  useEffect(() => {
    const fetchThemes = async () => {
      const themes: Theme[] = await getThemes();
      const suggestedThemes = themes.filter(
        (theme) =>
          theme.recommendedForCategoryId.toString() === selectedCategoryId,
      );
      setSuggestedThemes(suggestedThemes);
      console.log({ suggestedThemes });
    };

    fetchThemes();
    console.log({ selectedCategoryId });
  }, [selectedCategoryId]);
  return (
    <div className="flex flex-col gap-4">
      <TextSelection
        defaultValue={selectedCategoryId}
        onValueChange={onValueChange}
        options={categories}
        displayField="name"
        valueField="id"
        label="Danh mục sản phẩm muốn bán"
        placeholder="Chọn danh mục sản phẩm muốn bán"
      />

      {suggestedThemes.length > 0 && (
        <Label className="mt-4">Chủ đề được đề xuất</Label>
      )}
      <div className="flex gap-6">
        {suggestedThemes.map((theme) => {
          console.log({ theme });

          return (
            // <p>{theme.name}</p>
            <Card
              onClick={() => {
                setSelectedThemeId(theme.id.toString());
              }}
              key={theme.id}
              className={clsx("w-[200px] cursor-pointer p-0 hover:shadow-md", {
                "border-2 border-black":
                  selectedThemeId === theme.id.toString(),
              })}
            >
              <CardContent className="p-3">
                <div className="relative">
                  <Image
                    src={PLACEHOLDER_IMAGE_URL}
                    alt="Theme"
                    width={350}
                    height={450}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div
                    className="flex-1"
                    // href={`/admin/themes/${theme.id}`}
                  >
                    <p className="text-lg font-bold">{theme.name}</p>
                    <p className="text-gray-600">{theme.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ThingToSellQuestion;
