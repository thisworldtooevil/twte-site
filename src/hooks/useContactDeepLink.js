import { useEffect } from 'react';
import { getLenis } from './useLenis';

const NAV_OFFSET = -80;
// After landing, late fonts and images can still push the form down. Keep
// snapping back to it for this long, unless the visitor starts scrolling.
const SETTLE_MS = 2000;

// Arriving at /#contact (from /proof, a shared link or a hard refresh)
// glides to the intake form with Lenis and puts the cursor in Name.
// Also runs on in-page hash changes to #contact.
export function useContactDeepLink() {
  useEffect(() => {
    let cancelled = false;
    let stopSettle = () => {};

    // Our glide decides where the page lands, not a restored scroll position.
    if (window.location.hash === '#contact' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const drift = (section) => section.getBoundingClientRect().top + NAV_OFFSET;
    const snap = (section) => {
      if (Math.abs(drift(section)) > 4) getLenis()?.scrollTo(section, { offset: NAV_OFFSET, immediate: true });
    };

    const settle = (section) => {
      if (typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(() => snap(section));
      const stop = () => {
        ro.disconnect();
        clearTimeout(timer);
        window.removeEventListener('wheel', stop);
        window.removeEventListener('touchstart', stop);
        window.removeEventListener('keydown', stop);
      };
      const timer = setTimeout(stop, SETTLE_MS);
      ro.observe(document.body);
      window.addEventListener('wheel', stop, { passive: true });
      window.addEventListener('touchstart', stop, { passive: true });
      window.addEventListener('keydown', stop);
      stopSettle = stop;
    };

    const go = () => {
      if (cancelled || window.location.hash !== '#contact') return;
      const section = document.getElementById('contact');
      const name = document.getElementById('contact-name');
      if (!section || !name) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const land = () => {
        if (cancelled) return;
        snap(section);
        name.focus({ preventScroll: true });
        settle(section);
      };

      const lenis = getLenis();
      if (!lenis) {
        section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        name.focus({ preventScroll: true });
        return;
      }
      if (reduced) {
        lenis.scrollTo(section, { offset: NAV_OFFSET, immediate: true });
        land();
        return;
      }
      lenis.scrollTo(section, {
        offset: NAV_OFFSET,
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 3), // power3.out
        onComplete: land,
      });
    };

    // Measure once the web fonts are in, so the target isn't measured on
    // fallback-font line heights.
    let timer;
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => { if (!cancelled) timer = setTimeout(go, 120); });
    window.addEventListener('hashchange', go);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      stopSettle();
      window.removeEventListener('hashchange', go);
    };
  }, []);
}
