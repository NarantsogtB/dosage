"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { requestSearchFocus } from "@/components/search/search-focus";
import { isActive } from "./active-route";

const Content = () => (
  <>
    <Search aria-hidden className="text-muted-foreground" />
    <span className="text-muted-foreground">Эм хайх</span>
    <Kbd>/</Kbd>
  </>
);

const CLASS = "hidden h-11 gap-2.5 md:inline-flex";

/**
 * «Эм хайх /» — desktop толгойд (Figma "App header", V3 · 03).
 *
 * Тооцоолуур дээр хайлтыг фокуслана (`/` ба ⌘K-тэй ижил); бусад хуудаснаас
 * `/dose` руу аваачна.
 */
export default function SearchTrigger() {
  const onDose = isActive(usePathname(), "/dose");
  if (!onDose) {
    return (
      <Button asChild variant="outline" className={CLASS}>
        <Link href="/dose"><Content /></Link>
      </Button>
    );
  }
  return (
    <Button type="button" variant="outline" className={CLASS} onClick={requestSearchFocus}>
      <Content />
    </Button>
  );
}
