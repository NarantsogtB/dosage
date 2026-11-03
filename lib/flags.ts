/**
 * V3 дизайны эмнэлзүйн/хуулийн хяналт шаардсан хэсгүүд.
 *
 * Static export тул build үед л уншигдана (`NEXT_PUBLIC_*`). Анхдагч нь
 * УНТРААЛТТАЙ — хяналт дуусахаас өмнө production-д өөрчлөгдөхгүй:
 *
 *   collapsedDisclaimer — анхааруулгын 2-р догол мөрийг нугалах (текст ижил)
 *   mlFocal             — мл-ийг мг-ийн хажууд primary өнгөтэй том тоо болгох
 *   rxFormulation       — жорын мөрөнд сонгосон хэлбэр, мл нэмэх
 *
 * `process.env.NEXT_PUBLIC_…`-г ШУУД бичих ёстой: Next зөвхөн тэр хэлбэрийг
 * build үед орлуулна.
 */
const on = (value: string | undefined): boolean =>
  value === "1" || value === "true";

export const FLAGS = {
  collapsedDisclaimer: on(process.env.NEXT_PUBLIC_V3_COLLAPSED_DISCLAIMER),
  mlFocal: on(process.env.NEXT_PUBLIC_V3_ML_FOCAL),
  rxFormulation: on(process.env.NEXT_PUBLIC_V3_RX_FORMULATION),
} as const;
