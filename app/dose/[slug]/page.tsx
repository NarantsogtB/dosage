import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorPage from "@/components/calculator/CalculatorPage";
import DrugInfo from "@/components/drug-page/DrugInfo";
import DrugPageHeader from "@/components/drug-page/DrugPageHeader";
import { DRUG_BY_ID, DRUGS } from "@/lib/data/drugs";
import { drugPageMeta, drugSlug } from "@/lib/drug-page/drug-page-meta";

/** Статик экспорт: зөвхөн build үед үүссэн slug — бусад нь 404. */
export const dynamicParams = false;

export const generateStaticParams = () =>
  DRUGS.map((drug) => ({ slug: drugSlug(drug) }));

const drugOf = async (params: Promise<{ slug: string }>) => {
  const drug = DRUG_BY_ID.get((await params).slug);
  if (!drug) notFound();
  return drug;
};

export const generateMetadata = async ({
  params,
}: PageProps<"/dose/[slug]">): Promise<Metadata> =>
  drugPageMeta(await drugOf(params));

/**
 * Эм бүрийн хуудас — `/dose`-ийн тооцоолуур, тухайн эм урьдчилан
 * сонгогдсон, доор нь эх сурвалжтай статик мэдээлэл.
 */
export default async function DrugPage({ params }: PageProps<"/dose/[slug]">) {
  const drug = await drugOf(params);
  return (
    <CalculatorPage
      initialDrugIds={[drug.id]}
      intro={<DrugPageHeader drug={drug} />}
    >
      <DrugInfo drug={drug} />
    </CalculatorPage>
  );
}
