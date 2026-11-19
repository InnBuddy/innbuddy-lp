"use client";
import { useEffect } from "react";

// 読み込み順 (logic, map, i18n ※3D用の three.min.js / bg3d.js を除外)
const SCRIPTS = [
  "/js/logic.js",
  "/js/map.js",
  "/js/i18n.js",
];

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => {
      console.error("[SHIRANGAKE] failed to load", src);
      resolve();
    };
    document.body.appendChild(s);
  });
}

export default function Boot() {
  useEffect(() => {
    const w = window as any;
    if (w._shirangakeBooted) return;
    w._shirangakeBooted = true;

    let blockAutoScroll = true;
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    Element.prototype.scrollIntoView = function (...args: any[]) {
      if (blockAutoScroll) return;
      return originalScrollIntoView.apply(
        this,
        args as [boolean | ScrollIntoViewOptions | undefined]
      );
    };

    // 地図エリア(.map-svg)をクリックした直後は下への自動スクロールを止め、
    // 右側の地域パネル(.region-panel)内の選択肢をチカチカ強調させる
    const handleMapClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".map-svg")) {
        blockAutoScroll = true;

        requestAnimationFrame(() => {
          const panel = document.querySelector(".region-panel");
          if (panel) {
            panel.classList.remove("is-updated");
            void (panel as HTMLElement).offsetWidth;
            panel.classList.add("is-updated");
          }
        });

        setTimeout(() => {
          blockAutoScroll = false;
        }, 500);
      }
    };

    document.addEventListener("click", handleMapClick, true);

    (async () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      for (const src of SCRIPTS) await loadScript(src);

      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        blockAutoScroll = false;
      }, 400);
    })();

    return () => {
      document.removeEventListener("click", handleMapClick, true);
      Element.prototype.scrollIntoView = originalScrollIntoView;
    };
  }, []);

  return null;
}