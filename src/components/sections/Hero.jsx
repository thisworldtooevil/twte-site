import { useRef, useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: '300px' }
    );
    if (videoRef.current) observer.observe(videoRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Introduction"
      style={{
        position: 'relative',
        minHeight: isMobile ? 'auto' : '100vh',
        paddingTop: isMobile ? 76 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: isMobile ? 'relative' : 'absolute',
          top: isMobile ? undefined : '50%',
          left: isMobile ? undefined : '50%',
          transform: isMobile ? undefined : 'translate(-50%, -50%)',
          minWidth: isMobile ? undefined : '100%',
          minHeight: isMobile ? undefined : '100%',
          width: isMobile ? '100%' : 'auto',
          height: isMobile ? 'auto' : 'auto',
          objectFit: isMobile ? 'contain' : 'cover',
          display: 'block',
        }}
      >
        <source src="/images/samuel-trouble-castellanos-golden-boy.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,10,10,0.1)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
