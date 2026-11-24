"use client";

import { useEffect, useRef, useState } from "react";

// Google Translate 用のグローバル型宣言
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

interface Language {
  code: string;
  label: string;
  sub: string;
  short: string;
}

const LANGUAGES: Language[] = [
  { code: "en", label: "English", sub: "English (Base)", short: "EN" },
  { code: "zh-CN", label: "简体中文", sub: "Chinese", short: "中文" },
  { code: "th", label: "ไทย", sub: "Thai", short: "TH" },
  { code: "vi", label: "Tiếng Việt", sub: "Vietnamese", short: "VI" },
  { code: "es", label: "Español", sub: "Spanish", short: "ES" },
  { code: "ar", label: "العربية", sub: "Arabic", short: "AR" },
  { code: "id", label: "Bahasa Indonesia", sub: "Indonesian", short: "ID" },
  { code: "ru", label: "Русский", sub: "Russian", short: "RU" },
];

function setGoogleTransCookie(langCode: string) {
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (!langCode || langCode === "en") {
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=; path=/; domain=${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    return;
  }
  const value = `/en/${langCode}`;
  document.cookie = `googtrans=${value}; path=/`;
  if (host && host !== "localhost" && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    document.cookie = `googtrans=${value}; path=/; domain=.${host}`;
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const protectTerms = () => {
      document
        .querySelectorAll(
          ".brand-title, .footer-brand, .phrase-ja, .phrase-romaji, .inspector-name-ja, .card-ja"
        )
        .forEach((el) => {
          if (!el.classList.contains("notranslate")) {
            el.classList.add("notranslate");
            el.setAttribute("translate", "no");
          }
        });
    };
    protectTerms();
    const observer = new MutationObserver(() => protectTerms());
    observer.observe(document.body, { childList: true, subtree: true });

    const savedLang = localStorage.getItem("konmaike_lang");
    const cookieMatch = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
    const detected = cookieMatch?.[1] || savedLang || "en";
    if (LANGUAGES.some((l) => l.code === detected)) {
      setCurrentLang(detected);
    }

    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,zh-CN,th,vi,es,ar,id,ru",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const applyLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setOpen(false);
    localStorage.setItem("konmaike_lang", langCode);

    if (langCode === "en") {
      setGoogleTransCookie("en");
      if (
        document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl")
      ) {
        window.location.reload();
      }
      return;
    }

    setGoogleTransCookie(langCode);
    let attempts = 0;
    const triggerCombo = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (attempts < 25) {
        attempts += 1;
        setTimeout(triggerCombo, 200);
      }
    };
    triggerCombo();
  };

  const activeObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
      <div className="lang-switcher notranslate" translate="no" ref={dropdownRef}>
        <button
          type="button"
          className="btn-pill lang-switcher-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="hide-sm">{activeObj.label}</span>
          <span className="show-sm-only">{activeObj.short}</span>
          <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>▾</span>
        </button>
        {open && (
          <div className="lang-dropdown" role="listbox">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={lang.code === currentLang}
                className={`lang-option ${lang.code === currentLang ? "active" : ""}`}
                onClick={() => applyLanguage(lang.code)}
              >
                <span className="lang-option-native">{lang.label}</span>
                <span className="lang-option-sub">{lang.sub}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}