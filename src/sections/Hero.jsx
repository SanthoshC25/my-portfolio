import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactorScene from '../three/ReactorScene';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 3.0 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const bgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Animated background particles via CSS
    const bg = bgRef.current;
    if (!bg) return;

    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      bg.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Animated background gradients */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-50px',
          transition: 'transform 0.3s ease-out',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214,40,40,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,164,92,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214,40,40,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
        }} />
      </div>

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              borderRadius: '50%',
              background: i % 3 === 0 ? 'rgba(214,40,40,0.4)' : i % 3 === 1 ? 'rgba(201,164,92,0.3)' : 'rgba(255,255,255,0.15)',
              left: `${Math.random() * 100}%`,
              bottom: '-5px',
              animation: `particleFloat ${6 + Math.random() * 8}s linear ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--space-xl)', width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="hero-layout">
          {/* Left content */}
          <motion.div
            className="hero-content"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Freelance badge */}
            <motion.div variants={item} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 'var(--radius-2xl)',
              background: 'rgba(76, 175, 80, 0.08)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
              marginBottom: 'var(--space-xl)',
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4CAF50',
                animation: 'pulseDot 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(76, 175, 80, 0.9)',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                Available for Freelance Projects
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={item}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              SANTHOSH
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>KUMAR</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={item} className="hero-subtitle" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              letterSpacing: '0.25em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-lg)',
            }}>
              <span style={{ width: 30, height: 1, background: 'var(--accent-primary)' }} />
              Software Developer
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 700,
                marginBottom: 'var(--space-md)',
              }}
            >
              Engineering Digital Experiences.
            </motion.p>

            {/* Description */}
            <motion.p variants={item} style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              marginBottom: 'var(--space-2xl)',
            }}>
              I build modern, scalable and user-focused digital solutions by combining
              creative frontend experiences with powerful backend engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="hero-buttons">
              <motion.button
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Collaborate <Sparkles size={16} />
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right side — 3D Canvas */}
          <motion.div
            className="hero-3d-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Outer Eclipse Glow Aura */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(214,40,40,0.22) 0%, rgba(201,164,92,0.08) 45%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }} />

            <Suspense fallback={
              <div style={{ position: 'relative', width: 280, height: 280, maxWidth: '100%' }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '1px solid rgba(214,40,40,0.2)',
                  animation: 'rotate 8s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: '30%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(214,40,40,0.4), transparent)',
                  animation: 'coreGlow 2s ease-in-out infinite',
                }} />
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, isMobile ? 3.7 : 5.4], fov: 48 }}
                style={{
                  width: '100%',
                  height: '100%',
                  touchAction: 'pan-y',
                  pointerEvents: isMobile ? 'none' : 'auto',
                }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <ReactorScene />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={!isMobile}
                  autoRotate
                  autoRotateSpeed={0.5}
                  dampingFactor={0.05}
                  enableDamping
                  maxPolarAngle={Math.PI}
                  minPolarAngle={0}
                />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => scrollTo('about')}
          style={{
            position: isMobile ? 'relative' : 'absolute',
            bottom: isMobile ? 'auto' : 30,
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: isMobile ? 24 : 0,
            marginBottom: isMobile ? 24 : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Scroll to explore
          </span>
          <ChevronDown size={18} style={{ animation: 'bounceDown 2s ease-in-out infinite' }} />
        </motion.div>
      </div>
    </section>
  );
}
