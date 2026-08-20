/** Тооцооллын оролт болох өвчтөний төлөв. */
export interface Patient {
  readonly weightKg: number;
  readonly ageMonths: number;
  /**
   * Өндөр, сантиметрээр. СОНГОМОЛ.
   *
   * Эмийн тунд хэрэггүй. Биеийн гадаргуугийн талбай (БГТ) шаардах
   * тооцоололд л хэрэгтэй — Гальвестоны шингэн сэлбэлт г.м.
   */
  readonly heightCm?: number;
}
