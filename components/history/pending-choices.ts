/**
 * Түүхээс дахин нээхэд заалт/бэлдмэлийг `/dose` руу дамжуулна. Хуваалцах линкийн
 * (`#…`) оронд санах ой: линкийн сэргээлт «өөр хүн бэлдсэн — жинг шалгана уу»
 * гэж анхааруулдаг, харин энэ нь эмчийн ӨӨРИЙН өмнөх тооцоо. SPA шилжилтэд
 * модулийн төлөв хадгалагдана; `useAppliedPendingChoices` нэг удаа авна.
 */
export interface PendingChoice {
  readonly drugId: string;
  readonly indication?: string;
  readonly formulation?: string;
}

let pending: readonly PendingChoice[] = [];

export const queueChoices = (items: readonly PendingChoice[]): void => {
  pending = items;
};

export const takePendingChoices = (): readonly PendingChoice[] => {
  const items = pending;
  pending = [];
  return items;
};
