/** Дэлгэц дээрх тэгш өнцөгт (viewport координат). */
export interface Box {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}

/** Зааврын картын байрлал — `style`-д шууд. `top` эсвэл `bottom`-ын нэг нь. */
export interface CardPlacement {
  readonly left: number;
  readonly width: number;
  readonly top?: number;
  readonly bottom?: number;
}

const EDGE = 16;
const GAP = 14;
const MAX_WIDTH = 360;
/** Картанд үлдээх хамгийн бага зай — өндөр элементийн доор/дээр дэлгэцээс гарахгүй. */
const MIN_ROOM = 220;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/** Элемент дэлгэцийн дээд хагаст бол карт доор нь, үгүй бол дээр нь. */
const vertical = (box: Box, vh: number): Pick<CardPlacement, "top" | "bottom"> =>
  box.top + box.height / 2 < vh / 2
    ? { top: clamp(box.top + box.height + GAP, EDGE, vh - MIN_ROOM) }
    : { bottom: clamp(vh - box.top + GAP, EDGE, vh - MIN_ROOM) };

/** Тодруулсан элементийн хажууд картыг байрлуулна: хэвтээ голлуулж, ирмэгээс 16px дотор. */
export const placeCard = (box: Box, vw: number, vh: number): CardPlacement => {
  const width = Math.min(MAX_WIDTH, vw - 2 * EDGE);
  const left = clamp(box.left + box.width / 2 - width / 2, EDGE, vw - EDGE - width);
  return { left, width, ...vertical(box, vh) };
};
