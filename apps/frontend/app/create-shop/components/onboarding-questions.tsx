"use client";
import { createShop } from "@repo/common/actions/shops";
import { Category } from "@repo/common/interfaces/category";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import TextField from "@repo/ui/components/ui/text-field";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddressForm from "./address-form";
import RadioQuestions from "./radio-question";
import ThingToSellQuestion from "./thing-to-sell-question";
import { Province } from "@repo/common/interfaces/address";

const NUMBER_OF_QUESTIONS = 5;

interface QuestionData {
  index: number;
  question: string;
  description: string;
  options: {
    label: string;
    value: string;
  }[];
  type: "radio" | "select" | "form";
}
const VIETNAMESE_QUESTIONS: QuestionData[] = [
  {
    index: 1,
    question: "Bắt đầu thôi. Bạn thuộc nhóm nào sau đây?",
    description:
      "Chúng tôi sẽ giúp bạn thiết lập dựa trên nhu cầu kinh doanh của bạn.",
    options: [
      { label: "Tôi mới với nền tảng này", value: "false" },
      { label: "Tôi đã sử dụng nền tảng này trước đây", value: "true" },
    ],
    type: "radio",
  },
  {
    index: 2,
    question: "Bạn sẽ bán gì?",
    description:
      "Chọn một trong số các lựa chọn dưới đây mà phù hợp nhất với doanh nghiệp của bạn. Chúng tôi sẽ đề xuất các chủ đề phù hợp cho cửa hàng online của bạn.",
    type: "select",
    options: [],
  },

  {
    index: 4,
    question: "Địa chỉ cửa hàng của bạn ở đâu?",
    description:
      "Điều này sẽ giúp chúng tôi thiết lập địa chỉ vận chuyển và hiển thị doanh nghiệp của bạn cho khách hàng địa phương.",
    type: "form",
    options: [],
  },
];

interface IOnboardingQuestionsProps {
  categories: Category[];
  provinces: Province[];
}

const OnboardingQuestions = ({
  categories,
  provinces,
}: IOnboardingQuestionsProps) => {
  const [question, setQuestion] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [hasUsedPlatformBefore, setHasUsedPlatformBefore] = useState(false);
  const [name, setName] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [addressInformation, setAddressInformation] = useState({
    provinceId: "",
    districtId: "",
    wardCode: "",
    detailAddress: "",
    phone: "",
    provinceName: "",
    districtName: "",
    wardName: "",
  });

  const percentageComplete = useMemo(() => {
    return Math.ceil((question * 100) / VIETNAMESE_QUESTIONS.length);
  }, [question]);

  const handleCreateShop = async () => {
    const data = {
      name,
      domain,
      themeId: selectedThemeId!,
      mainCategoryIdToSell: selectedCategoryId!,
      hasUsedPlatformBefore,
      ...addressInformation,
    };
    // console.log({ data });
    const res = await createShop(data);

    console.log({ res });
  };

  return (
    <>
      {question === VIETNAMESE_QUESTIONS.length ? (
        <div className="mx-auto flex h-screen w-1/3 items-center py-12">
          <Card className="mx-auto my-auto flex h-full min-h-[240px] flex-col">
            <CardHeader>
              <CardTitle>Nhập thông tin cửa hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <TextField
                name={"name"}
                label={"Tên cửa hàng"}
                id={"create-shop-name"}
                type={"text"}
                value={name}
                onChange={setName}
              />

              <TextField
                name={"domain"}
                label={"Domain"}
                id={"create-shop-domain"}
                type={"text"}
                value={domain}
                onChange={setDomain}
              />
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="flex w-full justify-between">
                <Button asChild variant={"ghost"}>
                  <Link href={"/"}>Hủy</Link>
                </Button>

                <Button onClick={handleCreateShop}>Tạo</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="mx-auto h-screen w-2/3 bg-gray-50 py-12">
          <Card className="flex h-full flex-col">
            <CardHeader>
              <Progress className="mb-6" max={100} value={percentageComplete} />
              <CardTitle>{VIETNAMESE_QUESTIONS[question]?.question}</CardTitle>
              <CardDescription>
                {VIETNAMESE_QUESTIONS[question]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {question === 0 && (
                <RadioQuestions
                  id="onboarding-questions"
                  value={hasUsedPlatformBefore.toString()}
                  options={VIETNAMESE_QUESTIONS[question]?.options ?? []}
                  onValueChange={(value) => {
                    setHasUsedPlatformBefore(value === "true");
                  }}
                />
              )}

              {question === 1 && (
                <ThingToSellQuestion
                  onValueChange={setSelectedCategoryId}
                  categories={categories}
                  value={selectedCategoryId?.toString() ?? ""}
                  selectedThemeId={selectedThemeId ?? ""}
                  onThemeSelect={setSelectedThemeId}
                />
              )}

              {question === 2 && (
                <AddressForm
                  provinces={provinces}
                  addressInformation={addressInformation}
                  setAddressInformation={setAddressInformation}
                />
              )}
            </CardContent>
            <CardFooter className="mt-auto">
              <div className="ml-auto mt-auto flex gap-4">
                {question > 0 && (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      if (question > 0) {
                        setQuestion((prev) => prev - 1);
                      }
                    }}
                  >
                    Quay lại
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (question < VIETNAMESE_QUESTIONS.length) {
                      setQuestion((prev) => prev + 1);
                    }
                  }}
                >
                  Tiếp
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default OnboardingQuestions;
