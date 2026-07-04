import { useRef } from 'react';
import { useInView } from 'motion/react';

export function SectionLabel({ children, center }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <div
      ref={ref}
      className={`section-label${inView ? ' in-view' : ''}`}
      style={center ? { justifyContent: 'center' } : undefined}
    >
      {children}
    </div>
  );
}
