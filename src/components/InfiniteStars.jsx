import { useEffect, useRef } from 'react';

/**
 * InfiniteStars — Full-screen cosmic starfield running continuously across the entire website.
 * Features:
 * - 3D-depth parallax scrolling with background stars
 * - Ambient celestial twinkle and Marvel red/gold dust
 * - Periodic shooting star meteors
 * - Interactive Comet cursor: moves with the cursor, leaving a blazing fiery tail and glowing stardust sparks
 */
export default function InfiniteStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll parallax tracker
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Generate stars across multiple depth layers ──
    const STAR_COUNT = 320;
    const stars = [];

    const colors = [
      '#FFFFFF',
      '#FFFFFF',
      '#E8ECF5',
      '#FFFFFF',
      '#D62828', // Crimson accent
      '#C9A45C', // Gold accent
      '#88AAEE', // Deep cosmic blue
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 1.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    // ── Shooting stars / meteors (Background) ──
    const meteors = [];
    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        fadeSpeed: Math.random() * 0.02 + 0.015,
      });
    };

    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnMeteor();
      }
    }, 4500);

    // ── Interactive Cursor Comet System ──
    const mouse = {
      x: -1000,
      y: -1000,
      lastX: -1000,
      lastY: -1000,
      speed: 0,
      active: false,
    };
    const cometTrail = [];
    const cometSparks = [];

    const handlePointerMove = (clientX, clientY) => {
      const prevX = mouse.x === -1000 ? clientX : mouse.x;
      const prevY = mouse.y === -1000 ? clientY : mouse.y;
      const dx = clientX - prevX;
      const dy = clientY - prevY;
      const dist = Math.hypot(dx, dy);

      mouse.speed = Math.min(dist, 50);
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.active = true;

      // Add high-density trail point
      cometTrail.unshift({
        x: clientX,
        y: clientY,
        life: 1.0,
        size: Math.min(9, Math.max(3.5, dist * 0.35)),
      });

      // Spawn stardust sparks along the comet's motion vector
      if (dist > 2) {
        const sparkCount = Math.min(6, Math.floor(dist / 5) + 1);
        for (let k = 0; k < sparkCount; k++) {
          const moveAngle = Math.atan2(dy, dx);
          // Eject sparks backward from comet head
          const angle = moveAngle + Math.PI + (Math.random() - 0.5) * 1.4;
          const speed = Math.random() * (dist * 0.18) + 1.2;
          cometSparks.push({
            x: clientX + (Math.random() - 0.5) * 8,
            y: clientY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.6,
            vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.6,
            life: 1.0,
            decay: Math.random() * 0.035 + 0.02,
            size: Math.random() * 2.2 + 0.8,
            color: Math.random() > 0.4 ? '#C9A45C' : '#D62828',
          });
        }
      }
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    let frame = 0;

    // ── Main Render Loop ──
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity
      scrollVelocity *= 0.92;

      // 1. Draw Background Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy - scrollVelocity * (0.8 / star.z);

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const alpha = Math.max(
          0.1,
          star.baseAlpha + Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.35
        );

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;

        if (star.size > 1.3 && star.z < 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = star.color === '#D62828' ? 'rgba(214,40,40,0.25)' : 'rgba(255,255,255,0.15)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / (star.z * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      }

      // 2. Draw Shooting Stars / Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.fadeSpeed;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        gradient.addColorStop(0.3, `rgba(214, 40, 40, ${m.alpha * 0.8})`);
        gradient.addColorStop(1, 'rgba(214, 40, 40, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      // 3. Draw Interactive Cursor Comet Trail
      if (cometTrail.length > 1) {
        for (let i = cometTrail.length - 1; i >= 0; i--) {
          cometTrail[i].life -= 0.035;
          if (cometTrail[i].life <= 0) {
            cometTrail.splice(i, 1);
          }
        }

        for (let i = 0; i < cometTrail.length - 1; i++) {
          const p1 = cometTrail[i];
          const p2 = cometTrail[i + 1];
          const alpha = p1.life;
          const strokeWidth = p1.size * p1.life;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Marvel fiery gradient from white to gold to crimson
          ctx.strokeStyle =
            i < 3
              ? `rgba(255, 255, 255, ${alpha * 0.95})`
              : i < 8
              ? `rgba(201, 164, 92, ${alpha * 0.8})`
              : `rgba(214, 40, 40, ${alpha * 0.65})`;

          ctx.lineWidth = Math.max(1, strokeWidth);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // 4. Draw Comet Head at Cursor Position
      if (mouse.active && mouse.x > 0 && mouse.y > 0 && cometTrail.length > 0) {
        const headAlpha = Math.min(1, cometTrail[0]?.life || 0);

        // Radiant Outer Corona / Flare
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 26);
        glow.addColorStop(0, `rgba(255, 255, 255, ${headAlpha * 0.95})`);
        glow.addColorStop(0.2, `rgba(201, 164, 92, ${headAlpha * 0.75})`);
        glow.addColorStop(0.55, `rgba(214, 40, 40, ${headAlpha * 0.45})`);
        glow.addColorStop(1, 'rgba(214, 40, 40, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 26, 0, Math.PI * 2);
        ctx.fill();

        // Intense White Nucleus
        ctx.fillStyle = `rgba(255, 255, 255, ${headAlpha})`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Comet Stardust Sparks / Embers
      for (let i = cometSparks.length - 1; i >= 0; i--) {
        const s = cometSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          cometSparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
