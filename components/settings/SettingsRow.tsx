import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  readonly icon: LucideIcon;
  readonly label: string;
  /** Баруун талд (тоо, хураангуй). */
  readonly value?: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  /** Зөвхөн «Бүх өвчтөнийг устгах» — энэ дэлгэцийн ганц улаан. */
  readonly danger?: boolean;
  /** Мөрийн баруун талд өөрийн хяналт (жишээ нь toggle) — сум байхгүй. */
  readonly control?: React.ReactNode;
}

const ROW = "hover:bg-accent focus-visible:ring-ring/50 flex min-h-14 w-full items-center gap-3 px-3 py-2 text-left text-sm font-medium outline-none first:rounded-t-2xl last:rounded-b-2xl focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50";

const NORMAL = { tile: "bg-tile text-tile-foreground", label: "flex-1" };
const DANGER = { tile: "bg-destructive-muted text-destructive", label: "text-destructive flex-1" };

const Value = ({ value }: { readonly value?: string }) =>
  value ? <span className="num text-muted-foreground text-sm font-normal">{value}</span> : null;

const Chevron = ({ show }: { readonly show: boolean }) =>
  show ? <ChevronRight aria-hidden className="text-muted-foreground size-4 shrink-0" /> : null;

const Inner = ({ icon: Icon, label, value, danger, control, chevron }: Props & { readonly chevron: boolean }) => {
  const tone = danger ? DANGER : NORMAL;
  return (
    <>
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", tone.tile)}>
        <Icon aria-hidden className="size-4.5" />
      </span>
      <span className={tone.label}>{label}</span>
      <Value value={value} />
      {control}
      <Chevron show={chevron} />
    </>
  );
};

/** Тохиргооны нэг мөр: холбоос, товч, эсвэл өөрийн хяналттай. */
export default function SettingsRow(props: Props) {
  if (props.control) {
    return <div className="flex min-h-14 items-center gap-3 px-3 py-2 text-sm font-medium"><Inner {...props} chevron={false} /></div>;
  }
  if (props.href) {
    return <Link href={props.href} className={ROW}><Inner {...props} chevron /></Link>;
  }
  return (
    <button type="button" className={ROW} disabled={props.disabled} onClick={props.onClick}>
      <Inner {...props} chevron />
    </button>
  );
}
