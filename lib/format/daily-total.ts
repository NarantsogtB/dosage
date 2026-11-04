import type { FrequencyCode } from "../domain/frequency";

/**
 * «Өдрийн нийт» харуулах эсэх. Нэг удаагийн (`stat`, давтаж болох) тунд
 * өдрийн нийт утгагүй — давталтын тоо эмнэлзүйн байдлаас хамаарна.
 */
export const showsDailyTotal = (frequency: FrequencyCode): boolean => frequency !== "stat";
