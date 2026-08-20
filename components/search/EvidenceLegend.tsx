import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import { EVIDENCE_TONES } from "@/components/dosage/evidence-tone";

/**
 * Цэгний өнгө юу гэсэн үг вэ.
 *
 * Өмнө нь энэ мэдээлэл зөвхөн `title` атрибутад байсан бөгөөд гар
 * утсан дээр хэзээ ч гарч ирдэггүй. Гар утас нь энэ бүтээгдэхүүний
 * ҮНДСЭН төхөөрөмж тул тайлбар нь бодит байдал дээр байхгүйтэй адил
 * байв (Nielsen H10: тусламж, баримтжуулалт).
 *
 * Дэлгэрүүлж харах хэлбэрээр — хаалттай үедээ нэг мөр эзэлнэ.
 */
export default function EvidenceLegend() {
  return (
    <details className="border-border/60 border-t px-5 py-2">
      <summary className="text-muted-foreground cursor-pointer text-xs">
        Өнгөт цэг юу заадаг вэ?
      </summary>
      <ul className="mt-2 space-y-1.5 pb-1">
        {EVIDENCE_ORDER.map((level) => (
          <li key={level} className="flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className={`size-2 shrink-0 rounded-full ${EVIDENCE_TONES[level].dot}`}
            />
            {EVIDENCE_LABELS[level]}
          </li>
        ))}
      </ul>
    </details>
  );
}
