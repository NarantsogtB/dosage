"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics/track";

interface Props {
  /** `serializeShare`-ийн гаралт (`#`-гүй). */
  readonly fragment: string;
  readonly size: ComponentProps<typeof Button>["size"];
  readonly iconOnly?: boolean;
}

const LABEL = "Линк хуулах";

/**
 * Тооцооллын линкийг хуулна (Шат 5). Линк үргэлж `/dose#...` — эмийн
 * хуудаснаас ч ажиллана. Нэр, таних мэдээлэл ороогүй.
 */
export default function ShareLinkButton({ fragment, size, iconOnly }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}/dose#${fragment}`);
      toast.success("Линк хуулагдлаа — өвчтөний нэр ороогүй");
      track({ name: "share_link_copied" });
    } catch {
      toast.error("Линк хуулж чадсангүй");
    }
  };
  const content = iconOnly ? { aria: LABEL, text: null } : { aria: undefined, text: LABEL };
  return (
    <Button type="button" variant="outline" size={size} aria-label={content.aria} onClick={copy}>
      <Link2 aria-hidden />
      {content.text}
    </Button>
  );
}
