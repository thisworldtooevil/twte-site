import { useEffect, useRef, useState } from 'react';
import { getLenis } from '../../hooks/useLenis';
import { ScrollReveal } from '../animation/ScrollReveal';
import { SectionLabel } from '../layout/Section';
import { MagneticButton } from '../ui/MagneticButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useInView } from 'motion/react';
import { FROM_PARAM, FROM_PROOF } from '../../links';

const labelText = {
  display: 'block',
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: 'var(--grey-text)',
  marginBottom: 8,
};

const fieldInput = {
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
};

const NEEDS = [
  'Content and video',
  'Ads and lead generation',
  'Website',
  'Brand and creative direction',
  'Event or artist coverage',
  'Not sure yet',
];

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = 'e097a1ac-3e1e-4da4-bc0a-65b1a6741d25';
const CONTACT_EMAIL = 'twte.media@gmail.com';
// Past this, show the error so the visitor isn't left on "Sending" forever.
const SEND_TIMEOUT_MS = 15000;

const bigHeading = {
  fontFamily: "'job-clarendon', serif",
  fontWeight: 900,
  fontStyle: 'italic',
  fontSize: 'clamp(48px, 6vw, 80px)',
  lineHeight: 1.1,
  letterSpacing: 0.5,
};

// Visitors sent from /proof arrive as /?from=proof#contact. The query
// survives a refresh, so the source stays right on a hard reload too.
function pageSource() {
  if (typeof window === 'undefined') return 'home';
  return new URLSearchParams(window.location.search).get(FROM_PARAM) === FROM_PROOF ? 'proof' : 'home';
}

export function Contact() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-25% 0px' });
  const [needs, setNeeds] = useState([]);
  const [source] = useState(pageSource);

  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');
  const confirmRef = useRef(null);
  const formRef = useRef(null);
  // Status from the last render can lag a fast double press; this can't.
  const inflight = useRef(false);

  const toggleNeed = (need) => {
    setNeeds((cur) => (cur.includes(need) ? cur.filter((n) => n !== need) : [...cur, need]));
  };

  // Post in the background so the visitor never leaves the page. On failure
  // the inputs are untouched, so everything typed is still there.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inflight.current) return;
    const form = e.currentTarget;
    const name = form.elements.name;
    if (!name.value.trim()) {
      name.value = '';
      name.reportValidity();
      return;
    }
    const fields = Object.fromEntries(new FormData(form));
    inflight.current = true;
    setStatus('sending');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          access_key: ACCESS_KEY,
          botcheck: form.elements.botcheck.checked,
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('sent');
      } else {
        console.error('Inquiry not sent:', res.status, data.message);
        setStatus('error');
      }
    } catch (err) {
      console.error('Inquiry not sent:', err);
      setStatus('error');
    } finally {
      clearTimeout(timer);
      inflight.current = false;
    }
  };

  // The disabled button drops keyboard focus while sending; once it is
  // enabled again, put focus back so a keyboard user can retry.
  useEffect(() => {
    if (status === 'error') formRef.current?.querySelector('.form-submit')?.focus();
  }, [status]);

  // Hand focus to the confirmation so screen readers announce it, and keep
  // it in view now that the taller form is gone.
  useEffect(() => {
    if (status !== 'sent' || !confirmRef.current) return;
    const el = confirmRef.current;
    el.focus({ preventScroll: true });
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -160 });
    else el.scrollIntoView({ block: 'center' });
  }, [status]);

  const sending = status === 'sending';

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ padding: isMobile ? '80px 24px' : '120px 48px', textAlign: 'center' }}
    >
      <SectionLabel center>Get in touch</SectionLabel>

      {status !== 'sent' && (
        <>
          <h2
            ref={headingRef}
            style={{
              ...bigHeading,
              marginBottom: 24,
              color: headingInView ? 'var(--red-text)' : 'transparent',
              WebkitTextStroke: headingInView ? '0px' : '1.5px var(--red-text)',
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
        </>
      )}

      {status === 'sent' ? (
        <div
          ref={confirmRef}
          tabIndex={-1}
          role="status"
          className="inquiry-confirm"
          style={{ maxWidth: 500, margin: '0 auto', outline: 'none' }}
        >
          <h2 style={{ ...bigHeading, color: 'var(--red-text)', marginBottom: 24 }}>Got it.</h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--cream-dim)' }}>
            I&rsquo;ll be in touch within a day.
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          className="inquiry-form"
          onSubmit={onSubmit}
          aria-busy={sending}
          style={{ maxWidth: 500, margin: '0 auto' }}
        >
          <input type="hidden" name="subject" value="New TWTE Media Inquiry" />
          <input type="hidden" name="source" value={source} />
          {/* Chips are unnamed checkboxes; their picks post as one readable line. */}
          <input type="hidden" name="needs" value={needs.join(', ')} />
          <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

          <ScrollReveal delay={0}>
            <label style={{ display: 'block', marginBottom: 24 }}>
              <span style={labelText}>Name *</span>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                name="name"
                required
                autoComplete="name"
                style={fieldInput}
              />
            </label>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <label style={{ display: 'block', marginBottom: 24 }}>
              <span style={labelText}>Email *</span>
              <input
                className="form-input"
                type="email"
                name="email"
                required
                autoComplete="email"
                style={fieldInput}
              />
            </label>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <label style={{ display: 'block', marginBottom: 32 }}>
              <span style={labelText}>Phone</span>
              <input
                className="form-input"
                type="tel"
                name="phone"
                autoComplete="tel"
                style={fieldInput}
              />
            </label>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <fieldset style={{ border: 'none', marginBottom: 32 }}>
              <legend style={{ ...labelText, width: '100%', marginBottom: 14 }}>What do you need?</legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {NEEDS.map((need) => (
                  <label key={need} className="need-chip">
                    <input
                      type="checkbox"
                      checked={needs.includes(need)}
                      onChange={() => toggleNeed(need)}
                    />
                    <span>{need}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <label style={{ display: 'block', marginBottom: 32 }}>
              <span style={labelText}>Tell me a bit more</span>
              <textarea
                className="form-input"
                name="message"
                rows={4}
                placeholder="Your business or project, a link, what you're hoping changes."
                style={{ ...fieldInput, resize: 'vertical', lineHeight: 1.7, display: 'block' }}
              />
            </label>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <MagneticButton
              as="button"
              type="submit"
              className="form-submit"
              disabled={sending}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--cream)',
                padding: '16px 48px',
                cursor: sending ? 'wait' : 'pointer',
                opacity: sending ? 0.6 : 1,
                transition: 'all 0.35s',
              }}
            >
              {sending ? 'Sending' : 'Submit'}
            </MagneticButton>
            <p
              role="alert"
              style={{
                minHeight: 24,
                marginTop: 20,
                fontSize: 13,
                lineHeight: 1.7,
                color: 'var(--red-text)',
              }}
            >
              {status === 'error' && (
                <>That didn&rsquo;t send. Try again, or email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--cream)', borderBottom: '1px solid var(--red)' }}>{CONTACT_EMAIL}</a>.</>
              )}
            </p>
          </ScrollReveal>
        </form>
      )}

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
