import { describe, expect, it } from "vitest";
import { activeTab } from "@/components/nav/active-route";

const labelOf = (pathname: string): string | undefined => activeTab(pathname)?.labelMn;

describe("activeTab", () => {
  it("тооцоолуурууд «Нүүр»-ийн дор", () => {
    expect(labelOf("/dose")).toBe("Нүүр");
    expect(labelOf("/burns")).toBe("Нүүр");
    expect(labelOf("/fluids")).toBe("Нүүр");
    expect(labelOf("/emergency")).toBe("Нүүр");
  });

  it("эмийн хуудас «Эмүүд»-ийн дор", () => {
    expect(labelOf("/dose/amoxicillin")).toBe("Эмүүд");
    expect(labelOf("/drugs")).toBe("Эмүүд");
  });

  it("Тохиргоо, Түүх «Тохиргоо»-ийн дор", () => {
    expect(labelOf("/settings")).toBe("Тохиргоо");
    expect(labelOf("/history")).toBe("Тохиргоо");
  });

  it("landing-д таб байхгүй", () => {
    expect(activeTab("/")).toBeUndefined();
  });
});
