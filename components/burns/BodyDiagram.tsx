"use client";

import type { KeyboardEvent } from "react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { LUND_BROWDER } from "@/lib/data/burns/lund-browder";
import { DEPTH_LABELS, REGION_LABELS } from "@/lib/data/burns/region-labels";
import type { SelectionMap } from "./use-burn-selections";
import { BACK_PATHS, FRONT_PATHS, type BodyPath } from "./body-paths";
import { nextDepth } from "./next-depth";
import { regionColors } from "./region-style";

interface Props {
  readonly view: "front" | "back";
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
  /** Хэмжээ (V4): mobile 480 өндөр, desktop 200×410. */
  readonly className?: string;
}

/**
 * Жижиг, нарийн бүсийн хүрэх талбайг томруулах тунгалаг хүрээний өргөн (SVG нэгж).
 * Хүрэх талбай ≥44px байх ёстой (хуруугаар); том бүсэд хэрэггүй. Эдгээр нь DOM-д
 * ДАРААГАА (дээгүүр) зурагдана — хөрш том бүсийг бага зэрэг давхарлана.
 */
const HIT_STROKE: Partial<Record<BodyRegionId, number>> = {
  neck: 18,
  genitalia: 22,
  buttock_left: 8,
  buttock_right: 8,
  hand_left: 18,
  hand_right: 18,
  foot_left: 14,
  foot_right: 14,
  thigh_left: 4,
  thigh_right: 4,
  leg_left: 17,
  leg_right: 17,
  upper_arm_left: 8,
  upper_arm_right: 8,
  forearm_left: 13,
  forearm_right: 13,
};

const hitOf = (region: BodyRegionId): number => HIT_STROKE[region] ?? 0;

const depthText = (depth?: BurnDepth): string => (depth ? DEPTH_LABELS[depth] : "Сонгоогүй");

/** Хувь нь НАСНЫ АНГИЛАЛААС хамаарна — 14 настайн толгой 11%, 19% БИШ. */
const percentOf = (region: BodyRegionId, band: AgeBand): number => LUND_BROWDER[region][band];

const labelFor = (region: BodyRegionId, depth: BurnDepth | undefined, percent: number): string =>
  `${REGION_LABELS[region]} — ${depthText(depth)} · ${percent}%`;

const onKeyDown = (onActivate: () => void) => (event: KeyboardEvent<SVGElement>) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onActivate();
};

interface RegionProps {
  readonly path: BodyPath;
  readonly band: AgeBand;
  readonly depth?: BurnDepth;
  readonly onActivate: () => void;
}

/**
 * Нэг бүс: харагдах хэлбэр + (жижиг бол) тунгалаг томруулсан hit-path + фокусын цагираг.
 * Товч нь `<g>` — хоёр path-ийн аль нэг дээр дарсан ижил.
 */
function Region({ path, band, depth, onActivate }: RegionProps) {
  const colors = regionColors(depth);
  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={depth !== undefined}
      aria-label={labelFor(path.region, depth, percentOf(path.region, band))}
      className="group cursor-pointer outline-none"
      onClick={onActivate}
      onKeyDown={onKeyDown(onActivate)}
    >
      <path
        d={path.d}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeDasharray={colors.dash}
        style={{ fill: colors.fill, stroke: colors.stroke }}
      />
      {hitOf(path.region) > 0 ? (
        <path d={path.d} fill="transparent" stroke="transparent" strokeWidth={hitOf(path.region)} strokeLinejoin="round" />
      ) : null}
      <path
        d={path.d}
        fill="none"
        strokeWidth={3}
        strokeLinejoin="round"
        className="stroke-[var(--ring)] opacity-0 group-focus-visible:opacity-100"
        pointerEvents="none"
      />
    </g>
  );
}

const byHit = (a: BodyPath, b: BodyPath): number => hitOf(a.region) - hitOf(b.region);

/**
 * Lund-Browder-ийн диаграм — нэг тал (урд эсвэл ар), Figma-н хүн шиг дүрс.
 *
 * G4: мөч хоёр талаас дарагдана, гэхдээ сонголт бүсээр (`BodyRegionId`) хадгалагддаг
 * тул нэг бүс — давхар тооцогдохгүй; сонгосон бүс хоёр талд ижил өнгөтэй.
 */
const VIEW_PATHS = { front: FRONT_PATHS, back: BACK_PATHS } as const;
const VIEW_LABELS = { front: "Биеийн урд тал", back: "Биеийн ар тал" } as const;

export default function BodyDiagram({ view, band, selections, onToggle, className = "mx-auto h-auto w-full max-w-[240px]" }: Props) {
  const paths = [...VIEW_PATHS[view]].sort(byHit);
  return (
    <svg
      viewBox="0 0 200 410"
      role="group"
      aria-label={VIEW_LABELS[view]}
      className={className}
    >
      {paths.map((path) => (
        <Region
          key={path.region}
          path={path}
          band={band}
          depth={selections.get(path.region)}
          onActivate={() => onToggle(path.region, nextDepth(selections.get(path.region)))}
        />
      ))}
    </svg>
  );
}
