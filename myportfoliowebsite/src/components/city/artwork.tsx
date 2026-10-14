"use client";

import { useMemo, type ReactNode } from "react";
import { CITY_H, GROUND, WORLD } from "./constants";
import { useCityFx } from "./fx";
import {
  FAR_ART,
  HOT_ART,
  MID_STATIC_AFTER,
  MID_STATIC_BEFORE,
  NEAR_STATIC,
  SHARED_DEFS,
} from "./panoramaData";
import styles from "./city.module.css";

const SVG_CLASS_MAP: Record<string, string> = {
  win: styles.win,
  winLit: styles.winLit,
  winRed: styles.winRed,
  ambient: styles.ambient,
  hub: styles.hub,
  blades: styles.blades,
  tip: styles.tip,
  ring: styles.ring,
  ringLate: styles.ringLate,
  signLetter: styles.signLetter,
  fault: styles.fault,
  arm: styles.arm,
  trainWin: styles.trainWin,
  trainWinAmbient: styles.trainWinAmbient,
  stationLamp: styles.stationLamp,
  wave: styles.wave,
  bar: styles.bar,
  flyer: styles.flyer,
  trail: styles.trail,
  thruster: styles.thruster,
};

function scopeSvgMarkup(raw: string, scope: string): string {
  return raw
    .replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${scope}-${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${scope}-${id})`)
    .replace(/\bclass="([^"]+)"/g, (_, classes: string) => {
      const mapped = classes
        .split(/\s+/)
        .map((token) => SVG_CLASS_MAP[token] ?? token)
        .join(" ");
      return `class="${mapped}"`;
    });
}

export const BOUNDS = {
  tower: { x: 472, y: 128, w: 188, h: 632 },
  fan: { x: 2816, y: GROUND - 292, w: 108, h: 86 },
  antenna: { x: 3368, y: 150, w: 96, h: 490 },
  shop: { x: 3528, y: GROUND - 188, w: 250, h: 188 },
  citizen: { x: 4968, y: GROUND - 330, w: 48, h: 58 },
  train: { x: 5820, y: GROUND - 312, w: 265, h: 80 },
  mind: { x: 6144, y: GROUND - 270, w: 164, h: 86 },
  quant: { x: 6728, y: GROUND - 216, w: 164, h: 96 },
  tm: { x: 7088, y: GROUND - 176, w: 68, h: 46 },
  flyer: { x: 3048, y: 96, w: 92, h: 48 },
} as const;

function Hot({
  id,
  label,
  primary,
  x,
  y,
  w,
  h,
  children,
}: {
  id: string;
  label: string;
  primary: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  children: ReactNode;
}) {
  const { trigger, activate } = useCityFx();

  return (
    <g
      role="button"
      tabIndex={primary ? 0 : -1}
      aria-label={label}
      data-focus-hold=""
      className={styles.hot}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") event.preventDefault();
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        activate(id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          trigger(id);
        }
      }}
    >
      {children}
      <rect className={styles.hit} x={x} y={y} width={w} height={h} fill="transparent" />
      <rect className={styles.notch} x={x + Math.max(0, w - 14)} y={y + 5} width={9} height={3} />
    </g>
  );
}

function ArtFrame({
  children,
  decorative = false,
}: {
  children: ReactNode;
  decorative?: boolean;
}) {
  return (
    <svg
      className={styles.art}
      width={WORLD}
      height={CITY_H}
      viewBox={`0 0 ${WORLD} ${CITY_H}`}
      preserveAspectRatio="xMinYMax meet"
      aria-hidden={decorative ? true : undefined}
    >
      {children}
    </svg>
  );
}

export function FarSkyline({ copy = 0 }: { copy?: number }) {
  const scope = `far-${copy}`;
  const markup = useMemo(() => scopeSvgMarkup(SHARED_DEFS + FAR_ART, scope), [scope]);

  return (
    <ArtFrame decorative>
      <g
        aria-hidden="true"
        pointerEvents="none"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      {/* Universal ground base layer at the back bottom across the entire carousel */}
      <g aria-hidden="true" pointerEvents="none">
        <rect x={-4} y={712} width={WORLD + 8} height={CITY_H - 712} fill="#070406" />
        <rect x={-4} y={709} width={WORLD + 8} height={3} fill="#2a201c" />
      </g>
    </ArtFrame>
  );
}

export function MainSkyline({ copy, primary }: { copy: number; primary: boolean }) {
  const { on } = useCityFx();
  const scope = `mid-${copy}`;

  const pieces = useMemo(
    () => ({
      before: scopeSvgMarkup(SHARED_DEFS + MID_STATIC_BEFORE, scope),
      after: scopeSvgMarkup(MID_STATIC_AFTER, scope),
      tower: scopeSvgMarkup(HOT_ART.tower, scope),
      fan: scopeSvgMarkup(HOT_ART.fan, scope),
      antenna: scopeSvgMarkup(HOT_ART.antenna, scope),
      shop: scopeSvgMarkup(HOT_ART.shop, scope),
      citizen: scopeSvgMarkup(HOT_ART.citizen, scope),
      train: scopeSvgMarkup(HOT_ART.train, scope),
      mind: scopeSvgMarkup(HOT_ART.mind, scope),
      quant: scopeSvgMarkup(HOT_ART.quant, scope),
      tm: scopeSvgMarkup(HOT_ART.tm, scope),
    }),
    [scope],
  );

  return (
    <ArtFrame>
      <g
        aria-hidden="true"
        data-copy={copy}
        pointerEvents="none"
        dangerouslySetInnerHTML={{ __html: pieces.before }}
      />

      <Hot id="tower" label="Light the tower windows" primary={primary} {...BOUNDS.tower}>
        <g
          className={on.tower ? styles.isOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.tower }}
        />
      </Hot>

      <Hot id="fan" label="Start the rooftop fan" primary={primary} {...BOUNDS.fan}>
        <g
          className={on.fan ? styles.fanOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.fan }}
        />
      </Hot>

      <Hot id="antenna" label="Ping the rooftop antenna" primary={primary} {...BOUNDS.antenna}>
        <g
          className={on.antenna ? styles.antennaOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.antenna }}
        />
      </Hot>

      <Hot id="shop" label="Repair the VOLT shop sign" primary={primary} {...BOUNDS.shop}>
        <g
          className={on.shop ? styles.isOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.shop }}
        />
      </Hot>

      <Hot id="citizen" label="Wave at the rooftop figure" primary={primary} {...BOUNDS.citizen}>
        <g
          className={on.citizen ? styles.citizenOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.citizen }}
        />
      </Hot>

      <Hot id="train" label="Light the elevated train" primary={primary} {...BOUNDS.train}>
        <g
          className={on.train ? styles.isOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.train }}
        />
      </Hot>

      <Hot id="mind" label="Activate the MIND lab waveform" primary={primary} {...BOUNDS.mind}>
        <g
          className={on.mind ? styles.mindOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.mind }}
        />
      </Hot>

      <Hot id="quant" label="Refresh the QuantArc display" primary={primary} {...BOUNDS.quant}>
        <g
          className={on.quant ? styles.quantOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.quant }}
        />
      </Hot>

      <Hot id="tm" label="Pulse the TM mark" primary={primary} {...BOUNDS.tm}>
        <g
          className={on.tm ? styles.tmOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.tm }}
        />
      </Hot>

      <g
        aria-hidden="true"
        pointerEvents="none"
        dangerouslySetInnerHTML={{ __html: pieces.after }}
      />
    </ArtFrame>
  );
}

const BACKUP_WATER_MARKUP = (() => {
  const waves: string[] = [];
  for (let x = 20; x < WORLD - 100; x += 120) {
    waves.push(
      `<path d="M${x} 743Q${x + 60} 739 ${x + 120} 745" fill="none" stroke="#e0893a" stroke-opacity="0.35" stroke-width="1.4"/>`,
    );
  }

  const tier1: string[] = [];
  const tier2: string[] = [];
  const tier3: string[] = [];

  let seed = 1337;
  const nextRand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let xBase = 10; xBase < WORLD - 30; xBase += 38) {
    const y1 = 745 + Math.floor(nextRand() * 92);
    const w1 = 6 + Math.floor(nextRand() * 22);
    tier1.push(`M${xBase} ${y1}h${w1}`);

    const y2 = 745 + Math.floor(nextRand() * 92);
    const w2 = 5 + Math.floor(nextRand() * 20);
    tier2.push(`M${xBase + 12} ${y2}h${w2}`);

    if (nextRand() > 0.35) {
      const y3 = 745 + Math.floor(nextRand() * 90);
      const w3 = 4 + Math.floor(nextRand() * 14);
      tier3.push(`M${xBase + 6} ${y3}h${w3}`);
    }
  }

  return (
    `<path d="M-4 741H${WORLD + 4}V${CITY_H}H-4Z" fill="url(#d-face-33)"/>` +
    waves.join("") +
    `<g fill="none">` +
    `<path d="${tier1.join("")}" stroke="#6b463a" stroke-opacity="0.55" stroke-width="1.3"/>` +
    `<path d="${tier2.join("")}" stroke="#d48642" stroke-opacity="0.35" stroke-width="1.1"/>` +
    `<path d="${tier3.join("")}" stroke="#ffcb7b" stroke-opacity="0.22" stroke-width="0.9"/>` +
    `</g>`
  );
})();

export function NearStreet({ copy = 0, primary }: { copy?: number; primary: boolean }) {
  const { on } = useCityFx();
  const scope = `near-${copy}`;

  const pieces = useMemo(
    () => ({
      backupWater: scopeSvgMarkup(BACKUP_WATER_MARKUP, scope),
      static: scopeSvgMarkup(SHARED_DEFS + NEAR_STATIC, scope),
      flyer: scopeSvgMarkup(HOT_ART.flyer, scope),
    }),
    [scope],
  );

  return (
    <ArtFrame>
      {/* Full-width backup water filler layer behind foreground roads, sand, and existing water */}
      <g
        aria-hidden="true"
        pointerEvents="none"
        dangerouslySetInnerHTML={{ __html: pieces.backupWater }}
      />
      <g
        aria-hidden="true"
        pointerEvents="none"
        dangerouslySetInnerHTML={{ __html: pieces.static }}
      />
      <Hot id="flyer" label="Boost the flying vehicle" primary={primary} {...BOUNDS.flyer}>
        <g
          className={on.flyer ? styles.flyerOn : undefined}
          aria-hidden="true"
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: pieces.flyer }}
        />
      </Hot>
    </ArtFrame>
  );
}

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function wirePath(x1: number, y1: number, x2: number, y2: number, sag: number) {
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + sag;
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
}

function ForePanes({
  x,
  y,
  cols,
  rows,
  seed,
  chance = 36,
  cw = 10,
  ch = 12,
  gx = 8,
  gy = 8,
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  seed: string;
  chance?: number;
  cw?: number;
  ch?: number;
  gx?: number;
  gy?: number;
}) {
  const base = hash(seed);
  const dark: string[] = [];
  const lit: string[] = [];
  const red: string[] = [];
  let idx = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const roll = ((base + Math.imul(idx + 1, 2246822519)) >>> 0) % 100;
      const wx = x + c * (cw + gx);
      const wy = y + r * (ch + gy);
      const cell = `M${wx} ${wy}h${cw}v${ch}h-${cw}z`;
      if (roll < 3) red.push(cell);
      else if (roll < chance) lit.push(cell);
      else dark.push(cell);
      idx += 1;
    }
  }
  return (
    <g>
      {dark.length > 0 && <path d={dark.join("")} fill="#2a1612" />}
      {lit.length > 0 && <path d={lit.join("")} fill="#e0893a" />}
      {red.length > 0 && <path d={red.join("")} fill="#c43232" />}
    </g>
  );
}

export function ForeBridge() {
  const crops = [
    { x: 20, w: 240, h: 120 },
    { x: 1460, w: 200, h: 100 },
    { x: 2060, w: 160, h: 130 },
    { x: 5080, w: 180, h: 110 },
    { x: 6680, w: 210, h: 124 },
  ];
  return (
    <ArtFrame decorative>
      <g aria-hidden="true">
        {crops.map((crop) => (
          <g key={crop.x}>
            <rect x={crop.x} y={CITY_H - crop.h} width={crop.w} height={crop.h} fill="#070308" />
            <rect x={crop.x} y={CITY_H - crop.h} width={crop.w} height={4} fill="#2a1c20" />
            <ForePanes
              x={crop.x + 10}
              y={CITY_H - crop.h + 12}
              cols={Math.max(2, Math.floor(crop.w / 28))}
              rows={2}
              seed={`fore-${crop.x}`}
              chance={40}
            />
          </g>
        ))}
        {[760, 1100].map((x) => (
          <g key={x}>
            <rect x={x} y={GROUND - 210} width={8} height={210} fill="#24181a" />
            <rect x={x - 10} y={GROUND - 214} width={28} height={6} fill="#3a302c" />
          </g>
        ))}
        <rect x={760} y={GROUND - 214} width={348} height={6} fill="#3a302c" />
        <path
          d={wirePath(760, GROUND - 262, 1180, GROUND - 282, 22)}
          fill="none"
          stroke="#6a5348"
          strokeWidth={1.6}
        />
      </g>
    </ArtFrame>
  );
}
