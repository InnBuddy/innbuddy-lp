const dialects = JSON.parse(document.getElementById('data').textContent);
const regionMeta = {
  HOKKAIDO:{vibe:'The Frontier',note:'An island dialect shaped by distance, weather, and migration.',path:'M205 42 L250 26 L292 45 L315 85 L300 120 L273 142 L244 126 L216 137 L188 111 L174 76 Z',color:'#a6baff'},
  TOHOKU:{vibe:'Snow Country',note:'Softened consonants and a rhythm all its own.',path:'M211 153 L244 135 L271 151 L267 185 L250 214 L257 245 L239 268 L218 248 L220 218 L204 191 Z',color:'#bda6ff'},
  KANTO:{vibe:'City Lights',note:'The standard you know, with local accents hiding in plain sight.',path:'M219 274 L242 265 L263 279 L271 307 L252 327 L228 320 L211 299 Z',color:'#f09fbe'},
  CHUBU:{vibe:'Alps & Nagoya Meshi',note:'Mountain valleys and snow country, each with its own turn of phrase.',path:'M172 226 L200 208 L214 232 L211 254 L190 250 L172 254 Z',color:'#f6d074'},
  KANSAI:{vibe:'The Comedian',note:'Warm, fast, and expressive — every sentence has a little spark.',path:'M174 273 L198 260 L218 275 L212 300 L191 315 L168 299 Z',color:'#ff8ea7'},
  CHUGOKU:{vibe:'Peaches & Okonomiyaki',note:'Blunt, rhythmic, and unexpectedly tender underneath.',path:'M108 242 L142 234 L166 244 L164 266 L138 272 L112 264 Z',color:'#96d0e6'},
  SHIKOKU:{vibe:'Pilgrimage Trails',note:'A gentle cadence carried across four mountainous prefectures.',path:'M132 330 L164 321 L188 333 L179 354 L148 360 L125 348 Z',color:'#ffc274'},
  KYUSHU:{vibe:'Volcanoes & Tonkotsu',note:'A melodic mix of ancient roots and open-sea influences.',path:'M76 286 L112 277 L133 300 L126 328 L101 350 L75 338 L59 311 Z',color:'#86d1b5'},
  OKINAWA:{vibe:'Ryukyu Culture',note:'Its own island language, older than the standard tongue.',path:'M34 372 L62 364 L68 380 L44 392 Z',color:'#f2a088'},
};
const regionOrder = Object.keys(regionMeta);


const mapG = document.getElementById('mapPaths');
regionOrder.forEach(r=>{
  const p = document.createElementNS('http://www.w3.org/2000/svg','path');
  p.setAttribute('d', regionMeta[r].path);
  p.setAttribute('fill', regionMeta[r].color);
  p.setAttribute('stroke', '#171717'); p.setAttribute('stroke-opacity','.15');
  p.dataset.region = r;
  p.onclick = ()=>selectRegion(r);
  mapG.appendChild(p);
});


function dialectsOf(region){ return dialects.filter(d=>d.region===region); }


function renderDialect(d){
  document.getElementById('dCtx').textContent = d.region + ' · ' + d.id;
  document.getElementById('dWord').textContent = d.heroWord.word;
  document.getElementById('dJp').textContent = d.heroWord.japanese;
  document.getElementById('dEn').textContent = d.heroWord.english;
  document.getElementById('dPhrases').innerHTML = d.phrases.map(p=>
    `<div class="phrase-row"><span class="tb">${p.textbook}</span><span class="rl">${p.reality}</span></div>`).join('');
  document.getElementById('dLexicon').innerHTML = d.lexicon.map(l=>
    `<div class="lex-row"><span class="w">${l.word}</span><span class="m">${l.meaning}</span></div>`).join('');


  // additional 10 words per dialect, revealed via the toggle below
  const extra = d.additionalLexicon && d.additionalLexicon.length ? d.additionalLexicon : [];
  document.getElementById('lexCount').textContent = ` (+${extra.length})`;
  document.getElementById('lexFull').innerHTML = extra.map(l=>
    `<div class="item"><div class="row"><span class="w">${l.word}</span><span class="m">${l.meaning}</span></div>${l.example ? `<p class="ex">${l.example}</p>` : ''}</div>`).join('');
  document.getElementById('lexFull').classList.remove('show');
  document.getElementById('lexToggleLabel').textContent = 'この方言の単語をもっと見る / More words';


  const friend = d.friendPhrases && d.friendPhrases.length ? d.friendPhrases : [];
  document.getElementById('dFriendPhrases').innerHTML = friend.map(p=>
    `<div class="phrase-item"><div class="ph">${p.phrase}</div><div class="mn">${p.meaning}</div></div>`).join('');


  const work = d.workPhrases && d.workPhrases.length ? d.workPhrases : [];
  document.getElementById('dWorkPhrases').innerHTML = work.map(p=>
    `<div class="phrase-item"><div class="ph">${p.phrase}</div><div class="mn">${p.meaning}</div></div>`).join('');
}
const lexToggleBtn = document.getElementById('lexToggle');
lexToggleBtn.addEventListener('click', ()=>{
  const box = document.getElementById('lexFull');
  const open = box.classList.toggle('show');
  document.getElementById('lexToggleLabel').textContent = open ? '閉じる / Close' : 'この方言の単語をもっと見る / More words';
});


let currentRegion = 'HOKKAIDO';
function selectRegion(region){
  currentRegion = region;
  const meta = regionMeta[region];
  document.getElementById('regionTag').textContent = region;
  document.getElementById('regionName').textContent = meta.vibe;
  document.getElementById('regionNote').textContent = meta.note;
  const list = dialectsOf(region);
  document.getElementById('dialectChips').innerHTML = list.map((d,i)=>
    `<button class="chip ${i===0?'active':''}" data-id="${d.id}">${d.id}</button>`).join('');
  document.querySelectorAll('#dialectChips .chip').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#dialectChips .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderDialect(list.find(d=>d.id===btn.dataset.id));
    };
  });
  renderDialect(list[0]);
  document.getElementById('dialect').scrollIntoView({behavior:'smooth'});
}
document.getElementById('regionTag').onclick=null;
selectRegionInit();
function selectRegionInit(){
  const region='HOKKAIDO', meta = regionMeta[region];
  document.getElementById('regionTag').textContent = region;
  document.getElementById('regionName').textContent = meta.vibe;
  document.getElementById('regionNote').textContent = meta.note;
  const list = dialectsOf(region);
  document.getElementById('dialectChips').innerHTML = list.map((d,i)=>
    `<button class="chip ${i===0?'active':''}" data-id="${d.id}">${d.id}</button>`).join('');
  document.querySelectorAll('#dialectChips .chip').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#dialectChips .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderDialect(list.find(d=>d.id===btn.dataset.id));
    };
  });
  renderDialect(list[0]);
}


/* ---- regions carousel: auto-rotating, pauses on interaction ---- */
const ICONS = {
  HOKKAIDO:'<path d="M23 4 L23 42 M8 12 L38 34 M38 12 L8 34"/><circle cx="23" cy="23" r="6"/>',
  TOHOKU:'<path d="M6 34 L18 14 L24 24 L30 10 L42 34 Z"/>',
  KANTO:'<path d="M6 36 L6 20 L14 20 L14 28 L22 28 L22 14 L30 14 L30 30 L38 30 L38 22 L44 22 L44 36 Z"/>',
  CHUBU:'<path d="M4 36 L16 12 L23 24 L30 8 L44 36 Z"/>',
  KANSAI:'<path d="M10 36 V18 L23 8 L36 18 V36 Z"/><path d="M17 36 V24 H29 V36"/>',
  CHUGOKU:'<path d="M6 30 Q23 8 40 30" /><path d="M14 30 Q23 18 32 30"/>',
  SHIKOKU:'<circle cx="23" cy="23" r="15"/><circle cx="23" cy="23" r="6"/>',
  KYUSHU:'<path d="M8 36 L18 12 L23 20 L28 12 L38 36 Z"/><path d="M18 12 q0 -6 5 -6 q5 0 5 6"/>',
  OKINAWA:'<path d="M23 8 C30 8 30 18 23 18 C16 18 16 8 23 8 Z M23 28 C30 28 30 38 23 38 C16 38 16 28 23 28 Z M10 23 h26"/>',
};
const regionList = regionOrder.map(r=>({
  region:r, vibe:regionMeta[r].vibe, note:regionMeta[r].note, color:regionMeta[r].color, icon:ICONS[r]
}));


const track = document.getElementById('carTrack');
const dotsEl = document.getElementById('carDots');
const drawer = document.getElementById('regionDrawer');
const CARD_W = 210, GAP = 22, STEP = CARD_W+GAP;


function cardHTML(r){
  return `<div class="region-card" data-region="${r.region}" style="--card-accent:${r.color}">
    <svg viewBox="0 0 46 46">${r.icon}</svg>
    <h3>${r.region[0]+r.region.slice(1).toLowerCase()}</h3>
    <p>${r.vibe}</p>
  </div>`;
}
// duplicate the set so the scroll can loop seamlessly
track.innerHTML = regionList.map(cardHTML).join('') + regionList.map(cardHTML).join('');
dotsEl.innerHTML = regionList.map((_,i)=>`<button data-i="${i}"></button>`).join('');


let offset = 0;                    // px scrolled so far
const setWidth = STEP * regionList.length;
let autoplay = true;
const SPEED = 0.35;                // px per frame, deliberately slow


function applyTransform(){ track.style.transform = `translateX(${-offset}px)`; }


function updateFocus(){
  const stageRect = document.getElementById('carousel').getBoundingClientRect();
  const centerX = stageRect.left + stageRect.width/2;
  let nearest = 0, nearestDist = Infinity;
  track.querySelectorAll('.region-card').forEach((card,idx)=>{
    const r = card.getBoundingClientRect();
    const dist = Math.abs((r.left+r.width/2) - centerX);
    card.classList.toggle('is-center', dist < CARD_W*0.4);
    card.classList.toggle('is-far', dist > CARD_W*1.3);
    if(dist < nearestDist){ nearestDist = dist; nearest = idx % regionList.length; }
  });
  dotsEl.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i===nearest));
}


function tick(){
  if(autoplay){
    offset += SPEED;
    if(offset >= setWidth) offset -= setWidth;
    applyTransform();
    updateFocus();
  }
  requestAnimationFrame(tick);
}


function pauseThenResume(ms=4500){
  autoplay = false;
  clearTimeout(pauseThenResume._t);
  pauseThenResume._t = setTimeout(()=>{ autoplay = true; }, ms);
}


function step(dir){
  offset += dir*STEP;
  if(offset < 0) offset += setWidth;
  if(offset >= setWidth) offset -= setWidth;
  applyTransform(); updateFocus();
  pauseThenResume();
}
document.getElementById('carPrev').onclick = ()=>step(-1);
document.getElementById('carNext').onclick = ()=>step(1);
dotsEl.querySelectorAll('button').forEach(b=>{
  b.onclick = ()=>{ offset = (+b.dataset.i)*STEP; applyTransform(); updateFocus(); pauseThenResume(); };
});
document.getElementById('carousel').addEventListener('pointerenter', ()=>{ autoplay=false; clearTimeout(pauseThenResume._t); });
document.getElementById('carousel').addEventListener('pointerleave', ()=>{ pauseThenResume(600); });


// ★ ドロワーを開く関数（写真・解説・方言チップを表示）
function openDrawer(region){
  const meta = regionMeta[region];
  const list = dialectsOf(region);
  if (!drawer) return;
  drawer.classList.add('show');
  drawer.innerHTML = `
    <p class="tag">${region}</p>
    <h4>${meta.vibe}</h4>
    <p class="note">${meta.note}${list.length ? '' : '（この地域の方言データは準備中です）'}</p>
    <div class="chip-row">${list.map(d=>`<button class="chip" data-id="${d.id}">${d.id}</button>`).join('')}</div>`;
  drawer.querySelectorAll('.chip').forEach(btn=>{
    btn.onclick = ()=>{ 
      selectRegion(region); 
      setTimeout(()=>renderDialect(list.find(d=>d.id===btn.dataset.id)), 50); 
    };
  });
  drawer.scrollIntoView({behavior:'smooth', block:'nearest'});
}

// イベント委譲により、複製されたすべてのカードのクリックを確実に検知
track.addEventListener('click', (e) => {
  const card = e.target.closest('.region-card');
  if (card && card.dataset.region) {
    openDrawer(card.dataset.region);
    pauseThenResume();
  }
});


applyTransform();
updateFocus();
tick();
window.addEventListener('resize', updateFocus);