"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { placeCard, type Box } from "./place-card";
import type { TourStep } from "./tour-steps";

interface Props {
  readonly step: TourStep;
  readonly index: number;
  readonly total: number;
  readonly box: Box;
  /** -1 өмнөх, +1 дараах. */
  readonly onStep: (delta: number) => void;
  /** «Ойлголоо» / «Дахиж харуулахгүй» — дахиж гарахгүй. */
  readonly onFinish: () => void;
  /** «×» / Esc — зөвхөн одоо хаана, дараа дахин гарна. */
  readonly onClose: () => void;
}

const Dots = ({ index, total }: { readonly index: number; readonly total: number }) => (
  <span aria-hidden className="flex gap-1">
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className={cn("h-1.5 rounded-full", i === index ? "bg-primary w-5" : "bg-muted-foreground/40 w-1.5")} />
    ))}
  </span>
);

const Header = ({ index, total, onClose }: Pick<Props, "index" | "total" | "onClose">) => (
  <div className="flex items-center justify-between gap-2">
    <p className="text-muted-foreground flex items-center gap-2 text-xs">
      <Dots index={index} total={total} />
      <span className="num">{index + 1} / {total}</span>
    </p>
    <Button type="button" variant="ghost" size="icon" className="-mt-2 -mr-2" aria-label="Хаах" onClick={onClose}>
      <X aria-hidden />
    </Button>
  </div>
);

const SkipButton = ({ show, onFinish }: { readonly show: boolean; readonly onFinish: () => void }) =>
  show ? (
    <Button type="button" variant="ghost" className="text-muted-foreground mr-auto px-2" onClick={onFinish}>
      Дахиж харуулахгүй
    </Button>
  ) : null;

const PrevButton = ({ show, onStep }: { readonly show: boolean; readonly onStep: Props["onStep"] }) =>
  show ? (
    <Button type="button" variant="outline" size="icon" aria-label="Өмнөх" onClick={() => onStep(-1)}>
      <ChevronLeft aria-hidden />
    </Button>
  ) : null;

/** Сүүлийн алхамд «Ойлголоо» (дахиж гарахгүй), бусад үед «Дараах». */
const primaryOf = (last: boolean, { onStep, onFinish }: Pick<Props, "onStep" | "onFinish">) =>
  last ? { label: "Ойлголоо", onClick: onFinish } : { label: "Дараах", onClick: () => onStep(1) };

const Footer = ({ index, total, onStep, onFinish }: Pick<Props, "index" | "total" | "onStep" | "onFinish">) => {
  const ref = useRef<HTMLButtonElement>(null);
  const last = index === total - 1;
  const primary = primaryOf(last, { onStep, onFinish });
  useEffect(() => ref.current?.focus(), [index]);
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <SkipButton show={!last} onFinish={onFinish} />
      <PrevButton show={index > 0} onStep={onStep} />
      <Button ref={ref} type="button" className="min-w-24" onClick={primary.onClick}>{primary.label}</Button>
    </div>
  );
};

/** Тодруулсан элементийн хажуугийн тайлбар карт: алхам, гарчиг, тайлбар, товчнууд. */
export default function TourCard({ step, box, ...nav }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
      aria-describedby="tour-body"
      className="bg-card text-card-foreground absolute space-y-2 rounded-2xl border p-4 shadow-lg"
      style={placeCard(box, window.innerWidth, window.innerHeight)}
    >
      <Header index={nav.index} total={nav.total} onClose={nav.onClose} />
      <h2 id="tour-title" className="text-lg font-bold">{step.title}</h2>
      <p id="tour-body" className="text-muted-foreground pb-1 text-sm">{step.body}</p>
      <Footer index={nav.index} total={nav.total} onStep={nav.onStep} onFinish={nav.onFinish} />
    </div>
  );
}
