'use client';

import { useEffect, useRef } from 'react';

interface WaTalkHeroProps {
  lang: string;
  imageSrc: string;
}

const HAIKU: Record<string, string[]> = {
  ja: ['四季をゆく', '旅で深める', '和の文化'],
  en: ['Four seasons,', 'one journey —', 'deepening Wa.'],
  zh: ['行四季之旅', '探和文化', '深其之美'],
};

export default function WaTalkHero({ lang, imageSrc }: WaTalkHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL背景マーブル
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const V = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const F = `
      precision highp float;
      uniform vec2 R;
      uniform float T;
      float h(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.55;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.04+vec2(3.1,1.7);a*=.5;}return v;}
      void main(){
        vec2 uv=gl_FragCoord.xy/R;
        vec2 p=(uv-.5)*vec2(R.x/R.y,1.)*2.6;
        vec2 lp=vec2(cos(T),sin(T))*1.35;
        vec2 q=p+lp;
        float w=fbm(q+.8*vec2(fbm(q),fbm(q+vec2(4.7,2.9))));
        float mist=fbm(q*.55+1.7);
        // 春マーブル
        float v=sin((q.x*.9+q.y*1.1)*2.2+w*7.+T*1.5);
        float veins=pow(.5+.5*v,12.);
        vec3 col=mix(vec3(1.,.992,.984),vec3(.969,.894,.882),smoothstep(.25,.85,mist));
        col=mix(col,vec3(.914,.482,.470),veins*w*.45);
        col=mix(col,vec3(.824,.122,.169),veins*veins*.34);
        col=mix(col,vec3(1.,.992,.984),.20+.20*uv.y);
        gl_FragColor=vec4(col,1.);
      }
    `;

    function sh(t: number, s: string) {
      const x = gl!.createShader(t)!;
      gl!.shaderSource(x, s);
      gl!.compileShader(x);
      return x;
    }

    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, V));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, F));
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const ap = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(pr, 'R');
    const uT = gl.getUniformLocation(pr, 'T');

    function resize() {
      canvas!.width = window.innerWidth * 0.6;
      canvas!.height = window.innerHeight * 0.6;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    window.addEventListener('resize', resize);
    resize();

    const LOOP = 18;
    const start = performance.now();
    let raf: number;

    function tick() {
      const t = (performance.now() - start) / 1000;
      gl!.uniform2f(uR, canvas!.width, canvas!.height);
      gl!.uniform1f(uT, (t % LOOP) / LOOP * Math.PI * 2);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const haiku = HAIKU[lang] || HAIKU.ja;

  return (
    <section className="relative h-[88vh] min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* WebGL背景 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 animate-fade-in"
        aria-hidden="true"
      />

      {/* 画像マスク */}
      <div className="relative z-10 w-[min(880px,94vw)] aspect-[1000/700] fan-mask drop-shadow-[0_20px_40px_rgba(60,30,40,0.25)]">
        <img
          src={imageSrc}
          alt="Wa Talk hero"
          className="w-full h-full object-cover"
        />

        {/* 俳句テキスト */}
        <div className="absolute inset-0 flex flex-row-reverse items-center justify-center gap-[clamp(1.2rem,3.4vw,3rem)] pointer-events-none">
          {haiku.map((line, i) => (
            <span
              key={i}
              className="writing-mode-vertical text-[clamp(19px,2.9vw,32px)] font-bold text-white tracking-[0.42em]"
              style={{
                writingMode: 'vertical-rl',
                textShadow: '0 2px 14px rgba(50,10,20,0.55), 0 0 3px rgba(0,0,0,0.35)',
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
