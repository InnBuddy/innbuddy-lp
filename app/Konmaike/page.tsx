"use client";

import { useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import JapanMapSvg from "./JapanMapSvg";

export default function KonmaikePage() {
  useEffect(() => {
    const old = document.querySelector('script[data-nippon47-legacy="true"]');
    if (old) old.remove();

    const script = document.createElement("script");
    script.src = `/legacy.js?v=${Date.now()}`;
    script.setAttribute("data-nippon47-legacy", "true");
    document.body.appendChild(script);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Konmaike — Japan Prefecture Travel & Culture Guide",
    inLanguage: "en",
    description:
      "Self-contained English editorial atlas spanning all 47 prefectures of Japan with sightseeing highlights, regional cuisine, festival calendars, local cafes, and verified 2026 traveler essentials.",
  };

  return (
    <div className="konmaike-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Konmaike Home">
            <svg
              className="brand-seal"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="40" height="40" rx="10" fill="#C84231" />
              <path
                d="M9 13.5H31M11.5 18.5H28.5M14.5 13.5V30.5M25.5 13.5V30.5"
                stroke="#FAF8F4"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="20" cy="10" r="2.2" fill="#F9DF9F" />
            </svg>
            <div className="brand-text">
              <span className="brand-title">Konmaike</span>
              <span className="brand-sub">Japan Prefecture Guide</span>
            </div>
          </a>

          <nav className="main-nav" aria-label="Primary Navigation">
            <a href="#map-section" className="nav-link active">
              Explore Map
            </a>
            <a href="#sightseeing-section" className="nav-link">
              Sightseeing
            </a>
            <a href="#food-section" className="nav-link">
              Local Food
            </a>
            <a href="#events-section" className="nav-link">
              Events
            </a>
            <a href="#manners-section" className="nav-link">
              Japanese Manners
            </a>
            <a href="#help-section" className="nav-link">
              Help / SOS
            </a>
          </nav>

          <div className="header-actions">
            <LanguageSwitcher />
            <button
              type="button"
              className="btn-pill"
              id="open-saved-btn"
              aria-label="View saved trip prefectures"
            >
              <span>★</span>
              <span className="hide-sm">My Trip</span>
              <span className="saved-count-badge" id="saved-count">
                0
              </span>
            </button>
            <button
              type="button"
              className="mobile-menu-btn"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className="mobile-drawer"
        id="mobile-drawer"
        aria-label="Mobile Navigation"
      >
        <a href="#map-section" className="nav-link">
          Explore Map (日本地図から探す)
        </a>
        <a href="#sightseeing-section" className="nav-link">
          Recommended Sightseeing
        </a>
        <a href="#food-section" className="nav-link">
          Recommended Food
        </a>
        <a href="#events-section" className="nav-link">
          Recommended Events
        </a>
        <a href="#manners-section" className="nav-link">
          Japanese Manners &amp; Etiquette
        </a>
        <a href="#help-section" className="nav-link">
          Help &amp; Emergency Contacts (困った時の連絡先)
        </a>
        <a href="#prefecture-index" className="nav-link">
          All 47 Prefectures Index
        </a>
      </div>

      {/* HERO */}
      <main id="top">
        <section className="hero seigaiha-band has-photo-bg">
          <div
            className="photo-bg-slot photo-bg-hero has-photo"
            data-photo-wrap="photo-01"
            aria-hidden="true"
          >
            <img
              className="photo-slot-img"
              data-photo-slot="photo-01"
              data-src="/library/konmaike/photo-01.jpg"
              src="/library/konmaike/photo-01.jpg"
              alt="Scenic Japanese landscape hero background"
            />
          </div>

          <div className="container hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span>Japan Travel Atlas • 47 Prefectures</span>
              </div>
              <h1 className="hero-title">
                Discover Every Corner of <em>Japan</em>, Prefecture by
                Prefecture.
              </h1>
              <p className="hero-desc">
                Your enduring English guide to Japan&apos;s 47 prefectures—from
                powder snow peaks in Hokkaido and ancient temples in Kyoto to
                bustling food stalls in Fukuoka and tropical reefs in Okinawa.
              </p>

              <div className="hero-search-wrap">
                <div className="hero-search-box">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    id="global-search"
                    className="hero-search-input"
                    placeholder="Search prefectures, cities, ramen, temples, onsen..."
                    aria-label="Search Japan's 47 prefectures"
                  />
                  <button
                    type="button"
                    className="btn-primary"
                    id="hero-jump-map"
                    style={{ padding: "9px 18px" }}
                  >
                    Explore
                  </button>
                </div>
                <div
                  className="search-dropdown"
                  id="search-dropdown"
                  role="listbox"
                  aria-label="Search results"
                ></div>
              </div>

              <div className="hero-cta-row">
                <a href="#map-section" className="btn-primary">
                  Open Interactive Japan Map
                </a>
                <a href="#manners-section" className="btn-secondary">
                  First-Timer Etiquette Guide
                </a>
              </div>

              <div className="hero-quick-chips">
                <span>Popular jumps: </span>
                <button type="button" className="quick-chip" data-open-pref="JP-13">
                  Tokyo 東京
                </button>
                <button type="button" className="quick-chip" data-open-pref="JP-26">
                  Kyoto 京都
                </button>
                <button type="button" className="quick-chip" data-open-pref="JP-27">
                  Osaka 大阪
                </button>
                <button type="button" className="quick-chip" data-open-pref="JP-01">
                  Hokkaido 北海道
                </button>
                <button type="button" className="quick-chip" data-open-pref="JP-34">
                  Hiroshima 広島
                </button>
                <button type="button" className="quick-chip" data-open-pref="JP-47">
                  Okinawa 沖縄
                </button>
              </div>
            </div>

            <div className="hero-art-card">
              <figure
                className="photo-slot hero-photo-slot has-photo"
                data-photo-wrap="photo-02"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-02"
                  data-src="/library/konmaike/photo-02.jpg"
                  src="/library/konmaike/photo-02.jpg"
                  alt="Featured scenic view of Japan"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-02"
                ></figcaption>
              </figure>

              <div className="hero-stats">
                <div className="stat-box">
                  <div className="stat-num">47</div>
                  <div className="stat-lbl">Prefectures</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">7</div>
                  <div className="stat-lbl">Regions</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num" id="stat-landmarks">
                    653+
                  </div>
                  <div className="stat-lbl">Landmarks</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num" id="stat-foods">
                    362+
                  </div>
                  <div className="stat-lbl">Local Foods</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE JAPAN MAP */}
        <section className="section" id="map-section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  01 • INTERACTIVE ATLAS (日本地図から探す)
                </div>
                <h2 className="section-title">Explore Japan from the Map</h2>
                <p className="section-subtitle">
                  Hover or click any of Japan&apos;s 47 prefectures on the
                  map—or filter by region below—to preview key cities,
                  landmarks, soul food, and open its complete travel guide.
                </p>
              </div>
            </div>

            <div
              className="filter-bar"
              id="map-region-filters"
              role="tablist"
              aria-label="Filter map by Japanese region"
            >
              <button type="button" className="filter-btn active" data-region="ALL">
                All 47 Prefectures
              </button>
              <button type="button" className="filter-btn" data-region="Hokkaido/Tohoku">
                <span className="region-dot" style={{ background: "var(--reg-hokkaido)" }}></span>
                Hokkaido / Tohoku (7)
              </button>
              <button type="button" className="filter-btn" data-region="Kanto">
                <span className="region-dot" style={{ background: "var(--reg-kanto)" }}></span>
                Kanto (7)
              </button>
              <button type="button" className="filter-btn" data-region="Chubu/Hokuriku">
                <span className="region-dot" style={{ background: "var(--reg-chubu)" }}></span>
                Chubu / Hokuriku (9)
              </button>
              <button type="button" className="filter-btn" data-region="Kansai">
                <span className="region-dot" style={{ background: "var(--reg-kansai)" }}></span>
                Kansai (7)
              </button>
              <button type="button" className="filter-btn" data-region="Chugoku">
                <span className="region-dot" style={{ background: "var(--reg-chugoku)" }}></span>
                Chugoku (5)
              </button>
              <button type="button" className="filter-btn" data-region="Shikoku">
                <span className="region-dot" style={{ background: "var(--reg-shikoku)" }}></span>
                Shikoku (4)
              </button>
              <button type="button" className="filter-btn" data-region="Kyushu/Okinawa">
                <span className="region-dot" style={{ background: "var(--reg-kyushu)" }}></span>
                Kyushu / Okinawa (8)
              </button>
            </div>

            <div className="map-workbench">
              <div className="map-canvas-card">
                <div className="map-canvas-toolbar">
                  <span className="map-hint">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--vermilion)"
                      strokeWidth="2"
                    >
                      <path d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2" />
                    </svg>
                    Click any prefecture on the map to inspect details
                  </span>
                  <button type="button" className="quick-chip" id="reset-map-btn">
                    Reset to All Japan
                  </button>
                </div>

                <div className="map-svg-wrap" id="map-svg-container">
                  <JapanMapSvg />
                  <div
                    className="map-tooltip"
                    id="map-tooltip"
                    role="status"
                    aria-live="polite"
                  ></div>
                </div>
              </div>

              <aside
                className="inspector-card"
                id="pref-inspector"
                aria-live="polite"
              ></aside>
            </div>

            <div className="directory-box">
              <div className="directory-head">
                <strong
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.05rem",
                    color: "var(--indigo-dark)",
                  }}
                >
                  All 47 Prefectures Directory{" "}
                  <span
                    id="dir-count-label"
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.84rem",
                      color: "var(--ink-muted)",
                      fontWeight: 500,
                    }}
                  >
                    (Showing 47)
                  </span>
                </strong>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                  Click any pill to highlight on map &amp; inspect
                </span>
              </div>
              <div className="directory-grid" id="pref-directory-grid"></div>
            </div>
          </div>
        </section>

        {/* SCENIC GALLERY STRIP (PHOTOS 03-05) */}
        <div className="scenic-strip-band" aria-label="Scenic Japan Photo Gallery">
          <div className="container">
            <div className="scenic-strip-head">
              <h3>Scenic Japan Highlights</h3>
              <span>Regional scenery across Japan</span>
            </div>
            <div className="scenic-triptych-grid">
              <figure
                className="photo-slot scenic-triptych-slot has-photo"
                data-photo-wrap="photo-03"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-03"
                  data-src="/library/konmaike/photo-03.jpg"
                  src="/library/konmaike/photo-03.jpg"
                  alt="Northern and mountain scenery of Japan"
                  loading="lazy"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-03"
                ></figcaption>
              </figure>

              <figure
                className="photo-slot scenic-triptych-slot has-photo"
                data-photo-wrap="photo-04"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-04"
                  data-src="/library/konmaike/photo-04.jpg"
                  src="/library/konmaike/photo-04.jpg"
                  alt="Traditional shrines and historic townscapes in Japan"
                  loading="lazy"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-04"
                ></figcaption>
              </figure>

              <figure
                className="photo-slot scenic-triptych-slot has-photo"
                data-photo-wrap="photo-05"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-05"
                  data-src="/library/konmaike/photo-05.jpg"
                  src="/library/konmaike/photo-05.jpg"
                  alt="Coastal and island landscapes of Japan"
                  loading="lazy"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-05"
                ></figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* SECTION 2: RECOMMENDED SIGHTSEEING */}
        <section className="section section-alt" id="sightseeing-section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  02 • RECOMMENDED DESTINATIONS (お勧め観光地)
                </div>
                <h2 className="section-title">Recommended Sightseeing Spots</h2>
                <p className="section-subtitle">
                  From iconic UNESCO shrines and samurai castles to hidden
                  mountain ravines and panoramic night views across Japan.
                </p>
              </div>
            </div>

            <div className="filter-bar" id="sight-type-filters">
              <button type="button" className="filter-btn active" data-sight-mode="all">
                All Featured
              </button>
              <button type="button" className="filter-btn" data-sight-mode="full">
                All 47 Prefecture Guides
              </button>
              <button type="button" className="filter-btn" data-sight-mode="hidden">
                Hidden Gems &amp; Nature
              </button>
              <button type="button" className="filter-btn" data-sight-mode="scenic">
                Sunrise / Sunset / Night Views
              </button>
            </div>

            <div className="filter-bar" id="sight-region-filters">
              <button type="button" className="filter-btn active" data-sight-region="ALL">
                All Regions
              </button>
              <button type="button" className="filter-btn" data-sight-region="Hokkaido/Tohoku">
                Hokkaido/Tohoku
              </button>
              <button type="button" className="filter-btn" data-sight-region="Kanto">
                Kanto
              </button>
              <button type="button" className="filter-btn" data-sight-region="Chubu/Hokuriku">
                Chubu/Hokuriku
              </button>
              <button type="button" className="filter-btn" data-sight-region="Kansai">
                Kansai
              </button>
              <button type="button" className="filter-btn" data-sight-region="Chugoku">
                Chugoku
              </button>
              <button type="button" className="filter-btn" data-sight-region="Shikoku">
                Shikoku
              </button>
              <button type="button" className="filter-btn" data-sight-region="Kyushu/Okinawa">
                Kyushu/Okinawa
              </button>
            </div>

            <div className="cards-grid" id="sightseeing-grid"></div>
            <div className="load-more-wrap" id="sightseeing-more-wrap">
              <button type="button" className="btn-secondary" id="sightseeing-toggle-all">
                Show All 47 Prefectures
              </button>
            </div>

            <figure
              className="photo-slot scenic-panorama-slot has-photo"
              data-photo-wrap="photo-06"
            >
              <img
                className="photo-slot-img"
                data-photo-slot="photo-06"
                data-src="/library/konmaike/photo-06.jpg"
                src="/library/konmaike/photo-06.jpg"
                alt="Wide panoramic scenic landscape of Japan"
                loading="lazy"
              />
              <figcaption
                className="photo-slot-caption"
                data-photo-caption="photo-06"
              ></figcaption>
            </figure>
          </div>
        </section>

        {/* SECTION 3: RECOMMENDED FOOD */}
        <section className="section" id="food-section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  03 • REGIONAL SOUL CUISINE (お勧めフード)
                </div>
                <h2 className="section-title">
                  Recommended Local Food, Cafes &amp; Tea Houses
                </h2>
                <p className="section-subtitle">
                  Explore regional dishes from Hokkaido to Okinawa—with
                  practical ingredient context—plus 206 local kissaten, coffee
                  roasteries, tea rooms, and classic cafes across all 47
                  prefectures.
                </p>
              </div>
            </div>

            <div className="filter-bar" id="food-cat-filters">
              <button type="button" className="filter-btn active" data-food-cat="all">
                All Local Food
              </button>
              <button type="button" className="filter-btn" data-food-cat="noodles">
                Ramen &amp; Noodles
              </button>
              <button type="button" className="filter-btn" data-food-cat="seafood">
                Seafood &amp; Sushi
              </button>
              <button type="button" className="filter-btn" data-food-cat="meat">
                Wagyu, Pork &amp; Grill
              </button>
              <button type="button" className="filter-btn" data-food-cat="street">
                Street Food &amp; Savory
              </button>
              <button type="button" className="filter-btn" data-food-cat="sweets">
                Sweets, Tea &amp; Drinks
              </button>
              <button
                type="button"
                className="filter-btn"
                data-food-cat="cafes"
                id="cafes-filter-btn"
              >
                Cafes, Kissaten &amp; Tea Houses (206)
              </button>
            </div>

            <div className="advisory-strip" id="food-safety-banner">
              <strong>Dietary &amp; Ingredient Note:</strong> Tags highlight
              prominent dish ingredients for quick browsing—they are{" "}
              <strong>not a complete allergen list</strong> and cannot verify
              safety for severe allergies. Under Japan&apos;s Food Labeling Act,
              mandatory allergen disclosure (including wheat, buckwheat, dairy,
              egg, peanut, shrimp, crab, walnut, and cashew added in 2026)
              applies to packaged foods rather than restaurant menus, where
              kelp-bonito <em>dashi</em>, soy sauce (wheat), and shared
              fryers/utensils pose cross-contact risks. Always confirm
              ingredients directly with restaurant staff. Japan&apos;s Ministry
              of Health advises avoiding raw poultry (<em>torisashi</em>) due to{" "}
              <em>Campylobacter</em> risk; legal drinking age is{" "}
              <strong>20+</strong>.
            </div>

            <div className="cards-grid" id="food-grid"></div>

            <div id="cafe-panel-wrap" style={{ display: "none" }}>
              <div className="cafe-note-banner">
                <strong>
                  Local Cafes, Kissaten &amp; Tea Houses (206 Venues):
                </strong>{" "}
                A mix of classic Showa <em>kissaten</em>, neighborhood coffee
                roasteries, traditional wagashi tea salons, and cafe-restaurants
                across all 47 prefectures. Founding dates appear only where
                confirmed; check local hours and any posted photography
                guidelines upon arrival.
              </div>
              <div className="cafe-grid" id="cafe-grid"></div>
            </div>

            <div className="load-more-wrap" id="food-more-wrap">
              <button type="button" className="btn-secondary" id="food-toggle-all">
                Show All 47 Prefectures
              </button>
            </div>

            <div className="scenic-pair-grid">
              <figure
                className="photo-slot scenic-pair-slot has-photo"
                data-photo-wrap="photo-07"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-07"
                  data-src="/library/konmaike/photo-07.jpg"
                  src="/library/konmaike/photo-07.jpg"
                  alt="Japanese food market and yatai alley atmosphere"
                  loading="lazy"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-07"
                ></figcaption>
              </figure>

              <figure
                className="photo-slot scenic-pair-slot has-photo"
                data-photo-wrap="photo-08"
              >
                <img
                  className="photo-slot-img"
                  data-photo-slot="photo-08"
                  data-src="/library/konmaike/photo-08.jpg"
                  src="/library/konmaike/photo-08.jpg"
                  alt="Traditional Japanese kissaten and tea house scenery"
                  loading="lazy"
                />
                <figcaption
                  className="photo-slot-caption"
                  data-photo-caption="photo-08"
                ></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* SECTION 4: RECOMMENDED EVENTS */}
        <section className="section section-alt has-photo-bg" id="events-section">
          <div
            className="photo-bg-slot photo-bg-events has-photo"
            data-photo-wrap="photo-09"
            aria-hidden="true"
          >
            <img
              className="photo-slot-img"
              data-photo-slot="photo-09"
              data-src="/library/konmaike/photo-09.jpg"
              src="/library/konmaike/photo-09.jpg"
              alt="Japanese festival lanterns and seasonal scenery backdrop"
              loading="lazy"
            />
          </div>

          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  04 • SEASONAL MATSURI CALENDAR (おすすめイベント)
                </div>
                <h2 className="section-title">
                  Recommended Festivals &amp; Events
                </h2>
                <p className="section-subtitle">
                  Plan your journey around Japan&apos;s unforgettable seasonal
                  matsuri—giant glowing Nebuta floats, winter snow sculptures,
                  ancient fire rituals, and summer parades.
                </p>
              </div>
            </div>

            <div className="section-disclaimer">
              <strong>Seasonal Timing:</strong> Many matsuri follow weekends,
              lunar dates, or local trial schedules; always confirm exact
              yearly dates with municipal or shrine organizers before travel.
            </div>

            <div className="filter-bar" id="event-season-filters">
              <button type="button" className="filter-btn active" data-season="all">
                All Seasons
              </button>
              <button type="button" className="filter-btn" data-season="spring">
                Spring (Mar–May)
              </button>
              <button type="button" className="filter-btn" data-season="summer">
                Summer (Jun–Aug)
              </button>
              <button type="button" className="filter-btn" data-season="autumn">
                Autumn (Sep–Nov)
              </button>
              <button type="button" className="filter-btn" data-season="winter">
                Winter (Dec–Feb)
              </button>
            </div>

            <div className="cards-grid" id="events-grid"></div>
            <div className="load-more-wrap" id="events-more-wrap">
              <button type="button" className="btn-secondary" id="events-toggle-all">
                Show All Festivals
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: JAPANESE MANNERS & ETIQUETTE */}
        <section className="section" id="manners-section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  05 • TRAVEL WITH RESPECT (日本のマナー紹介)
                </div>
                <h2 className="section-title">
                  Japanese Manners &amp; Etiquette Guide
                </h2>
                <p className="section-subtitle">
                  Simple, thoughtful customs make traveling across Japan smooth
                  and deeply rewarding. Locals genuinely appreciate visitors who
                  make a small effort.
                </p>
              </div>
            </div>

            <div className="manners-grid manners-grid-9">
              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M3 6h18M5 9h14M7 6v14M17 6v14M12 6v3" />
                  </svg>
                </div>
                <h3 className="manner-title">Shrines &amp; Temples</h3>
                <p className="manner-desc">
                  At Shinto shrines, bow lightly before walking under the torii
                  gate and walk along the side—not the center of the path.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Rinse hands &amp; mouth via cupped palm
                    at the <em>temizuya</em> basin; bow twice, clap twice, bow
                    once at most shrines (note exceptions like Izumo Taisha
                    &amp; Usa Jingu use <strong>4 claps</strong>—follow posted
                    boards).
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Putting your mouth directly on the
                    wooden ladle, or clapping at quiet Buddhist temples.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M8 10c0-2 2-3 2-5M12 10c0-2 2-3 2-5M16 10c0-2 2-3 2-5M3 16c2.5-1.5 5 1.5 7.5 0s5 1.5 7.5 0 3 0 3 0M4 20h16" />
                  </svg>
                </div>
                <h3 className="manner-title">Onsen &amp; Hot Springs</h3>
                <p className="manner-desc">
                  Japanese hot springs are shared spaces for soaking, not
                  washing. Cleanliness before entering the bath is essential.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Wash &amp; rinse thoroughly at the
                    seated shower stations before stepping into the hot water.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Wearing swimsuits, dipping your
                    small modesty towel into the bath, or splashing. Check
                    tattoo policies in advance.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M4 20L19 4M9 21L21 8M4 13c0 4 3 7 8 7s8-3 8-7H4z" />
                  </svg>
                </div>
                <h3 className="manner-title">Dining, Tipping &amp; Chopsticks</h3>
                <p className="manner-desc">
                  Tipping is not customary in Japan; service charges are
                  generally included. In rare cases like private guides, a
                  discreet gratuity may be accepted, though never obligatory.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Say <em>Itadakimasu</em> before eating,
                    slurp noodles naturally, and rest chopsticks on the holder.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Never stick chopsticks upright in a
                    bowl of rice or pass food directly chopstick-to-chopstick.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <rect x="5" y="3" width="14" height="15" rx="3" />
                    <path d="M5 11h14M8 21l2-3M16 21l-2-3" />
                    <circle cx="9" cy="14.5" r="1" />
                    <circle cx="15" cy="14.5" r="1" />
                  </svg>
                </div>
                <h3 className="manner-title">Trains &amp; Public Transit</h3>
                <p className="manner-desc">
                  Japanese trains run with remarkable punctuality and calm
                  silence. Keep shared carriages peaceful for commuters.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Switch phones to silent mode, wear
                    backpacks in front when crowded, and queue at platform floor
                    markers.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Taking phone calls on trains,
                    playing audio without headphones, or eating on regular
                    commuter lines.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M3 16c0-2 2-3 5-3h3l3-5 4 2c1.5 1 3 3 3 6v2H3v-2z" />
                  </svg>
                </div>
                <h3 className="manner-title">Shoes, Tatami &amp; Slippers</h3>
                <p className="manner-desc">
                  Homes, ryokan inns, original castle keeps, certain temple
                  halls, and tatami dining rooms separate outdoor shoes from
                  clean indoor floors.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Remove shoes at the <em>genkan</em>{" "}
                    entryway, point toes toward the door, and wear provided
                    slippers indoors.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Wearing indoor slippers onto woven{" "}
                    <em>tatami</em> mats, or wearing dedicated bathroom slippers
                    back into rooms!
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                  </svg>
                </div>
                <h3 className="manner-title">Trash, Streets &amp; Cash</h3>
                <p className="manner-desc">
                  Street trash bins are rare outside transit stations,
                  convenience stores, and festival booths, helping neighborhoods
                  stay clean.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Keep a small bag handy for wrappers
                    until you reach a bin or hotel, finish snacks near the
                    vendor, and carry yen cash in rural areas.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Walking while eating (
                    <em>tabearuki</em>) on crowded shopping streets or smoking
                    outside designated zones.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M4 18h5l8-10h3M4 14h3l8-10h5" />
                    <circle cx="15" cy="18" r="2" />
                  </svg>
                </div>
                <h3 className="manner-title">Queues &amp; Escalators</h3>
                <p className="manner-desc">
                  Orderly lines are respected everywhere—at train doors, ramen
                  counters, and bus stops. On escalators, safety comes first.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Stand still and hold the handrail.
                    Official safety guidance encourages standing on both sides
                    rather than walking.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Walking or rushing up moving
                    escalators, cutting queues, or ignoring station staff signs.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                </div>
                <h3 className="manner-title">Photography &amp; Privacy</h3>
                <p className="manner-desc">
                  Privacy is deeply valued in Japan. Respect sacred spaces,
                  museum restrictions, and historic residential neighborhoods.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Ask permission before photographing
                    people, and look for camera-crossed signs inside temple
                    halls.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Chasing or blocking Geiko/Maiko in
                    Kyoto&apos;s Gion, or entering marked private alleys for
                    photos.
                  </div>
                </div>
              </article>

              <article className="manner-card">
                <div className="manner-icon-wrap">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
                <h3 className="manner-title">
                  Allergens, Packing &amp; Quarantine
                </h3>
                <p className="manner-desc">
                  Menu items frequently use soy sauce (wheat), fish{" "}
                  <em>dashi</em>, or shared cooking tools, while culinary
                  souvenirs follow air-safety and border quarantine rules.
                </p>
                <div className="manner-tips">
                  <div className="tip-do">
                    <strong>Do:</strong> Confirm severe allergies directly with
                    kitchen staff; pack knives &amp; &gt;100ml liquids in
                    checked bags; check MAFF export certificates &amp;
                    home-country rules before taking meat products abroad.
                  </div>
                  <div className="tip-avoid">
                    <strong>Avoid:</strong> Assuming unbadged dishes are
                    allergen-free, eating raw poultry (<em>torisashi</em> — MHLW
                    advises avoiding raw chicken due to <em>Campylobacter</em>),
                    or packing blades in cabin luggage.
                  </div>
                </div>
              </article>
            </div>

            <div className="phrases-bar">
              <div className="phrases-head">
                <h3>Five Everyday Phrases That Go a Long Way</h3>
                <span>
                  Polite Japanese expressions any traveler can use effortlessly
                </span>
              </div>
              <div className="phrases-grid">
                <div className="phrase-box">
                  <div className="phrase-romaji">Sumimasen</div>
                  <div className="phrase-ja">すみません</div>
                  <div className="phrase-en">
                    Excuse me / Sorry — perfect for getting attention politely.
                  </div>
                </div>
                <div className="phrase-box">
                  <div className="phrase-romaji">Arigato gozaimasu</div>
                  <div className="phrase-ja">ありがとうございます</div>
                  <div className="phrase-en">
                    Thank you very much — pairs naturally with a slight nod.
                  </div>
                </div>
                <div className="phrase-box">
                  <div className="phrase-romaji">Onegaishimasu</div>
                  <div className="phrase-ja">お願いします</div>
                  <div className="phrase-en">
                    Please — ideal when ordering food or handing over payment.
                  </div>
                </div>
                <div className="phrase-box">
                  <div className="phrase-romaji">Itadakimasu</div>
                  <div className="phrase-ja">いただきます</div>
                  <div className="phrase-en">
                    Thank you for this meal — spoken gently before eating.
                  </div>
                </div>
                <div className="phrase-box">
                  <div className="phrase-romaji">Gochisousama</div>
                  <div className="phrase-ja">ごちそうさまでした</div>
                  <div className="phrase-en">
                    Thank you for the delicious meal — say as you leave a
                    restaurant.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HELP & EMERGENCY CONTACTS */}
        <section className="section section-alt" id="help-section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  06 • HELP &amp; EMERGENCY CONTACTS (困った時の連絡先)
                </div>
                <h2 className="section-title">
                  Emergency Contacts &amp; Key Travel Rules
                </h2>
                <p className="section-subtitle">
                  Save these essential numbers and quick rules before you go—for
                  medical emergencies, disasters, trains, and airport customs.
                </p>
              </div>
            </div>

            <div className="help-grid">
              <article className="help-card help-card-emergency">
                <div className="help-card-header">
                  <div className="help-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 20 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3 className="help-card-title">Emergency &amp; 24/7 Support</h3>
                </div>
                <div className="sos-numbers">
                  <a href="tel:110" className="sos-box">
                    <span className="sos-label">Police (警察)</span>
                    <span className="sos-tel notranslate" translate="no">
                      110
                    </span>
                  </a>
                  <a href="tel:119" className="sos-box">
                    <span className="sos-label">Fire / Ambulance (救急)</span>
                    <span className="sos-tel notranslate" translate="no">
                      119
                    </span>
                  </a>
                  <a href="tel:05038162787" className="sos-box hotline">
                    <span className="sos-label">JNTO 24/7 Multilingual</span>
                    <span className="sos-tel notranslate" translate="no">
                      050-3816-2787
                    </span>
                  </a>
                </div>
                <p className="help-note">
                  <strong>Disaster Alerts:</strong> Download the free
                  15-language <strong>Safety tips</strong> app for real-time
                  earthquake, tsunami, volcano, and typhoon warnings.
                </p>
              </article>

              <article className="help-card">
                <div className="help-card-header">
                  <div className="help-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="5" y="3" width="14" height="15" rx="3" />
                      <path d="M5 11h14M8 21l2-3M16 21l-2-3" />
                    </svg>
                  </div>
                  <h3 className="help-card-title">Trains &amp; IC Cards</h3>
                </div>
                <ul className="help-list">
                  <li>
                    <strong>Major Cities:</strong> Tap{" "}
                    <strong>Suica, PASMO, or ICOCA</strong> across
                    participating urban rail and bus networks.
                  </li>
                  <li>
                    <strong>Zone Limit:</strong> You cannot use an IC card for a
                    single trip that crosses between separate IC regions.
                  </li>
                  <li>
                    <strong>Rural Areas:</strong> Keep <strong>yen cash</strong>{" "}
                    handy—many local buses and countryside trains are cash-only.
                  </li>
                </ul>
              </article>

              <article className="help-card">
                <div className="help-card-header">
                  <div className="help-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  </div>
                  <h3 className="help-card-title">
                    Tax-Free Shopping (Nov 2026+ Rules)
                  </h3>
                </div>
                <ul className="help-list">
                  <li>
                    <strong>Pay Tax-Included First:</strong> Spend{" "}
                    <strong>¥5,000+</strong> (before tax) per store/day.
                    Special sealed bags are no longer required.
                  </li>
                  <li>
                    <strong>Scan Before Check-In:</strong> Confirm items at
                    airport customs (kiosk or Visit Japan Web){" "}
                    <strong>before checking bags</strong> within 90 days.
                  </li>
                  <li>
                    <strong>Receive Refund Later:</strong> Customs inspection is
                    selective; confirmed tax refunds are remitted afterward.
                  </li>
                </ul>
              </article>

              <article className="help-card">
                <div className="help-card-header">
                  <div className="help-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1.3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                    </svg>
                  </div>
                  <h3 className="help-card-title">
                    Airport Baggage &amp; Souvenirs
                  </h3>
                </div>
                <ul className="help-list">
                  <li>
                    <strong>Knives &amp; Blades:</strong> Must go in{" "}
                    <strong>checked luggage only</strong> (carrying blades
                    onboard carries up to a ¥500,000 fine).
                  </li>
                  <li>
                    <strong>Meat Souvenirs:</strong> Pork buns and retort meat
                    curries may require MAFF export certificates and are
                    strictly banned at many destination borders.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 7: ACCESSIBLE 47-PREFECTURE DIRECTORY */}
        <section className="section" id="prefecture-index">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-eyebrow">
                  07 • COMPLETE REGIONAL DIRECTORY (47都道府県一覧)
                </div>
                <h2 className="section-title">
                  All 47 Prefectures Quick Reference
                </h2>
                <p className="section-subtitle">
                  A plain-text directory across Japan&apos;s seven regions for
                  quick browsing, screen-reader navigation, and complete
                  indexability without opening popups.
                </p>
              </div>
            </div>

            <div className="pref-index-grid">
              <details className="region-details" open>
                <summary>
                  Hokkaido &amp; Tohoku (7 Prefectures)
                  <span className="region-summary-meta">Browse 7 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-01">
                    <strong>Hokkaido (北海道)</strong> — Northern Powder Snow, Volcanic Lakes, and Sea-to-Table Abundance
                    <button type="button" className="index-open-btn" data-open-pref="JP-01">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-02">
                    <strong>Aomori (青森県)</strong> — Ancient Beech Forests, Orchard Valleys, and Summer Warrior Floats
                    <button type="button" className="index-open-btn" data-open-pref="JP-02">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-03">
                    <strong>Iwate (岩手県)</strong> — Mythical Folklore, Golden Temples, and the Rugged Sanriku Coast
                    <button type="button" className="index-open-btn" data-open-pref="JP-03">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-04">
                    <strong>Miyagi (宮城県)</strong> — City of Trees, Pine-Studded Bays, and Charcoal-Grilled Gyutan
                    <button type="button" className="index-open-btn" data-open-pref="JP-04">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-05">
                    <strong>Akita (秋田県)</strong> — Samurai Towns, Secluded Mountain Hot Springs, and Towering Lantern Poles
                    <button type="button" className="index-open-btn" data-open-pref="JP-05">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-06">
                    <strong>Yamagata (山形県)</strong> — Gaslit Hot Spring Alleys, Clifftop Mountain Temples, and Cherry Orchards
                    <button type="button" className="index-open-btn" data-open-pref="JP-06">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-07">
                    <strong>Fukushima (福島県)</strong> — Thatched Post Towns, Volcanic Emerald Lakes, and Resilient Samurai Spirit
                    <button type="button" className="index-open-btn" data-open-pref="JP-07">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Kanto (7 Prefectures)
                  <span className="region-summary-meta">Browse 7 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-08">
                    <strong>Ibaraki (茨城県)</strong> — Coastal Flower Hills, Classic Landscape Gardens, and Pacific Sunrise Torii
                    <button type="button" className="index-open-btn" data-open-pref="JP-08">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-09">
                    <strong>Tochigi (栃木県)</strong> — Gilded UNESCO Shrines, Wisteria Tunnels, and Crispy Utsunomiya Gyoza
                    <button type="button" className="index-open-btn" data-open-pref="JP-09">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-10">
                    <strong>Gunma (群馬県)</strong> — Steaming Yubatake Hot Springs, Daruma Crafts, and Silk Mill Heritage
                    <button type="button" className="index-open-btn" data-open-pref="JP-10">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-11">
                    <strong>Saitama (埼玉県)</strong> — Edo Warehouse Streets, Bonsai Villages, and Chichibu Mountain Floats
                    <button type="button" className="index-open-btn" data-open-pref="JP-11">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-12">
                    <strong>Chiba (千葉県)</strong> — Pacific Coastlines, Edo Canal Towns, and Tokyo-Bay Gateways
                    <button type="button" className="index-open-btn" data-open-pref="JP-12">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-13">
                    <strong>Tokyo (東京都)</strong> — Edo-Rooted Neighborhoods, Modern Architecture, and Street-Level Craft
                    <button type="button" className="index-open-btn" data-open-pref="JP-13">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-14">
                    <strong>Kanagawa (神奈川県)</strong> — Samurai Capitals, Red-Brick Ports, and Steaming Hakone Calderas
                    <button type="button" className="index-open-btn" data-open-pref="JP-14">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Chubu &amp; Hokuriku (9 Prefectures)
                  <span className="region-summary-meta">Browse 9 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-15">
                    <strong>Niigata (新潟県)</strong> — Snow-Country Rice Terraces, UNESCO Sado Gold Mines, and Craft Sake
                    <button type="button" className="index-open-btn" data-open-pref="JP-15">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-16">
                    <strong>Toyama (富山県)</strong> — Towering Tateyama Snow Walls, UNESCO Gokayama Villages, and Firefly Squid Bays
                    <button type="button" className="index-open-btn" data-open-pref="JP-16">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-17">
                    <strong>Ishikawa (石川県)</strong> — Gold-Leaf Samurai Gardens, Contemporary Art, and Sea of Japan Crab
                    <button type="button" className="index-open-btn" data-open-pref="JP-17">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-18">
                    <strong>Fukui (福井県)</strong> — Zen Mountain Monasteries, Dinosaur Fossils, and Basalt Sea Cliffs
                    <button type="button" className="index-open-btn" data-open-pref="JP-18">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-19">
                    <strong>Yamanashi (山梨県)</strong> — Mirror Lakes Beneath Mount Fuji, Vineyard Valleys, and Flat Hoto Noodles
                    <button type="button" className="index-open-btn" data-open-pref="JP-19">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-20">
                    <strong>Nagano (長野県)</strong> — Original Black Castles, Steaming Snow Monkeys, and Samurai Post Trails
                    <button type="button" className="index-open-btn" data-open-pref="JP-20">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-21">
                    <strong>Gifu (岐阜県)</strong> — Thatched Alpine Villages, Edo Merchant Streets, and Sizzling Hida Beef
                    <button type="button" className="index-open-btn" data-open-pref="JP-21">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-22">
                    <strong>Shizuoka (静岡県)</strong> — Mount Fuji Horizons, Coastal Tea Terraces, and Hot Spring Peninsulas
                    <button type="button" className="index-open-btn" data-open-pref="JP-22">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-23">
                    <strong>Aichi (愛知県)</strong> — Original Castle Keeps, Industrial Heritage, and Hatcho-Miso Comfort Food
                    <button type="button" className="index-open-btn" data-open-pref="JP-23">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Kansai (7 Prefectures)
                  <span className="region-summary-meta">Browse 7 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-24">
                    <strong>Mie (三重県)</strong> — Japan&apos;s Most Sacred Shinto Shrine, Ama Pearl Divers, and Ninja Citadels
                    <button type="button" className="index-open-btn" data-open-pref="JP-24">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-25">
                    <strong>Shiga (滋賀県)</strong> — Japan&apos;s Largest Ancient Lake, Original Samurai Keeps, and Shigaraki Kilns
                    <button type="button" className="index-open-btn" data-open-pref="JP-25">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-26">
                    <strong>Kyoto (京都府)</strong> — Imperial Temple Gardens, Living Artisan Guilds, and Mountain-Basin Seasons
                    <button type="button" className="index-open-btn" data-open-pref="JP-26">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-27">
                    <strong>Osaka (大阪府)</strong> — Neon Canals, Samurai Keeps, and Japan&apos;s Kitchen of Kuidaore Soul Food
                    <button type="button" className="index-open-btn" data-open-pref="JP-27">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-28">
                    <strong>Hyogo (兵庫県)</strong> — White Heron Castles, Cosmopolitan Port Bays, and Gold-Standard Kobe Beef
                    <button type="button" className="index-open-btn" data-open-pref="JP-28">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-29">
                    <strong>Nara (奈良県)</strong> — Ancient Eighth-Century Capitals, Bowing Sacred Deer, and Yoshino Cherry Ridges
                    <button type="button" className="index-open-btn" data-open-pref="JP-29">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-30">
                    <strong>Wakayama (和歌山県)</strong> — Sacred Kumano Trails, Mountaintop Temples, and Giant Tuna Markets
                    <button type="button" className="index-open-btn" data-open-pref="JP-30">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Chugoku (5 Prefectures)
                  <span className="region-summary-meta">Browse 5 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-31">
                    <strong>Tottori (鳥取県)</strong> — Coastal Sand Dunes, Sacred Cliff Temples, and Winter Crab Feasts
                    <button type="button" className="index-open-btn" data-open-pref="JP-31">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-32">
                    <strong>Shimane (島根県)</strong> — Ancient Mythology Shrines, World Heritage Silver Mines, and Serene Gardens
                    <button type="button" className="index-open-btn" data-open-pref="JP-32">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-33">
                    <strong>Okayama (岡山県)</strong> — Sun-Drenched Fruit Orchards, Edo Canal Warehouses, and Samurai Gardens
                    <button type="button" className="index-open-btn" data-open-pref="JP-33">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-34">
                    <strong>Hiroshima (広島県)</strong> — Floating Sacred Torii, Living Peace Memorials, and Sizzling Layered Okonomiyaki
                    <button type="button" className="index-open-btn" data-open-pref="JP-34">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-35">
                    <strong>Yamaguchi (山口県)</strong> — Cliffside Red Torii Tunnels, Five-Arched Wooden Bridges, and Pufferfish Cuisine
                    <button type="button" className="index-open-btn" data-open-pref="JP-35">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Shikoku (4 Prefectures)
                  <span className="region-summary-meta">Browse 4 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-36">
                    <strong>Tokushima (徳島県)</strong> — Roaring Tidal Whirlpools, Vine Canyon Bridges, and Four-Hundred-Year Awa Dance
                    <button type="button" className="index-open-btn" data-open-pref="JP-36">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-37">
                    <strong>Kagawa (香川県)</strong> — Island Art Museums, Centuries-Old Gardens, and Firm Hand-Kneaded Sanuki Udon
                    <button type="button" className="index-open-btn" data-open-pref="JP-37">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-38">
                    <strong>Ehime (愛媛県)</strong> — Historic Hot Springs, Original Hilltop Keeps, and Sun-Sweet Citrus Islands
                    <button type="button" className="index-open-btn" data-open-pref="JP-38">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-39">
                    <strong>Kochi (高知県)</strong> — Straw-Seared Bonito, Last Free-Flowing Rivers, and Original Castle Keeps
                    <button type="button" className="index-open-btn" data-open-pref="JP-39">Open Guide</button>
                  </div>
                </div>
              </details>

              <details className="region-details">
                <summary>
                  Kyushu &amp; Okinawa (8 Prefectures)
                  <span className="region-summary-meta">Browse 8 prefectures</span>
                </summary>
                <div className="region-pref-list">
                  <div className="index-pref-row" id="pref-jp-40">
                    <strong>Fukuoka (福岡県)</strong> — Open-Air Yatai Stalls, Silky Tonkotsu Ramen, and Centuries of Hakata Heritage
                    <button type="button" className="index-open-btn" data-open-pref="JP-40">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-41">
                    <strong>Saga (佐賀県)</strong> — Four Centuries of Porcelain Kilns, Balloon-Filled Skies, and Ancient Settlements
                    <button type="button" className="index-open-btn" data-open-pref="JP-41">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-42">
                    <strong>Nagasaki (長崎県)</strong> — Terraced Harbor Panoramas, Maritime Crossroads, and Wa-Ka-Ran Cuisine
                    <button type="button" className="index-open-btn" data-open-pref="JP-42">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-43">
                    <strong>Kumamoto (熊本県)</strong> — Mighty Volcanic Calderas, Resilient Black Castles, and Mountain Onsen
                    <button type="button" className="index-open-btn" data-open-pref="JP-43">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-44">
                    <strong>Oita (大分県)</strong> — Japan&apos;s Hot Spring Capital of Steaming Hells, Mist Lakes, and Crispy Toriten
                    <button type="button" className="index-open-btn" data-open-pref="JP-44">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-45">
                    <strong>Miyazaki (宮崎県)</strong> — Mythological Basalt Gorges, Cliff-Cave Shrines, and Subtropical Coastlines
                    <button type="button" className="index-open-btn" data-open-pref="JP-45">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-46">
                    <strong>Kagoshima (鹿児島県)</strong> — Smoking Bay Volcanoes, Millennia-Old Yakushima Cedars, and Volcanic Sand Baths
                    <button type="button" className="index-open-btn" data-open-pref="JP-46">Open Guide</button>
                  </div>
                  <div className="index-pref-row" id="pref-jp-47">
                    <strong>Okinawa (沖縄県)</strong> — Coral Reef Lagoons, Subtropical Forests, and Ryukyu Island Heritage
                    <button type="button" className="index-open-btn" data-open-pref="JP-47">Open Guide</button>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer has-photo-bg">
        <div
          className="photo-bg-slot photo-bg-footer has-photo"
          data-photo-wrap="photo-10"
          aria-hidden="true"
        >
          <img
            className="photo-slot-img"
            data-photo-slot="photo-10"
            data-src="/library/konmaike/photo-10.jpg"
            src="/library/konmaike/photo-10.jpg"
            alt="Evening horizon or night view of Japan footer backdrop"
            loading="lazy"
          />
        </div>

        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Konmaike</div>
              <p className="footer-text">
                An editorial English travel atlas designed for international
                visitors exploring all 47 prefectures of Japan—from northern
                snow country to tropical Okinawa.
              </p>
              <span style={{ fontSize: "0.78rem", color: "#90A8C0" }}>
                Japan Prefecture Travel &amp; Culture Guide
              </span>
            </div>

            <div>
              <h4 className="footer-heading">Explore Sections</h4>
              <ul className="footer-links">
                <li><a href="#map-section">Explore from Japan Map</a></li>
                <li><a href="#sightseeing-section">Recommended Sightseeing</a></li>
                <li><a href="#food-section">Recommended Food &amp; Cafes</a></li>
                <li><a href="#events-section">Recommended Events</a></li>
                <li><a href="#manners-section">Japanese Manners Guide</a></li>
                <li><a href="#help-section">Help &amp; Emergency Contacts</a></li>
                <li><a href="#prefecture-index">All 47 Prefectures Index</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Browse by Region</h4>
              <ul className="footer-links">
                <li><button type="button" data-footer-region="Hokkaido/Tohoku">Hokkaido / Tohoku (7)</button></li>
                <li><button type="button" data-footer-region="Kanto">Kanto (7)</button></li>
                <li><button type="button" data-footer-region="Chubu/Hokuriku">Chubu / Hokuriku (9)</button></li>
                <li><button type="button" data-footer-region="Kansai">Kansai (7)</button></li>
                <li><button type="button" data-footer-region="Chugoku">Chugoku (5)</button></li>
                <li><button type="button" data-footer-region="Shikoku">Shikoku (4)</button></li>
                <li><button type="button" data-footer-region="Kyushu/Okinawa">Kyushu / Okinawa (8)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Need Help in Japan?</h4>
              <ul className="essentials-list">
                <li>
                  <strong>Police:</strong>{" "}
                  <span className="notranslate" translate="no">110</span>{" "}
                  <strong>Ambulance / Fire:</strong>{" "}
                  <span className="notranslate" translate="no">119</span>
                </li>
                <li>
                  <strong>JNTO 24/7 Hotline:</strong>{" "}
                  <span className="notranslate" translate="no">050-3816-2787</span>
                </li>
                <li>
                  <a
                    href="#help-section"
                    style={{ color: "#F2C97D", textDecoration: "underline" }}
                  >
                    View Emergency Contacts, Tax-Free &amp; Baggage Rules
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              2026 Konmaike — Japan 47 Prefectures Travel Atlas (Major
              Advisories &amp; Highlighted Claims Verified Nov 2026)
            </span>
            <span>
              Map Attribution: Adapted from Geolonia&apos;s Japanese Prefectures
              SVG (based on Wikipedia 日本地図.svg), licensed under GFDL •
              Source: github.com/geolonia/japanese-prefectures
            </span>
          </div>
        </div>
      </footer>

      {/* FULL PREFECTURE MODAL */}
      <div
        className="modal-backdrop"
        id="pref-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-pref-title"
      >
        <div className="modal-dialog">
          <div className="modal-header">
            <div>
              <div className="pref-badges" id="modal-badges"></div>
              <h2 className="inspector-name-en" id="modal-pref-title">
                Tokyo <span className="inspector-name-ja">東京都</span>
              </h2>
              <p
                id="modal-catchphrase"
                style={{
                  margin: "6px 0 0",
                  fontSize: "0.92rem",
                  color: "var(--ink-muted)",
                }}
              ></p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                className="btn-bookmark"
                id="modal-bookmark-btn"
              >
                ☆ Save
              </button>
              <button
                type="button"
                className="modal-close"
                id="modal-close-btn"
                aria-label="Close prefecture guide"
              >
                ×
              </button>
            </div>
          </div>

          <div className="modal-tabs" role="tablist" id="modal-tabs">
            <button type="button" className="modal-tab active" data-mtab="overview">
              Overview &amp; Spots
            </button>
            <button type="button" className="modal-tab" data-mtab="food">
              Food &amp; Local Cafes
            </button>
            <button type="button" className="modal-tab" data-mtab="culture">
              Culture, Nature &amp; Crafts
            </button>
            <button type="button" className="modal-tab" data-mtab="events">
              Festivals &amp; Views
            </button>
          </div>

          <div className="modal-body" id="modal-body"></div>

          <div className="modal-footer">
            <button type="button" className="nav-pref-btn" id="modal-prev-btn">
              ← Previous
            </button>
            <span
              id="modal-counter"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.8rem",
                color: "var(--ink-muted)",
              }}
            >
              JP-13/47
            </span>
            <button type="button" className="nav-pref-btn" id="modal-next-btn">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* SAVED TRIP MODAL */}
      <div
        className="modal-backdrop"
        id="saved-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-modal-title"
      >
        <div className="modal-dialog" style={{ maxWidth: 640 }}>
          <div className="modal-header">
            <div>
              <div className="section-eyebrow" style={{ marginBottom: "4px" }}>
                PERSONAL BUCKET LIST
              </div>
              <h2
                className="inspector-name-en"
                id="saved-modal-title"
                style={{ fontSize: "1.45rem" }}
              >
                My Japan Trip List
              </h2>
            </div>
            <button
              type="button"
              className="modal-close"
              id="saved-close-btn"
              aria-label="Close saved trip modal"
            >
              ×
            </button>
          </div>
          <div className="modal-body" id="saved-modal-body"></div>
          <div className="modal-footer">
            <button type="button" className="nav-pref-btn" id="clear-saved-btn">
              Clear Saved List
            </button>
            <button
              type="button"
              className="btn-primary"
              id="saved-done-btn"
              style={{ padding: "8px 18px" }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}