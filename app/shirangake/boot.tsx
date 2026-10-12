"use client";

import { useEffect } from "react";

// 読み込み順（logic → map → three → bg3d → i18n）
const SCRIPTS = [
  "/js/logic.js",
  "/js/map.js",
  "/vendor/three.min.js",
  "/js/bg3d.js",
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
    if (w.__shirangakeBooted) return;
    w.__shirangakeBooted = true;

    // スクリプト初期化時の勝手な自動スクロールを一時的に無効化
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function () {};

    (async () => {
      // URLに付与された #regions 等のハッシュを削除し、トップ固定にする
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      for (const src of SCRIPTS) await loadScript(src);

      // 画面最上部（ヒーローエリア）に固定スクロール
      window.scrollTo(0, 0);

      setTimeout(() => {
        window.scrollTo(0, 0);
        // 初期読み込み完了後にスクロール機能を復元（手動操作用）
        Element.prototype.scrollIntoView = originalScrollIntoView;
      }, 400);
    })();
  }, []);

  return null;
}