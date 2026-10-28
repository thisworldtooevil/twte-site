import { useRef, useState } from 'react';
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
  // Skip the reveal and show the content right away (no fade, no delay).
  show = false,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();
  // Keyboard focus can land inside before the scroll trigger fires (for
  // example a field near the bottom edge). Reveal on focus so nothing
  // focusable is ever invisible.
  const [focused, setFocused] = useState(false);

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      onFocus={focused ? undefined : () => setFocused(true)}
      initial={reduced || show ? {} : { opacity: 0, y, x, scale, rotateX }}
      animate={
        reduced || show || inView || focused
          ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 }
          : { opacity: 0, y, x, scale, rotateX }
      }
      transition={{
        duration: reduced || show ? 0 : duration,
        delay: reduced || show ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
