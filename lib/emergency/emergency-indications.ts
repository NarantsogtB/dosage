/**
 * `/emergency`-д харагдах заалтууд (Шат 7b). Эм ангиллаар биш ЗААЛТААР
 * сонгогдоно — ж.нь диазепамын таталтын дүрэм `cns` эмийн файлд байна.
 */
export const EMERGENCY_INDICATIONS: ReadonlySet<string> = new Set([
  "cardiac_arrest",
  "anaphylaxis",
  "status_epilepticus",
  "hypoglycaemia",
]);
