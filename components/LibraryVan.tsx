'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LibraryVan() {
  const router = useRouter();

  const [vanX, setVanX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const currentX = useRef(0);
  const moved = useRef(false);

  // この距離まで右に動かしたらLibraryへ移動
  const THRESHOLD = 120;

  const goLibrary = () => {
    router.push('/library');
  };

  // バンを押した瞬間
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    setDragging(true);

    startX.current = e.clientX;
    currentX.current = 0;
    moved.current = false;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // バンを動かしている間
  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging) return;

    const delta = e.clientX - startX.current;

    // 少しでも動かしたらドラッグ扱い
    if (Math.abs(delta) > 6) {
      moved.current = true;
    }

    // 右方向だけ動かす
    if (delta > 0) {
      currentX.current = delta;

      // 最大320pxまで
      setVanX(Math.min(delta, 320));
    }
  };

  // 指・マウスを離した
  const handlePointerUp = () => {
    setDragging(false);

    // 120px以上右に動かしたらLibraryへ
    if (currentX.current >= THRESHOLD) {
      router.push('/library');
      return;
    }

    // そこまで動かしていなければ元に戻す
    setVanX(0);
    currentX.current = 0;
  };

  // ドラッグがキャンセルされた場合
  const handlePointerCancel = () => {
    setDragging(false);

    setVanX(0);
    currentX.current = 0;
    moved.current = false;
  };

  // 普通にクリックした場合
  const handleClick = () => {
    // ドラッグではなくクリックだった場合
    if (!moved.current) {
      goLibrary();
    }
  };

  return (
    <section className="w-full overflow-hidden py-8 md:py-12">

      {/* ========================================
          バナー全体
          上の3つのメディアカードと同じように
          横幅を80% / 最大1200pxにする
      ======================================== */}

      <div
        className="
          relative
          w-[80%]
          max-w-[1200px]
          mx-auto
        "
      >

        {/* ========================================
            背景
            バンが入っていない背景画像
        ======================================== */}

        <img
          src="/images/library-background.png"
          alt="WAAI — Finding Wow with Earth"
          draggable={false}
          className="
            block
            w-full
            h-auto
            select-none
          "
        />

        {/* ========================================
            ドラッグするバン
            バンだけが動く
        ======================================== */}

        <div
          role="link"
          tabIndex={0}
          aria-label="バンをクリックしてすべてのメディア一覧を見る"

          className="
            absolute
            left-[48%]
            bottom-[7%]
            w-[38%]
            touch-none
            cursor-grab
            active:cursor-grabbing
            select-none
            z-10
          "

          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}

          onClick={handleClick}

          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              goLibrary();
            }
          }}
        >

          {/* ========================================
              バン本体＋矢印
              この中だけ移動する
          ======================================== */}

          <div
            className="relative"
            style={{
              transform: `translateX(${vanX}px)`,

              transition: dragging
                ? 'none'
                : 'transform 0.35s ease',
            }}
          >

            {/* バン */}
            <img
              src="/images/waai-van.png"
              alt=""
              draggable={false}
              className="
                block
                w-full
                h-auto
                pointer-events-none
              "
            />

            {/* ========================================
                矢印
                バンと一緒に動く
            ======================================== */}

            <div
              className="
                absolute
                right-[-18%]
                top-1/2
                -translate-y-1/2

                w-12
                h-12

                md:w-14
                md:h-14

                rounded-full

                border
                border-black/30

                bg-white/70
                backdrop-blur-sm

                flex
                items-center
                justify-center

                pointer-events-none
              "
            >
              <span
                className="
                  text-2xl
                  md:text-3xl
                  text-black/70
                "
              >
                →
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
