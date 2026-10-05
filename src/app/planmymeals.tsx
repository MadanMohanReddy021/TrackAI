import { useRouter } from "expo-router";

import type { MealSectionCode } from "../screens/PlanMyMeals";
import PlanMyMeals from "../screens/PlanMyMeals";

export default function PlanMyMealsRoute() {
  const router = useRouter();

  const openMealPlan = (sectionCode: MealSectionCode) => {
    router.push({
      pathname: "/mealplan",
      params: { sectionCode },
    });
  };

  return (
    <PlanMyMeals onBack={() => router.back()} onSelectSection={openMealPlan} />
  );
}
