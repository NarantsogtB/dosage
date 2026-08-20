import type { EvidenceLevel } from "@/lib/domain/source";

/**
 * Нотолгооны түвшний ГАНЦ өнгөний эх сурвалж.
 *
 * Цэг (жагсаалт), зураас (тунгийн зурвас), Badge (карт) гурав ижил өнгө
 * харуулах ёстой. Гурван газарт тусад нь бичвэл эрт орой хэзээ нэгэн цагт
 * зөрөх бөгөөд тэр үед эмч «ногоон» гэж хараад «баталгаагүй» гэж
 * ойлгохгүй өнгөрнө.
 *
 * ⚠️ Өнгө ХЭЗЭЭ Ч ганцаараа утга дамжуулахгүй. Хэрэглэх газар бүрд
 * EVIDENCE_LABELS-ийн текст ХАМТ харагдана.
 */
interface Tone {
  /** Цэгний дүүргэлт */
  readonly dot: string;
  /** Тунгийн зурвасын зүүн зураас */
  readonly rule: string;
}

export const EVIDENCE_TONES: Record<EvidenceLevel, Tone> = {
  A_mn_approved: { dot: "bg-evidence-a", rule: "bg-evidence-a" },
  B_who: { dot: "bg-evidence-b", rule: "bg-evidence-b" },
  C_international: { dot: "bg-evidence-c", rule: "bg-evidence-c" },
  D_label_only: { dot: "bg-evidence-d", rule: "bg-evidence-d" },
  E_unverified: { dot: "bg-evidence-e", rule: "bg-evidence-e" },
};

/**
 * Түвшний ганц үсэг — Figma "Evidence badge" (node 12:91): "Цэг нь
 * ЗӨВХӨН цэгэнд; түвшний үсэг ба тайлбар нь ҮРГЭЛЖ бичигдэнэ." Өнгө
 * ялгах чадваргүй эмчид ч цэг дангаараа ажиллахгүй тул үсгийг хэзээ ч
 * дот-той тусад нь бичихгүй.
 */
export const EVIDENCE_LETTERS: Record<EvidenceLevel, string> = {
  A_mn_approved: "A",
  B_who: "B",
  C_international: "C",
  D_label_only: "D",
  E_unverified: "E",
};
