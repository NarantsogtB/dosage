import { describe, expect, it } from "vitest";
import { CALCULATOR_IDS, CALCULATOR_REGISTRY } from "@/lib/calculators/registry";
import { ROUTES } from "@/components/nav/routes";
import { SITE_ROUTES } from "@/lib/site";
import { CALCULATORS, parseEvent } from "@/lib/analytics/events";

const pathOf = (route: { path: string }) => route.path;
const hrefOf = (route: { href: string }) => route.href;
const shortOf = (route: { shortMn: string }) => route.shortMn;
const idOf = (entry: { id: string }) => entry.id;

describe("Тооцоолуурын бүртгэл (S3)", () => {
  it("nav нь бүртгэлийн дараалал, нэрээр", () => {
    expect(ROUTES.map(hrefOf)).toEqual(["/dose", "/burns", "/fluids", "/emergency"]);
    expect(ROUTES.map(shortOf)).toEqual(["Эмийн тун", "Түлэгдэлт", "Шингэн", "Яаралтай"]);
  });

  it("sitemap-ийн хуудсууд, эрэмбэ", () => {
    expect(SITE_ROUTES).toEqual([
      { path: "/", priority: 1 },
      { path: "/dose", priority: 0.9 },
      { path: "/burns", priority: 0.9 },
      { path: "/fluids", priority: 0.9 },
      { path: "/emergency", priority: 0.8 },
    ]);
  });

  it("analytics-ийн тооцоолуурын нэрс", () => {
    expect([...CALCULATORS]).toEqual(["dose", "burns", "fluids", "emergency"]);
    expect(CALCULATOR_IDS).toEqual(CALCULATOR_REGISTRY.map(idOf));
  });

  it("id, path давхардахгүй", () => {
    expect(new Set(CALCULATOR_IDS).size).toBe(CALCULATOR_REGISTRY.length);
    expect(new Set(CALCULATOR_REGISTRY.map(pathOf)).size).toBe(CALCULATOR_REGISTRY.length);
  });

  it("сервер бүртгэлийн нэрийг зөвшөөрч, бусдыг татгалзана", () => {
    const opened = (calculator: string) => ({
      name: "calculator_opened",
      calculator,
      mode: "browser",
    });
    expect(parseEvent(opened("burns"))).not.toBeNull();
    expect(parseEvent(opened("unknown"))).toBeNull();
  });
});
