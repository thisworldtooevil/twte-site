import { useRef } from 'react';
import { useSplitText } from '../../hooks/useSplitText';

export function SplitTextReveal({
  children,
  as: Tag = 'h2',
  className,
  style,
  type = 'words',
  mask = 'lines',
  stagger = 0.06,
  duration = 1.1,
  yPercent = 120,
  ease = 'power4.out',
  delay = 0,
}) {
  const ref = useRef(null);

  useSplitText(ref, { type, mask, stagger, duration, yPercent, ease, delay, y: undefined });

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
