import { useEffect } from 'react';
import { getLenis } from './useLenis';

const NAV_OFFSET = -80;

// Arriving at /#contact (from /proof, a shared link or a hard refresh)
// glides to the intake form with Lenis and puts the cursor in Name.
// Also runs on in-page hash changes to #contact.
export function useContactDeepLink() {
  useEffect(() => {
    let cancelled = false;

    const go = () => {
      if (cancelled || window.location.hash !== '#contact') return;
      const section = document.getElementById('contact');
      const name = document.getElementById('contact-name');
      if (!section || !name) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const land = () => {
        if (cancelled) return;
        // Images above can change height mid-glide; correct any drift.
        const drift = section.getBoundingClientRect().top + NAV_OFFSET;
        if (Math.abs(drift) > 4) getLenis()?.scrollTo(section, { offset: NAV_OFFSET, immediate: true });
        name.focus({ preventScroll: true });
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

    // Let the first layout settle before measuring the target.
    const timer = setTimeout(go, 200);
    window.addEventListener('hashchange', go);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('hashchange', go);
    };
  }, []);
}
