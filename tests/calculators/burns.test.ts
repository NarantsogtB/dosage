import { describe, expect, it } from "vitest";
import type { AgeBand, BodyRegionId } from "@/lib/domain/body-region";
import { ageBandOf } from "@/lib/calculators/burns/age-band";
import { parkland } from "@/lib/calculators/burns/parkland";
import { totalBsaPercent } from "@/lib/calculators/burns/tbsa";
import { LUND_BROWDER, totalPercent } from "@/lib/data/burns/lund-browder";
import { REGION_LABELS } from "@/lib/data/burns/region-labels";
import {
  BACK_PART_REGION,
  FRONT_PART_REGION,
} from "@/components/burns/body-parts";

const BANDS: readonly AgeBand[] = ["infant", "y1", "y5", "y10", "y15", "adult"];

const ALL_REGIONS = Object.keys(LUND_BROWDER) as BodyRegionId[];

const HEAD_BY_BAND = BANDS.map((band) => LUND_BROWDER.head[band]);

const EVERY_REGION_BURNED = ALL_REGIONS.map((region) => ({
  region,
  depth: "full" as const,
  fraction: 1,
}));

const MAPPED_REGIONS = [
  ...Object.values(FRONT_PART_REGION),
  ...Object.values(BACK_PART_REGION),
];

const yearsToMonths = (years: number) => years * 12;

const headBurn = [{ region: "head", depth: "partial", fraction: 1 }] as const;

describe("Lund-Browder хүснэгт", () => {
  it.each(BANDS)("«%s» ангилалын нийлбэр яг 100%", (band) => {
    expect(totalPercent(band)).toBe(100);
  });

  it("бүх бүс 19 ширхэг", () => {
    expect(ALL_REGIONS).toHaveLength(19);
  });

  /*
   * Хэвлэлийн алдааны хамгаалалт. Нэг лавлахад B (гуяны тал)-ийн 10
   * насны утгыг 4½ гэж хэвлэсэн байсан — тэр тохиолдолд нийлбэр 101%
   * болно. Зөв нь 4¼ тул бүтэн гуя 8.5%.
   */
  it("гуя нь B × 2 — 10 насанд 8.5%, 9% БИШ", () => {
    expect(LUND_BROWDER.thigh_left.y10).toBe(8.5);
    expect(LUND_BROWDER.thigh_right.y10).toBe(8.5);
  });

  it("толгой нь наснаас хамаарч 19%-аас 7% хүртэл буурна", () => {
    expect(HEAD_BY_BAND).toEqual([19, 17, 13, 11, 9, 7]);
  });

  it("хүзүү, бэлэг эрхтэн, алга, хөл бүх насанд тогтмол", () => {
    for (const band of BANDS) {
      expect(LUND_BROWDER.neck[band]).toBe(2);
      expect(LUND_BROWDER.genitalia[band]).toBe(1);
      expect(LUND_BROWDER.hand_left[band]).toBe(2.5);
      expect(LUND_BROWDER.foot_right[band]).toBe(3.5);
    }
  });
});

describe("Насны ангилал", () => {
  it.each([
    [0, "infant"],
    [11, "infant"],
    [12, "y1"],
    [59, "y1"],
    [60, "y5"],
    [119, "y5"],
    [120, "y10"],
    [168, "y10"],
    [179, "y10"],
    [180, "y15"],
    [215, "y15"],
    [216, "adult"],
    [600, "adult"],
  ])("%i сартай → %s", (ageMonths, expected) => {
    expect(ageBandOf({ weightKg: 20, ageMonths })).toBe(expected);
  });
});

/*
 * ═══ РЕГРЕССИЙН ТЕСТ ═══
 *
 * Өмнө нь Естийн дүрмээр тооцоолж байсан: 15 хүртэлх БҮХ насыг нэг
 * «хүүхэд» багана (толгой 19% — нярайн харьцаа) руу хийдэг байв.
 * 14 настай хүүхдийн толгойг 19% гэж тооцож, Parkland-ын шингэнийг
 * 73%-иар хэтрүүлдэг байсан.
 */
describe("14 настай — өмнөх алдааны регресси", () => {
  const teen = { weightKg: 45, ageMonths: yearsToMonths(14) };

  it("14 нас нь y10 багана — infant БИШ", () => {
    expect(ageBandOf(teen)).toBe("y10");
  });

  it("толгой бүтэн түлэгдвэл 11%, 19% БИШ", () => {
    expect(totalBsaPercent(headBurn, ageBandOf(teen))).toBe(11);
  });

  it("Parkland: 1 980 мл, 3 420 мл БИШ", () => {
    const tbsa = totalBsaPercent(headBurn, ageBandOf(teen));
    expect(parkland(teen, tbsa).totalMl).toBe(1980);
  });

  it("15 нас нь y15 багана — шилжилт нэг жилээр тасрахгүй", () => {
    const fifteen = { weightKg: 50, ageMonths: yearsToMonths(15) };
    expect(ageBandOf(fifteen)).toBe("y15");
    expect(totalBsaPercent(headBurn, ageBandOf(fifteen))).toBe(9);
  });
});

describe("БНГТ% — насны хамаарал", () => {
  it("нярайн толгой 19%", () => {
    expect(totalBsaPercent(headBurn, "infant")).toBe(19);
  });

  it("насанд хүрэгчийн толгой 7%", () => {
    expect(totalBsaPercent(headBurn, "adult")).toBe(7);
  });

  it("бүх бүс сонгогдвол яг 100%", () => {
    for (const band of BANDS) {
      expect(totalBsaPercent(EVERY_REGION_BURNED, band)).toBe(100);
    }
  });
});

describe("БНГТ% — зэрэг ба хэсэгчилсэн талбай", () => {
  it("өнгөц түлэгдэлт тооцоололд ОРОХГҮЙ", () => {
    const burn = [
      { region: "head", depth: "superficial", fraction: 1 },
    ] as const;
    expect(totalBsaPercent(burn, "infant")).toBe(0);
  });

  it("бүсийн хэсэгчилсэн түлэгдэлт", () => {
    const burn = [
      { region: "trunk_anterior", depth: "full", fraction: 0.5 },
    ] as const;
    expect(totalBsaPercent(burn, "adult")).toBe(6.5);
  });

  it("хөвөгч цэгийн алдаа хуримтлагдахгүй", () => {
    const burn = [
      { region: "hand_left", depth: "full", fraction: 1 },
      { region: "hand_right", depth: "full", fraction: 1 },
      { region: "foot_left", depth: "full", fraction: 1 },
      { region: "buttock_left", depth: "full", fraction: 1 },
    ] as const;
    expect(totalBsaPercent(burn, "adult")).toBe(11);
  });
});

/*
 * Диаграм дээр сонгогдох боломжгүй бүс нь БНГТ%-ийг чимээгүйхэн дутуу
 * гаргана. Өмнө нь хүзүү, өгзөг, алга, хөл (нийт 19%) хаана ч байхгүй
 * байсан.
 */
describe("Диаграмын хамрах хүрээ", () => {
  it("бүс бүр диаграм дээр байрлана", () => {
    for (const region of ALL_REGIONS) {
      expect(MAPPED_REGIONS).toContain(region);
    }
  });

  it("бүс бүр ЯГ нэг талд — давхар тоологдох эрсдэлгүй", () => {
    expect(new Set(MAPPED_REGIONS).size).toBe(MAPPED_REGIONS.length);
    expect(MAPPED_REGIONS).toHaveLength(ALL_REGIONS.length);
  });

  it("бүс бүр монгол шошготой", () => {
    for (const region of ALL_REGIONS) {
      expect(REGION_LABELS[region]).toBeTruthy();
      expect(REGION_LABELS[region]).not.toBe(region);
    }
  });
});

describe("Parkland", () => {
  it("4 мл × кг × БНГТ%, хагасыг 8 цагт", () => {
    const result = parkland({ weightKg: 20, ageMonths: 60 }, 30);
    expect(result.totalMl).toBe(2400);
    expect(result.firstHalfMl).toBe(1200);
    expect(result.firstHalfRateMlPerHour).toBe(150);
    expect(result.secondHalfRateMlPerHour).toBe(75);
  });
});
