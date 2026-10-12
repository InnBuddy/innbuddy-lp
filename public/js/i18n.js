(function () {
  const TR = JSON.parse(document.getElementById('i18n').textContent),
    $ = (id) => document.getElementById(id);
  let L = 'ja',
    cur = null;

  try {
    const v = localStorage.getItem('lang');
    if (v && (v === 'ja' || TR.ui[v])) L = v;
  } catch (e) {}

  const U = (k) =>
    (TR.ui[L] && TR.ui[L][k]) || (TR.ui.ja && TR.ui.ja[k]) || (TR.ui.en && TR.ui.en[k]) || '';

  const q = (s, h) => {
    const e = document.querySelector(s);
    if (e) e.innerHTML = h;
  };

  const lab = () => {
    const toggleLabel = $('lexToggleLabel');
    if (toggleLabel) {
      toggleLabel.textContent = $('lexFull').classList.contains('show')
        ? U('cl') || '閉じる / Close'
        : U('mo') || 'この方言の単語をもっと見る / More words';
    }
  };

  function stat() {
    document.documentElement.lang = L;
    q('.hero h1', U('h1') || '教科書には載らない、<br>本当の<em>日本語</em>を集める');
    q('.hero .lead', U('lead') || '日本各地の方言に眠る、翻訳できない言葉と言い回し。地図や地域めぐりから、その土地の声に出会えます');
    q('nav a[href="#map"]', U('nm') || '地図<small>Map</small>');
    q('nav a[href="#dialect"]', U('nd') || '方言<small>Dialects</small>');
    q('nav a[href="#regions"]', U('nr') || '地域<small>Regions</small>');
    q('#map h2', U('mh') || '地図から選ぶ<span class="sub-en">Pick from the map</span>');
    q('#map .section-head p', U('mp') || '地域をクリックすると、その土地の方言が並びます。');

    const ct = document.querySelectorAll('#dialect .cols .col-title');
    if (ct && ct.length >= 2) {
      ct[0].innerHTML = '<span>' + (U('tb') || '教科書の言い方') + '</span><span>' + (U('re') || 'REAL') + '</span>';
      ct[1].innerHTML = '<span>' + (U('wd') || '方言の語彙') + '</span><span></span>';
    }

    q('.lex-expand-head p', U('ln') || 'ここに載せているのは代表的な語だけです。');
    const ph = document.querySelectorAll('.phrase-set-head');
    if (ph && ph.length >= 2) {
      ph[0].innerHTML = '<span class="emoji">🧑‍🤝‍🧑</span>' + (U('fr') || '友達と使える方言フレーズ');
      ph[1].innerHTML = '<span class="emoji">💼</span>' + (U('wk') || '職場で使える方言フレーズ');
    }
    q('#regions h2', U('wa') || '土地をめぐる。');

    document.querySelectorAll('.lang button').forEach((b) => {
      b.classList.toggle('on', b.dataset.l === L);
    });
    lab();
  }

  window.renderDialect = function (d) {
    cur = d;
    if (!d) return;

    const T = TR.d[d.id] || {};
    const t = T[L] || {};
    const rm = T.rm || {};
    const pre = L === 'ja' ? {} : t;
    const h = d.heroWord;

    const dCtx = $('dCtx'); if (dCtx) dCtx.textContent = d.region + ' · ' + d.id;
    const dWord = $('dWord'); if (dWord) dWord.textContent = h.word;
    const dJp = $('dJp'); if (dJp) dJp.textContent = h.japanese;
    const dEn = $('dEn'); if (dEn) dEn.textContent = pre.hero || h.english || '';

    const dPhrases = $('dPhrases');
    if (dPhrases) {
      dPhrases.innerHTML = (d.phrases || [])
        .map((p, i) => {
          const m = p.textbook.match(/^(.*?)\s*\((.*)\)\s*$/);
          const tb = m ? m[1] + ' (' + ((pre.ph && pre.ph[i]) || m[2]) + ')' : p.textbook;
          return `<div class="phrase-row"><span class="tb">${tb}</span><span class="rl">${p.reality}</span></div>`;
        })
        .join('');
    }

    const dLexicon = $('dLexicon');
    if (dLexicon) {
      dLexicon.innerHTML = (d.lexicon || [])
        .map(
          (l, i) =>
            `<div class="lex-row"><span class="w">${l.word}</span><span class="m">${
              (pre.lx && pre.lx[i]) || l.meaning
            }</span></div>`
        )
        .join('');
    }

    const ex = d.additionalLexicon || [];
    const lexCount = $('lexCount'); if (lexCount) lexCount.textContent = ' (+' + ex.length + ')';
    const lexFull = $('lexFull');
    if (lexFull) {
      lexFull.innerHTML = ex
        .map(
          (l, i) =>
            `<div class="item"><div class="row"><span class="w">${l.word}${
              rm.ex && rm.ex[i] ? ' <i class="rmx">' + rm.ex[i] + '</i>' : ''
            }</span><span class="m">${
              (pre.ex && pre.ex[i]) || l.meaning
            }</span></div></div>`
        )
        .join('');
    }

    // 3段フレーズ描画（1行目: 方言 / 2行目: ローマ字 / 3行目: 選択言語の翻訳 or 標準語）
    const renderPhrases = (items, key) =>
      (items || [])
        .map((p, i) => {
          const romaji = (rm[key] || [])[i] || '';
          const translation = (pre[key] || [])[i] || p.meaning || '';
          return `<div class="phrase-item">
            <div class="ph">${p.phrase}</div>
            ${romaji ? `<div class="rm">${romaji}</div>` : ''}
            ${translation ? `<div class="mn">${translation}</div>` : ''}
          </div>`;
        })
        .join('');

    const dFriendPhrases = $('dFriendPhrases');
    if (dFriendPhrases) dFriendPhrases.innerHTML = renderPhrases(d.friendPhrases, 'fr');

    const dWorkPhrases = $('dWorkPhrases');
    if (dWorkPhrases) dWorkPhrases.innerHTML = renderPhrases(d.workPhrases, 'wk');

    if (lexFull) lexFull.classList.remove('show');
    lab();
  };

  document.querySelectorAll('.lang button').forEach((b) => {
    b.onclick = () => {
      L = b.dataset.l;
      try {
        localStorage.setItem('lang', L);
      } catch (e) {}
      stat();
      if (cur) renderDialect(cur);
    };
  });

  stat();
  if (typeof dialectsOf === 'function') {
    const list = dialectsOf('HOKKAIDO');
    if (list && list[0]) renderDialect(list[0]);
  }
})();