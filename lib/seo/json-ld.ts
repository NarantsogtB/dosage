import type { Drug } from "../domain/drug";
import { findSource } from "../data/sources/get-source";
import { drugPath, drugPageTitle } from "../drug-page/drug-page-meta";
import { drugSources } from "../drug-page/drug-sources";
import { SITE_DESCRIPTION_MN, SITE_NAME, SITE_URL } from "../site";

/**
 * schema.org structured data (JSON-LD). Google-д хуудас ЮУНЫ тухай
 * болохыг (эм, эмнэлзүйн хуудас, эх сурвалж) машинаар уншигдахаар хэлнэ.
 *
 * ⚠️ Тун, тоон утга ЭНД ОРОХГҮЙ: Google эмчилгээний тунг rich result
 * болгодоггүй, контекстгүй тоо хайлтын үр дүнд гарвал эрсдэлтэй.
 */

type JsonLd = Record<string, unknown>;

const UNSET_REVIEW = "1970-01-01";

const absolute = (path: string): string => `${SITE_URL}${path}`;

const PUBLISHER: JsonLd = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

/** Нүүр хуудас: сайтын нэр, хэл. */
export const siteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION_MN,
  inLanguage: "mn",
  publisher: PUBLISHER,
});

const citationsOf = (drug: Drug): readonly string[] => [
  ...new Set(
    drugSources(drug)
      .map((ref) => findSource(ref.sourceId)?.citation)
      .filter((citation): citation is string => citation !== undefined),
  ),
];

/** Хянаагүй (1970-01-01) огноог Google-д зарлахгүй. */
const reviewOf = (drug: Drug): JsonLd =>
  drug.lastReviewed === UNSET_REVIEW ? {} : { lastReviewed: drug.lastReviewed };

const breadcrumb = (drug: Drug): JsonLd => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    ["Нүүр", "/"],
    ["Эмийн тун", "/dose"],
    [drug.innMn, drugPath(drug)],
  ].map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: absolute(path),
  })),
});

const medicalPage = (drug: Drug): JsonLd => ({
  "@type": "MedicalWebPage",
  "@id": absolute(drugPath(drug)),
  url: absolute(drugPath(drug)),
  name: drugPageTitle(drug),
  description: `${drug.innMn} (${drug.inn}) — хүүхдийн жинд суурилсан тун тооцоолох хуудас.`,
  inLanguage: "mn",
  audience: { "@type": "MedicalAudience", audienceType: "Clinician" },
  about: { "@type": "Drug", name: drug.innMn, nonProprietaryName: drug.inn },
  citation: citationsOf(drug),
  publisher: PUBLISHER,
  ...reviewOf(drug),
});

/** Эмийн хуудас: эмнэлзүйн хуудас + замын жагсаалт (breadcrumb). */
export const drugPageJsonLd = (drug: Drug): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": [medicalPage(drug), breadcrumb(drug)],
});

/** `<script>`-д аюулгүй: `<` → `<` (Next-ийн JSON-LD зөвлөмж, XSS). */
export const serializeJsonLd = (data: JsonLd): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");
