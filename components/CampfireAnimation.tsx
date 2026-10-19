'use client';

import { useEffect, useRef } from 'react';

export default function CampfireAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const width = 560;
    const height = 440;
    canvas.width = width;
    canvas.height = height;

    const originX = width / 2;
    const originY = 330;

    class FlameParticle {
      x = 0;
      y = 0;
      size = 0;
      speedY = 0;
      speedX = 0;
      life = 0;
      maxLife = 0;
      active = true;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = originX + (Math.random() * 160 - 80);
        this.y = originY + (Math.random() * 24 - 12);
        this.size = Math.random() * 55 + 35;
        this.speedY = -(Math.random() * 3 + 2);
        this.speedX = Math.random() * 3 - 1.5;
        this.life = 0;
        this.maxLife = Math.random() * 70 + 50;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.life++;
        if (this.life >= this.maxLife) {
          this.reset();
          return;
        }

        this.y += this.speedY;
        this.x += this.speedX;

        if (this.x > originX) this.speedX -= 0.018;
        if (this.x < originX) this.speedX += 0.018;
        this.size *= 0.955;
      }

      draw(context: CanvasRenderingContext2D) {
        if (!this.active) return;

        const lifeRatio = this.life / this.maxLife;
        let opacity = 1 - Math.pow(lifeRatio, 1.5);

        context.beginPath();
        const gradient = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );

        // 鮮やかな炎のカラーのみ使用（黒・灰色は不使用）
        let r = 255;
        let g = 255;
        let b = 255;
        if (lifeRatio < 0.15) {
          r = 255; g = 255; b = 255;
        } else if (lifeRatio < 0.4) {
          r = 255; g = 219; b = 88;
        } else if (lifeRatio < 0.7) {
          r = 240; g = 100; b = 20;
        } else {
          r = 180; g = 30; b = 10;
          opacity *= 0.8;
        }

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        context.fillStyle = gradient;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    class Spark {
      x = 0;
      y = 0;
      size = 0;
      speedY = 0;
      speedX = 0;
      life = 0;
      maxLife = 0;
      active = true;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = originX + (Math.random() * 180 - 90);
        this.y = originY - Math.random() * 50;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 5 + 3);
        this.speedX = Math.random() * 7 - 3.5;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 40;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.life++;
        if (this.life >= this.maxLife) {
          if (Math.random() > 0.4) this.reset();
          else this.active = false;
          return;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedX += Math.random() * 0.6 - 0.3;
      }

      draw(context: CanvasRenderingContext2D) {
        if (!this.active) return;
        const lifeRatio = this.life / this.maxLife;
        const opacity = 1 - lifeRatio;
        context.fillStyle = `rgba(227, 168, 87, ${opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const drawLogs = () => {
      ctx.fillStyle = '#3a2e26';
      ctx.beginPath();
      ctx.moveTo(originX - 145, originY + 45);
      ctx.lineTo(originX + 25, originY - 15);
      ctx.lineTo(originX + 45, originY - 5);
      ctx.lineTo(originX - 105, originY + 65);
      ctx.fill();

      ctx.fillStyle = '#2d221c';
      ctx.beginPath();
      ctx.moveTo(originX + 135, originY + 35);
      ctx.lineTo(originX - 35, originY - 25);
      ctx.lineTo(originX - 55, originY - 10);
      ctx.lineTo(originX + 95, originY + 60);
      ctx.fill();

      ctx.fillStyle = '#1a1512';
      ctx.beginPath();
      ctx.arc(originX, originY + 15, 45, 0, Math.PI);
      ctx.fill();
    };

    const particles: FlameParticle[] = [];
    const sparks: Spark[] = [];

    for (let i = 0; i < 270; i++) particles.push(new FlameParticle());
    for (let i = 0; i < 90; i++) sparks.push(new Spark());

    const animate = () => {
      // 画面を完全にクリア（背景の黒い影や矩形塗りは完全に除外）
      ctx.clearRect(0, 0, width, height);

      drawLogs();

      ctx.globalCompositeOperation = 'source-over';

      particles.forEach((p) => {
        if (!p.active && Math.random() < 0.1) p.reset();
        p.update();
        p.draw(ctx);
      });

      sparks.forEach((s) => {
        if (!s.active && Math.random() < 0.05) s.reset();
        s.update();
        s.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}