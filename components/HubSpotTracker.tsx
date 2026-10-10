"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HubSpotCommand = ["setPath", string] | ["trackPageView"];

declare global {
  interface Window {
    _hsq?: HubSpotCommand[];
  }
}

export default function HubSpotTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScriptReady, setIsScriptReady] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);

  const query = searchParams.toString();
  const currentPath = query ? `${pathname}?${query}` : pathname;

  useEffect(() => {
    if (!isScriptReady) return;

    // 初回表示はHubSpotのコード自身が自動計測するため、重複送信しない。
    if (lastTrackedPath.current === null) {
      lastTrackedPath.current = currentPath;
      return;
    }

    if (lastTrackedPath.current === currentPath) return;
    if (!window._hsq) return;

    window._hsq.push(["setPath", currentPath]);
    window._hsq.push(["trackPageView"]);

    lastTrackedPath.current = currentPath;
  }, [currentPath, isScriptReady]);

  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src="https://js-na2.hs-scripts.com/247347331.js"
      onLoad={() => setIsScriptReady(true)}
    />
  );
}
