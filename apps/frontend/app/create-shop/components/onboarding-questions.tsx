"use client";
import { createShop, getShopByDomain } from "@repo/common/actions/shops";
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
import { useEffect, useMemo, useState } from "react";
import AddressForm from "./address-form";
import RadioQuestions from "./radio-question";
import ThingToSellQuestion from "./thing-to-sell-question";
import { Province } from "@repo/common/interfaces/address";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

const checkDomain = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 2000);
  });
};

const shopInformationForm = z.object({
  name: z.string().min(1, "Vui lòng nhập trường này"),
  domain: z.string().min(1, "Vui lòng nhập trường này"),
});

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

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center flex-col gap-6">
      <p>Cửa hàng của bạn đang được tạo, vui lòng đợi!</p>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

const OnboardingQuestions = ({
  categories,
  provinces,
}: IOnboardingQuestionsProps) => {
  const [question, setQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [hasUsedPlatformBefore, setHasUsedPlatformBefore] = useState(false);
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
  const router = useRouter();

  const form = useForm<z.infer<typeof shopInformationForm>>({
    resolver: zodResolver(shopInformationForm),
    defaultValues: {
      name: "",
      domain: "",
    },
  });
  const domainValue = form.watch("domain");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof shopInformationForm>) {
    const data = {
      name: values.name,
      domain: values.domain,
      themeId: selectedThemeId!,
      mainCategoryIdToSell: selectedCategoryId!,
      hasUsedPlatformBefore,
      ...addressInformation,
    };
    // console.log({ data });
    const foundShop = await getShopByDomain(values.domain);

    if (foundShop) {
      form.setError("domain", {
        type: "manual",
        message: "Domain đã tồn tại",
      });
      return;
    }
    setLoading(true);
    const res = await createShop(data);
    setLoading(false);
    router.push(`/dashboard`);
    console.log({ res });
  }

  return (
    <>
      {question === VIETNAMESE_QUESTIONS.length ? (
        <div className="mx-auto flex h-screen w-1/3 items-center py-12">
          <Form {...form}>
            <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="mx-auto my-auto flex h-full min-h-[240px] flex-col">
                <CardHeader>
                  <CardTitle>Nhập thông tin cửa hàng của bạn</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* <TextField
                    name={"name"}
                    label={"Tên cửa hàng"}
                    id={"create-shop-name"}
                    type={"text"}
                    value={name}
                    onChange={setName}
                  /> */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên cửa hàng</FormLabel>
                        <FormControl>
                          <Input placeholder="Tên cửa hàng" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input placeholder="Domain" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <TextField
                    name={"domain"}
                    label={"Domain"}
                    id={"create-shop-domain"}
                    type={"text"}
                    value={domain}
                    onChange={setDomain}
                  /> */}
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="flex w-full justify-between">
                    <Button type="button" asChild variant={"ghost"}>
                      <Link href={"/"}>Hủy</Link>
                    </Button>

                    <Button>Tạo</Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
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
            <CardContent className="h-full">
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
                  onSubmitCallback={() => {
                    setQuestion((prev) => prev + 1);
                  }}
                  onBack={() => {
                    setQuestion((prev) => prev - 1);
                  }}
                />
              )}
            </CardContent>
            {question !== 2 && (
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
            )}
          </Card>
        </div>
      )}

      {loading && <LoadingOverlay />}
    </>
  );
};

export default OnboardingQuestions;
