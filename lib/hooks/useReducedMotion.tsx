import { useEffect, useState } from "react";

// TODO: https://github.com/framer/motion/pull/1700 병합시 framer-motion 내부의 useReducedMotion으로 대치 예정.

interface ReducedMotionState {
  current: boolean | null;
}

// Does this device prefer reduced motion? Returns `null` server-side.
export const prefersReducedMotion: ReducedMotionState = { current: null };

export const hasReducedMotionListener = { current: false };

export const reducedMotionListenerCallbacks = new Set<
  (event: MediaQueryListEvent) => void
>();

export const isBrowser = typeof document !== "undefined";

export function initPrefersReducedMotion() {
  if (!isBrowser) return;
  hasReducedMotionListener.current = true;

  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = (event: MediaQueryListEvent) => {
      prefersReducedMotion.current = event.matches;

      reducedMotionListenerCallbacks.forEach(callback => callback(event));
    };

    motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
    prefersReducedMotion.current = motionMediaQuery.matches;
  } else {
    prefersReducedMotion.current = false;
  }
}

/**
 * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * export function Sidebar({ isOpen }) {
 *   const shouldReduceMotion = useReducedMotion()
 *   const closedX = shouldReduceMotion ? 0 : "-100%"
 *
 *   return (
 *     <motion.div animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 *   )
 * }
 * ```
 *
 * @return boolean
 *
 * @public
 */
export default function useReducedMotion() {
  /**
   * Lazy initialisation of prefersReducedMotion
   */
  !hasReducedMotionListener.current && initPrefersReducedMotion();

  const [shouldReduceMotion, setShouldReduceMotion] = useState(
    prefersReducedMotion.current,
  );

  useEffect(() => {
    const callback = () => {
      setShouldReduceMotion(prefersReducedMotion.current);
    };
    reducedMotionListenerCallbacks.add(callback);

    return () => {
      reducedMotionListenerCallbacks.delete(callback);
    };
  }, [setShouldReduceMotion]);

  return shouldReduceMotion;
}
