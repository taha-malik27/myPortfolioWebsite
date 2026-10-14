"use client";

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CITY_H,
  DRIFT_SPEED,
  IDLE_MS,
  INTRO_X,
  DESKTOP_16_9_MQ,
  LANDSCAPE_CITY_FIT,
  LANDSCAPE_CITY_MQ,
  LAYERS,
  MAX_FRAME,
  WORLD,
  type LayerId,
  wrap,
} from "./constants";

type Primaries = Record<LayerId, number>;

const INITIAL_PRIMARIES: Primaries = { far: 0, mid: 0, near: 0, fore: 0 };

function dominantDelta(event: WheelEvent, viewport: number): number {
  let dx = event.deltaX;
  let dy = event.deltaY;
  const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport : 1;
  dx *= scale;
  dy *= scale;
  const chosen = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  return Math.max(-240, Math.min(240, chosen));
}

function centerPosition(viewport: number, panel: number, scale: number): number {
  const fit = scale > 0 ? scale : 1;
  return wrap(INTRO_X - (viewport - panel) / (2 * fit), WORLD);
}

function shortestDelta(
  position: number,
  viewport: number,
  panel: number,
  scale: number,
): number {
  const current = wrap(position, WORLD);
  const desired = centerPosition(viewport, panel, scale);
  let delta = desired - current;
  if (delta > WORLD / 2) delta -= WORLD;
  if (delta < -WORLD / 2) delta += WORLD;
  return delta;
}

function readCityScale(scene: HTMLElement | null): number {
  if (!scene) return 1;
  const fitWide =
    window.matchMedia(LANDSCAPE_CITY_MQ).matches ||
    window.matchMedia(DESKTOP_16_9_MQ).matches;
  if (!fitWide) return 1;
  const height = scene.clientHeight || window.innerHeight;
  return Math.min(1, (LANDSCAPE_CITY_FIT * height) / CITY_H);
}

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useCityMotion(suppressAfterDrag: () => void) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const panelNode = useRef<HTMLElement | null>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const pendingRef = useRef(0);
  const driftDirRef = useRef<1 | -1>(1);
  const manualUntilRef = useRef(0);
  const userPausedRef = useRef(true);
  const focusHoldRef = useRef(false);
  const keyboardNavRef = useRef(false);
  const reducedRef = useRef(false);
  const viewWRef = useRef(1200);
  const panelWRef = useRef(420);
  const cityScaleRef = useRef(1);
  const pointerRef = useRef(0);
  const pointerTargetRef = useRef(0);
  const recenterShownRef = useRef(false);
  const copyCountRef = useRef(4);
  const primariesRef = useRef<Primaries>(INITIAL_PRIMARIES);
  const layerEls = useRef<Partial<Record<LayerId, HTMLDivElement>>>({});
  const recenterAnim = useRef({ active: false, from: 0, delta: 0, t0: 0, dur: 0 });
  const sceneRect = useRef<DOMRect | null>(null);

  const [copyCount, setCopyCount] = useState(4);
  const [cityScale, setCityScale] = useState(1);
  const [primaries, setPrimaries] = useState<Primaries>(INITIAL_PRIMARIES);
  const [manualPause, setManualPause] = useState<boolean>(true);
  const [swipeHint, setSwipeHint] = useState(false);
  const [recenterVisible, setRecenterVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, readReduced, () => false);
  const paused = manualPause;

  const applyTransforms = useCallback(() => {
    const position = positionRef.current;
    const pointer = reducedRef.current ? 0 : pointerRef.current;
    const scale = cityScaleRef.current;
    for (const layer of LAYERS) {
      const el = layerEls.current[layer.id];
      if (!el) continue;
      const shift = position * layer.ratio - pointer * 5 * layer.ratio;
      el.style.transform = `translate3d(${-wrap(shift, WORLD) * scale}px, 0, 0)`;
    }
  }, []);

  const togglePause = useCallback(() => {
    const next = !userPausedRef.current;
    userPausedRef.current = next;
    if (next) velocityRef.current = 0;
    setManualPause(next);
  }, []);

  const recenter = useCallback((instant = false) => {
    const viewport = viewWRef.current;
    const panel = panelWRef.current > 0 ? panelWRef.current : 420;
    const delta = shortestDelta(positionRef.current, viewport, panel, cityScaleRef.current);
    const reducedMotion = reducedRef.current || instant;
    recenterAnim.current = {
      active: true,
      from: positionRef.current,
      delta,
      t0: performance.now(),
      dur: reducedMotion ? 0 : 780,
    };
    pendingRef.current = 0;
    velocityRef.current = 0;
    manualUntilRef.current = performance.now() + IDLE_MS + (reducedMotion ? 0 : 780);
  }, []);

  useLayoutEffect(() => {
    const scene = document.querySelector<HTMLElement>('[aria-label="Scrolling city"]');
    if (!scene) return;
    sceneRef.current = scene;
    for (const layer of LAYERS) {
      const el = scene.querySelector<HTMLDivElement>(`[data-layer="${layer.id}"]`);
      if (el) layerEls.current[layer.id] = el;
    }

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    reducedRef.current = reducedQuery.matches;
    if (reducedQuery.matches) userPausedRef.current = true;

    const visiblePanel = () => {
      const panels = scene.querySelectorAll<HTMLElement>("[data-intro-sign]");
      for (const panel of panels) {
        if (!panel.closest("[inert]")) return panel;
      }
      return null;
    };

    const cacheRect = () => {
      sceneRect.current = scene.getBoundingClientRect();
    };

    const measure = () => {
      const width = scene.clientWidth || window.innerWidth;
      viewWRef.current = width;
      const nextScale = readCityScale(scene);
      if (Math.abs(nextScale - cityScaleRef.current) > 0.001) {
        cityScaleRef.current = nextScale;
        setCityScale(nextScale);
      }
      scene.dataset.cityFit = nextScale < 0.999 ? "wide" : "full";
      scene.style.setProperty("--city-scale", String(nextScale));
      const visualWorld = WORLD * nextScale;
      const nextCopies = Math.max(3, Math.ceil(width / visualWorld) + 2);
      if (nextCopies !== copyCountRef.current) {
        copyCountRef.current = nextCopies;
        setCopyCount(nextCopies);
      }
      const swipe = coarseQuery.matches || width < 760;
      setSwipeHint((prev) => (prev === swipe ? prev : swipe));
      const panel = visiblePanel();
      panelNode.current = panel;
      if (panel) panelWRef.current = panel.getBoundingClientRect().width;
      cacheRect();
    };

    measure();
    const panel = panelWRef.current > 0 ? panelWRef.current : Math.min(420, Math.max(280, viewWRef.current - 36));
    positionRef.current = centerPosition(viewWRef.current, panel, cityScaleRef.current);
    applyTransforms();

    let frame = 0;
    let last = performance.now();
    let running = true;

    const updateDerived = () => {
      const viewport = viewWRef.current;
      const panelWidth = panelWRef.current > 0 ? panelWRef.current : 420;
      const holding = keyboardNavRef.current && focusHoldRef.current;

      if (!holding) {
        const next: Primaries = { ...primariesRef.current };
        let changed = false;
        const center = viewport / 2;
        const scale = cityScaleRef.current;
        const visualWorld = WORLD * scale;
        for (const layer of LAYERS) {
          const offset = -wrap(positionRef.current * layer.ratio, WORLD) * scale;
          let primary = 0;
          for (let i = 0; i < copyCountRef.current; i += 1) {
            const left = offset + i * visualWorld;
            if (center >= left && center < left + visualWorld) {
              primary = i;
              break;
            }
          }
          if (next[layer.id] !== primary) {
            next[layer.id] = primary;
            changed = true;
          }
        }
        if (changed) {
          primariesRef.current = next;
          setPrimaries({ ...next });
        }
      }

      const scale = cityScaleRef.current;
      const visualWorld = WORLD * scale;
      const offset = -wrap(positionRef.current, WORLD) * scale;
      let meaningful = false;
      let completelyOut = true;
      for (let i = 0; i < copyCountRef.current; i += 1) {
        const left = offset + i * visualWorld + INTRO_X * scale;
        const right = left + panelWidth;
        const overlap = Math.min(right, viewport) - Math.max(left, 0);
        if (overlap > 32) meaningful = true;
        if (right > -18 && left < viewport + 18) completelyOut = false;
      }
      let show = recenterShownRef.current;
      if (show) {
        if (meaningful) show = false;
      } else if (completelyOut && panelWidth > 40) {
        show = true;
      }
      if (show !== recenterShownRef.current) {
        recenterShownRef.current = show;
        setRecenterVisible(show);
      }
    };

    const tick = (now: number) => {
      if (!running) return;
      let dt = (now - last) / 1000;
      last = now;
      if (dt > MAX_FRAME) dt = MAX_FRAME;
      if (dt < 0) dt = 0;

      const follow = 1 - Math.exp(-dt * 6);
      pointerRef.current += (pointerTargetRef.current - pointerRef.current) * follow;

      const anim = recenterAnim.current;
      if (anim.active) {
        const t = anim.dur <= 0 ? 1 : Math.min(1, (now - anim.t0) / anim.dur);
        const eased = 1 - Math.pow(1 - t, 3);
        positionRef.current = anim.from + anim.delta * eased;
        if (t >= 1) {
          positionRef.current = anim.from + anim.delta;
          anim.active = false;
          manualUntilRef.current = now + IDLE_MS;
        }
        velocityRef.current = 0;
        pendingRef.current = 0;
      } else {
        const damp = 1 - Math.exp(-dt * 14);
        const step = pendingRef.current * damp;
        pendingRef.current -= step;
        positionRef.current += step;

        const auto =
          !userPausedRef.current &&
          !(keyboardNavRef.current && focusHoldRef.current) &&
          now >= manualUntilRef.current;
        const desired = auto ? driftDirRef.current * DRIFT_SPEED : 0;
        const rate = auto ? 2.2 : 8;
        velocityRef.current += (desired - velocityRef.current) * (1 - Math.exp(-dt * rate));
        positionRef.current += velocityRef.current * dt;
      }

      applyTransforms();
      updateDerived();
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      if (running && frame) return;
      running = true;
      last = performance.now();
      frame = window.requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const interruptRecenter = () => {
      if (!recenterAnim.current.active) return;
      recenterAnim.current.active = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest(".sidebar, .sidebar-content, .hamburger-button")) return;
      const delta = dominantDelta(event, viewWRef.current || 1);
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const scroller = target?.closest("[data-intro-scroll]") as HTMLElement | null;
      if (scroller && !horizontal && scroller.scrollHeight > scroller.clientHeight + 1) {
        const canUp = scroller.scrollTop > 0;
        const canDown = scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1;
        if ((delta < 0 && canUp) || (delta > 0 && canDown)) return;
      }
      if (event.cancelable) event.preventDefault();
      if (Math.abs(delta) < 0.4) return;
      interruptRecenter();
      velocityRef.current = 0;
      pendingRef.current += delta / cityScaleRef.current * 1.05;
      driftDirRef.current = delta > 0 ? 1 : -1;
      manualUntilRef.current = performance.now() + IDLE_MS;
    };

    const touch = {
      id: -1,
      x: 0,
      y: 0,
      lastX: 0,
      dx: 0,
      claimed: false,
      active: false,
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        touch.active = false;
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-no-drag], .sidebar, .sidebar-content")) return;
      const point = event.touches[0];
      touch.id = point.identifier;
      touch.x = point.clientX;
      touch.y = point.clientY;
      touch.lastX = point.clientX;
      touch.dx = 0;
      touch.claimed = false;
      touch.active = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touch.active) return;
      if (event.touches.length !== 1) {
        touch.active = false;
        return;
      }
      const point = event.touches[0];
      if (point.identifier !== touch.id) return;
      const dx = point.clientX - touch.x;
      const dy = point.clientY - touch.y;
      touch.dx = dx;
      if (!touch.claimed) {
        if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
        if (Math.abs(dx) <= Math.abs(dy) * 1.2) {
          touch.active = false;
          return;
        }
        touch.claimed = true;
        interruptRecenter();
        velocityRef.current = 0;
        pendingRef.current = 0;
      }
      if (event.cancelable) event.preventDefault();
      positionRef.current += (touch.lastX - point.clientX) / cityScaleRef.current;
      touch.lastX = point.clientX;
      if (Math.abs(dx) > 2) driftDirRef.current = dx < 0 ? 1 : -1;
      manualUntilRef.current = performance.now() + IDLE_MS;
    };

    const onTouchEnd = () => {
      if (touch.claimed && Math.abs(touch.dx) > 8) {
        suppressAfterDrag();
      }
      touch.active = false;
      touch.claimed = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedRef.current) return;
      const rect = sceneRect.current;
      if (!rect || rect.width <= 0) return;
      const next = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTargetRef.current = Math.max(-1, Math.min(1, next));
    };

    const onPointerLeave = () => {
      pointerTargetRef.current = 0;
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      focusHoldRef.current = Boolean(target?.closest("[data-focus-hold]"));
    };

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as HTMLElement | null;
      focusHoldRef.current = Boolean(next?.closest("[data-focus-hold]"));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") keyboardNavRef.current = true;
    };

    const onPointerDown = () => {
      keyboardNavRef.current = false;
      focusHoldRef.current = false;
    };

    const onSceneClick = (event: MouseEvent) => {
      const action = (event.target as HTMLElement | null)
        ?.closest?.("[data-city-action]")
        ?.getAttribute("data-city-action");
      if (action === "pause") togglePause();
      if (action === "recenter") recenter();
    };

    scene.addEventListener("click", onSceneClick);
    scene.addEventListener("wheel", onWheel, { passive: false });
    scene.addEventListener("touchstart", onTouchStart, { passive: true });
    scene.addEventListener("touchmove", onTouchMove, { passive: false });
    scene.addEventListener("touchend", onTouchEnd, { passive: true });
    scene.addEventListener("touchcancel", onTouchEnd, { passive: true });
    scene.addEventListener("pointermove", onPointerMove, { passive: true });
    scene.addEventListener("pointerleave", onPointerLeave);
    scene.addEventListener("focusin", onFocusIn);
    scene.addEventListener("focusout", onFocusOut);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new ResizeObserver(() => {
      const prevW = viewWRef.current;
      const prevPanelW = panelWRef.current;
      const prevScale = cityScaleRef.current;
      measure();
      const nextW = viewWRef.current;
      const nextPanelW = panelWRef.current > 0 ? panelWRef.current : 420;
      const nextScale = cityScaleRef.current;
      if (
        Math.abs(nextW - prevW) > 1 ||
        Math.abs(nextPanelW - prevPanelW) > 1 ||
        Math.abs(nextScale - prevScale) > 0.001
      ) {
        const prevCenter = centerPosition(prevW, prevPanelW > 0 ? prevPanelW : 420, prevScale);
        const nextCenter = centerPosition(nextW, nextPanelW, nextScale);
        positionRef.current += nextCenter - prevCenter;
        applyTransforms();
      }
    });
    observer.observe(scene);
    if (panelNode.current) observer.observe(panelNode.current);

    const fitQueries = [LANDSCAPE_CITY_MQ, DESKTOP_16_9_MQ].map((query) =>
      window.matchMedia(query),
    );
    const onFitChange = () => {
      measure();
      applyTransforms();
    };
    for (const query of fitQueries) query.addEventListener("change", onFitChange);

    start();

    return () => {
      stop();
      observer.disconnect();
      scene.removeEventListener("wheel", onWheel);
      scene.removeEventListener("touchstart", onTouchStart);
      scene.removeEventListener("touchmove", onTouchMove);
      scene.removeEventListener("touchend", onTouchEnd);
      scene.removeEventListener("touchcancel", onTouchEnd);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
      scene.removeEventListener("focusin", onFocusIn);
      scene.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.removeEventListener("click", onSceneClick);
      for (const query of fitQueries) query.removeEventListener("change", onFitChange);
    };
  }, [applyTransforms, recenter, suppressAfterDrag, togglePause]);

  useLayoutEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  return {
    copyCount,
    cityScale,
    primaries,
    paused,
    reduced,
    swipeHint,
    recenterVisible,
  };
}
