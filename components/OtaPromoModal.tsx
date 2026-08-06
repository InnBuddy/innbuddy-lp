'use client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function OtaPromoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[var(--background)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/40 hover:text-foreground text-2xl z-10"
        >
          &times;
        </button>

        {/* HERO */}
        <div className="bg-gradient-to-br from-[#93b37f] via-[#b8d4a8] to-white py-16 px-6 text-center">
          <h1 className="font-serif font-light text-5xl md:text-7xl text-[#00552e] mb-4">
            InnBuddy
          </h1>
          <p className="text-lg text-foreground/70 max-w-md mx-auto">
            地元からも愛され、国内・海外から人が集まる目的地化。
            <br />
            <span className="text-accent-rust font-semibold">デスティネーションデザイン</span>
          </p>
        </div>

        {/* SUPPORTED PLATFORMS */}
        <div className="py-8 border-b border-[var(--hairline)]">
          <p className="text-center text-xs tracking-[0.2em] text-accent-rust mb-4">Supported Platforms</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
            <span>楽天トラベル</span><span>じゃらん</span><span>一休</span>
            <span>Booking.com</span><span>Agoda</span><span>Trip.com</span>
            <span>Traveloka</span><span>Expedia</span><span>Hotels.com</span>
            <span>Airbnb</span><span>Yahoo!トラベル</span><span>るるぶ</span>
          </div>
        </div>

        {/* PROBLEMS */}
        <div className="py-16 px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-accent-rust mb-2">Common Pain Points</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
            こんな課題、ありませんか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'OTA設定が難しい', desc: '複数OTAの管理画面が異なり、設定に時間が取られる' },
              { title: '海外OTAが分からない', desc: '言語の壁と仕様の違いに戸惑い、手が出せない' },
              { title: '価格調整できない', desc: '競合分析と動的プライシングの知識が不足している' },
              { title: '口コミ返信できない', desc: '英語や中国語の口コミに対応できず機会損失' },
              { title: 'サイトコントローラーが難しい', desc: '導入方法も運用方法もわからず放置している' },
              { title: 'インバウンドを増やしたい', desc: '海外からの予約を獲得したいが方法がわからない' },
              { title: '人手不足', desc: 'OTA専任の担当者を置く余裕がない' },
              { title: 'OTA担当者との打ち合わせが負担', desc: '各OTAからの連絡対応が業務を圧迫する' },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-[var(--hairline)] bg-white/50">
                <div className="w-8 h-[1px] bg-accent-rust mb-3" />
                <h3 className="font-serif font-light text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="py-16 px-6 max-w-4xl mx-auto border-t border-[var(--hairline)]">
          <p className="text-xs tracking-[0.2em] text-accent-rust mb-2">Services</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8">
            トータルOTAマネジメント
          </h2>
          <p className="text-foreground/60 mb-8 max-w-md">
            販売戦略から運用、分析まで。宿のOTA運用を完全に代行します。
          </p>
          <div className="space-y-8">
            {[
              { title: 'OTA運用代行', desc: '楽天・じゃらん・Booking.comなど全OTAの日次運用を代行。在庫調整、価格設定、キャンペーン管理まで。' },
              { title: '販売戦略', desc: '競合分析と需要予測に基づく動的プライシング。季節・イベント・競合動向を加味した最適な販売計画を立案。' },
              { title: '価格調整', desc: 'AIを活用した自動価格調整システムの導入支援。収益最大化と満室率向上を両立させる価格戦略。' },
              { title: '競合分析', desc: '周辺施設の価格・口コミ・設備を継続モニタリング。差別化ポイントと改善領域を可視化したレポートを提供。' },
              { title: '海外OTA', desc: 'Booking.com・Agoda・Trip.com・Travelokaなど海外OTAの開設・運用・多言語対応をワンストップで支援。' },
              { title: '口コミ分析', desc: '全OTAの口コミを収集・分析。改善ポイントの抽出と返信代行。多言語口コミにも対応。' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 border border-accent-rust/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-rust font-serif text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif font-light text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="py-16 px-6 max-w-4xl mx-auto border-t border-[var(--hairline)]">
          <p className="text-xs tracking-[0.2em] text-accent-rust mb-2 text-center">Process</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-8 text-center">
            導入までの流れ
          </h2>
          <p className="text-foreground/60 text-center mb-8">
            リスクゼロで始められる、シンプルな5ステップ。
          </p>
          <div className="max-w-xl mx-auto">
            {['相談', '無料診断', '1ヶ月無料トライアル', '改善', '契約'].map((step, i) => (
              <div key={i} className="flex gap-6 pb-6 relative">
                {i < 4 && (
                  <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-accent-rust/20" />
                )}
                <div className="w-10 h-10 bg-accent-rust text-white flex items-center justify-center font-serif text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-serif font-light text-xl text-foreground mb-2">{step}</h3>
                  <p className="text-sm text-foreground/60">
                    {['無料オンライン相談で現状の課題をヒアリング', 'OTA運用状況を分析し、改善提案レポートを作成', '実際の運用を通じて効果を実感していただきます', 'データに基づく継続的な改善と最適化を実施', '成果に応じた月額契約で長期的なパートナーシップを構築'][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAMPAIGN */}
        <div className="py-16 px-6 max-w-4xl mx-auto border-t border-[var(--hairline)]">
          <div className="text-center mb-8">
            <p className="inline-flex items-center gap-2 bg-accent-rust/5 px-4 py-1 mb-4 text-xs tracking-[0.2em] text-accent-rust">
              ⭐ Limited Time Offer
            </p>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-foreground mb-4">
              期間限定特典
            </h2>
            <p className="text-foreground/60 max-w-md mx-auto">
              今なら、OTA運用代行のお申込みで以下の特典サービスを無料でご提供。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Instagram開設支援',
              'RED（小紅書）開設支援',
              'OTA掲載ページ改善',
              '人事サポート（HRBPO）',
              'スタッフ面談',
            ].map((item) => (
              <div key={item} className="p-6 border border-[var(--hairline)] bg-white/50 text-center">
                <h3 className="font-serif font-light text-lg text-foreground">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-6 text-center border-t border-[var(--hairline)]">
          <p className="text-xs tracking-[0.2em] text-accent-rust mb-4">Free OTA Consultation</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-foreground mb-6">
            無料OTA相談会
          </h2>
          <p className="text-foreground/60 mb-8">
            まずは気軽にお問い合わせください
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-accent-rust text-white px-10 py-3 text-sm tracking-widest hover:bg-[#9a3a2e] transition-colors font-['Zen_Old_Mincho']"
          >
            無料オンライン相談
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-foreground/40 mt-4">※ 相談は完全無料です。</p>
        </div>
      </div>
    </div>
  );
}
