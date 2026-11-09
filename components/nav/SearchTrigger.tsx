"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { openSearch } from "@/components/search/search-open";

/** «Эм хайх ⌘K» — desktop толгойд. Хайлтын palette-ыг нээнэ (бүх хуудсанд). */
export default function SearchTrigger() {
  return (
    <Button type="button" variant="outline" className="hidden h-11 gap-2.5 rounded-full md:inline-flex" onClick={() => openSearch()}>
      <Search aria-hidden className="text-muted-foreground" />
      <span className="text-muted-foreground">Эм хайх</span>
      <Kbd>⌘K</Kbd>
    </Button>
  );
}
