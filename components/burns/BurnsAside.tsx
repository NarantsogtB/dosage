import type { ReactNode } from "react";
import { ChartColumn, Droplet, Info, type LucideIcon } from "lucide-react";
import type { AgeBand } from "@/lib/domain/body-region";
import type { Patient } from "@/lib/domain/patient";
import { AGE_BAND_LABELS } from "@/lib/data/burns/region-labels";
import HeroChip from "@/components/v4/HeroChip";
import BigValue from "@/components/v4/BigValue";
import { mlValue } from "./burn-format";
import { galvestonData, parklandData, type FormulaData } from "./burn-formulas";
import { IvyWarning } from "./FormulaCard";
import HeightInput from "./HeightInput";
import { urineData } from "./UrineTargetCard";
import { SEVERE_TBSA, tbsaText } from "./tbsa-hero";

/** Desktop aside-ийн карт (Figma 140:1839): bg-sheet, r 24, p 18, g 10; дүрс 18 + гарчиг 15 SemiBold. */
const Box = ({ icon: Icon, title, children }: { readonly icon: LucideIcon; readonly title: string; readonly children: ReactNode }) => (
  <section aria-label={title} className="bg-sheet flex flex-col gap-2.5 rounded-3xl p-[18px]">
    <h2 className="flex items-center gap-2 text-[15px]/[19px] font-semibold"><Icon aria-hidden className="text-primary size-[18px]" />{title}</h2>
    {children}
  </section>
);

const Line = ({ label, volume, rate }: { readonly label: string; readonly volume?: string; readonly rate: ReactNode }) => (
  <p className="flex items-baseline gap-2 text-sm/[18px]">
    <span className="text-muted-foreground flex-1 text-[13px]/[17px]">{label}</span>
    {volume ? <span className="num font-semibold">{volume}</span> : null}
    <span className="num font-semibold">{rate}</span>
  </p>
);

const short = (rate: string): string => rate.replace("мл/цаг", "мл/ц");

const Formula = ({ data }: { readonly data: FormulaData }) => (
  <Box icon={Droplet} title={data.title}>
    <p className="text-muted-foreground text-xs/[15px]">{data.sub}</p>
    <BigValue size="compact" value={mlValue(data.totalMl)} unit="мл / 24 ц" />
    {data.rows.map((row) => <Line key={row.label} label={row.label} volume={row.volume} rate={<span className="text-primary">{short(row.rate)}</span>} />)}
    <IvyWarning limit={data.ivyLimit} />
  </Box>
);

/** БГТ gradient карт (Figma 140:1839 «TBSA»). */
const Tbsa = ({ tbsa, band }: { readonly tbsa: number; readonly band: AgeBand }) => (
  <section aria-label="Биеийн нийт гадаргуугийн талбай" className="from-tile to-hero-top flex flex-col gap-2 rounded-3xl bg-linear-to-r px-5 py-[18px]">
    <p className="text-[13px]/[17px] font-medium">БГТ · Lund-Browder {AGE_BAND_LABELS[band]}</p>
    <BigValue size="large" value={tbsaText(tbsa)} unit="%" />
    {tbsa >= SEVERE_TBSA ? <span><HeroChip tone="warning">≥10% — хүнд, шингэн сэлбэнэ</HeroChip></span> : null}
  </section>
);

interface Props {
  readonly patient: Patient;
  readonly tbsa: number;
  readonly band: AgeBand;
  readonly height: string;
  readonly onHeight: (value: string) => void;
}

const Galveston = ({ patient, tbsa, height, onHeight }: Omit<Props, "band">) => {
  const data = galvestonData(patient, tbsa);
  return (
    <>
      {data ? <Formula data={data} /> : <Box icon={Droplet} title="Гальвестон (хүүхдэд)"><p className="text-muted-foreground text-xs/[15px]">Өндөр оруулбал тооцоолно — өндөргүйгээр таамаглахгүй.</p></Box>}
      <HeightInput value={height} onChange={onHeight} />
    </>
  );
};

const Urine = ({ patient }: { readonly patient: Patient }) => {
  const data = urineData(patient);
  return (
    <Box icon={ChartColumn} title="Шээсний гарцын зорилт">
      <Line label={data.targetLabel} rate={<span className="text-primary font-bold">{data.target} мл/ц</span>} />
      <Line label={`Олигури ${data.oliguriaLabel}`} rate={<span className="text-destructive font-bold">{data.oliguria} мл/ц</span>} />
    </Box>
  );
};

/** Desktop баруун багана 288 (Figma 140:1839). Үр дүн БГТ > 0 үед л. */
export default function BurnsAside(props: Props) {
  if (props.tbsa <= 0) return <Box icon={Info} title="Бүс сонгоно уу"><p className="text-muted-foreground text-xs/[15px]">I зэргийн түлэгдэлт талбайд тооцогдохгүй.</p></Box>;
  return (
    <>
      <Tbsa tbsa={props.tbsa} band={props.band} />
      <Formula data={parklandData(props.patient, props.tbsa)} />
      <Galveston {...props} />
      <Urine patient={props.patient} />
    </>
  );
}
