(function(){
if(!window.THREE)return;
const T=THREE,cv=document.getElementById('bg3d'),vl=document.getElementById('veil'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let R;try{R=new T.WebGLRenderer({canvas:cv,antialias:innerWidth>700})}catch(e){return}
R.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
const SKY=0xfff0d6,S=new T.Scene(),C=new T.PerspectiveCamera(50,1,.1,400);
S.background=new T.Color(SKY);S.fog=new T.Fog(SKY,40,220);
S.add(new T.HemisphereLight(0xffffff,0xffd9a8,1.05));
const dl=new T.DirectionalLight(0xffffff,.5);dl.position.set(-10,20,10);S.add(dl);
const sph=new T.SphereGeometry(1,16,12),cyl=new T.CylinderGeometry(1,1,1,14),box=new T.BoxGeometry(1,1,1),cone=new T.ConeGeometry(1,1,16),pyr=new T.ConeGeometry(1,1,4).rotateY(Math.PI/4),tor=new T.TorusGeometry(1,.09,8,20);
const mt={};
const M=(c,b)=>{const k=c+(b?'b':'');return mt[k]||(mt[k]=b?new T.MeshBasicMaterial({color:c}):new T.MeshLambertMaterial({color:c}))};
const mesh=(p,g,c,q,s,b)=>{const o=new T.Mesh(g,M(c,b));if(q)o.position.set(q[0],q[1],q[2]);if(s)o.scale.set(s[0],s[1],s[2]);p.add(o);return o};
const grp=(p,x,y,z)=>{const g=new T.Group();g.position.set(x||0,y||0,z||0);p.add(g);return g};
const cols=[0xe94b5a,0x3b82f6,0xf0b429,0x22a67a,0xff8ea7,0x8b5cf6],W=[];
// world
mesh(S,box,0xffe3b8,[0,-.5,-80],[500,1,400]);
mesh(S,box,0xf3c48c,[0,-.4,-30],[46,1,200]);
mesh(S,cone,0xaebfe8,[0,26,-125],[70,52,70]);mesh(S,cone,0xffffff,[0,44,-125],[22,16,22]);
[[-90,-110,40,22],[85,-105,45,26],[-50,-100,30,14],[45,-98,28,12]].forEach(h=>mesh(S,cone,0xcfe3c2,[h[0],h[3]/2,h[1]],[h[2],h[3],h[2]]));
[-7,7].forEach(x=>mesh(S,cyl,0xd9382b,[x,6,-52],[.6,12,.6]));
mesh(S,box,0xd9382b,[0,12.2,-52],[20,1,1.2]);mesh(S,box,0xd9382b,[0,9.5,-52],[16,.7,.7]);
// lanterns
const lan=[];
[-6,-18,-32,-50,-70].forEach((z,r)=>{const g=grp(S,0,0,z);
 [-34,34].forEach(x=>mesh(g,cyl,0x7a4b2a,[x,6,0],[.25,12,.25]));
 const pts=[];for(let i=0;i<=16;i++){const x=-34+i*68/16;pts.push(new T.Vector3(x,11.5-3.2*(1-(x/34)**2),0))}
 g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x5a3a22})));
 for(let i=1;i<16;i++){const p=pts[i],l=grp(g,p.x,p.y,0);mesh(l,sph,i%2?0xe63946:0xfff3d6,[0,-.9,0],[.75,.95,.75],1);mesh(l,cyl,0x222222,[0,.05,0],[.4,.15,.4]);l.userData.ph=i+r;lan.push(l)}});
// nobori flags
const flg=[];
for(let i=0;i<9;i++)[-1,1].forEach(sd=>{const g=grp(S,sd*19,0,-2-i*8.5);
 mesh(g,cyl,0x6b4a2b,[0,4.2,0],[.09,8.4,.09]);mesh(g,cyl,0x6b4a2b,[-sd*.9,8.2,0],[.06,1.9,.06]).rotation.z=Math.PI/2;
 const f=new T.Mesh(new T.PlaneGeometry(1.5,6),new T.MeshBasicMaterial({color:[0xe63946,0xf0b429,0x2a9d8f][(i+(sd>0?1:0))%3],side:T.DoubleSide}));
 f.position.set(-sd*.9,5.2,0);f.userData.ph=i*1.3+sd;g.add(f);flg.push(f)});
// characters
function person(p,x,z,c,s){const g=grp(p,x,0,z);g.scale.setScalar(s||1);
 const l=[-.18,.18].map(dx=>{const lg=grp(g,dx,.9,0);mesh(lg,cyl,0x1f2a44,[0,-.45,0],[.13,.9,.13]);return lg});
 mesh(g,cyl,c,[0,1.35,0],[.32,.9,.26]);mesh(g,sph,0xffd9b8,[0,2.05,0],[.27,.27,.27]);mesh(g,cyl,0xffffff,[0,2.15,0],[.28,.08,.28]);
 g.userData={legs:l,ph:Math.random()*6.28};W.push(g);return g}
function mikoshi(p){const g=grp(p);
 [-1.6,1.6].forEach((z,k)=>{mesh(g,box,0xb5782f,[0,2.1,z],[10,.3,.3]);[-3.6,-1.2,1.2,3.6].forEach((x,i)=>person(g,x,z*1.45,cols[(i+k)%6],1.2))});
 mesh(g,box,0xe0a526,[0,2.5,0],[4.8,.5,4.2]);mesh(g,box,0x8e1b1b,[0,3.75,0],[3.4,2,3.2]);mesh(g,box,0xe0a526,[0,4.85,0],[3.8,.25,3.6]);
 mesh(g,pyr,0xe0a526,[0,5.9,0],[3.9,1.8,3.9]);mesh(g,sph,0xffd23f,[0,7.05,0],[.35,.35,.35]);mesh(g,cone,0xffd23f,[0,7.6,0],[.25,.8,.25]);
 [-1.9,1.9].forEach(x=>[-1.9,1.9].forEach(z=>mesh(g,sph,0xffd23f,[x,5.1,z],[.22,.22,.22])));return g}
function shishi(p){const g=grp(p),hd=grp(g,3,3.3,0),jw=grp(hd,.3,-.7,0),legs=[];
 mesh(hd,sph,0xd7263d,[0,0,0],[1.3,1.2,1.3]);
 [-.55,.55].forEach(z=>{mesh(hd,sph,0xffffff,[.85,.45,z],[.32,.38,.28]);mesh(hd,sph,0x111111,[1.1,.45,z],[.14,.2,.14])});
 mesh(hd,sph,0xffd23f,[1.3,-.05,0],[.28,.25,.4]);
 [-.4,.4].forEach(z=>mesh(hd,cone,0xffd23f,[.1,1.25,z],[.2,.7,.2]));
 for(let i=0;i<12;i++){const a=i/12*6.283,m=mesh(hd,cone,i%2?0xffffff:0x2da66a,[-.35,Math.sin(a)*1.35,Math.cos(a)*1.35],[.38,.95,.38]);m.rotation.x=Math.PI/2-a}
 [-.55,-.18,.18,.55].forEach(z=>mesh(hd,box,0xffffff,[1,-.6,z],[.2,.3,.18]));
 mesh(hd,box,0x4a0e19,[.7,-.65,0],[1.2,.12,1.2]);
 mesh(jw,box,0xd7263d,[.5,-.2,0],[1.3,.35,1.3]);[-.4,0,.4].forEach(z=>mesh(jw,box,0xffffff,[1,.05,z],[.16,.22,.16]));
 mesh(g,cyl,0x2da66a,[-.8,2.1,0],[1.1,5.4,1.1]).rotation.z=Math.PI/2;
 [-3,-1.5,0,1.3].forEach(x=>mesh(g,tor,0xffffff,[x,2.1,0],[1.12,1.12,1.12]).rotation.y=Math.PI/2);
 mesh(g,sph,0xffffff,[-3.7,2.4,0],[.5,.5,.5]);
 [[1.2,.4],[1.2,-.4],[-2.6,.4],[-2.6,-.4]].forEach(q=>{const l=grp(g,q[0],.95,q[1]);mesh(l,cyl,0x1f2a44,[0,-.48,0],[.17,.95,.17]);mesh(l,box,0xffffff,[.12,-.92,0],[.4,.16,.28]);legs.push(l)});
 g.userData={hd,jw,legs};return g}
function sign(t,bg){const c=document.createElement('canvas');c.width=128;c.height=192;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,128,192);x.strokeStyle='#fff';x.lineWidth=8;x.strokeRect(4,4,120,184);x.fillStyle='#fff';x.font='bold 40px "Noto Sans JP",sans-serif';x.textAlign='center';[...t].forEach((ch,i)=>x.fillText(ch,64,50+i*42));return new T.CanvasTexture(c)}
function chindon(p){const g=grp(p),d=-1;
 const a=person(g,0,0,0xff5fa2,1.2);mesh(a,cyl,0xd7263d,[d*.55,1.5,0],[.42,.5,.42]).rotation.z=Math.PI/2;mesh(a,cone,0xfff176,[0,2.6,0],[.75,.45,.75]);
 const b=person(g,d*2.8,0,0x2ec4b6,1.2);mesh(b,cyl,0x222222,[d*.5,1.9,0],[.06,.9,.06]).rotation.z=-d;mesh(b,cone,0xff6b6b,[0,2.6,0],[.6,.5,.6]);
 const c=person(g,d*5.6,0,0xffb703,1.2);mesh(c,cyl,0x6b4a2b,[d*.45,2.2,0],[.05,4.4,.05]);mesh(c,cone,0x9b5de5,[0,2.6,0],[.65,.5,.65]);
 const sg=new T.Mesh(new T.PlaneGeometry(2.2,3.2),new T.MeshBasicMaterial({map:sign('ちんどん','#e63946')}));sg.position.set(d*.45,5.3,0);c.add(sg);return g}
const pa=grp(S,0,0,-28),pb=grp(S,20,0,-12);
const sh=shishi(pa);sh.scale.setScalar(1.5);
const mk=mikoshi(pa);mk.position.x=-22;mk.scale.setScalar(1.5);
const ch=chindon(pb);ch.scale.setScalar(1.25);
const crowd=[];for(let i=0;i<16;i++)crowd.push(person(S,-45+i*6+Math.random()*3,-52-Math.random()*8,cols[i%6],1.6));
// clouds
const clouds=[];for(let i=0;i<6;i++){const g=grp(S,Math.random()*240-120,28+Math.random()*12,-90-Math.random()*40);
 [[0,0,8],[7,-1,6],[-7,-1,6]].forEach(q=>mesh(g,sph,0xffffff,[q[0],q[1],0],[q[2],q[2]*.55,q[2]*.6]));clouds.push(g)}
// confetti
const N=260,pos=new Float32Array(N*3),col=new Float32Array(N*3),pc=[0xff5d8f,0xffd23f,0x3bceac,0x5aa9ff,0xffffff].map(h=>new T.Color(h));
for(let i=0;i<N;i++){pos.set([Math.random()*90-45,Math.random()*26,Math.random()*-70+12],i*3);const c=pc[i%5];col.set([c.r,c.g,c.b],i*3)}
const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pos,3));pg.setAttribute('color',new T.BufferAttribute(col,3));
S.add(new T.Points(pg,new T.PointsMaterial({size:.45,vertexColors:true})));
// loop
let mx=0,my=0,last=performance.now(),t0=last;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.fov=w/h<1?72:50;C.updateProjectionMatrix()}
function draw(t,dt){const sy=scrollY;
 C.position.x+=(Math.sin(t*.12)*6+mx*6-C.position.x)*.04;C.position.y=6+Math.sin(t*.2)*.8-my*1.2;C.position.z=14-Math.min(sy*.004,10);C.lookAt(mx*5,4,-30);
 vl.style.opacity=(.1+Math.min(sy/innerHeight,1.6)*.22).toFixed(3);
 pa.position.x+=3.4*dt;if(pa.position.x>80)pa.position.x=-80;pb.position.x-=4.6*dt;if(pb.position.x<-80)pb.position.x=80;
 const u=sh.userData;u.hd.rotation.z=Math.sin(t*3.2)*.14;u.hd.rotation.y=Math.sin(t*1.7)*.35;u.jw.rotation.z=-Math.abs(Math.sin(t*3.2))*.6;sh.rotation.y=Math.sin(t*1.5)*.08;
 u.legs.forEach((l,i)=>l.rotation.z=Math.sin(t*6+i*Math.PI)*.45);
 mk.position.y=Math.abs(Math.sin(t*3.1))*.4;mk.rotation.z=Math.sin(t*3.1)*.02;ch.position.y=Math.abs(Math.sin(t*4))*.15;
 W.forEach(w=>{const s=Math.sin(t*7+w.userData.ph)*.5;w.userData.legs[0].rotation.z=s;w.userData.legs[1].rotation.z=-s});
 crowd.forEach(w=>w.position.y=Math.abs(Math.sin(t*3+w.userData.ph))*.6);
 lan.forEach(l=>l.rotation.z=Math.sin(t*1.4+l.userData.ph)*.12);flg.forEach(f=>f.rotation.y=Math.sin(t*2+f.userData.ph)*.5);
 clouds.forEach(c=>{c.position.x+=dt*1.2;if(c.position.x>140)c.position.x=-140});
 for(let i=0;i<N;i++){pos[i*3+1]-=dt*1.2;if(pos[i*3+1]<0)pos[i*3+1]=26;pos[i*3]+=Math.sin(t+i)*dt*.6}
 pg.attributes.position.needsUpdate=true;R.render(S,C)}
function loop(now){requestAnimationFrame(loop);if(document.hidden)return;const dt=Math.min((now-last)/1000,.05);last=now;draw((now-t0)/1000,dt)}
addEventListener('resize',()=>{size();if(RM)draw(0,0)});size();
if(RM)draw(0,0);else requestAnimationFrame(loop);
})();
