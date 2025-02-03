"use client";

import { useSearchParams } from "next/navigation";

export function useCategoryParam() {
  const searchParams = useSearchParams();
  return searchParams.get("category") as "good" | "bad";
}
