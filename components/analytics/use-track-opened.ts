"use client";

import { useEffect } from "react";
import type { CalculatorName } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

/** Тооцоолуур нээгдсэнийг нэг удаа тэмдэглэнэ. */
export const useTrackOpened = (calculator: CalculatorName): void => {
  useEffect(() => {
    track({ name: "calculator_opened", calculator });
  }, [calculator]);
};
