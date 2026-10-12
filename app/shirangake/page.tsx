import "./shirangake.css";
import dialectsAll from "@/data/dialects.json";
import i18nAll from "@/data/i18n.json";
import activeIds from "@/data/active-dialects.json";
import { BODY_MARKUP } from "./body-markup";
import Boot from "./boot";

/**
 * SHIRANGAKE — 3D祭りバージョン (Next.js)
 */
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
    </>
  );
}