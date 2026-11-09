"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isSearchShortcut } from "./search-focus";
import { OPEN_SEARCH_EVENT, openSearch, type OpenSearchDetail, type SearchMode } from "./search-open";
import type { DrugCategory } from "@/lib/domain/category";

/** Эмийн өгөгдөл (`DRUGS`) нүүр хуудасны bundle-д орохгүй — анх нээхэд л ачаална. */
const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });

interface State {
  readonly mode: SearchMode;
  readonly category?: DrugCategory;
}

const stateOf = (event: Event): State => {
  const detail: OpenSearchDetail = (event as CustomEvent<OpenSearchDetail>).detail ?? {};
  return { mode: detail.mode ?? "pick", category: detail.category };
};

/** Layout-д нэг удаа: `openSearch()` event, `/` болон ⌘K товчлолыг сонсож хайлтыг (mobile бүтэн дэлгэц, desktop palette) нээнэ. */
export default function SearchOverlayHost() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const onOpen = (event: Event) => setState(stateOf(event));
    const onKey = (event: KeyboardEvent) => {
      if (!isSearchShortcut(event)) return;
      event.preventDefault();
      openSearch();
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (state === null) return null;
  return <SearchOverlay open mode={state.mode} category={state.category} onClose={() => setState(null)} />;
}
