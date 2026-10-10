"use client";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#222]">
      {/* Header */}
      <section className="px-6 pt-20 pb-12 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-[#777]">
          PRIVACY POLICY
        </p>

        <h1 className="text-3xl font-medium tracking-[0.08em] md:text-4xl">
          個人情報保護方針
        </h1>

        <div className="mx-auto mt-6 h-px w-10 bg-[#222]" />
      </section>

      {/* Content */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-[820px] border border-[#dedede] bg-white px-7 py-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] md:px-14 md:py-14">
          
          <div className="space-y-10 text-[15px] leading-[1.95] tracking-[0.02em] text-[#444]">
            
            {/* Introduction */}
            <div>
              <p>
                InnBuddy（以下「当社」といいます。）は、個人情報の重要性を認識し、
                個人情報を適切に保護・管理することを重要な責務と考えています。
              </p>

              <p className="mt-5">
                当社は、個人情報の保護に関する法律その他の関連法令を遵守し、
                以下のとおり個人情報保護方針を定め、個人情報の適切な取り扱いに努めます。
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                1. 個人情報の取得
              </h2>

              <p>
                当社は、サービスの提供、お問い合わせへの対応、その他必要な業務を
                遂行するために、適正かつ公正な手段によって個人情報を取得します。
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                2. 個人情報の利用目的
              </h2>

              <p>
                当社は、取得した個人情報を、以下の目的の範囲内で利用します。
              </p>

              <ul className="mt-4 space-y-2 pl-5">
                <li className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-1 before:w-1 before:rounded-full before:bg-[#777]">
                  お問い合わせへの対応
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-1 before:w-1 before:rounded-full before:bg-[#777]">
                  当社サービスの提供および運営
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-1 before:w-1 before:rounded-full before:bg-[#777]">
                  サービスの改善および品質向上
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-1 before:w-1 before:rounded-full before:bg-[#777]">
                  必要なご連絡および情報提供
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-[0.85em] before:h-1 before:w-1 before:rounded-full before:bg-[#777]">
                  その他、上記利用目的に付随する業務
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                3. 個人情報の管理
              </h2>

              <p>
                当社は、取得した個人情報について、漏えい、滅失または毀損等を防止するため、
                必要かつ適切な安全管理措置を講じます。
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                4. 個人情報の第三者提供
              </h2>

              <p>
                当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を
                第三者に提供することはありません。
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                5. 個人情報の開示・訂正・削除等
              </h2>

              <p>
                ご本人から、自己の個人情報について開示、訂正、追加、削除、
                利用停止等のお申し出があった場合には、法令に従い適切に対応します。
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                6. 法令および規範の遵守
              </h2>

              <p>
                当社は、個人情報の保護に関する法令およびその他の関連する規範を遵守します。
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                7. 個人情報保護方針の変更
              </h2>

              <p>
                当社は、必要に応じて本方針を変更することがあります。
                変更した場合は、当社ウェブサイト上に掲載するなど、
                適切な方法によりお知らせします。
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-[#e5e5e5] pt-8">
              <h2 className="mb-4 border-l-2 border-[#222] pl-4 text-lg font-medium tracking-[0.04em] text-[#222]">
                お問い合わせ
              </h2>

              <p>
                個人情報の取り扱いに関するお問い合わせは、
                当社のお問い合わせフォームよりご連絡ください。
              </p>

              <div className="mt-7 text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border border-[#222] px-8 py-3 text-sm tracking-[0.08em] transition hover:bg-[#222] hover:text-white"
                >
                  お問い合わせはこちら
                </a>
              </div>
            </section>

            {/* Date */}
            <div className="border-t border-[#e5e5e5] pt-7 text-right text-xs leading-relaxed text-[#888]">
              <p>制定日：2026年10月</p>
              <p className="mt-1">InnBuddy</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}