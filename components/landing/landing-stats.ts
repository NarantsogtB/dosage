import { DRUGS } from "@/lib/data/drugs";
import { SOURCES } from "@/lib/data/sources/registry";
import { isVerified } from "@/lib/engine/rule/drug-evidence";

/**
 * Танилцуулга хуудсанд гарах бүх тоо ЭНДЭЭС гарна.
 *
 * Гараар бичсэн тоо эрт орой хэзээ нэгэн цагт өгөгдлөөс зөрнө. Тухайн
 * агшинд танилцуулга нь худал ярьж эхэлнэ — эмнэлгийн бүтээгдэхүүнд
 * энэ нь зөвшөөрөгдөхгүй.
 */
export const DRUG_COUNT = DRUGS.length;
export const VERIFIED_COUNT = DRUGS.filter(isVerified).length;
export const SOURCE_COUNT = Object.keys(SOURCES).length;
