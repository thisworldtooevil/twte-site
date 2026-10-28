import { useState, useEffect, useRef, useCallback } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { getLenis } from '../../hooks/useLenis';
import { PROOF_CONTACT_HREF } from '../../links';

const linkStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: 'var(--cream-dim)',
  transition: 'color 0.3s',
  textDecoration: 'none',
};

// `page` is 'home' (the single-page site) or 'proof'. Off the homepage the
// links leave the page instead of scrolling within it.
export function Navigation({ page = 'home' }) {
  const onHome = page === 'home';
  const proofColor = page === 'proof' ? 'var(--cream)' : 'var(--cream-dim)';
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > 200) {
        setScrolled(true);
        if (y > lastScrollY.current + 8 && y > 400) setHidden(true);
        else if (y < lastScrollY.current - 8) setHidden(false);
      } else {
        setScrolled(false);
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  // Mobile: always show semi-transparent bg. Desktop: only when scrolled.
  const showBg = isMobile || scrolled;

  return (
    <nav
      aria-label="Primary"
      // Keyboard focus on a nav link brings a scrolled-away nav back into view.
      onFocus={() => setHidden(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile
          ? (scrolled ? '12px 16px' : '16px 16px')
          : (scrolled ? '16px 48px' : '28px 48px'),
        mixBlendMode: showBg ? 'normal' : 'difference',
        background: showBg ? (isMobile ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.8)') : 'transparent',
        backdropFilter: showBg ? (isMobile ? 'blur(8px)' : 'blur(16px)') : 'none',
        WebkitBackdropFilter: showBg ? (isMobile ? 'blur(8px)' : 'blur(16px)') : 'none',
        transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'padding 0.5s var(--ease-out-expo), background 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo), backdrop-filter 0.5s var(--ease-out-expo)',
      }}
    >
      <a
        href={onHome ? '#' : '/'}
        aria-label={onHome ? 'TWTE Media, return to top' : 'TWTE Media, home'}
        onClick={onHome ? (e) => { e.preventDefault(); scrollTo('#main'); } : undefined}
        style={{ display: 'block' }}
      >
        <img src="/images/logo-nav.png" alt="TWTE" width="44" height="44" style={{ display: 'block' }} />
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 18 : 40 }}>
        <a
          href="/proof/"
          aria-current={page === 'proof' ? 'page' : undefined}
          style={{
            ...linkStyle,
            color: proofColor,
            minHeight: 44,
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red-text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = proofColor; }}
        >
          Proof
        </a>

        <MagneticButton
          href={onHome ? '#contact' : PROOF_CONTACT_HREF}
          className="nav-cta"
          onClick={onHome ? (e) => { e.preventDefault(); scrollTo('#contact'); } : undefined}
          style={{
            ...linkStyle,
            transition: 'color 0.3s, border-color 0.3s',
            ...(isMobile ? {
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '12px 20px',
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
            } : {}),
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red-text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cream-dim)'; }}
        >
          Get in Touch
        </MagneticButton>
      </div>
    </nav>
  );
}
