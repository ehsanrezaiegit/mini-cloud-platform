"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

export type NormalizedPointer = {
  x: number;
  y: number;
};

export function useWindowPointer(): MutableRefObject<NormalizedPointer> {
  const pointerRef = useRef<NormalizedPointer>({ x: 0, y: 0 });
  const latestPositionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    function updatePointer() {
      frameRef.current = null;

      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const { x, y } = latestPositionRef.current;

      pointerRef.current = {
        x: (x / width) * 2 - 1,
        y: -((y / height) * 2 - 1),
      };
    }

    function handlePointerMove(event: PointerEvent) {
      latestPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updatePointer);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return pointerRef;
}
