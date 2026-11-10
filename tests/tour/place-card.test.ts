import { describe, expect, it } from "vitest";
import { placeCard } from "@/components/tour/place-card";
import { TOUR_STEPS, type TourStep } from "@/components/tour/tour-steps";

const VW = 390;
const VH = 844;

describe("placeCard", () => {
  it("дээд хагаст байгаа элементийн ДООР байрлана", () => {
    const place = placeCard({ top: 100, left: 16, width: 358, height: 120 }, VW, VH);
    expect(place.top).toBe(100 + 120 + 14);
    expect(place.bottom).toBeUndefined();
  });

  it("доод хагаст (доод навигац) байгаа элементийн ДЭЭР байрлана", () => {
    const place = placeCard({ top: 750, left: 16, width: 358, height: 72 }, VW, VH);
    expect(place.bottom).toBe(VH - 750 + 14);
    expect(place.top).toBeUndefined();
  });

  it("дэлгэцийн ирмэгээс 16px дотор, mobile-д өргөн 358", () => {
    const right = placeCard({ top: 10, left: 340, width: 44, height: 44 }, VW, VH);
    expect(right.width).toBe(VW - 32);
    expect(right.left).toBe(16);
    const wide = placeCard({ top: 10, left: 1300, width: 44, height: 44 }, 1440, 900);
    expect(wide.width).toBe(360);
    expect(wide.left + wide.width).toBeLessThanOrEqual(1440 - 16);
  });

  it("өндөр элементийн доор ч карт дэлгэцээс гарахгүй", () => {
    const place = placeCard({ top: 20, left: 0, width: 390, height: 700 }, VW, VH);
    expect(place.top).toBeLessThanOrEqual(VH - 220);
  });
});

const targetOf = (step: TourStep) => step.target;
const hasText = (step: TourStep) => step.title.length > 0 && step.body.length > 0;

describe("TOUR_STEPS", () => {
  it("target давхардахгүй, текст хоосон биш", () => {
    const targets = TOUR_STEPS.map(targetOf);
    expect(new Set(targets).size).toBe(targets.length);
    expect(TOUR_STEPS.every(hasText)).toBe(true);
  });
});
