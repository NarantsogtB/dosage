"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics/track";

interface Props {
  readonly text: string;
  /** Хуулсан текстэд орсон эмүүд — analytics-д. */
  readonly drugIds: readonly string[];
  readonly variant: ComponentProps<typeof Button>["variant"];
  readonly size: ComponentProps<typeof Button>["size"];
  readonly label: string;
}

const trackCopied = (drugIds: readonly string[]) =>
  drugIds.forEach((drugId) => track({ name: "copy_result", drugId }));

/**
 * Жорын текстийг санах ойд хуулна.
 *
 * Өмнө нь товч өөрөө "Хуулагдлаа" болж 1.6 секунд хойшилдог байв. Энэ нь
 * хоёр асуудалтай: (1) товчны өргөн үсрэхэд хажуугийн зүйл хөдөлнө,
 * (2) эмч аль хэдийн нүдээ жор руу шилжүүлсэн байхад товчин дээрх өөрчлөлт
 * харагдахгүй. Одоо баталгаа нь дэлгэцийн доод талд toast-оор гарна —
 * screen reader-т `aria-live`-аар мөн уншигдана.
 *
 * Алдааг ЧИМЭЭГҮЙ өнгөрөөхгүй: HTTPS биш эсвэл зөвшөөрөлгүй үед
 * clipboard API унана. Эмч хуулагдсан гэж бодоод буруу жор тавихаас
 * сэргийлж алдааг ил хэлнэ.
 */
export default function CopyButton({
  text,
  drugIds,
  variant,
  size,
  label,
}: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Хуулагдлаа");
      trackCopied(drugIds);
    } catch {
      toast.error("Хуулж чадсангүй — гараар сонгож хуулна уу");
    }
  };

  return (
    <Button type="button" variant={variant} size={size} onClick={copy}>
      <Copy aria-hidden />
      {label}
    </Button>
  );
}
