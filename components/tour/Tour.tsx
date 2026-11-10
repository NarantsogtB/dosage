"use client";

import { useCallback, useEffect, useState } from "react";
import type { Box } from "./place-card";
import TourCard from "./TourCard";
import { markTourDone, useTourDone } from "./tour-store";
import { TOUR_STEPS, type TourStep } from "./tour-steps";
import { findTarget, useTargetBox } from "./use-tour-target";

/** Layout тогтож (desktop бие mount болж) дуусахыг хүлээнэ. */
const START_DELAY_MS = 600;
/** Тодруулгын элементээс гадагш зай. */
const PAD = 6;

const NONE: readonly TourStep[] = [];

const visibleSteps = (): readonly TourStep[] => TOUR_STEPS.filter((step) => findTarget(step.target));

/** Анх удаа: харагдаж буй алхмуудыг цуглуулна. «Дахиж харуулахгүй» дарсан бол хоосон. */
const useTourSteps = () => {
  const done = useTourDone();
  const [steps, setSteps] = useState<readonly TourStep[]>(NONE);
  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setSteps(visibleSteps()), START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [done]);
  const close = useCallback(() => setSteps(NONE), []);
  return { steps: done ? NONE : steps, close };
};

const useEscape = (onEscape: () => void) => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEscape]);
};

/** Элементийг тойруулсан «нүх» — эргэн тойрон бараан, элемент өөрөө тод харагдана. */
const Spotlight = ({ box }: { readonly box: Box }) => (
  <div
    aria-hidden
    className="outline-primary absolute rounded-2xl shadow-[0_0_0_9999px_rgb(0_0_0/0.6)] outline-2 motion-safe:transition-all motion-safe:duration-200"
    style={{ top: box.top - PAD, left: box.left - PAD, width: box.width + 2 * PAD, height: box.height + 2 * PAD }}
  />
);

const TourView = ({ steps, onClose }: { readonly steps: readonly TourStep[]; readonly onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const step = steps[index]!;
  const box = useTargetBox(step.target);
  useEscape(onClose);
  const finish = () => {
    markTourDone();
    onClose();
  };
  const go = (delta: number) => setIndex((current) => current + delta);
  return (
    /* Бүтэн дэлгэцийн давхарга: заавар дуусах хүртэл ард нь дарагдахгүй. */
    <div className="fixed inset-0 z-50 print:hidden">
      {box ? <Spotlight box={box} /> : <div aria-hidden className="absolute inset-0 bg-black/60" />}
      {box ? <TourCard step={step} index={index} total={steps.length} box={box} onStep={go} onFinish={finish} onClose={onClose} /> : null}
    </div>
  );
};

/**
 * «Хэрхэн ашиглах» заавар (onboarding tour). Анх орсон хэрэглэгчид тооцоолуурын хуудсанд
 * алхам алхмаар гол элементүүдийг тодруулж харуулна. «Дахиж харуулахгүй» / «Ойлголоо» →
 * `localStorage`; «×» / Esc → зөвхөн энэ удаа. Тохиргооноос дахин эхлүүлнэ (`resetTour`).
 */
export default function Tour() {
  const { steps, close } = useTourSteps();
  if (steps.length === 0) return null;
  return <TourView steps={steps} onClose={close} />;
}
