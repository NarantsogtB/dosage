/** Хязгаарлалт нэг удаагийн тунд эсвэл өдрийн нийт тунд үйлчлэх эсэх. */
export type CapScope = "per_dose" | "per_day";

/** Тогтмол миллиграммаар илэрхийлсэн хязгаар. */
export interface AbsoluteCap {
  readonly kind: "absolute";
  readonly scope: CapScope;
  readonly maxMg: number;
}

/** Жинд суурилсан хязгаар (жишээ: domperidone 0.75 мг/кг/өдөр). */
export interface PerKgCap {
  readonly kind: "per_kg";
  readonly scope: CapScope;
  readonly maxMgPerKg: number;
}

/**
 * Бүх дээд хязгаарыг ӨГӨГДЛӨӨР илэрхийлнэ.
 * Engine дотор эмийн id-гаар салаалсан нөхцөл бичихийг хориглоно.
 */
export type DoseCap = AbsoluteCap | PerKgCap;
