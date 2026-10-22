"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./LibraryVan.module.css";

interface Props {
  imageSrc?: string;
  href?: string;
  className?: string;
}

export default function LibraryVan({
  imageSrc = "/images/library-background.png",
  href = "/library",
  className = "",
}: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Link href={href} className={styles.bannerLink}>
        {/* 背景なし・自然な比率で綺麗に収まる画像 */}
        <Image
          src={imageSrc}
          alt="オウンドメディア一覧"
          width={1050}
          height={200}
          className={styles.bannerImage}
          priority
        />

        {/* ホバー時に回転して現れるバッジ */}
        <div className={styles.overlay}>
          <div className={styles.badge}>
            <span>オウンドメディア一覧を見る</span>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { LibraryVan };