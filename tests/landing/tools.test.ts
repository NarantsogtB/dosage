import { describe, expect, it } from "vitest";
import { TOOLS } from "@/components/landing/tools";
import { CALCULATOR_REGISTRY } from "@/lib/calculators/registry";

const TOOL_HREFS = TOOLS.map((tool) => tool.href);
const REGISTRY_PATHS = CALCULATOR_REGISTRY.map((entry) => entry.path);

/**
 * 9i: landing өмнө нь 3 хэрэгслийг гараар жагсааж, «Яаралтай тусламж»-ийг орхисон байв.
 * Одоо бүртгэлээс үүснэ — шинэ тооцоолуур нэмэхэд landing автоматаар дагана.
 */
describe("Landing хэрэгслүүд", () => {
  it("бүртгэлийн БҮХ тооцоолуурыг ижил дарааллаар харуулна", () => {
    expect(TOOL_HREFS).toEqual(REGISTRY_PATHS);
  });

  it("яаралтай тусламж багтсан", () => {
    expect(TOOL_HREFS).toContain("/emergency");
  });
});
