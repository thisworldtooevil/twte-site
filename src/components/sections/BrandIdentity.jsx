import { ScrollReveal } from '../animation/ScrollReveal';
import { SplitTextReveal } from '../animation/SplitTextReveal';
import { MagneticButton } from '../ui/MagneticButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { getLenis } from '../../hooks/useLenis';

export function BrandIdentity() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Brand identity"
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        zIndex: 1,
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
        overflow: 'hidden',
        padding: isMobile ? '16px 24px' : '0 80px',
      }}
    >
      {/* Ghost "EVIL" text — background depth layer */}
      {/* Outer div handles absolute centering; ScrollReveal only animates opacity */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '70%' : '50%',
          left: '50%',
          transform: isMobile ? 'translate(-50%, -50%)' : 'translate(-50%, -55%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <ScrollReveal
          duration={0.8}
          delay={0}
          y={0}
          x={0}
          scale={1}
          style={{
            fontFamily: "'job-clarendon', serif",
            fontWeight: 900,
            fontSize: isMobile ? '28vw' : 'clamp(20vw, 28vw, 360px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(242, 237, 230, 0.04)',
            letterSpacing: 20,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          EVIL
        </ScrollReveal>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1400,
          gap: isMobile ? 48 : 0,
        }}
      >
        {/* LEFT SIDE — 55% */}
        <div
          style={{
            flex: isMobile ? 'none' : '0 0 55%',
            width: isMobile ? '100%' : '55%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <SplitTextReveal
            as="div"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'var(--grey-text)',
              marginBottom: 24,
            }}
            type="chars"
            stagger={0.018}
            duration={0.3}
            delay={0.4}
            yPercent={undefined}
          >
            From the dark depths below to the heavens above
          </SplitTextReveal>

          <ScrollReveal y={40} duration={0.8} delay={0.2}>
            <h1 style={{ margin: 0, lineHeight: 0, marginBottom: 32 }}>
              <img
                src="/images/hero-title.png"
                alt="TWTE Media — This World Too Evil"
                style={{
                  width: 'clamp(300px, 48vw, 580px)',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </h1>
          </ScrollReveal>

          <ScrollReveal y={20} duration={0.8} delay={0.4}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                letterSpacing: 1,
                color: 'var(--cream-dim)',
                marginBottom: 32,
              }}
            >
              Underground roots. Boardroom results.
            </div>
          </ScrollReveal>

          <ScrollReveal y={20} duration={0.8} delay={0.5}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <MagneticButton
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                style={{
                  display: 'inline-block',
                  padding: '14px 36px',
                  background: 'var(--red)',
                  border: '1px solid var(--red)',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'var(--cream)',
                  transition: 'all 0.35s ease',
                  textDecoration: 'none',
                  textAlign: isMobile ? 'center' : undefined,
                  width: isMobile ? '100%' : undefined,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-bright)'; e.currentTarget.style.borderColor = 'var(--red-bright)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
              >
                Get in Touch
              </MagneticButton>

              <MagneticButton
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); scrollTo('#portfolio'); }}
                style={{
                  display: 'inline-block',
                  padding: '14px 36px',
                  border: '1px solid var(--cream-dim)',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'var(--cream)',
                  transition: 'all 0.35s ease',
                  textDecoration: 'none',
                  textAlign: isMobile ? 'center' : undefined,
                  width: isMobile ? '100%' : undefined,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--cream)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--cream-dim)'; }}
              >
                View Work
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT SIDE — 45%, globe */}
        <div
          style={{
            flex: isMobile ? 'none' : '0 0 45%',
            width: isMobile ? '100%' : '45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ScrollReveal duration={0.8} delay={0.1} y={30}>
            <img
              src="/images/globe-element.png"
              alt=""
              aria-hidden="true"
              style={{
                width: 'clamp(240px, 28vw, 420px)',
                height: 'auto',
                display: 'block',
                opacity: 0.35,
              }}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
