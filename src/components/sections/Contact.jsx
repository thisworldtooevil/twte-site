import { useRef } from 'react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { SplitTextReveal } from '../animation/SplitTextReveal';
import { SectionLabel } from '../layout/Section';
import { MagneticButton } from '../ui/MagneticButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useInView } from 'motion/react';

export function Contact() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-25% 0px' });

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ padding: isMobile ? '80px 24px' : '120px 48px', textAlign: 'center' }}
    >
      <SectionLabel center>Get in touch</SectionLabel>

      <h2
        ref={headingRef}
        style={{
          fontFamily: "'job-clarendon', serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: 1.1,
          marginBottom: 24,
          color: headingInView ? 'var(--red-text)' : 'transparent',
          WebkitTextStroke: headingInView ? '0px' : '1.5px var(--red-text)',
          letterSpacing: 0.5,
          transition: 'color 1.2s var(--ease-out-expo), -webkit-text-stroke-width 1.2s var(--ease-out-expo)',
        }}
      >
        Book a discovery.
      </h2>

      <ScrollReveal>
        <p style={{
          fontSize: 14,
          lineHeight: 1.75,
          color: 'var(--cream-dim)',
          maxWidth: 520,
          margin: '0 auto 48px',
        }}>
          Every project starts with a conversation. No pitch decks. No generic proposals. Just a direct call about what you need and whether we are the right fit.
        </p>
      </ScrollReveal>

      <form
        className="inquiry-form"
        action="https://api.web3forms.com/submit"
        method="POST"
        style={{ maxWidth: 500, margin: '0 auto' }}
      >
        <input type="hidden" name="access_key" value="e097a1ac-3e1e-4da4-bc0a-65b1a6741d25" />
        <input type="hidden" name="subject" value="New TWTE Media Inquiry" />
        <input type="hidden" name="redirect" value="https://thisworldtooevil.com#contact" />
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

        <ScrollReveal delay={0}>
          <label style={{ display: 'block', marginBottom: 24 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--grey-text)',
              marginBottom: 8,
            }}>
              Name *
            </span>
            <input
              className="form-input"
              type="text"
              name="name"
              required
              autoComplete="name"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--grey)',
                padding: '12px 0',
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: 'var(--cream)',
                outline: 'none',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            />
          </label>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <label style={{ display: 'block', marginBottom: 24 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--grey-text)',
              marginBottom: 8,
            }}>
              Email *
            </span>
            <input
              className="form-input"
              type="email"
              name="email"
              required
              autoComplete="email"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--grey)',
                padding: '12px 0',
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: 'var(--cream)',
                outline: 'none',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            />
          </label>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <label style={{ display: 'block', marginBottom: 32 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--grey-text)',
              marginBottom: 8,
            }}>
              Phone
            </span>
            <input
              className="form-input"
              type="tel"
              name="phone"
              autoComplete="tel"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--grey)',
                padding: '12px 0',
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                color: 'var(--cream)',
                outline: 'none',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            />
          </label>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton
            as="button"
            type="submit"
            className="form-submit"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'var(--cream)',
              background: 'transparent',
              border: '1px solid var(--red-ui)',
              padding: '16px 48px',
              cursor: 'pointer',
              transition: 'all 0.35s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--red-ui)'; }}
          >
            Submit
          </MagneticButton>
        </ScrollReveal>
      </form>

      <ScrollReveal style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
          <MagneticButton
            href="https://instagram.com/thisworldtooevil"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
            style={{
              padding: '14px 40px',
              border: '1px solid var(--grey-dim)',
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              transition: 'all 0.35s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-dim)'; e.currentTarget.style.color = ''; }}
          >
            Instagram
          </MagneticButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
