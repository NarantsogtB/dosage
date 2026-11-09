import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/data/drugs";
import { MAX_FAVORITES, parseFavorites, toggleFavorite } from "@/lib/recent/favorite-drugs";

const ids = DRUGS.map((drug) => drug.id);
const [a, b, c] = ids;

describe("toggleFavorite", () => {
  it("нэмнэ, дахин дарахад хасна", () => {
    expect(toggleFavorite([a], b)).toEqual([a, b]);
    expect(toggleFavorite([a, b], a)).toEqual([b]);
  });

  it("дүүрсэн үед шинийг нэмэхгүй, хасахыг зөвшөөрнө", () => {
    const full = ids.slice(0, MAX_FAVORITES);
    expect(toggleFavorite(full, ids[MAX_FAVORITES]!)).toEqual(full);
    expect(toggleFavorite(full, full[0]!)).toHaveLength(MAX_FAVORITES - 1);
  });
});

describe("parseFavorites", () => {
  it("зөв утгыг сэргээнэ", () => {
    expect(parseFavorites(JSON.stringify([a, b]))).toEqual([a, b]);
  });

  it("эвдэрсэн, null, тоо биш, үл мэдэгдэх id, давхардлыг хаяна", () => {
    expect(parseFavorites(null)).toEqual([]);
    expect(parseFavorites("{не json")).toEqual([]);
    expect(parseFavorites(JSON.stringify({ a: 1 }))).toEqual([]);
    expect(parseFavorites(JSON.stringify([a, "zzz", 5, a, c]))).toEqual([a, c]);
  });
});
