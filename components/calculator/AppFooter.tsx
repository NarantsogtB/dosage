import { DRUGS } from "@/lib/data/drugs";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Separator } from "@/components/ui/separator";

const FEEDBACK_URL = "https://www.instagram.com/natso_010/";

const verifiedCount = DRUGS.filter(isVerified).length;

/** Доод талын мэдээлэл, баталгаажуулалтын явц, санал хүсэлт. */
export default function AppFooter() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-3 pt-2 text-xs sm:flex-row print:hidden">
      <p>
        <span className="num">{DRUGS.length}</span> эм · Олон улсын нэршил
        (INN) ·{" "}
        <span className="text-foreground font-medium">
          <span className="num">{verifiedCount}</span> эх сурвалжтай
        </span>
      </p>
      <Separator orientation="vertical" className="hidden h-4 sm:block" />
      <a
        href={FEEDBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Санал хүсэлт · Instagram
      </a>
    </div>
  );
}
