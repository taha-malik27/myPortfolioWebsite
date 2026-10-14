"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import styles from "./city.module.css";

const FLICKER_PRIMARY = [0.2, 2.6, 0.7, 3.4, 1.3, 4.2, 0.4, 2.1, 3.8, 1.6];
const FLICKER_DETAIL = [1.1, 4.4, 2.3, 5.1, 0.8, 3.9, 2.7];

const SPARK_JETS = [
  // Top-right corner short-circuit spray
  { x: "94%", y: "10%", dx: "28px", dy: "38px", rot: "52deg", delay: "0.2s", dur: "3.4s", len: "13px" },
  { x: "94%", y: "10%", dx: "42px", dy: "18px", rot: "22deg", delay: "0.23s", dur: "3.4s", len: "10px" },
  { x: "94%", y: "10%", dx: "14px", dy: "50px", rot: "74deg", delay: "0.26s", dur: "3.4s", len: "15px" },
  { x: "94%", y: "10%", dx: "-18px", dy: "36px", rot: "114deg", delay: "1.9s", dur: "4.1s", len: "11px" },
  { x: "94%", y: "10%", dx: "34px", dy: "-12px", rot: "-20deg", delay: "1.94s", dur: "4.1s", len: "9px" },

  // Hero neon tube ("Malik's" tail) spark burst
  { x: "74%", y: "38%", dx: "36px", dy: "44px", rot: "51deg", delay: "0.85s", dur: "2.9s", len: "14px" },
  { x: "74%", y: "38%", dx: "48px", dy: "24px", rot: "26deg", delay: "0.88s", dur: "2.9s", len: "11px" },
  { x: "74%", y: "38%", dx: "18px", dy: "56px", rot: "71deg", delay: "0.92s", dur: "2.9s", len: "16px" },
  { x: "74%", y: "38%", dx: "-22px", dy: "42px", rot: "118deg", delay: "2.35s", dur: "3.7s", len: "12px" },

  // Upper-left neon tube ("Taha" lead-in) spark burst
  { x: "26%", y: "22%", dx: "-34px", dy: "40px", rot: "132deg", delay: "1.45s", dur: "3.6s", len: "13px" },
  { x: "26%", y: "22%", dx: "-46px", dy: "16px", rot: "160deg", delay: "1.49s", dur: "3.6s", len: "10px" },
  { x: "26%", y: "22%", dx: "-14px", dy: "52px", rot: "105deg", delay: "1.52s", dur: "3.6s", len: "14px" },

  // Bottom-left frame transformer pop
  { x: "8%", y: "86%", dx: "-26px", dy: "38px", rot: "125deg", delay: "0.55s", dur: "3.8s", len: "12px" },
  { x: "8%", y: "86%", dx: "22px", dy: "42px", rot: "62deg", delay: "0.58s", dur: "3.8s", len: "14px" },
  { x: "8%", y: "86%", dx: "-38px", dy: "14px", rot: "158deg", delay: "2.7s", dur: "4.3s", len: "10px" },

  // Bottom-right tube electrode pop
  { x: "89%", y: "82%", dx: "34px", dy: "40px", rot: "51deg", delay: "1.15s", dur: "3.2s", len: "13px" },
  { x: "89%", y: "82%", dx: "12px", dy: "54px", rot: "76deg", delay: "1.19s", dur: "3.2s", len: "11px" },
];

function NeonWord({
  text,
  className,
  offset = 0,
}: {
  text: string;
  className: string;
  offset?: number;
}) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from(text).map((char, index) =>
        char === " " ? (
          <span key={`sp-${index}`} className={styles.wordSpace}>
            {" "}
          </span>
        ) : (
          <span
            key={`${char}-${index}`}
            className={styles.letter}
            style={{
              animationDelay: `${FLICKER_PRIMARY[(index + offset) % FLICKER_PRIMARY.length]}s`,
            }}
          >
            {char}
          </span>
        ),
      )}
    </span>
  );
}

export default function IntroSign({
  panelRef,
}: {
  panelRef?: (node: HTMLElement | null) => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.slot}>
      <div className={styles.mount}>
        <div className={styles.truss} aria-hidden="true" />
        <div className={`${styles.bracket} ${styles.bracketLeft}`} aria-hidden="true" />
        <div className={`${styles.bracket} ${styles.bracketRight}`} aria-hidden="true" />
        <article
          ref={panelRef}
          className={styles.panel}
          data-intro-sign=""
          data-intro-scroll=""
          data-focus-hold=""
          aria-label="Introduction"
        >
          <div className={styles.innerFrame} aria-hidden="true" />
          <div className={styles.scratch} aria-hidden="true" />

          {/* Broken neon sign shooting spark emitters */}
          <div className={styles.sparkField} aria-hidden="true">
            <span className={`${styles.arcFlash} ${styles.arcFlashTop}`} />
            <span className={`${styles.arcFlash} ${styles.arcFlashMid}`} />
            <span className={`${styles.arcFlash} ${styles.arcFlashBot}`} />
            {SPARK_JETS.map((s, idx) => (
              <span
                key={idx}
                className={styles.sparkJet}
                style={
                  {
                    left: s.x,
                    top: s.y,
                    "--dx": s.dx,
                    "--dy": s.dy,
                    "--rot": s.rot,
                    "--len": s.len,
                    animationDelay: s.delay,
                    animationDuration: s.dur,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* Reference-style neon sign header: slanted left-up to right-down */}
          <div className={styles.heroFrame}>
            <div className={styles.grill} aria-hidden="true" />

            <h1 className={styles.name} aria-label="Welcome to Taha Malik's Portfolio">
              <span className={styles.welcomeRow} aria-hidden="true">
                <span className={styles.kickerLine} />
                <NeonWord text="Welcome to" className={styles.welcomeText} offset={1} />
                <span className={styles.kickerLine} />
              </span>

              <NeonWord text="Taha" className={styles.nameTop} offset={0} />
              <NeonWord text="Malik's" className={styles.nameBottom} offset={4} />

              <span className={styles.portfolioRow} aria-hidden="true">
                <span className={styles.kickerLine} />
                <NeonWord text="Portfolio" className={styles.portfolioText} offset={7} />
                <span className={styles.kickerLine} />
              </span>
            </h1>
          </div>

          <div className={styles.neonRule} aria-hidden="true">
            <span className={styles.neonRuleCap} />
            <span className={styles.neonRuleTube} />
            <span className={styles.neonRuleCap} />
          </div>

          {/* Centered details using Stack Sans Notch with scaled-down neon glow & flicker */}
          <div className={styles.detailsGroup}>
            <p
              className={`${styles.role} ${styles.detailFlicker}`}
              style={{ animationDelay: `${FLICKER_DETAIL[0]}s` }}
            >
              Software Engineer
            </p>
            <p
              className={`${styles.role} ${styles.detailFlicker}`}
              style={{ animationDelay: `${FLICKER_DETAIL[2]}s` }}
            >
              Finance &amp; Investing Enthusiast
            </p>
            <p
              className={`${styles.role} ${styles.detailFlicker}`}
              style={{ animationDelay: `${FLICKER_DETAIL[4]}s` }}
            >
              Synthwave &amp; Cyberpunk Enjoyer
            </p>
          </div>

          <div className={styles.actions}>
            <div
              className={`contact-me-button-container ${styles.contactWrap}`}
              style={{ position: "relative", display: "inline-block", margin: 0 }}
            >
              <div
                className={`contact-me-button-background ${styles.contactBg}`}
                style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
              />
              <button
                type="button"
                className={`contact-me-button ${styles.contactBtn}`}
                style={{ position: "relative", zIndex: 1 }}
                onClick={() => router.push("/contact")}
              >
                <span className="contact-me-button-text">Contact Me</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
