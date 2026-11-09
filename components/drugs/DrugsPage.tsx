"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openSearch } from "@/components/search/search-open";
import CategoryCards from "./CategoryCards";
import FavoriteDrugs from "./FavoriteDrugs";

/** «Эмүүд» таб (V4, Figma 123:263): Миний эмүүд + ангиллын картууд. */
export default function DrugsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 lg:max-w-[1440px] lg:px-20">
      <div className="from-tile/30 -mx-4 flex items-end justify-between bg-linear-to-b to-transparent px-4 pt-6 pb-4 sm:-mx-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight">Эмүүд</h1>
        <Button type="button" variant="secondary" size="icon" aria-label="Эм хайх" onClick={() => openSearch()}>
          <Search aria-hidden />
        </Button>
      </div>
      <FavoriteDrugs />
      <CategoryCards />
    </main>
  );
}
