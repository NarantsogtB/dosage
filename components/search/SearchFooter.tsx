import { Separator } from "@/components/ui/separator";
import EvidenceLegend from "./EvidenceLegend";

interface Props {
  readonly shown: number;
  readonly total: number;
}

/** Жагсаалтын доод хэсэг: хэдэн эм харагдаж байгаа + цэгний тайлбар. */
export default function SearchFooter({ shown, total }: Props) {
  return (
    <>
      <Separator />
      <div className="text-muted-foreground px-5 py-2 text-xs">
        <span className="num">
          {shown} / {total}
        </span>{" "}
        эм
      </div>
      <EvidenceLegend />
    </>
  );
}
