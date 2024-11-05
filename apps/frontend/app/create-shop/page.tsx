import { getProvinces } from "@repo/common/actions/address";
import { getTopLevelCategories } from "@repo/common/actions/categories";
import OnboardingQuestions from "./components/onboarding-questions";

const Page = async () => {
  const categories = await getTopLevelCategories();
  const provinces = await getProvinces();
  return <OnboardingQuestions categories={categories} provinces={provinces} />;
};

export default Page;
