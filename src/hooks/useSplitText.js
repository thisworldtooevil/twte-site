import { useEffect, useRef } from 'react';

export function useSplitText(ref, options = {}) {
  const splitRef = useRef(null);

  useEffect(() => {
    if (!ref.current || typeof window.SplitText === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const split = new window.SplitText(ref.current, {
            type: options.type || 'chars',
            mask: options.mask,
          });
          splitRef.current = split;

          const targets = split[options.type === 'words' ? 'words' : 'chars'];
          window.gsap.from(targets, {
            opacity: 0,
            y: options.y ?? 8,
            yPercent: options.yPercent,
            duration: options.duration || 0.6,
            stagger: options.stagger || 0.02,
            ease: options.ease || 'power3.out',
            delay: options.delay || 0,
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (splitRef.current?.revert) splitRef.current.revert();
    };
  }, [ref, options.type, options.mask, options.y, options.yPercent, options.duration, options.stagger, options.ease, options.delay]);

  return splitRef;
}
