'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './wellbeing.module.css';
import HiringDiagnosticModal from '@/components/diagnostics/HiringDiagnosticModal';

export default function WellbeingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<'jp' | 'en'>('jp');
  
  // 無料診断モーダルの開閉ステート
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  // サーキュラープログレスの状態管理
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleLang = () => {
    setLang((prev) => (prev === 'jp' ? 'en' : 'jp'));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealUpActive);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(`.${styles.revealUp}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsCompleted(false); 
    
    progressTimeoutRef.current = setTimeout(() => {
      setIsCompleted(true);
      setTimeout(() => {
        router.push('https://innbuddy-japan.com/team');
      }, 600);
    }, 1500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsCompleted(false);
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }
  };

  // 全セクションの翻訳テキスト定義
  const t = {
    jp: {
      nav: {
        about: 'InnBuddyとは',
        team: '運営チーム',
        other: '他のメディアも見る',
        contact: 'お問い合わせ',
        articles: '記事一覧',
        assessment: '無料診断',
      },
      hero: {
        title1: '宿の未来を創る、',
        title2: '人と組織の新しいあり方',
        desc1: '「働きがい」や「心の余白」という本質的なウェルビーイングを経営戦略に。',
        desc2: '働きたいと思われる宿になるために（採用）、もっと貢献したいと思わせるホテルになるために（定着）、そして美しい多様なチーム全員でお客さまをおもてなし。',
        subtext: '顧客満足度と宿の価値を最大化する、人財育成マネジメントの新基準。',
      },
      solutions: {
        heading1: 'ウェルビーイングの',
        heading2: '本質と解決策',
        sub: 'スタッフのウェルビーイングが、顧客満足度の向上と組織の成長をもたらします。',
        card1Num: '01',
        card1Title: '定義 (Definition)',
        card1Desc: '単なる「健康」だけでなく、身体的、精神的、社会的に良好な状態にあること。スタッフ自身がやりがいを持ち、満たされて働ける環境を指します。',
        card2Num: '02',
        card2Title: '重要性 (Importance)',
        card2Desc: '離職率の低下と採用コスト削減はもちろん、スタッフの心の余裕がサービス品質向上に直結します。心理的安全性が自発的な業務改善を生みます。',
      },
      articlesSec: {
        title: 'おすすめ記事',
        sub: '注目のキーワードから記事を探す',
        viewAll: 'すべての記事一覧を見る（500+） →',
      },
      reasons: {
        title: '今、宿泊業界でウェルビーイングが強く求められる4つの背景',
        r1Title: '価値観の多様化',
        r1Desc: '給与や役職だけでなく、「精神的な充足感」を重視する働き手が増加しています。',
        r2Title: '人材不足と流動性',
        r2Desc: '選ばれ、長く定着し続けてもらうための本質的な魅力づくりが不可欠です。',
        r3Title: '働き方改革の推進',
        r3Desc: '休息の質や日々のメンタルコンディションを整える実効的な仕組みが求められています。',
        r4Title: '持続可能な開発 (SDGs)',
        r4Desc: 'サステナブルな宿運営の根幹として、従業員のウェルビーイングが直結します。',
      },
      steps: {
        s1: '豊かさ',
        s2: '幸福度',
        s3: '意欲向上',
        s4: '生産性UP',
        s5: 'チーム力向上',
        goal: '業績UP',
        caption: '豊かさから始まったエネルギーはチームを強化し、最終的に宿の強固な業績へと結実します',
      },
      asymmetry: {
        eyebrow: 'The Essence of Teamwork',
        heading: '「ここでなら頑張れる」',
        subheading: '働きたくなるチームの根源',
        desc: '孤独感をなくし、仲間とのつながりと確かな貢献感を感じられる心理的安全な職場。前向きな姿勢は瞬く間にチームへ伝染し、愛のある空気感が生まれます。',
        boxTitle: '幸せの好循環がもたらす「三方よし」',
        boxDesc1: 'スタッフが心身ともに満たされることで、質の高いおもてなしが自発的に生まれます。',
        boxDesc2: 'それが顧客の感動体験（顧客ロイヤルティ）に繋がり、結果として収益が増加。スタッフも、お客さまも、そして宿も幸せになる持続可能な運営につながります。',
        badge: ['スタッフが', '幸せになり、', 'お客さまも', '幸せになる。'],
      },
      footer: {
        brandDesc: '宿泊業界の未来を創る、HRと組織づくりのための専門メディア。スタッフの充足感が、最高のサービスを生み出します。',
        menu: 'Menu',
        support: 'Support',
        audit: 'Audit',
        cta: '無料診断を受ける',
      }
    },
    en: {
      nav: {
        about: 'About InnBuddy',
        team: 'Our Team',
        other: 'Other Media',
        contact: 'Contact',
        articles: 'Articles',
        assessment: 'Free Assessment',
      },
      hero: {
        title1: 'Shaping the future of hospitality,',
        title2: 'A New Era for People & Culture',
        desc1: 'Integrating authentic well-being—fulfillment and peace of mind—into core strategy.',
        desc2: 'Becoming a premier destination where talent aspires to join (recruitment), feels inspired to contribute (retention), and welcomes every guest with a diverse, empowered team.',
        subtext: 'A new standard of talent management to maximize guest satisfaction and hospitality value.',
      },
      solutions: {
        heading1: 'The Essence &',
        heading2: 'Solutions of Well-being',
        sub: 'Staff well-being directly drives guest satisfaction and sustainable business growth.',
        card1Num: '01',
        card1Title: 'Definition',
        card1Desc: 'Beyond basic health, it represents complete physical, mental, and social vitality—an environment where staff feel genuinely fulfilled and empowered.',
        card2Num: '02',
        card2Title: 'Importance',
        card2Desc: 'Reduces turnover and hiring costs while peace of mind elevates service quality. Psychological safety sparks proactive team innovation.',
      },
      articlesSec: {
        title: 'Featured Topics',
        sub: 'Explore key articles by strategic HR themes',
        viewAll: 'Explore all articles (500+) →',
      },
      reasons: {
        title: '4 Reasons Why Hospitality Needs Well-being Today',
        r1Title: 'Diversified Values',
        r1Desc: 'Talent increasingly prioritizes psychological fulfillment and purpose over titles and wages alone.',
        r2Title: 'Labor Mobility',
        r2Desc: 'Creating authentic workplace appeal is indispensable to be chosen and to retain talent long-term.',
        r3Title: 'Workstyle Reform',
        r3Desc: 'Actionable frameworks are essential to optimize rest quality and sustain daily mental health.',
        r4Title: 'Sustainability & ESG',
        r4Desc: 'Staff well-being lies at the heart of sustainable, socially responsible accommodation operations.',
      },
      steps: {
        s1: 'Abundance',
        s2: 'Happiness',
        s3: 'Motivation',
        s4: 'Productivity',
        s5: 'Synergy',
        goal: 'Growth',
        caption: 'Energy sparked by personal abundance empowers the team and drives enduring business performance.',
      },
      asymmetry: {
        eyebrow: 'The Essence of Teamwork',
        heading: '"I Can Truly Thrive Here"',
        subheading: 'The Core of an Inspiring Team',
        desc: 'A psychologically safe environment where isolation turns into trust and shared purpose. Positivity ripples across the team, creating genuine warmth in hospitality.',
        boxTitle: 'The Virtuous Cycle of Mutual Benefit',
        boxDesc1: 'When staff are fulfilled in mind and spirit, elevated hospitality arises spontaneously.',
        boxDesc2: 'This fosters unforgettable guest loyalty and strengthens revenue—an enduring ecosystem benefiting staff, guests, and the property alike.',
        badge: ['Staff thrive,', 'happiness spreads,', 'and guests are', 'truly delighted.'],
      },
      footer: {
        brandDesc: 'A specialized publication for hospitality HR and organizational culture. Staff fulfillment powers unforgettable service.',
        menu: 'Menu',
        support: 'Support',
        audit: 'Assessment',
        cta: 'Take Free Assessment',
      }
    }
  }[lang];

  const articleMarqueeData = [
    { jp: 'スタッフ定着率が2倍になった小規模旅館の取り組み', en: 'Initiatives that doubled staff retention in boutique ryokan' },
    { jp: '現場スタッフが自発的に改善提案を出す心理的安全性の設計', en: 'Building psychological safety for proactive improvements' },
    { jp: 'サンクスカード制度で部門間の壁を取り払った老舗ホテルの実例', en: 'Case study: Breaking down department silos with Thanks Cards' },
    { jp: '中休みの過ごし方を変える、リフレッシュルームの導入効果', en: 'Impact of refresh rooms during hospitality split shifts' },
    { jp: '支配人とフロントスタッフの1on1ミーティング導入ガイド', en: 'Guide to 1-on-1 meetings for hotel managers and staff' },
  ];

  const recommendationKeywords = [
    { jp: '組織文化', en: 'Culture', bg: 'bg-[#edf4ee]', textCol: 'text-[#24422c]', border: 'border-[#24422c]/10' },
    { jp: '採用広報', en: 'Employer Branding', bg: 'bg-[#d8e8da]', textCol: 'text-[#24422c]', border: 'border-[#24422c]/15' },
    { jp: '心理的安全性', en: 'Psychological Safety', bg: 'bg-[#c3dcce]', textCol: 'text-[#1d3824]', border: 'border-[#1d3824]/20' },
    { jp: '1on1設計', en: '1-on-1 Design', bg: 'bg-[#aed0b6]', textCol: 'text-[#18311f]', border: 'border-[#18311f]/20' },
    { jp: '燃え尽き予防', en: 'Burnout Prevention', bg: 'bg-[#98c2a3]', textCol: 'text-[#132819]', border: 'border-[#132819]/25' },
    { jp: 'シフト改革', en: 'Shift Reform', bg: 'bg-[#7eaf8c]', textCol: 'text-white', border: 'border-white/20' },
    { jp: '定着率向上', en: 'Retention', bg: 'bg-[#679b76]', textCol: 'text-white', border: 'border-white/20' },
    { jp: 'メンター制度', en: 'Mentorship', bg: 'bg-[#518561]', textCol: 'text-white', border: 'border-white/20' },
    { jp: '多文化共生', en: 'DE&I & Culture', bg: 'bg-[#3d6f4d]', textCol: 'text-[#f4f1de]', border: 'border-[#f4f1de]/30' },
    { jp: '理念の浸透', en: 'Mission Alignment', bg: 'bg-[#2b5439]', textCol: 'text-[#f4f1de]', border: 'border-[#f4f1de]/40' },
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isHovered ? 0 : circumference;

  return (
    <div className="bg-white text-[#1a231c] min-h-screen flex flex-col font-sans selection:bg-[#f4f1de] selection:text-[#3a5a40] overflow-x-hidden">
      
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all h-[76px]">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between items-center">
          <Link href="#top" className="text-xl md:text-2xl font-bold text-[#3a5a40] tracking-tight hover:opacity-80 transition-opacity">
            InnBuddy <span className="font-light text-[#1a231c]/70 text-base md:text-lg">Well-being</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-[#f4f1de]/40 p-1.5 rounded-full border border-[#3a5a40]/10">
            <a 
              href="https://innbuddy-japan.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative px-4 py-2 text-xs font-bold text-[#3a5a40] rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              {t.nav.about}
            </a>
            <a 
              href="https://innbuddy-japan.com/team" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative px-4 py-2 text-xs font-bold text-[#3a5a40] rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              {t.nav.team}
            </a>
            <a 
              href="https://innbuddy-japan.com/library" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative px-4 py-2 text-xs font-bold text-[#3a5a40] rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              {t.nav.other}
            </a>
            <a 
              href="https://innbuddy-japan.com/contact" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative px-4 py-2 text-xs font-bold text-[#3a5a40] rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              {t.nav.contact}
            </a>
            <Link 
              href="#articles" 
              className="relative ml-1 px-5 py-2 text-xs font-bold text-[#1a231c] bg-[#D3E173] rounded-full hover:opacity-80 shadow-sm transition-all duration-300"
            >
              {t.nav.articles}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-2 text-[11px] font-bold border-2 border-[#f4f1de] bg-white rounded-full px-3 py-1.5 hover:bg-[#f4f1de] transition-colors text-[#3a5a40]"
            >
              <span className={lang === 'jp' ? '' : 'opacity-40'}>JP</span>
              <span className="text-gray-300 font-light">|</span>
              <span className={lang === 'en' ? '' : 'opacity-40'}>EN</span>
            </button>
            <button 
              onClick={() => setIsDiagnosticOpen(true)} 
              className="bg-[#3a5a40] border-2 border-[#3a5a40] text-white hover:bg-[#f4f1de] hover:text-[#3a5a40] px-5 py-2 rounded-full text-xs font-bold transition-all duration-300"
            >
              {t.nav.assessment}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Hero Section */}
        <section id="top" className="max-w-[1400px] mx-auto px-6 pt-4 pb-6 min-h-[580px] flex flex-col justify-between relative bg-white">
          
          <div className={`flex justify-start md:justify-end mb-4 lg:mb-6 lg:pr-24 shrink-0 ${styles.revealUp}`}>
            <div className="max-w-3xl relative z-10">
              <h1 className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.25] text-[#1a231c] tracking-tight ${styles.serifFont}`}>
                {t.hero.title1}<br />
                <span className="inline-block bg-[#e8eedd] text-[#3a5a40] px-5 py-1.5 rounded-full mt-2 ml-[-5px] transform -rotate-1 font-sans font-bold text-2xl lg:text-3xl tracking-normal">
                  {t.hero.title2}
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch relative pl-2 lg:pl-6">
            
            {/* 温泉イラスト（透明度をさらに30%薄くした opacity-[0.10]） */}
            <div className="absolute left-[-15%] top-[35%] -translate-y-1/2 w-[520px] h-[520px] lg:w-[650px] lg:h-[650px] pointer-events-none z-0 opacity-[0.10] mix-blend-multiply select-none">
              <img
                src="/library/wellbeing/onsen.png"
                alt="静かな温泉宿の風景"
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* 左側スペース：サークルを30%大きく(104px)し、textLengthで円周ぴったり一周隙間なく配置 */}
            <div className={`hidden lg:flex w-56 shrink-0 flex-col justify-start items-start gap-4 z-20 ${styles.revealUp} ${styles.delay100}`}>
              <div className={`w-[104px] h-[104px] flex items-center justify-center ${styles.spinning} text-[#3a5a40] opacity-80 pointer-events-none`}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[5.7px] font-bold uppercase fill-[#3a5a40]">
                    <textPath href="#circlePath" textLength="232" lengthAdjust="spacing">
                      THE HAPPINESS FOR ORGANIZATION ✦ THE HAPPINESS FOR ORGANIZATION ✦ 
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="max-w-[200px] pl-2 border-l border-[#3a5a40]/30">
                <p className={`text-[11px] text-[#1a231c]/80 leading-relaxed font-medium tracking-wide ${styles.serifFont}`}>
                  {t.hero.desc1}<br /><br />
                  {t.hero.desc2}
                </p>
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col relative h-[250px] lg:h-auto min-h-[220px]">
              
              <div 
                className={`absolute left-[-2.5rem] md:left-[-4rem] top-[50%] -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full z-30 ${styles.floating} ${styles.revealUp} ${styles.delay200} ${styles.medalRingContainer}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="metalGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8c532b" />
                      <stop offset="25%" stopColor="#d3e173" />
                      <stop offset="50%" stopColor="#1b3a24" />
                      <stop offset="75%" stopColor="#3a5a40" />
                      <stop offset="100%" stopColor="#e76f51" />
                    </linearGradient>
                  </defs>
                </svg>

                <svg viewBox="0 0 80 80" className="w-full h-full absolute inset-0">
                  <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="4" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="38" 
                    fill="none" 
                    stroke="url(#metalGlow)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={styles.progressCircle}
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isCompleted ? (
                    <span className={`text-[13px] md:text-[15px] font-extrabold text-[#1b3a24] ${styles.popText} drop-shadow-sm`}>
                      InnBuddy!!
                    </span>
                  ) : (
                    <span className="text-[11px] md:text-[13px] font-bold text-[#3a5a40] tracking-wide text-center leading-tight">
                      Our<br/>Team
                    </span>
                  )}
                </div>
              </div>

              {/* ヒーローメイン画像スライドショー */}
              <div className={`w-full h-full rounded-[2.5rem] lg:rounded-[3rem] border-2 border-dashed border-[#3a5a40]/30 bg-gray-50/70 backdrop-blur-sm flex items-center justify-center relative overflow-hidden ${styles.revealUp}`}>
                <div className={styles.slideshowContainer}>
                  <img src="/library/wellbeing/hero-main-1.jpeg" alt="着物の女性と緑" className={`${styles.slideDownImage} ${styles.slide1}`} />
                  <img src="/library/wellbeing/hero-main-2.jpeg" alt="庭園ヨガ" className={`${styles.slideDownImage} ${styles.slide2}`} />
                  <img src="/library/wellbeing/hero-main-3.jpeg" alt="田んぼ道とスタッフ" className={`${styles.slideDownImage} ${styles.slide3}`} />
                </div>
                
                <div className="absolute top-4 left-6 md:left-14 flex flex-wrap gap-2 max-w-[75%] z-10">
                  {['Well-being', 'Fulfillment', 'Psychological Safety', 'Empathy', 'Belonging'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-gray-200/50 bg-white/70 backdrop-blur-md text-[10px] font-bold text-[#1a231c]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className={`w-full py-4 text-center overflow-hidden shrink-0 flex items-center justify-center ${styles.revealUp}`}>
            <p className={`${styles.serifFont} ${styles.gradientTextMulti}`}>
              {t.hero.subtext}
            </p>
          </div>

        </section>

        {/* 3. おすすめ記事マーキー */}
        <section className={`w-full mt-4 border-y border-[#3a5a40]/10 bg-white py-4 ${styles.revealUp}`}>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeContent}>
              {[...articleMarqueeData, ...articleMarqueeData].map((item, idx) => (
                <Link key={idx} href="#" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#3a5a40]/20 bg-white text-[#1a231c] hover:border-[#3a5a40] hover:text-[#3a5a40] hover:shadow-sm transition-all duration-300 shrink-0 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a40] group-hover:scale-150 transition-transform"></span>
                  <span className="text-xs font-bold tracking-wide">{lang === 'jp' ? item.jp : item.en}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className={`${styles.marqueeWrapper} mt-3`}>
            <div className={styles.marqueeContentReverse}>
              {[...articleMarqueeData, ...articleMarqueeData].reverse().map((item, idx) => (
                <Link key={idx} href="#" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#f4f1de] bg-[#fbfaf6] text-[#3a5a40] hover:bg-[#f4f1de] hover:shadow-sm transition-all duration-300 shrink-0 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a40] group-hover:scale-150 transition-transform"></span>
                  <span className="text-xs font-bold tracking-wide">{lang === 'jp' ? item.jp : item.en}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ウェルビーイングの本質と解決策 */}
        <section id="about" className="w-full bg-[#fbfaf6] py-16 lg:py-24 px-6 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            
            <div className={`lg:w-1/3 shrink-0 text-center lg:text-left ${styles.revealUp}`}>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a231c] tracking-tight mb-4 ${styles.serifFont}`}>
                {t.solutions.heading1}<br /><span className="text-[#3a5a40]">{t.solutions.heading2}</span>
              </h2>
              <p className="text-[#1a231c]/70 text-sm font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                {t.solutions.sub}
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className={`bg-[#e8eedd] rounded-[2.5rem] p-8 relative shadow-sm hover:shadow-md transition-shadow ${styles.revealUp}`}>
                <span className="absolute top-6 right-8 text-3xl font-light text-[#3a5a40]/30">{t.solutions.card1Num}</span>
                <h3 className="text-xl font-bold text-[#1a231c] mb-4">{t.solutions.card1Title}</h3>
                <p className="text-[#1a231c]/80 leading-relaxed text-sm font-medium">
                  {t.solutions.card1Desc}
                </p>
              </div>

              <div className={`bg-[#3a5a40] text-white rounded-[2.5rem] p-8 relative shadow-sm hover:shadow-md transition-shadow ${styles.revealUp} ${styles.delay100}`}>
                <span className="absolute top-6 right-8 text-3xl font-light text-white/20">{t.solutions.card2Num}</span>
                <h3 className="text-xl font-bold text-[#f4f1de] mb-4">{t.solutions.card2Title}</h3>
                <p className="text-white/80 leading-relaxed text-sm font-medium">
                  {t.solutions.card2Desc}
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* 5. おすすめ記事 (レンガ壁パターン) */}
        <section id="articles" className={`w-full py-16 lg:py-20 px-6 border-b border-gray-100 ${styles.brickPattern}`}>
          <div className="max-w-[1000px] mx-auto flex flex-col items-center">
            
            <div className={`text-center mb-8 bg-white/70 backdrop-blur-sm px-8 py-3 rounded-full ${styles.revealUp}`}>
              <h2 className={`text-2xl md:text-3xl font-bold text-[#3a5a40] tracking-tight mb-1 ${styles.serifFont}`}>
                {t.articlesSec.title}
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">{t.articlesSec.sub}</p>
            </div>
            
            <div className={`grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4 md:gap-5 justify-center items-center ${styles.revealUp}`}>
              {recommendationKeywords.map((item, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className={`w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 aspect-square rounded-2xl md:rounded-3xl border ${item.border} ${item.bg} ${item.textCol} flex items-center justify-center p-2 text-center shadow-sm hover:scale-108 hover:shadow-lg transition-all duration-300 group`}
                >
                  <span className="text-[10px] sm:text-[11px] md:text-xs font-bold leading-tight tracking-tight group-hover:underline">
                    {lang === 'jp' ? item.jp : item.en}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full">
              <Link href="#" className="text-xs font-bold text-[#3a5a40] border-b border-[#3a5a40] pb-0.5 hover:opacity-70 transition-opacity">
                {t.articlesSec.viewAll}
              </Link>
            </div>

          </div>
        </section>

        {/* 6. 強く求められる4つの背景 */}
        <section className={`py-16 md:py-24 px-6 ${styles.dotPattern} border-b border-gray-100 overflow-hidden`}>
          <div className="max-w-[1000px] mx-auto relative">
            
            <div className={`text-center mb-16 ${styles.revealUp}`}>
              <h2 className={`text-2xl md:text-3xl font-bold text-[#1a231c] tracking-tight mb-3 ${styles.serifFont}`}>
                {t.reasons.title}
              </h2>
            </div>

            <div className="flex flex-col gap-10 md:gap-16 relative">
              <div className="absolute top-[25%] bottom-[25%] right-[25%] w-[2px] border-r-2 border-dashed border-[#3a5a40]/30 hidden md:block z-0"></div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className={`w-full md:w-5/12 bg-white rounded-[2rem] p-6 border border-[#3a5a40]/20 shadow-sm relative ${styles.revealUp}`}>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#f4f1de] border-2 border-[#3a5a40] text-[#3a5a40] rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-sm">1</div>
                  <h3 className="text-base font-bold text-[#1a231c] mb-2 pl-4">{t.reasons.r1Title}</h3>
                  <p className="text-xs text-[#1a231c]/70 leading-relaxed font-medium pl-4">{t.reasons.r1Desc}</p>
                </div>
                
                <div className={`hidden md:flex flex-1 items-center justify-end relative ${styles.revealUp}`}>
                  <div className="w-full border-t-2 border-dashed border-[#3a5a40]/30"></div>
                  <div className="absolute right-0 w-3 h-3 bg-[#3a5a40] rounded-full shadow-[0_0_0_4px_rgba(58,90,64,0.1)]"></div>
                </div>

                <div className={`w-full md:w-5/12 bg-white rounded-[2rem] p-6 border border-[#3a5a40]/20 shadow-sm relative ${styles.revealUp} ${styles.delay100}`}>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#f4f1de] border-2 border-[#3a5a40] text-[#3a5a40] rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-sm">2</div>
                  <h3 className="text-base font-bold text-[#1a231c] mb-2 pl-4">{t.reasons.r2Title}</h3>
                  <p className="text-xs text-[#1a231c]/70 leading-relaxed font-medium pl-4">{t.reasons.r2Desc}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 relative z-10">
                <div className={`w-full md:w-5/12 bg-white rounded-[2rem] p-6 border border-[#3a5a40]/20 shadow-sm relative ${styles.revealUp}`}>
                  <div className="absolute -top-3 -right-3 md:-left-3 w-8 h-8 bg-[#f4f1de] border-2 border-[#3a5a40] text-[#3a5a40] rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-sm">3</div>
                  <h3 className="text-base font-bold text-[#1a231c] mb-2 pl-4">{t.reasons.r3Title}</h3>
                  <p className="text-xs text-[#1a231c]/70 leading-relaxed font-medium pl-4">{t.reasons.r3Desc}</p>
                </div>
                
                <div className={`hidden md:flex flex-1 items-center justify-start relative ${styles.revealUp}`}>
                  <div className="w-full border-t-2 border-dashed border-[#3a5a40]/30"></div>
                  <div className="absolute left-0 w-3 h-3 bg-[#3a5a40] rounded-full shadow-[0_0_0_4px_rgba(58,90,64,0.1)]"></div>
                </div>

                <div className={`w-full md:w-5/12 bg-[#3a5a40] text-white rounded-[2rem] p-6 border border-[#3a5a40] shadow-md relative ${styles.revealUp} ${styles.delay100}`}>
                  <div className="absolute -top-3 -right-3 md:-left-3 w-8 h-8 bg-[#f4f1de] border-2 border-[#3a5a40] text-[#3a5a40] rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-sm">4</div>
                  <h3 className="text-base font-bold text-[#f4f1de] mb-2 pl-4">{t.reasons.r4Title}</h3>
                  <p className="text-xs text-white/80 leading-relaxed font-medium pl-4">{t.reasons.r4Desc}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. 独立したステップページ */}
        <section className="w-full bg-[#6D8346] py-16 md:py-24 px-6 border-b border-[#3a5a40]/10 flex flex-col justify-center items-center min-h-[400px]">
          <div className="max-w-[1400px] mx-auto w-full">
            
            <div className={`flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-4 mb-6 ${styles.revealUp}`}>
              {[
                { step: 'STEP 01', text: t.steps.s1, delayClass: styles.neonDelay1 },
                { step: 'STEP 02', text: t.steps.s2, delayClass: styles.neonDelay2 },
                { step: 'STEP 03', text: t.steps.s3, delayClass: styles.neonDelay3 },
                { step: 'STEP 04', text: t.steps.s4, delayClass: styles.neonDelay4 },
                { step: 'STEP 05', text: t.steps.s5, delayClass: styles.neonDelay5 },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`w-full sm:w-[30%] md:flex-1 py-5 px-3 rounded-[1.5rem] border border-white/40 bg-[#fbfaf6] text-center transition-all duration-300 shadow-md ${styles.neonStep} ${item.delayClass}`}
                >
                  <span className="text-[10px] font-bold text-[#3a5a40] block mb-1 uppercase tracking-widest opacity-80">{item.step}</span>
                  <span className="text-sm font-bold text-[#1a231c]">{item.text}</span>
                </div>
              ))}
              
              <div className={`w-full sm:w-[30%] md:flex-1 py-5 px-3 rounded-[1.5rem] border border-[#3a5a40] bg-[#3a5a40] text-white text-center transition-all duration-300 shadow-lg ${styles.neonGoal} ${styles.neonDelay6}`}>
                <span className="text-[10px] font-bold block mb-1 uppercase tracking-widest text-[#f4f1de]/90">Goal</span>
                <span className="text-sm font-bold tracking-wider">{t.steps.goal}</span>
              </div>
            </div>
            
            <p className={`text-center text-xs md:text-sm text-white/80 font-medium tracking-wide ${styles.revealUp}`}>
              {t.steps.caption}
            </p>

          </div>
        </section>

        {/* 8. アシンメトリーレイアウト */}
        <section className="w-full bg-[#fbfaf6] py-16 md:py-24 px-6 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 relative">
              
              <div className={`w-full lg:w-1/2 lg:pr-20 z-20 ${styles.revealUp}`}>
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-[#3a5a40]"></div>
                  <span className="text-[10px] font-bold text-[#3a5a40] uppercase tracking-[0.2em]">{t.asymmetry.eyebrow}</span>
                </div>
                
                <h3 className={`text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-[#1a231c] mb-2 leading-tight tracking-tight ${styles.serifFont}`}>
                  {t.asymmetry.heading}
                </h3>
                <span className={`block text-[#3a5a40] text-xl md:text-2xl lg:text-3xl font-serif font-medium leading-[1.5] mb-8`}>
                  {t.asymmetry.subheading}
                </span>
                
                <p className="text-sm md:text-base text-[#1a231c]/80 leading-[1.8] font-medium max-w-md mb-8">
                  {t.asymmetry.desc}
                </p>

                <div className="p-6 md:p-8 bg-white border border-[#3a5a40]/10 rounded-[2rem] max-w-lg shadow-sm">
                  <h4 className="text-[#3a5a40] font-bold text-sm mb-3 tracking-wide">{t.asymmetry.boxTitle}</h4>
                  <p className="text-[#1a231c]/85 text-xs md:text-sm leading-relaxed font-medium">
                    {t.asymmetry.boxDesc1}<br/><br/>
                    {t.asymmetry.boxDesc2}
                  </p>
                </div>
              </div>

              <div className={`w-full lg:w-1/2 h-[450px] md:h-[600px] relative mt-10 lg:mt-0 ${styles.revealUp} ${styles.delay100}`}>
                <div className="absolute right-0 top-0 w-[85%] h-full rounded-t-[10rem] rounded-b-[3rem] border border-[#3a5a40]/20 bg-[#e9eede]/50 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-sm">
                  <div className={styles.slideshowContainer}>
                    <img src="/library/wellbeing/cycle-main-1.jpeg" alt="畑作業" className={`${styles.crossFadeImage} ${styles.cf1}`} />
                    <img src="/library/wellbeing/cycle-main-2.jpeg" alt="温泉旅館の入り口" className={`${styles.crossFadeImage} ${styles.cf2}`} />
                    <img src="/library/wellbeing/cycle-main-3.jpeg" alt="フロント談笑" className={`${styles.crossFadeImage} ${styles.cf3}`} />
                    <img src="/library/wellbeing/cycle-main-4.jpeg" alt="ピクニック" className={`${styles.crossFadeImage} ${styles.cf4}`} />
                    <img src="/library/wellbeing/cycle-main-5.jpeg" alt="日本庭園 女将" className={`${styles.crossFadeImage} ${styles.cf5}`} />
                  </div>
                </div>
                
                <div className="absolute left-0 bottom-[10%] w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white bg-[#3a5a40] text-[#f4f1de] shadow-2xl flex flex-col items-center justify-center p-6 text-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <span className="text-[10px] uppercase tracking-widest mb-2 opacity-80 border-b border-[#f4f1de]/30 pb-1">Loyalty & Growth</span>
                  <span className={`text-base md:text-xl font-bold leading-[1.4] ${styles.serifFont}`}>
                    {t.asymmetry.badge[0]}<br/>
                    {t.asymmetry.badge[1]}<br/>
                    {t.asymmetry.badge[2]}<br/>
                    {t.asymmetry.badge[3]}
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* 9. フッター直前 1行バナー */}
        <section className="w-full bg-[#D3E173] text-[#1a231c] overflow-hidden border-y border-[#3a5a40]/10">
          <div className={styles.marqueeWrapperThin}>
            <div className={styles.marqueeContentThin}>
              {[...articleMarqueeData, ...articleMarqueeData, ...articleMarqueeData].map((item, idx) => (
                <Link key={idx} href="#" className="flex items-center gap-6 shrink-0 hover:opacity-70 transition-opacity">
                  <span className="text-[11px] font-bold tracking-widest">{lang === 'jp' ? item.jp : item.en}</span>
                  <span className="text-[#3a5a40] text-[10px]">✦</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer */}
      <footer className="bg-[#3a5a40] text-white pt-16 pb-14 px-6 relative overflow-hidden">
        
        <div className="absolute right-[-40px] md:right-8 bottom-[-20px] w-[340px] md:w-[480px] h-[300px] md:h-[400px] pointer-events-none opacity-15 select-none z-0">
          <svg viewBox="0 0 400 320" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M200 320 V110" />
            <path d="M200 110 L160 70 M200 110 L240 70" />
            <path d="M200 150 L150 110 M200 150 L250 110" />
            <path d="M200 190 L140 150 M200 190 L260 150" />
            <path d="M200 230 L130 190 M200 230 L270 190" />
            <path d="M200 70 L200 40 M200 40 L180 20 M200 40 L220 20" />
            
            <path d="M90 320 V150" />
            <path d="M90 150 L60 120 M90 150 L120 120" />
            <path d="M90 190 L50 160 M90 190 L130 160" />
            <path d="M90 230 L45 200 M90 230 L135 200" />
            
            <path d="M310 320 V140" />
            <path d="M310 140 L280 110 M310 140 L340 110" />
            <path d="M310 180 L270 150 M310 180 L350 150" />
            <path d="M310 220 L265 190 M310 220 L355 190" />

            <path d="M10 320 C100 300, 250 310, 390 320" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <Link href="#top" className="text-2xl font-bold text-[#f4f1de] flex items-center gap-2 mb-4">
                  <span>InnBuddy <span className="font-light opacity-80">Well-being</span></span>
                </Link>
                <p className="text-xs sm:text-sm text-gray-200 max-w-sm mb-6 font-medium leading-relaxed">
                  {t.footer.brandDesc}
                </p>
              </div>
              <div className="pt-2 text-xs text-white/50 font-medium">
                &copy; 2026 InnBuddy Well-being. All rights reserved.
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-semibold">
              <div>
                <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider text-[11px] border-b border-[#f4f1de]/30 pb-2 inline-block">{t.footer.menu}</h4>
                <ul className="space-y-3 font-medium text-gray-200">
                  <li>
                    <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {t.nav.about}
                    </a>
                  </li>
                  <li>
                    <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {t.nav.team}
                    </a>
                  </li>
                  <li>
                    <a href="https://innbuddy-japan.com/library" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {t.nav.other}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider text-[11px] border-b border-[#f4f1de]/30 pb-2 inline-block">{t.footer.support}</h4>
                <ul className="space-y-3 font-medium text-gray-200">
                  <li>
                    <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {t.nav.contact}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-start items-start">
                <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider text-[11px] border-b border-[#f4f1de]/30 pb-2 inline-block">{t.footer.audit}</h4>
                <button 
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="inline-block bg-[#f4f1de] text-[#3a5a40] border-2 border-[#f4f1de] hover:bg-[#3a5a40] hover:text-[#f4f1de] px-6 py-2.5 rounded-full font-bold transition-all text-xs shadow-md"
                >
                  {t.footer.cta}
                </button>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 11. 無料診断モーダル */}
      <HiringDiagnosticModal 
        isOpen={isDiagnosticOpen} 
        onClose={() => setIsDiagnosticOpen(false)} 
      />

    </div>
  );
}