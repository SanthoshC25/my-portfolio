import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  // Store callback in a ref so the effect never re-runs due to prop changes
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onCompleteRef.current?.();
      return;
    }

    // After 2.8s start fade-out, then fire onComplete
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        onCompleteRef.current?.();
      }, 600);
    }, 2800);

    return () => clearTimeout(exitTimer);
  }, []); // runs only once on mount

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#08090D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 2 + (i % 3),
                  height: 2 + (i % 3),
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#D62828' : i % 3 === 1 ? '#C9A45C' : 'rgba(255,255,255,0.3)',
                  left: `${(i * 5.3) % 100}%`,
                  bottom: '-10px',
                  animation: `particleFloat ${4 + (i % 6)}s linear ${(i % 3) * 0.5}s infinite`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Reactor core */}
          <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 40 }}>
            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(214, 40, 40, 0.3)',
                animation: 'rotate 4s linear infinite',
              }}
            >
              <div style={{
                position: 'absolute',
                top: -3,
                left: '50%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#D62828',
                boxShadow: '0 0 10px #D62828',
              }} />
            </div>

            {/* Middle ring */}
            <div
              style={{
                position: 'absolute',
                inset: 20,
                borderRadius: '50%',
                border: '1.5px solid rgba(201, 164, 92, 0.3)',
                animation: 'rotateReverse 3s linear infinite',
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: -3,
                left: '50%',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#C9A45C',
                boxShadow: '0 0 10px #C9A45C',
              }} />
            </div>

            {/* Inner ring */}
            <div
              style={{
                position: 'absolute',
                inset: 40,
                borderRadius: '50%',
                border: '1px solid rgba(214, 40, 40, 0.2)',
                animation: 'rotate 2s linear infinite',
              }}
            />

            {/* Core */}
            <div
              style={{
                position: 'absolute',
                inset: 55,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(214,40,40,0.6) 0%, rgba(201,164,92,0.3) 50%, transparent 70%)',
                animation: 'coreGlow 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Initializing Developer Experience
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 20,
              width: 200,
              height: 2,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #D62828, #C9A45C)',
                borderRadius: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
