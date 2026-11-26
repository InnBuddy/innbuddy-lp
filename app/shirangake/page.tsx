import type { Metadata } from "next";
import "./shirangake.css";
import dialectsAll from "@/data/dialects.json";
import i18nAll from "@/data/i18n.json";
import activeIds from "@/data/active-dialects.json";
import { BODY_MARKUP } from "./body-markup";
import Boot from "./boot";

export const metadata: Metadata = {
  title: {
    absolute:
      "「REAL vs TEXT BOOK」Japanese dialects will make your travels more exciting",
  },
  description:
    "Discover authentic Japanese dialects beyond the textbook and make your travels in Japan even more exciting.",
  openGraph: {
    type: "website",
    url: "https://innbuddy-japan.com/shirangake/",
    siteName: "SHIRANGAKE",
    title:
      "「REAL vs TEXT BOOK」Japanese dialects will make your travels more exciting",
    description:
      "Discover authentic Japanese dialects beyond the textbook and make your travels in Japan even more exciting.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "「REAL vs TEXT BOOK」Japanese dialects will make your travels more exciting",
    description:
      "Discover authentic Japanese dialects beyond the textbook and make your travels in Japan even more exciting.",
  },
};

/* SHIRANGAKE - フラット軽量バージョン (Next.js) */
const ACTIVE: string[] | null = activeIds as string[];
const dialects = ACTIVE
  ? (dialectsAll as any[]).filter((d) => ACTIVE.includes(d.id))
  : (dialectsAll as any[]);

const i18n = {
  ui: (i18nAll as any).ui,
  d: Object.fromEntries(
    Object.entries((i18nAll as any).d).filter(([id]) =>
      dialects.some((d: any) => d.id === id)
    )
  ),
};

// JSON を <script> に埋め込むときに "</script>" で壊れないようエスケープ
const embed = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

export default function Page() {
  return (
    <>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: BODY_MARKUP.replace("{{COUNT}}", String(dialects.length)),
        }}
      />
      <script
        id="data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: embed(dialects) }}
      />
      <script
        id="i18n"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: embed(i18n) }}
      />
      <Boot />

      <footer className="site-footer">
        <div className="wrap footer-wrap">
          <p className="copyright">
            © {new Date().getFullYear()} SHIRANGAKE. All rights reserved.
          </p>
          <a
            href="https://innbuddy-japan.com/library/"
            target="_blank"
            rel="noopener noreferrer"
            className="lib-link"
          >
            InnBuddy Library ↗
          </a>
        </div>
      </footer>
    </>
  );
}