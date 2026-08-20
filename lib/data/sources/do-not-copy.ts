/**
 * Эдгээрээс тунгийн хүснэгт хуулах нь зохиогчийн эрхийн зөрчил.
 * Зөвхөн өөрсдийн тоог баталгаажуулахад ашиглана.
 */
export const DO_NOT_COPY = [
  "BNF for Children (BNFc) — төлбөртэй, NICE/RPS-ийн зохиогчийн эрхтэй",
  "Nelson Textbook of Pediatrics — Elsevier",
  "The Harriet Lane Handbook — Elsevier",
  "UpToDate / Lexicomp — Wolters Kluwer, захиалгат",
  "eTG complete (Australia) — захиалгат",
  "Micromedex — Merative, захиалгат",
  "dokumen.pub, libgen, Sci-Hub зэрэг shadow library-ээс татсан ном — " +
    "эх хэвлэлийн зохиогчийн эрх хэвээр. Springer-ийн Handbook of Burns-ийг " +
    "тэндээс авч ашиглахгүй; оронд нь түүнийг иш татсан хууль ёсны " +
    "эх сурвалжаар (mn-burns-2015) дамжуулан ишлэнэ.",
] as const;
