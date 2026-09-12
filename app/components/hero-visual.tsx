"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";
import { useWindowPointer } from "@/lib/use-window-pointer";

const LazyHeroScene = dynamic(
  () => import("@/components/hero-scene").then((module) => module.HeroScene),
  {
    loading: () => null,
    ssr: false,
  },
);

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      (window.WebGLRenderingContext || window.WebGL2RenderingContext) &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(media.matches);
    };

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

export function HeroVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pointerRef = useWindowPointer();
  const [isSceneAllowed, setIsSceneAllowed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSceneAllowed(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsSceneAllowed(canUseWebGL());
    }, 180);

    return () => {
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  if (!isSceneAllowed) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(79,156,255,0.2),transparent_36%),radial-gradient(circle_at_48%_58%,rgba(255,107,53,0.14),transparent_34%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/35" />
      <SceneErrorBoundary>
        <LazyHeroScene pointerRef={pointerRef} onContextLost={() => setIsSceneAllowed(false)} />
      </SceneErrorBoundary>
    </div>
  );
}
