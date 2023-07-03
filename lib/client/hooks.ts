import { useRef } from "react";
import { useTimeoutFn } from "react-use";
import type { UseTimeoutFnReturn } from "react-use/lib/useTimeoutFn";

/**
 * Wrapper for {@link https://github.com/streamich/react-use/blob/master/docs/useTimeoutFn.md useTimeoutFn}
 * which executes only after the reset function is explicitly called.
 */
export function useDeferredTimeoutFn(
  fn: () => void,
  ms?: number
): UseTimeoutFnReturn {
  const started = useRef(false);

  const [isReady, cancel, reset] = useTimeoutFn(() => {
    if (!started.current) {
      return;
    }

    fn();
  }, ms);

  return [
    isReady,
    cancel,
    () => {
      started.current = true;
      reset();
    },
  ];
}
