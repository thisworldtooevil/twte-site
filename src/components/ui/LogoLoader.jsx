import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FILL_DURATION = 1.5;
const HOLD_DURATION = 0.5;
const CURTAIN_DURATION = 1.0;

export function LogoLoader({ onComplete }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('fill');    // fill → hold → reveal → done
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onComplete?.();
      return;
    }

    // fill → hold → reveal → done
    timerRef.current = setTimeout(() => {
      setPhase('hold');
      timerRef.current = setTimeout(() => {
        setPhase('reveal');
        timerRef.current = setTimeout(() => {
          setDone(true);
          onComplete?.();
        }, CURTAIN_DURATION * 1000 + 100);
      }, HOLD_DURATION * 1000);
    }, FILL_DURATION * 1000);

    return () => clearTimeout(timerRef.current);
  }, [reduced, onComplete]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {/* Left curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === 'reveal' ? { x: '-100%' } : { x: 0 }}
            transition={{
              duration: CURTAIN_DURATION,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: '#0A0A0A',
              zIndex: 2,
            }}
          />

          {/* Right curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === 'reveal' ? { x: '100%' } : { x: 0 }}
            transition={{
              duration: CURTAIN_DURATION,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              background: '#0A0A0A',
              zIndex: 2,
            }}
          />

          {/* Logo container — fades out as curtains split */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <LoaderLogo />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function LoaderLogo() {
  return (
    <div style={{ position: 'relative', width: 'clamp(160px, 30vw, 360px)' }}>
      {/* Outline version (always visible, dim) */}
      <img
        src="/images/2x2-globe-full.png"
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: 0.15,
          filter: 'brightness(2) contrast(0.5)',
        }}
      />

      {/* Fill version — clips from bottom to top */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{
          duration: FILL_DURATION,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <img
          src="/images/2x2-globe-full.png"
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </motion.div>
    </div>
  );
}
