import type { Blocker, InputStatus } from "./blocker";
import { Card } from "@/components/ui/card";
import StepCheck from "@/components/step/StepCheck";

interface Props {
  readonly status: InputStatus;
  readonly blocker: Blocker;
}

interface Item {
  readonly label: string;
  readonly done: boolean;
}

/** Оролтын дараалалтай ижил: жин → нас → эм. */
const itemsOf = (status: InputStatus): readonly Item[] => [
  { label: "Жин оруулах", done: status.hasWeight },
  { label: "Нас оруулах (0–18)", done: status.hasAge && !status.ageInvalid },
  { label: "Эм сонгох", done: status.hasDrugs },
];

/**
 * Үр дүн гараагүй үед ЮУ дутууг жагсаана — Figma "Readiness checklist"
 * + "Results empty" (V3 · 02–03).
 *
 * Өмнө нь зөвхөн ЭХНИЙ дутуу зүйлийг нэрлэдэг байв. Одоо гурвуулаа
 * чагттай харагдах тул эмч нэг харцаар хэд үлдсэнийг мэднэ (Nielsen H1),
 * доор нь эхний дутуу зүйлийн зөвлөмж (`blocker.ts`, H9).
 */
export default function ReadinessChecklist({ status, blocker }: Props) {
  return (
    <Card className="gap-3 border-dashed p-5 shadow-none">
      <p className="text-sm font-semibold">Тун гаргахад дутуу:</p>
      <ul className="space-y-2.5">
        {itemsOf(status).map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            <StepCheck done={item.done} />
            <span className={item.done ? "text-muted-foreground line-through" : undefined}>
              {item.label}
            </span>
            <span className="sr-only">{item.done ? "— бөглөсөн" : "— дутуу"}</span>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground border-t pt-3 text-xs leading-relaxed">
        <span className="text-foreground font-medium">{blocker.title}.</span> {blocker.hint}
      </p>
    </Card>
  );
}
