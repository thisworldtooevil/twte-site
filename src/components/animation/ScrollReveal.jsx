import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  x = 0,
  scale = 1,
  rotateX = 0,
  className,
  style,
  as = 'div',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? {} : { opacity: 0, y, x, scale, rotateX }}
      animate={
        reduced || inView
          ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y, x, scale, rotateX }
      }
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
