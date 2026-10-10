import type { Metadata } from "next";
import "./team.css";

export const metadata: Metadata = {
  title: "運営チームについて | InnBuddy",
  description:
    "InnBuddyを運営する2名の共同創業者と、私たちが持つ経験・専門性、宿泊施設への向き合い方についてご紹介します。",
};

const experiences = [
  {
    number: "01",
    title: "OTA・宿泊施設支援",
    headline: "大手OTAで累計300施設以上の集客・売上改善に携わった経験",
    text: "宿泊施設の販売戦略、プラン設計、料金設定、掲載内容、集客施策など、OTAを活用した実務的な改善経験があります。",
  },
  {
    number: "02",
    title: "観光・旅行企画",
    headline: "大手旅行会社での全国の旅行企画・観光地プロデュース経験",
    text: "宿泊施設単体だけでなく、地域・観光・旅行者という視点から、宿の魅力をどのように伝えるかを考えてきました。",
  },
  {
    number: "03",
    title: "採用・組織づくり",
    headline: "大手人材会社で約1,000社の採用支援に携わった経験",
    text: "宿泊施設にとって重要な「人」の課題についても、採用コストや人材確保だけでなく、現場の運営まで含めて考えることができます。",
  },
  {
    number: "04",
    title: "海外人材・グローバル事業",
    headline: "ASEAN 4カ国における外国人材の採用支援経験",
    text: "異なる文化や価値観を持つ人材と働く経験を通じて、多言語・多文化環境における組織づくりやコミュニケーションについても知見を蓄積してきました。",
  },
  {
    number: "05",
    title: "海外での経営・マネジメント",
    headline: "海外事業のマネジメント経験",
    text: "実際に海外で事業を運営してきたからこそ、経営者が抱える責任や、売上だけでは判断できない現場の難しさも理解しています。また、日系大手上場企業を含む約300社の採用・組織づくりに携わり、現地責任者とともに人材面から事業成長をサポートしてきました。",
  },
  {
    number: "06",
    title: "学術・データ分析",
    headline: "海外MBAでの研究・統計分析の経験",
    text: "感覚や経験だけに頼るのではなく、データを整理・分析し、仮説を立てて検証するという視点を大切にしています。",
  },
  {
    number: "07",
    title: "グローバルな視点",
    headline: "海外3カ国・5年以上の居住経験、約80カ国の渡航経験",
    text: "日本国内だけの視点ではなく、さまざまな国や地域で生活・仕事・旅行を経験してきたからこそ見える、世界の旅行者の価値観や感覚を支援に取り入れています。",
  },
];

const strengths = [
  {
    number: "01",
    title: "OTAの現場を知っているからこそできる、実務的な集客支援",
    paragraphs: [
      "OTA運用は、単にプランを登録したり、料金を変更したりするだけではありません。施設の特徴、立地、客室、競合、旅行者のニーズなどを踏まえ、どのように見せ、どのようなプランをつくり、どのタイミングで販売するのかを考える必要があります。",
      "ここで、大手旅行会社での旅行企画経験が活きます。旅行者が「どこへ行くか」「何をするか」「どこに泊まるか」を考える、その一連の旅行体験を理解したうえで、宿泊施設の魅力をどのように伝えるかを考える。",
      "さらに、大手OTAで300施設以上の支援に携わってきた経験をもとに、施設ごとの状況を分析し、オンラインだけでなく、実際の旅行体験や現場まで含めて、「その宿だからこそ選ばれる理由」をOTA上で伝えることを大切にしています。",
    ],
  },
  {
    number: "02",
    title: "売上だけではなく、「利益が残るか」を考える",
    paragraphs: [
      "予約数や売上を増やすことに意識が集中しがちです。しかし実際には、販売価格、販売経路、客室稼働、手数料、運営コスト、スタッフの負担など、さまざまな要素を考えなければ、本当の意味で経営が改善したとは言えません。",
      "私たちは、事業運営やマネジメント経験も活かし「どうすれば売上が増えるか」だけでなく、「どうすれば経営として持続するか」という視点を持って支援します。",
      "短期的なOTA改善と、中長期的な経営計画の方向性をつなげて考えること。それをInnBuddyの重要な役割の一つだと考えています。",
    ],
  },
  {
    number: "03",
    title: "データと市場理解を組み合わせて考える",
    paragraphs: [
      "宿泊施設の改善には、現場の経験もデータも必要です。またデータには現れないリアルな感覚も重要です。",
      "予約状況や販売実績などのデータを分析しながら、旅行者の動向、市場環境、競合状況などを整理し、何が課題なのかをできるだけ客観的に捉えます。",
      "また、海外MBAでの研究・統計分析の経験や、海外で築いてきたネットワークも活用し、必要に応じて国内外の情報を収集します。「なんとなく流行っているから」ではなく、データと現場感覚の両方から考える。それが私たちの基本姿勢です。",
    ],
  },
  {
    number: "04",
    title: "日本だけではなく、世界から旅行者を見る",
    paragraphs: [
      "観光市場を考えるとき、日本国内の情報だけでは見えないことがあります。どのような旅行先が選ばれているのか。旅行者は何に価値を感じるのか。どのような情報を見て宿泊先を決めるのか。",
      "海外3カ国での居住経験や約80カ国への渡航経験など、これまでに培ってきたグローバルな視点を活かし、日本の宿泊施設を世界の旅行者から見る視点を取り入れます。",
      "英語でのコミュニケーションにも対応し、国内外の情報を収集しながら、インバウンド需要も捉えていきます。",
    ],
  },
  {
    number: "05",
    title: "集客だけでなく、「現場が回ること」まで考える",
    paragraphs: [
      "集客の先には、お客様を迎える現場があります。予約が増えても、スタッフが不足していたり、現場のオペレーションに無理が生じたりすれば、長期的には施設の負担になってしまいます。",
      "私たちは、これまでの採用支援や外国人材事業の経験も活かし、「集客できるか」だけではなく、「集客した後も現場が無理なく運営できるか」という視点を持ちます。",
      "販売・人材・現場・収益という複数の要素を切り離さずに考えることが、持続的な成長につながると考えています。",
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="team-page">
      <div className="team-bg" aria-hidden="true">
        <span className="bg-circle bg-circle-01" />
        <span className="bg-circle bg-circle-02" />
      </div>

      {/* HERO */}
      <section className="team-hero grid-navy">
        <div className="team-container">
          <div className="eyebrow">
            <span>INNBUDDY</span>
            <i />
            <span>TEAM</span>
          </div>

          <h1>
            InnBuddy
            <br />
            運営チームについて
          </h1>

          <p className="hero-lead">
            私たち自身が、
            <br className="mobile-only" />
            宿泊施設の課題に向き合います。
          </p>

          <div className="hero-copy">
            <p>
              InnBuddyは、観光・OTA運用・採用・組織づくり・経営分析・マーケティング・グローバル事業など、それぞれ異なる領域で経験を積んできた2名の共同創業者によって運営しています。
            </p>

            <p>
              私たちが大切にしているのは、単にWeb上の集客を増やしたり、目先の売上を伸ばしたりすることだけではありません。
            </p>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="section section-approach grid-royal">
        <div className="team-container">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <span className="section-label">OUR APPROACH</span>
              <h2>
                宿泊施設の課題を、
                <br />
                一つの視点だけで見ない。
              </h2>
            </div>
          </div>

          <div className="approach-layout">
            <div className="approach-side">
              <span>REAL PROBLEMS</span>
            </div>

            <div className="approach-content">
              <p>
                宿泊施設には、OTAの販売戦略だけでは解決できないさまざまな課題があります。
              </p>

              <div className="quote-list">
                <div>「予約は増えたけれど、利益が残らない」</div>
                <div>「集客したいけれど、現場の人手が足りない」</div>
                <div>
                  「外国人旅行者を取り込みたいけれど、何から始めればいいかわからない」
                </div>
                <div>
                  「日々の運営に追われ、中長期的な経営について考える時間がない」
                </div>
              </div>

              <p>
                私たちは、こうした悩みを理解したうえで、集客・収益・現場・経営を切り離さずに考えることを大切にしています。
              </p>

              <p>
                まずはOTA運用という身近な課題から、一つひとつ改善を積み重ねる。そして、その先にある宿泊施設の持続的な成長まで一緒に考える。
              </p>

              <p className="emphasis">
                それが、私たちInnBuddyのスタンスです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section section-experience grid-navy">
        <div className="team-container">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <span className="section-label">EXPERIENCE & EXPERTISE</span>
              <h2>
                私たちが持つ
                <br />
                経験と専門性
              </h2>
            </div>
          </div>

          <p className="section-intro">
            2名それぞれが異なる領域で経験を積んできたからこそ、一つの視点だけでは見えにくい宿泊施設の課題を、多角的に捉えることができます。
          </p>

          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-item" key={item.number}>
                <div className="experience-number">{item.number}</div>

                <div className="experience-title">
                  <span>{item.title}</span>
                  <strong>{item.headline}</strong>
                </div>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="section section-strengths grid-royal">
        <div className="team-container">
          <div className="section-heading">
            <span className="section-number">03</span>
            <div>
              <span className="section-label">OUR STRENGTHS</span>
              <h2>
                InnBuddyが大切にする
                <br />
                5つの強み
              </h2>
            </div>
          </div>

          <div className="strength-list">
            {strengths.map((strength) => (
              <article className="strength-item" key={strength.number}>
                <div className="strength-top">
                  <span className="strength-number">{strength.number}</span>
                  <h3>{strength.title}</h3>
                </div>

                <div className="strength-body">
                  {strength.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="section section-vision grid-navy">
        <div className="team-container">
          <div className="section-heading">
            <span className="section-number">04</span>
            <div>
              <span className="section-label">OUR VISION</span>
              <h2>
                「宿を売る」だけではなく、
                <br />
                「宿の価値を高める。」
              </h2>
            </div>
          </div>

          <div className="vision-layout">
            <div className="vision-statement">
              <span>WHAT WE DO</span>
              <strong>
                小さな改善の積み重ねが、
                <br />
                宿の未来を変えていく。
              </strong>
            </div>

            <div className="vision-copy">
              <p>InnBuddyがまず取り組むのは、宿泊施設のOTA運用です。</p>

              <p>
                日々の販売状況を分析し、プランや料金、掲載内容、販売戦略を改善する。一つひとつは小さな改善かもしれません。
              </p>

              <p>
                しかし、その積み重ねによって、宿泊施設の魅力がより正しく旅行者に伝わり、選ばれる機会が増えていく。
              </p>

              <p>
                私たちは、そんな「小さな改善の積み重ね」を大切にしています。
              </p>

              <p>
                そして、OTA運用を通じて得られる現場の知見を将来的には、OTAやWeb上の集客だけにとどまらず、施設そのものの体験や地域とのつながりまで含めて、宿泊施設の価値を高める支援へと領域を広げていきたいと考えています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION DESIGN */}
      <section className="destination-section grid-royal">
        <div className="destination-line" aria-hidden="true" />

        <div className="team-container">
          <div className="destination-label">FUTURE VISION</div>

          <h2>
            グローバル
            <br />
            デスティネーションデザインへ
          </h2>

          <p className="destination-lead">
            持続的に選ばれる「目的地」になるためには、
            <br className="desktop-only" />
            一つの施策だけでは十分ではありません。
          </p>

          <div className="destination-copy">
            <p>
              宿泊施設の魅力を磨き、旅行者に伝え、実際の体験につなげる。そして、その施設がある地域そのものの魅力も含めて、国内外の旅行者に届けていく。
            </p>

            <p>
              InnBuddyでは将来的に、日本と海外のネットワークを活用しながら、国内外の市場調査・戦略策定、多言語での情報発信、OTA集客、Webデザイン＆マーケティング、D2C販売戦略、さらに施設での体験設計やデザインまで、オンラインとオフラインの両面から、段階的に支援領域を広げていく構想を持っています。
            </p>
          </div>

          <div className="destination-philosophy">
            <span>WORLD × LOCAL</span>
            <strong>世界を理解し、地域を尊重する。</strong>
            <p>
              世界の視点と地域への理解を掛け合わせ、宿泊施設と地域が持つ本来の魅力を、まだ知らない旅行者へ届ける。
            </p>
          </div>

          <div className="destination-name">
            <span>INNBUDDY</span>
            <strong>Destination Design</strong>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section section-team grid-navy">
        <div className="team-container">
          <div className="section-heading">
            <span className="section-number">05</span>
            <div>
              <span className="section-label">THE TEAM</span>
              <h2>
                2人だからこそ、
                <br />
                できること。
              </h2>
            </div>
          </div>

          <div className="team-intro">
            <p>
              私たちは、まだ大きな組織ではありません。
              <br />
              だからこそ、実際にお客様と向き合うのは、私たち自身です。
            </p>
          </div>

          <div className="team-points">
            <div>OTA運用の現場を知る経験。</div>
            <div>観光・旅行を知る経験。</div>
            <div>採用と組織を知る経験。</div>
            <div>海外事業を経験した視点。</div>
            <div>経営とデータ分析を考える視点。</div>
            <div>そして、世界各地で見て、聞いて、感じてきた経験。</div>
          </div>

          <div className="team-conclusion">
            <p>
              異なる経験を持つ2人だからこそ、一つの視点だけでは見えない宿泊施設の課題を一緒に考えることができます。
            </p>

            <p className="team-promise">
              宿の未来について、経営者の方と同じ目線で考える。
              <br />
              InnBuddyはそれをお約束します。
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="team-footer">
        <div className="team-container footer-inner">
          <div className="footer-brand">InnBuddy</div>

          <nav className="footer-nav">
            <a href="/contact" className="footer-contact">
              <span>ご相談はこちら</span>
              <span className="footer-arrow">→</span>
            </a>
          </nav>

          <div className="copyright">© InnBuddy</div>
        </div>
      </footer>
    </main>
  );
}