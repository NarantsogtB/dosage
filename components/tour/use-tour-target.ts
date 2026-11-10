"use client";

import { useEffect, useState } from "react";
import type { Box } from "./place-card";

const isShown = (el: Element): boolean => el.getClientRects().length > 0;

/**
 * `data-tour="<id>"`-тэй ХАРАГДАЖ буй сүүлийн элемент. Сүүлийнх — desktop dashboard-д
 * толгойн хайлтаас илүү гол баганын том хайлтын мөрийг, tablet-д hero-ийн товчийг сонгоно.
 */
export const findTarget = (id: string): HTMLElement | undefined =>
  Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${id}"]`)).filter(isShown).at(-1);

const toBox = (el: HTMLElement): Box => {
  const rect = el.getBoundingClientRect();
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
};

/** Алхмын элементийг харагдтал (аль хэдийн харагдаж байвал гүйлгэхгүй) гүйлгээд байрлалыг нь дагана (гүйлгэх, хэмжээ өөрчлөх). */
export const useTargetBox = (id: string): Box | null => {
  const [box, setBox] = useState<Box | null>(null);
  useEffect(() => {
    const el = findTarget(id);
    if (!el) return;
    el.scrollIntoView({ block: "nearest" });
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setBox(toBox(el)));
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [id]);
  return box;
};
