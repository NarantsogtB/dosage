import { describe, expect, it } from "vitest";
import { weightBucket } from "@/lib/analytics/weight-bucket";

describe("weightBucket", () => {
  it.each([
    [0.5, "<10"],
    [9.99, "<10"],
    [10, "10-20"],
    [19.9, "10-20"],
    [20, "20-40"],
    [40, "20-40"],
    [40.1, ">40"],
    [120, ">40"],
  ])("%s кг → %s", (kg, bucket) => {
    expect(weightBucket(kg)).toBe(bucket);
  });
});
