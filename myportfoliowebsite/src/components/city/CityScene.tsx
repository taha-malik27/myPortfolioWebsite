"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FarSkyline, ForeBridge, MainSkyline, NearStreet } from "./artwork";
import { WORLD, type LayerId } from "./constants";
import { CityFxProvider, useCityFx } from "./fx";
import IntroSign from "./IntroSign";
import styles from "./city.module.css";
import { useCityMotion } from "./useCityMotion";

function LayerCopies({
  id,
  z,
  copyCount,
  cityScale,
  primary,
  render,
}: {
  id: LayerId;
  z: number;
  copyCount: number;
  cityScale: number;
  primary: number;
  render: (copy: number, isPrimary: boolean) => ReactNode;
}) {
  const visualWorld = WORLD * cityScale;
  return (
    <div className={styles.layer} data-layer={id} style={{ zIndex: z }}>
      {Array.from({ length: copyCount }, (_, copy) => {
        const isPrimary = copy === primary;
        return (
          <div
            key={copy}
            className={styles.copy}
            style={{ width: visualWorld, left: copy * visualWorld }}
            inert={isPrimary ? undefined : true}
            aria-hidden={isPrimary ? undefined : true}
          >
            {render(copy, isPrimary)}
          </div>
        );
      })}
    </div>
  );
}

export default function CityScene() {
  return (
    <CityFxProvider>
      <SceneBody />
    </CityFxProvider>
  );
}

function SceneBody() {
  const { suppressAfterDrag } = useCityFx();
  const motion = useCityMotion(suppressAfterDrag);

  return (
    <section
        className={styles.scene}
        data-reduced={motion.reduced ? "true" : "false"}
        data-city-fit={motion.cityScale < 0.999 ? "wide" : "full"}
        style={{ ["--city-scale" as string]: motion.cityScale }}
        aria-label="Scrolling city"
      >
        <div className={styles.sun}>
          <Image
            src="/images/SynthSun.gif"
            alt="Synthwave sun"
            width={280}
            height={280}
            priority
            className={styles.sunImage}
          />
        </div>
        <LayerCopies
          id="far"
          z={3}
          copyCount={motion.copyCount}
          cityScale={motion.cityScale}
          primary={motion.primaries.far}
          render={(copy) => <FarSkyline copy={copy} />}
        />
        <LayerCopies
          id="mid"
          z={4}
          copyCount={motion.copyCount}
          cityScale={motion.cityScale}
          primary={motion.primaries.mid}
          render={(copy, isPrimary) => <MainSkyline copy={copy} primary={isPrimary} />}
        />
        <LayerCopies
          id="near"
          z={5}
          copyCount={motion.copyCount}
          cityScale={motion.cityScale}
          primary={motion.primaries.near}
          render={(copy, isPrimary) => <NearStreet copy={copy} primary={isPrimary} />}
        />
        <div className={styles.haze} aria-hidden="true" />
        <LayerCopies
          id="fore"
          z={7}
          copyCount={motion.copyCount}
          cityScale={motion.cityScale}
          primary={motion.primaries.fore}
          render={() => (
            <>
              <ForeBridge />
              <IntroSign />
            </>
          )}
        />
        <div className={styles.hud}>
          <p className={styles.hint}>
            {motion.swipeHint ? "Swipe to explore" : "Scroll to explore"}
            <span aria-hidden="true"> · </span>
            {motion.swipeHint ? "Tap the city" : "Click the city"}
          </p>
          <div className={styles.controls} data-no-drag="">
            <button
              type="button"
              className={
                motion.recenterVisible ? styles.control : `${styles.control} ${styles.controlHidden}`
              }
              data-city-action="recenter"
              aria-hidden={motion.recenterVisible ? undefined : true}
              tabIndex={motion.recenterVisible ? 0 : -1}
            >
              Recenter
            </button>
            <button
              type="button"
              className={styles.control}
              data-city-action="pause"
              aria-pressed={!motion.paused}
            >
              {motion.paused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      </section>
  );
}
