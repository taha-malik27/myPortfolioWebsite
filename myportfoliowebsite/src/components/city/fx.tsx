"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FX_MS } from "./constants";

type FxValue = {
  on: Record<string, boolean>;
  trigger: (id: string) => void;
  activate: (id: string) => void;
  suppressAfterDrag: () => void;
};

const FxContext = createContext<FxValue | null>(null);

export function CityFxProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const timers = useRef<Record<string, number>>({});
  const suppressRef = useRef(false);
  const suppressTimer = useRef(0);

  const trigger = useCallback((id: string) => {
    window.clearTimeout(timers.current[id]);
    setOn((prev) => ({ ...prev, [id]: false }));
    window.requestAnimationFrame(() => {
      setOn((prev) => ({ ...prev, [id]: true }));
      timers.current[id] = window.setTimeout(() => {
        setOn((prev) => ({ ...prev, [id]: false }));
      }, FX_MS[id] ?? 1800);
    });
  }, []);

  const activate = useCallback(
    (id: string) => {
      if (suppressRef.current) return;
      trigger(id);
    },
    [trigger],
  );

  const suppressAfterDrag = useCallback(() => {
    suppressRef.current = true;
    window.clearTimeout(suppressTimer.current);
    suppressTimer.current = window.setTimeout(() => {
      suppressRef.current = false;
    }, 420);
  }, []);

  useEffect(() => {
    const active = timers.current;
    return () => {
      Object.values(active).forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(suppressTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ on, trigger, activate, suppressAfterDrag }),
    [on, trigger, activate, suppressAfterDrag],
  );

  return <FxContext.Provider value={value}>{children}</FxContext.Provider>;
}

export function useCityFx(): FxValue {
  const value = useContext(FxContext);
  if (!value) {
    throw new Error("City interactions are only available inside the homepage scene.");
  }
  return value;
}
