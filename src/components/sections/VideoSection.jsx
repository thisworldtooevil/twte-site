import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function VideoSection({ src, poster, label, id }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const inView = useInView(sectionRef, { once: false, margin: '300px' });

  useEffect(() => {
    if (inView) {
      const video = videoRef.current;
      if (video) {
        if (video.preload !== 'auto') video.preload = 'auto';
        video.play().catch(() => {});
      }
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={`${label} video reel`}
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        aspectRatio: isMobile ? '16/9' : undefined,
        overflow: 'hidden',
        background: 'var(--black)',
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        style={{
          position: isMobile ? 'relative' : 'absolute',
          top: isMobile ? undefined : '50%',
          left: isMobile ? undefined : '50%',
          transform: isMobile ? undefined : 'translate(-50%, -50%)',
          minWidth: isMobile ? '100%' : '100%',
          minHeight: isMobile ? 'auto' : '100%',
          width: isMobile ? '100%' : 'auto',
          height: isMobile ? '100%' : 'auto',
          objectFit: isMobile ? 'contain' : 'cover',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.08) 35%, rgba(10,10,10,0.08) 65%, rgba(10,10,10,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={reduced ? {} : { y: 16, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : (reduced ? {} : { y: 16, opacity: 0 })}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: isMobile ? 24 : 48,
          left: isMobile ? 24 : 48,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'var(--cream-dim)',
          }}
        >
          {label}
        </span>
      </motion.div>
    </section>
  );
}
