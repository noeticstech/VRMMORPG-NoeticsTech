"use client";

import { useEffect } from "react";

export function useInjectedStyle(id: string, cssText: string) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (document.getElementById(id)) {
      return;
    }

    const style = document.createElement("style");

    style.id = id;
    style.textContent = cssText;
    document.head.appendChild(style);
  }, [cssText, id]);
}
