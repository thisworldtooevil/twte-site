import { useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function MagneticButton({ children, as: Tag = 'a', className, ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const onMouseMove = useCallback((e) => {
    if (reduced || isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    ref.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  }, [reduced, isTouchDevice]);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
