import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind ангиудыг нэгтгэж, зөрчилдөх ангиудыг цэгцэлнэ. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
