"use client";

import { useEffect } from "react";
import type { Choices } from "@/components/calculator/use-choices";
import { takePendingChoices } from "./pending-choices";

/** Түүхээс дахин нээсэн эмийн заалт, бэлдмэлийг НЭГ удаа хэрэглэнэ. */
export const useAppliedPendingChoices = ({ onIndication, onFormulation }: Choices): void => {
  useEffect(() => {
    takePendingChoices().forEach((item) => {
      if (item.indication) onIndication(item.drugId, item.indication);
      if (item.formulation) onFormulation(item.drugId, item.formulation);
    });
  }, [onIndication, onFormulation]);
};
