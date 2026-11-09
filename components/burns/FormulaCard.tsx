import { Droplet } from "lucide-react";
import BigValue from "@/components/v4/BigValue";
import ResultCard from "@/components/v4/ResultCard";
import ValueTile, { TileGrid } from "@/components/v4/ValueTile";
import { mlValue } from "./burn-format";
import type { FormulaData } from "./burn-formulas";

/** Ivy хязгаар давсан — дэлгэцийн цорын ганц danger. */
export const IvyWarning = ({ limit }: { readonly limit?: string }) =>
  limit ? (
    <p role="alert" className="border-destructive/35 bg-destructive/10 text-destructive rounded-[18px] border px-3.5 py-3 text-xs/[15px]">
      Тооцоолсон эзэлхүүн 24 цагийн дээд хязгаар ({limit})-ыг давлаа. Хэвлийн хөндийн даралт ихсэх эрсдэлтэй — эмнэлзүйн дахин үнэлгээ хийнэ.
    </p>
  ) : null;

/** Mobile томьёоны карт (Figma 138:1651): толгой · 40 том тоо · 2 tile (мл + хурд). */
export default function FormulaCard({ data, children }: { readonly data: FormulaData; readonly children?: React.ReactNode }) {
  return (
    <ResultCard icon={Droplet} title={data.title} sub={data.sub}>
      <BigValue value={mlValue(data.totalMl)} unit="мл / 24 цаг" />
      <TileGrid>
        {data.rows.map((row) => <ValueTile key={row.label} label={row.label} value={row.volume} rate={row.rate} />)}
      </TileGrid>
      <IvyWarning limit={data.ivyLimit} />
      {children}
    </ResultCard>
  );
}
