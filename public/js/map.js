(function(){
const D={
HOKKAIDO:'M215 75Q235 45 270 40Q300 30 320 55Q335 80 310 100Q300 125 270 118Q255 135 235 120Q210 110 215 75Z',
TOHOKU:'M235 145Q265 135 285 150Q292 185 282 215Q272 245 250 262Q228 262 224 235Q216 200 224 170Z',
KANTO:'M236 268Q265 258 292 272Q300 300 278 322Q255 332 238 312Q226 290 236 268Z',
CHUBU:'M178 232Q205 215 232 240Q240 268 232 292Q210 305 188 290Q168 270 178 232Z',
KANSAI:'M152 292Q176 280 198 292Q206 315 190 334Q165 340 148 322Z',
CHUGOKU:'M70 278Q96 260 128 266Q154 270 156 290Q152 304 126 304Q96 302 74 296Z',
SHIKOKU:'M104 350Q135 338 170 348Q182 360 166 374Q135 380 108 370Z',
KYUSHU:'M34 318Q58 306 84 322Q94 344 78 358Q82 376 64 388Q40 382 30 356Q24 334 34 318Z',
OKINAWA:'M300 346q10-8 16 2q-6 10-16-2Z M322 358q8-6 12 2q-4 8-12-2Z M338 370q6-4 9 2q-3 6-9-2Z'};
const JP={
HOKKAIDO:['北海道','開拓のフロンティア','距離と気候、開拓移民が育てた島の方言。',[268,86]],
TOHOKU:['東北','雪国のやわらかな響き','子音がやわらかく、独特のリズムを持つ。',[255,205]],
KANTO:['関東','都会の光','標準語の土台に、土地ごとの訛りがひそむ。',[268,296]],
CHUBU:['中部','アルプスと名古屋めし','山あいや雪国ごとに、言い回しが変わる。',[204,262]],
KANSAI:['関西','笑いの本場','あたたかく速く、どの一言にも小さな火花。',[177,312]],
CHUGOKU:['中国','桃とお好み焼き','ぶっきらぼうでリズミカル、芯はやさしい。',[112,285]],
SHIKOKU:['四国','お遍路の道','四県にわたる、ゆったりした抑揚。',[138,362]],
KYUSHU:['九州','火山ととんこつ','古い言葉と海の影響が混ざる、歌うような響き。',[58,350]],
OKINAWA:['沖縄','琉球の文化','標準語より古い、島独自の言葉。',[322,392]]};
const svg=document.querySelector('.map-svg'),paths=[...document.querySelectorAll('#mapPaths path')];
svg.insertAdjacentHTML('afterbegin','<rect width="360" height="400" rx="32" fill="#e6f3fb"/><circle cx="46" cy="52" r="22" fill="#fff" opacity=".7"/><circle cx="46" cy="52" r="15" fill="#e5484d"/><g fill="none" stroke="#b9dcf2" stroke-width="2.5" stroke-linecap="round"><path d="M18 150q8-7 16 0t16 0t16 0"/><path d="M40 205q8-7 16 0t16 0"/><path d="M300 215q8-7 16 0t16 0"/><path d="M20 392q8-7 16 0t16 0"/></g>');
paths.forEach(p=>{const r=p.dataset.region;p.setAttribute('d',D[r]);regionMeta[r].path=D[r];
 p.setAttribute('tabindex','0');p.setAttribute('role','button');p.setAttribute('aria-label',r+' '+JP[r][0]);
 p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectRegion(r)}}});
svg.insertAdjacentHTML('beforeend',Object.keys(JP).map(r=>{const[x,y]=JP[r][3];return `<text class="ml" x="${x}" y="${y}" text-anchor="middle">${JP[r][0]}</text><text class="ml e" x="${x}" y="${y+9}" text-anchor="middle">${r}</text>`}).join(''));
function bil(r){const j=JP[r],m=regionMeta[r];
 document.getElementById('regionTag').textContent=r+' · '+j[0];
 document.getElementById('regionName').textContent=m.vibe;
 document.getElementById('regionNote').textContent=m.note;
 paths.forEach(p=>p.classList.toggle('on',p.dataset.region===r))}
const _s=selectRegion;selectRegion=function(r){_s(r);bil(r)};
bil('HOKKAIDO');
})();
