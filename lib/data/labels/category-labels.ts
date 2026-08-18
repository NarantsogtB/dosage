import type { DrugCategory } from "../../domain/category";

export const CATEGORY_LABELS: Record<DrugCategory, string> = {
  analgesic: "Өвдөлт намдаагч",
  antibiotic: "Антибиотик",
  antihistamine: "Антигистамин",
  corticosteroid: "Кортикостероид",
  antiemetic: "Бөөлжилт намдаах",
  gi: "Ходоод гэдэс",
  respiratory: "Амьсгалын зам",
  antifungal: "Мөөгөнцрийн эсрэг",
  antiviral: "Вирусын эсрэг",
  diuretic: "Шээс хөөх",
  cns: "Мэдрэлийн систем",
  iron: "Төмрийн нэмэлт",
  antiparasitic: "Шимэгчийн эсрэг",
  antitb: "Сүрьеэгийн эсрэг",
  mucolytic: "Цэр наниартах",
  antihypertensive: "Цусны даралт",
  anticonvulsant: "Таталтын эсрэг",
  vitamin: "Витамин ба нэмэлт",
  emergency: "Яаралтай тусламж",
};
