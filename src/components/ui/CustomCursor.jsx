import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const ringPos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  useEffect(() => {
    if (reduced || isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      ringPos.current.tx = e.clientX - 20;
      ringPos.current.ty = e.clientY - 20;
    };

    const onMouseEnter = () => {
      activeRef.current = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      activeRef.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    function animate() {
      ringPos.current.x = lerp(ringPos.current.x, ringPos.current.tx, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, ringPos.current.ty, 0.15);
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Hover states for interactive elements
    const addHover = (selector, cls) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', () => ring.classList.add(cls));
        el.addEventListener('mouseleave', () => ring.classList.remove(cls));
      });
    };

    // Use MutationObserver to attach hover states after React renders
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, .form-submit').forEach((el) => {
        el.style.cursor = 'none';
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Attach hover listeners with delegation
    const onOverInteractive = (e) => {
      const el = e.target.closest('a, button, input, .form-submit');
      if (el) ring.classList.add('hover');
    };
    const onOutInteractive = (e) => {
      const el = e.target.closest('a, button, input, .form-submit');
      if (el) ring.classList.remove('hover');
    };
    const onOverMarquee = (e) => {
      if (e.target.closest('.marquee-item')) {
        ring.classList.add('marquee-hover');
        ring.classList.remove('hover');
      }
    };
    const onOutMarquee = (e) => {
      if (e.target.closest('.marquee-item')) {
        ring.classList.remove('marquee-hover');
      }
    };

    document.addEventListener('mouseover', onOverInteractive);
    document.addEventListener('mouseout', onOutInteractive);
    document.addEventListener('mouseover', onOverMarquee);
    document.addEventListener('mouseout', onOutMarquee);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onOverInteractive);
      document.removeEventListener('mouseout', onOutInteractive);
      document.removeEventListener('mouseover', onOverMarquee);
      document.removeEventListener('mouseout', onOutMarquee);
      observer.disconnect();
      document.body.style.cursor = '';
    };
  }, [reduced, isTouchDevice, lerp]);

  if (reduced || isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--cream)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(242,237,230,0.35)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          transition: 'width 0.35s var(--ease-out-expo), height 0.35s var(--ease-out-expo), border-color 0.35s, opacity 0.3s',
        }}
      />
    </>
  );
}
