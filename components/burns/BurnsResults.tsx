import type { Patient } from "@/lib/domain/patient";
import type { AgeBand } from "@/lib/domain/body-region";
import GalvestonCard from "./GalvestonCard";
import ParklandCard from "./ParklandCard";
import TbsaSummary from "./TbsaSummary";
import UrineTargetCard from "./UrineTargetCard";

interface Props {
  readonly patient: Patient;
  readonly tbsaPercent: number;
  readonly band: AgeBand;
}

const Empty = () => (
  <p className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
    Түлэгдсэн бүсээ сонгоно уу. I зэргийн түлэгдэлт талбайд тооцогдохгүй.
  </p>
);

/** Түлэгдэлтийн бүх үр дүн. */
export default function BurnsResults(props: Props) {
  const { patient, tbsaPercent, band } = props;
  if (tbsaPercent <= 0) return <Empty />;

  return (
    <div className="space-y-4">
      <TbsaSummary tbsaPercent={tbsaPercent} band={band} />
      <ParklandCard patient={patient} tbsaPercent={tbsaPercent} />
      <GalvestonCard patient={patient} tbsaPercent={tbsaPercent} />
      <UrineTargetCard patient={patient} />
    </div>
  );
}
