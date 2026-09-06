import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

type Viewport = "mobile" | "tablet" | "desktop";

export function useViewport(): Viewport {
  const [viewport, setViewport] = React.useState<Viewport>(() => {
    if (typeof window === "undefined") return "desktop";
    return getViewport();
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(
      `(max-width: ${String(TABLET_BREAKPOINT - 1)}px)`,
    );
    const onChange = () => {
      setViewport(getViewport());
    };
    mql.addEventListener("change", onChange);
    setViewport(getViewport());
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return viewport;
}

function getViewport(): Viewport {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < MOBILE_BREAKPOINT) return "mobile";
  if (width < TABLET_BREAKPOINT) return "tablet";
  return "desktop";
}
