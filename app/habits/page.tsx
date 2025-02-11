"use client";

import { Suspense } from "react";
import { HabitCategoryPage } from "@/components/habits-category";
import { useCategoryParam } from "./SearchParamsHandler"; // ✅ Import custom hook

function CategoryLoader() {
  const category = useCategoryParam(); // ✅ Fetch category from URL query
  return <HabitCategoryPage category={category} />;
}

export default function HabitsPage() {
  return (
    <Suspense fallback={<div>Loading habits...</div>}>
      <CategoryLoader />
    </Suspense>
  );
}
