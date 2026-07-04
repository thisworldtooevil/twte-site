import { useEffect, useRef, useCallback } from 'react';
import { getLenis } from '../../hooks/useLenis';

export function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const lastFocusRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (currentIndex === null) return;

    lastFocusRef.current = document.activeElement;
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      lastFocusRef.current?.focus();
    };
  }, [currentIndex]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNavigate(1);
    if (e.key === 'ArrowLeft') onNavigate(-1);
    if (e.key === 'Tab') {
      const btns = containerRef.current?.querySelectorAll('button');
      if (!btns?.length) return;
      const first = btns[0];
      const last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose, onNavigate]);

  if (currentIndex === null) return null;

  const image = images[currentIndex];

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Image viewer"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(10,10,10,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close image viewer"
        style={{
          position: 'absolute',
          top: 32,
          right: 32,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: '1px solid var(--grey-dim)',
          color: 'var(--grey-text)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 20,
          cursor: 'pointer',
          transition: 'all 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = 'var(--grey-text)'; }}
      >
        &times;
      </button>

      <button
        onClick={() => onNavigate(-1)}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: '1px solid var(--grey-dim)',
          color: 'var(--grey-text)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 18,
          cursor: 'pointer',
          transition: 'all 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = 'var(--grey-text)'; }}
      >
        &#8592;
      </button>

      <button
        onClick={() => onNavigate(1)}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: '1px solid var(--grey-dim)',
          color: 'var(--grey-text)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 18,
          cursor: 'pointer',
          transition: 'all 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = 'var(--grey-text)'; }}
      >
        &#8594;
      </button>

      <img
        src={image.src}
        alt={image.alt}
        style={{
          maxWidth: '85vw',
          maxHeight: '85vh',
          objectFit: 'contain',
        }}
      />

      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: 2,
          color: 'var(--grey-text)',
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
