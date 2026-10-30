import type { InstallPlatform } from "../analytics/events";

/**
 * «Нүүр дэлгэцэд нэмэх» сануулга гаргах эсэхийн дүрэм. React-гүй.
 *
 * Зарчим: эмч аппын үнэ цэнийг ХАРСНЫ дараа л санал болгоно (анхны
 * амжилттай тооцоолол), нэг л удаа, зөвхөн утсан дээр, суулгаагүй үед.
 */
export interface PromptState {
  readonly platform?: InstallPlatform;
  /** Нүүр дэлгэцээс (standalone) нээгдсэн эсэх — тэгвэл аль хэдийн суусан. */
  readonly standalone: boolean;
  /** Өмнө нь «Суулгах» эсвэл «Хаах» дарсан эсэх. */
  readonly dismissed: boolean;
  readonly hasCalculated: boolean;
  /** Android: хөтөч `beforeinstallprompt` өгсөн эсэх. */
  readonly androidReady: boolean;
}

/** User-Agent-аас утасны платформ. Desktop бол undefined. */
export const platformOf = (userAgent: string): InstallPlatform | undefined =>
  /iphone|ipad|ipod/i.test(userAgent)
    ? "ios"
    : /android/i.test(userAgent)
      ? "android"
      : undefined;

const isEligible = (state: PromptState): boolean =>
  state.hasCalculated && !state.standalone && !state.dismissed;

/*
 * iOS-д суулгах API байхгүй тул заавар л харуулна — хөтөч бэлэн эсэхийг
 * хүлээх зүйлгүй. Android-д хөтөч суулгах боломжтойг зарлах хүртэл
 * (`beforeinstallprompt`) юу ч харуулахгүй: суулгаж болохгүй товч бүү.
 */
const isPlatformReady = (state: PromptState): boolean =>
  state.platform === "ios" || (state.platform === "android" && state.androidReady);

export const shouldPrompt = (state: PromptState): boolean =>
  isEligible(state) && isPlatformReady(state);
