"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * WCAG / ui-ux-pro-max `focus-on-route-change`: after a client-side
 * navigation, move focus to the main content so keyboard and screen-reader
 * users start at the new page instead of the link they just activated.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.location.hash) return; // in-page anchor targets manage their own scroll/focus
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
