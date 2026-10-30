"use client";

import { useEffect } from "react";
import { FOCUS_SEARCH_EVENT, isSearchShortcut, requestSearchFocus } from "./search-focus";

/**
 * Хайлтын товчлол ба фокусын хүсэлтийг сонсоно. `onFocus` нь хураагдсан
 * жагсаалтыг дэлгээд оролтыг фокуслана.
 */
export const useSearchShortcut = (onFocus: () => void) => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!isSearchShortcut(event)) return;
      event.preventDefault();
      requestSearchFocus();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(FOCUS_SEARCH_EVENT, onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(FOCUS_SEARCH_EVENT, onFocus);
    };
  }, [onFocus]);
};
