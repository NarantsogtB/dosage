"use client";

import { useMemo } from "react";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Patient } from "@/lib/domain/patient";
import { calcEvents } from "@/lib/analytics/builders";
import { weightBucket } from "@/lib/analytics/weight-bucket";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import { useTrackSettled } from "@/components/analytics/use-track-settled";

interface Input {
  readonly patient: Patient;
  readonly hasWeight: boolean;
  readonly results: ReadonlyMap<string, CalculationResult>;
}

const WEIGHT_SETTLE_MS = 1000;
const CALC_SETTLE_MS = 1500;

const NONE: readonly AnalyticsEvent[] = [];

/**
 * Тунгийн тооцоолуурын analytics: нээлт, жин (зөвхөн bucket),
 * амжилттай тооцоолол. `results` нь зөвхөн бүх оролт хүчинтэй үед
 * дүүрдэг тул тусдаа `ready` шалгах шаардлагагүй.
 */
export const useCalculatorTracking = ({ patient, hasWeight, results }: Input) => {
  const bucket = weightBucket(patient.weightKg);

  const weight = useMemo<readonly AnalyticsEvent[]>(
    () => (hasWeight ? [{ name: "weight_entered", bucket }] : NONE),
    [hasWeight, bucket],
  );
  const calcs = useMemo(() => calcEvents(results, bucket), [results, bucket]);

  useTrackOpened("dose");
  useTrackSettled(weight, WEIGHT_SETTLE_MS);
  useTrackSettled(calcs, CALC_SETTLE_MS);
};
