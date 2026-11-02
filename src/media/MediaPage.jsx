import { useCallback } from 'react';
import { useLenis, getLenis } from '../hooks/useLenis';
import { useContactDeepLink } from '../hooks/useContactDeepLink';
import { announceContactArrival } from '../links';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { Watermark } from '../components/ui/Watermark';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { Contact } from '../components/sections/Contact';
import { ScrollReveal } from '../components/animation/ScrollReveal';
import { SplitTextReveal } from '../components/animation/SplitTextReveal';
import { hook, pains, bridge, plan, pricing, proof, close } from './content';

// Homepage SplitText settings, untouched (words, line mask, 1.1s, 0.06
// stagger, power4.out). Under reduced motion the heading renders as plain text.
function Heading({ as = 'h2', id, className, children }) {
  const reduced = useReducedMotion();
  if (reduced) {
    const Tag = as;
    return <Tag id={id} className={className}>{children}</Tag>;
  }
  return (
    <SplitTextReveal as={as} id={id} className={className}>
      {children}
    </SplitTextReveal>
  );
}

// Homepage ScrollReveal defaults, untouched (0.8s, 30px rise, expo out).
function Reveal({ children, delay = 0, ...rest }) {
  return (
    <ScrollReveal delay={delay} {...rest}>
      {children}
    </ScrollReveal>
  );
}

function Note({ children }) {
  return <p className="media-note">{children}</p>;
}

export default function MediaPage() {
  useLenis();
  // A direct link to /media/#contact glides to the form, as on the homepage.
  useContactDeepLink();

  // Same glide as the homepage nav's Get in Touch: Lenis, 80px nav offset,
  // and the form shows in full on arrival instead of waiting to fade in.
  const goToForm = useCallback((e) => {
    const el = document.getElementById('contact');
    if (!el) return;
    e.preventDefault();
    announceContactArrival();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Watermark />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation page="media" />

      <main id="main" className="media">
        {/* 1. Hook */}
        <header className="media-wrap media-hook">
          <Heading as="h1" className="media-h1">{hook.title[0]}<em>{hook.title[1]}</em></Heading>
          <Reveal delay={0.2}>
            <p className="media-lede">{hook.body}</p>
            <Note>{hook.note}</Note>
          </Reveal>
        </header>

        {/* 2. Pain cards */}
        <section className="media-section" aria-label="What it costs you">
          <div className="media-wrap">
            <ol className="media-pains">
              {pains.map((p, i) => (
                <li key={p.num}>
                  <Reveal className="media-pain" delay={(i % 2) * 0.1}>
                    <span className="media-num" aria-hidden="true">{p.num}</span>
                    <Heading as="h2" className="media-h3">{p.title}</Heading>
                    <p className="media-body">{p.body}</p>
                    <Note>{p.note}</Note>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. Bridge, 4. The plan */}
        <section className="media-section media-bridge" aria-labelledby="m-bridge">
          <div className="media-wrap">
            <Heading id="m-bridge" className="media-h2">{bridge}</Heading>
            <div className="media-plan">
              {plan.map((b, i) => (
                <Reveal as="article" key={b.title} className="media-move" delay={i * 0.12}>
                  <Heading as="h3" className="media-move-title">{b.title}</Heading>
                  <p className="media-body">{b.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Pricing */}
        <section className="media-section" aria-label="Pricing">
          <div className="media-wrap">
            <Reveal className="media-price">
              <Heading className="media-h2 media-price-h">
                {pricing.lines.map((l, i) => (
                  <span key={l} className="media-line">{l}{i < pricing.lines.length - 1 ? ' ' : ''}</span>
                ))}
              </Heading>
              <p className="media-body">{pricing.body}</p>
              <p className="media-small">{pricing.note}</p>
            </Reveal>
          </div>
        </section>

        {/* 6. Proof */}
        <section className="media-section" aria-label="Proof">
          <div className="media-wrap">
            <ul className="media-stats">
              {proof.stats.map((s, i) => (
                <li key={s.lead}>
                  <Reveal className="media-stat" delay={i * 0.1}>
                    <p><span className="media-big">{s.lead}</span>{s.rest}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="media-proof-line callout-panel">
              <p className="media-pull">{proof.line}</p>
              <MagneticButton href={proof.href} className="media-btn is-solid is-lg" target="_blank" rel="noopener noreferrer">
                {proof.button}
              </MagneticButton>
            </Reveal>
          </div>
        </section>

        {/* 7. Close */}
        <section className="media-section media-close" aria-labelledby="m-close">
          <div className="media-wrap">
            <Heading id="m-close" className="media-h2 media-close-h">{close.title[0]}<em>{close.title[1].replace('30 minutes', '30\u00A0minutes')}</em></Heading>
            <Reveal className="media-close-cta" delay={0.2}>
              <MagneticButton href={close.href} className="media-btn" onClick={goToForm}>
                {close.button}
              </MagneticButton>
              <Note>{close.note}</Note>
            </Reveal>
          </div>
        </section>

        {/* The homepage intake form, without its heading, intro, need chips
            or Instagram button, on the page's own column and gutters. */}
        <div className="media-wrap media-form">
          <Contact
            source="media"
            need="Landscaping / home services"
            intro={false}
            social={false}
            align="left"
            style={{ padding: 0 }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
