import type { DrugCategory } from "./category";
import type { DosingRule } from "./dosing-rule";
import type { Formulation } from "./formulation";
import type { SourceRef } from "./source";
import type { Warning } from "./warning";

export type DrugStatus = "active" | "draft" | "retired";

export interface Drug {
  readonly id: string;
  /** Олон улсын нэршил, латинаар. */
  readonly inn: string;
  /** Олон улсын нэршил, кириллээр. Хайлтад ашиглана. */
  readonly innMn: string;
  // ЗОРИУД ОРУУЛААГҮЙ: худалдааны нэр (brand).
  // Шалтгаан: эмнэлзүйн хэрэгсэл тодорхой үйлдвэрлэгчийг сурталчилж
  // байгаа мэт харагдах эрсдэлтэй. INN-ээр жор бичих нь WHO-ийн зөвлөмж.
  // Хэрэв цаашид хайлтад хэрэгтэй бол Drug дотор биш, ТУСДАА хайлтын
  // индекст (alias) байрлуулна — UI дээр харагдахгүй.
  readonly category: DrugCategory;
  readonly rules: readonly DosingRule[];
  readonly formulations: readonly Formulation[];
  readonly warnings: readonly Warning[];
  readonly contraindicationsMn: readonly string[];
  readonly notesMn?: string;
  readonly sources: readonly SourceRef[];
  /** ISO огноо. Хугацаа хэтэрвэл UI дээр анхааруулна. */
  readonly lastReviewed: string;
  readonly reviewedBy?: string;
  readonly status: DrugStatus;
}
