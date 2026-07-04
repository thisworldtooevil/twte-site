import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SectionLabel } from '../layout/Section';

const ITEM_HEIGHT = 420;
const ITEM_HEIGHT_MOBILE = 280;
const GAP = 8;
const AUTO_SPEED = 0.5; // px per frame

export function PhotoGallery({ photos, onPhotoClick }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const [halfWidth, setHalfWidth] = useState(0);
  const autoRef = useRef(null);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
  const itemH = isMobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT;

  // Measure half-width (width of original set) for wrapping
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll('.marquee-item-orig');
    let w = 0;
    items.forEach((el) => { w += el.offsetWidth + GAP; });
    setHalfWidth(w);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Wrap x so it always stays within [-halfWidth, 0]
  const wrapX = useCallback((val) => {
    if (halfWidth <= 0) return val;
    let v = val % halfWidth;
    if (v > 0) v -= halfWidth;
    return v;
  }, [halfWidth]);

  // Auto-scroll loop
  useEffect(() => {
    if (reduced || halfWidth <= 0) return;

    let running = true;
    function tick() {
      if (!running) return;
      if (!pausedRef.current) {
        const speed = hoverRef.current ? AUTO_SPEED * 0.15 : AUTO_SPEED;
        const next = wrapX(x.get() - speed);
        x.set(next);
      }
      autoRef.current = requestAnimationFrame(tick);
    }
    autoRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(autoRef.current); };
  }, [reduced, halfWidth, x, wrapX]);

  const pauseAutoScroll = useCallback(() => { pausedRef.current = true; }, []);
  const resumeAutoScroll = useCallback(() => {
    setTimeout(() => { pausedRef.current = false; }, 3000);
  }, []);

  const handleDragStart = useCallback(() => {
    wasDraggedRef.current = false;
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleDrag = useCallback((_, info) => {
    if (Math.abs(info.offset.x) > 8) wasDraggedRef.current = true;
    // Wrap during drag
    const current = x.get();
    x.set(wrapX(current));
  }, [x, wrapX]);

  const handleDragEnd = useCallback((_, info) => {
    const velocity = info.velocity.x;
    const current = x.get();

    if (Math.abs(velocity) > 50) {
      // Momentum coast
      const coast = velocity * 0.8;
      const target = wrapX(current + coast);
      animate(x, target, {
        type: 'tween',
        duration: Math.min(Math.max(Math.abs(velocity) / 1000, 0.3), 1.5),
        ease: [0.16, 1, 0.3, 1],
        onComplete: resumeAutoScroll,
      });
    } else {
      resumeAutoScroll();
    }
  }, [x, wrapX, resumeAutoScroll]);

  const handleArrow = useCallback((dir) => {
    pauseAutoScroll();
    const current = x.get();
    // Advance by roughly one item width
    const step = (itemH * 0.8 + GAP) * dir;
    const target = wrapX(current + step);
    animate(x, target, {
      type: 'tween',
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onComplete: resumeAutoScroll,
    });
  }, [x, wrapX, itemH, pauseAutoScroll, resumeAutoScroll]);

  const handleItemClick = useCallback((index) => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    onPhotoClick(index);
  }, [onPhotoClick]);

  // Double the photos for seamless loop
  const allPhotos = [...photos, ...photos];

  return (
    <section
      id="portfolio"
      aria-label="Selected work"
      style={{ padding: isMobile ? '80px 0 60px' : '120px 0 80px', overflow: 'hidden' }}
    >
      <div style={{ padding: isMobile ? '0 24px' : '0 48px' }}>
        <SectionLabel>Selected Work</SectionLabel>
      </div>

      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -99999, right: 99999 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
        style={{
          display: 'flex',
          gap: GAP,
          width: 'max-content',
          x,
          touchAction: 'pan-y',
        }}
      >
        {allPhotos.map((photo, i) => {
          const isOrig = i < photos.length;
          const realIndex = i % photos.length;
          return (
            <button
              key={i}
              type="button"
              className={`marquee-item${isOrig ? ' marquee-item-orig' : ''}`}
              aria-label={isOrig ? `View portfolio photograph ${realIndex + 1}` : undefined}
              aria-hidden={!isOrig || undefined}
              tabIndex={isOrig ? 0 : -1}
              onClick={() => handleItemClick(realIndex)}
              style={{
                flexShrink: 0,
                height: itemH,
                minWidth: isMobile ? 140 : 200,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                border: 'none',
                background: 'none',
                padding: 0,
                font: 'inherit',
                color: 'inherit',
              }}
            >
              <img
                src={photo.src}
                alt={isOrig ? photo.alt : ''}
                loading="lazy"
                style={{
                  height: '100%',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  transition: 'transform 0.6s var(--ease-out-expo)',
                  pointerEvents: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </button>
          );
        })}
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: isMobile ? '16px 24px 0' : '16px 48px 0' }}>
        <button
          type="button"
          aria-label="Scroll gallery left"
          onClick={() => handleArrow(1)}
          style={{
            width: 44,
            height: 44,
            border: '1px solid var(--grey-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            color: 'var(--cream-dim)',
            transition: 'all 0.3s',
            userSelect: 'none',
            background: 'transparent',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = 'var(--cream-dim)'; }}
        >
          &#8592;
        </button>
        <button
          type="button"
          aria-label="Scroll gallery right"
          onClick={() => handleArrow(-1)}
          style={{
            width: 44,
            height: 44,
            border: '1px solid var(--grey-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            color: 'var(--cream-dim)',
            transition: 'all 0.3s',
            userSelect: 'none',
            background: 'transparent',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = 'var(--cream-dim)'; }}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
