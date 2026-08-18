/** Хайлтад ашиглах хэлбэрт шилжүүлнэ: жижиг үсэг, илүү зайгүй. */
export const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");
