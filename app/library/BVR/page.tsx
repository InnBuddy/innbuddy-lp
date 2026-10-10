import Link from 'next/link';
import styles from './bvr.module.css';

export const metadata = {
  title: 'BRAND VISION REPORT | InnBuddy',
  description:
    '日本の宿・地域のブランドを考えるデジタルフォトブック。InnBuddy BRAND VISION REPORT。',
  alternates: {
    canonical: 'https://innbuddy-japan.com/library/bvr',
  },
  openGraph: {
    title: 'BRAND VISION REPORT | InnBuddy',
    description:
      '日本の宿・地域のブランドを考えるデジタルフォトブック。',
    url: 'https://innbuddy-japan.com/library/bvr',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

const reports = [
  {
    year: '2026',
    title: 'BRAND VISION REPORT 2026',
    description:
      '日本の宿・地域のブランドを考えるデジタルフォトブック',
    href: '/library/bvr/2026',
    preview: '/library/bvr/2026/index.html',
    status: 'published',
  },
  {
    year: '2027',
    title: 'BRAND VISION REPORT 2027',
    description:
      '次号のブランドビジョンレポートを準備しています。',
    href: '',
    preview: '',
    status: 'coming',
  },
];

export default function BVRPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/library">LIBRARY</Link>
          <span>/</span>
          <span>BRAND VISION REPORT</span>
        </nav>

        {/* Header */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            INNBUDDY DIGITAL PUBLICATION
          </p>

          <h1>BRAND VISION REPORT</h1>

          <p className={styles.subtitle}>
            日本の宿・地域のブランドを考えるデジタルフォトブック
          </p>

          <p className={styles.intro}>
            宿泊施設、地域、そして日本の風景。
            <br />
            InnBuddyが考える「滞在のブランド」を、
            写真と言葉で記録するデジタルレポート。
          </p>
        </header>

        {/* Archive */}
        <section className={styles.reports}>

          <div className={styles.sectionHeading}>
            <span>ARCHIVE</span>
            <span>BRAND VISION REPORT</span>
          </div>

          <div className={styles.grid}>

            {reports.map((report) => {

              /* =========================
                 Coming Soon
              ========================= */
              if (report.status === 'coming') {
                return (
                  <div
                    key={report.year}
                    className={`${styles.card} ${styles.comingCard}`}
                  >
                    <div className={styles.comingCover}>

                      <div className={styles.comingInner}>

                        <span className={styles.comingEyebrow}>
                          COMING SOON
                        </span>

                        <span className={styles.comingYear}>
                          2027
                        </span>

                        <h2>
                          BRAND VISION
                          <br />
                          REPORT
                        </h2>

                        <p>
                          GETTING READY
                        </p>

                      </div>

                    </div>

                    <div className={styles.cardMeta}>
                      <span>2027</span>
                      <span>GETTING READY</span>
                    </div>
                  </div>
                );
              }

              /* =========================
                 Published
              ========================= */
              return (
                <Link
                  key={report.year}
                  href={report.href}
                  className={styles.card}
                >
                  <div className={styles.coverWrapper}>

                    <iframe
                      src={report.preview}
                      title={report.title}
                      className={styles.preview}
                      loading="lazy"
                      scrolling="no"
                    />

                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>

                        <span className={styles.year}>
                          {report.year}
                        </span>

                        <h2>
                          {report.title}
                        </h2>

                        <p>
                          {report.description}
                        </p>

                        <span className={styles.open}>
                          OPEN REPORT
                          <span>→</span>
                        </span>

                      </div>
                    </div>

                  </div>

                  <div className={styles.cardMeta}>
                    <span>{report.year}</span>
                    <span>BRAND VISION REPORT</span>
                  </div>
                </Link>
              );
            })}

          </div>
        </section>

        {/* Back */}
        <div className={styles.back}>
          <Link href="/library">
            ← BACK TO LIBRARY
          </Link>
        </div>

      </div>
    </main>
  );
}
