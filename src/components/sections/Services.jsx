import { useState } from 'react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { SplitTextReveal } from '../animation/SplitTextReveal';
import { SectionLabel } from '../layout/Section';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const services = [
  {
    num: '01',
    name: 'Photography',
    desc: 'Editorial, documentary, and event photography. 35mm analog and digital. From intimate portraits to large-scale live coverage. Every frame has intention behind it.',
  },
  {
    num: '02',
    name: 'Videography',
    desc: 'Music videos, brand films, event documentation, and short-form content. Shot, directed, and edited in-house. DaVinci Resolve color. Delivered ready to post or broadcast.',
  },
  {
    num: '03',
    name: 'Creative Direction',
    desc: 'Full-scope brand strategy, visual identity systems, content production, and campaign execution. Monthly retainer model. Built for brands with no bandwidth to spare.',
  },
];

function ServiceCard({ service, index, isMobile }) {
  const [hovered, setHovered] = useState(false);

  if (isMobile) {
    return (
      <ScrollReveal delay={index * 0.15} y={60}>
        <div
          style={{
            background: 'var(--card-bg)',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            borderTop: '2px solid var(--rule)',
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--grey-text)', letterSpacing: 2, marginBottom: 24 }}>
            {service.num}
          </div>
          <div style={{ fontFamily: "'job-clarendon', serif", fontWeight: 900, fontSize: 28, marginBottom: 20, lineHeight: 1.15 }}>
            {service.name}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--cream-dim)' }}>
            {service.desc}
          </div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal delay={index * 0.15} y={60} rotateX={6}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--red)' : 'var(--card-bg)',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 380,
          borderTop: hovered ? '2px solid var(--red)' : '2px solid var(--rule)',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
          boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          cursor: 'default',
        }}
      >
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: hovered ? 'rgba(242,237,230,0.6)' : 'var(--grey-text)',
          letterSpacing: 2,
          marginBottom: 24,
          transition: 'color 0.4s ease',
        }}>
          {service.num}
        </div>

        <div style={{
          fontFamily: "'job-clarendon', serif",
          fontWeight: 900,
          fontSize: 28,
          marginBottom: 20,
          lineHeight: 1.15,
          color: hovered ? 'var(--cream)' : 'var(--cream)',
        }}>
          {service.name}
        </div>

        {/* Arrow indicator — visible when collapsed, fades out on hover */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 18,
          color: hovered ? 'transparent' : 'var(--grey-dim)',
          transition: 'color 0.3s ease, opacity 0.3s ease',
          opacity: hovered ? 0 : 1,
          marginTop: 'auto',
          position: hovered ? 'absolute' : 'relative',
          pointerEvents: 'none',
        }}>
          &#8599;
        </div>

        {/* Description — blurs/fades in on hover */}
        <div style={{
          fontSize: 13,
          lineHeight: 1.75,
          color: 'var(--cream-dim)',
          opacity: hovered ? 1 : 0,
          filter: hovered ? 'blur(0px)' : 'blur(6px)',
          transition: 'opacity 0.4s ease 0.05s, filter 0.4s ease 0.05s',
          marginTop: hovered ? 0 : 0,
          flex: 1,
        }}>
          {service.desc}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Services() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="services"
      aria-label="Services"
      style={{ padding: isMobile ? '80px 24px' : '120px 48px' }}
    >
      <SectionLabel>What We Do</SectionLabel>
      <SplitTextReveal
        as="h2"
        style={{
          fontFamily: "'job-clarendon', serif",
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 64px)',
          lineHeight: 1.05,
          marginBottom: 64,
        }}
      >
        Services
      </SplitTextReveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 0 : 2,
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={s.num} service={s} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
