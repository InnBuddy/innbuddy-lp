import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'BRAND VISION REPORT 2026 | InnBuddy',
  description:
    'InnBuddy BRAND VISION REPORT 2026。日本の宿・地域のブランドを考えるデジタルフォトブック。',
  alternates: {
    canonical: 'https://innbuddy-japan.com/library/bvr/2026',
  },
  openGraph: {
    title: 'BRAND VISION REPORT 2026 | InnBuddy',
    description:
      '日本の宿・地域のブランドを考えるデジタルフォトブック。',
    url: 'https://innbuddy-japan.com/library/bvr/2026',
    siteName: 'InnBuddy',
    type: 'website',
  },
};

export default function BVR2026Page() {
  return (
    <main className={styles.page}>

      {/* Back navigation */}
      <div className={styles.topBar}>
        <Link href="/library/bvr">
          ← BRAND VISION REPORT
        </Link>

        <span>
          2026
        </span>
      </div>

      {/* Actual digital book */}
      <iframe
        src="/library/bvr/2026/index.html"
        title="BRAND VISION REPORT 2026"
        className={styles.book}
      />

    </main>
  );
}
