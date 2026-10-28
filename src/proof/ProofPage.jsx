import { useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useLenis, getLenis } from '../hooks/useLenis';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/layout/Section';
import { SplitTextReveal } from '../components/animation/SplitTextReveal';
import { TimelineChart } from './TimelineChart';
import data from './metrics-data.json';
import {
  hero, wins, receipts, timeline, compare, playbook, reelsSection,
  commentsSection, audienceSection, cta, method,
} from './content';

// power3.out. The proof page animates from a visible state: nothing waits
// at opacity 0 for a scroll trigger that might not fire.
const EASE = [0.215, 0.61, 0.355, 1];

function Reveal({ children, delay = 0, className, style, as = 'div', ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0.35, y: 18 }}
      animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 18 }}
      transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

function Heading({ id, children, as = 'h2', className = 'proof-h2' }) {
  return (
    <SplitTextReveal as={as} className={className} ease="power3.out" duration={1} stagger={0.05}>
      <span id={id}>{children}</span>
    </SplitTextReveal>
  );
}

const sideClass = (side) => (side === 'organic' ? ' is-organic' : side === 'paid' ? ' is-paid' : '');

export default function ProofPage() {
  useLenis();

  // In-page receipt links glide with Lenis and move focus to the receipt.
  const goTo = useCallback((e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = getLenis();
    const land = () => el.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(el, { offset: -96, immediate: reduced, onComplete: land });
    else { el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); land(); }
    history.replaceState(null, '', `#${id}`);
  }, []);

  const { stats } = data.hero;
  const aud = data.audience;
  const ageMax = Math.max(...aud.ageBands.map((b) => b[1]));

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation page="proof" />

      <main id="main" className="proof">
        {/* Hero */}
        <header className="proof-wrap proof-hero">
          <Reveal as="p" className="proof-eyebrow">{hero.eyebrow}</Reveal>
          <SplitTextReveal as="h1" className="proof-h1" ease="power3.out" duration={1.1} stagger={0.06}>
            Organic builds <em>legitimacy</em>, paid brings leads.
          </SplitTextReveal>
          <Reveal as="p" className="proof-lede" delay={0.1}>{hero.lede}</Reveal>
          <div className="proof-stats">
            {stats.map(([big, cap], i) => (
              <Reveal key={big} className="proof-stat" delay={0.15 + i * 0.08}>
                <span className={`proof-big${sideClass(hero.statSides[i])}`}>{big}</span>
                <span className="proof-cap">{cap}</span>
              </Reveal>
            ))}
          </div>
        </header>

        {/* The wins */}
        <section className="proof-section" aria-labelledby="w-h">
          <div className="proof-wrap">
            <SectionLabel>{wins.label}</SectionLabel>
            <Heading id="w-h">{wins.title}</Heading>
            <Reveal as="p" className="proof-intro">{wins.intro}</Reveal>
            <div className="proof-wins">
              {wins.items.map((w, i) => (
                <Reveal key={w.big} className="proof-win" delay={(i % 4) * 0.06}>
                  <span className={`proof-big${sideClass(w.side || 'organic')}`}>{w.big}</span>
                  <p>{w.text}</p>
                  <small>{w.small}</small>
                  <a className="proof-receipt-link" href={`#${w.receipt}`} onClick={(e) => goTo(e, w.receipt)}>
                    See the receipt
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The receipts */}
        <section className="proof-section" aria-labelledby="rc-h">
          <div className="proof-wrap">
            <SectionLabel>{receipts.label}</SectionLabel>
            <Heading id="rc-h">{receipts.title}</Heading>
            <Reveal as="p" className="proof-intro">{receipts.intro}</Reveal>
            {receipts.groups.map((g) => (
              <div key={g.label} className="proof-rgroup" id={g.id} tabIndex={g.id ? -1 : undefined}>
                <span className={`proof-label${sideClass(g.side)}`}>{g.label}</span>
                <div className="proof-rgrid">
                  {g.figures.map((f) => (
                    <Reveal
                      as="figure"
                      key={f.src}
                      id={f.id}
                      tabIndex={f.id ? -1 : undefined}
                      className={`proof-rc${f.wide ? ' is-wide' : ''}`}
                    >
                      {f.tallSrc ? (
                        <picture>
                          <source media="(max-width: 699px)" srcSet={f.tallSrc} width={f.tallW} height={f.tallH} />
                          <img src={f.src} width={f.w} height={f.h} alt={f.alt} loading="lazy" decoding="async" />
                        </picture>
                      ) : (
                        <img src={f.src} width={f.w} height={f.h} alt={f.alt} loading="lazy" decoding="async" />
                      )}
                      <figcaption>{f.caption}</figcaption>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 01 The timeline */}
        <section className="proof-section" aria-labelledby="t-h">
          <div className="proof-wrap">
            <SectionLabel>{timeline.label}</SectionLabel>
            <Heading id="t-h">{timeline.title}</Heading>
            <Reveal as="p" className="proof-intro">{timeline.intro}</Reveal>
            <Reveal><TimelineChart tabs={timeline.tabs} /></Reveal>
          </div>
        </section>

        {/* 02 Paid vs organic */}
        <section className="proof-section" aria-labelledby="c-h">
          <div className="proof-wrap">
            <SectionLabel>{compare.label}</SectionLabel>
            <Heading id="c-h">{compare.title}</Heading>
            <div className="proof-compare">
              {[['paid', compare.paid], ['organic', compare.organic]].map(([side, c], i) => (
                <Reveal as="article" key={side} className={`proof-side${sideClass(side)}`} delay={i * 0.1}>
                  <span className={`proof-label${sideClass(side)}`}>{c.label}</span>
                  <h3>{c.title}</h3>
                  <span className="proof-when">{c.when}</span>
                  <span className={`proof-spend${sideClass(side)}`}>{c.spend}</span>
                  <dl className="proof-rows">
                    {c.rows.map(([dt, dd, sub]) => (
                      <div key={dt}>
                        <dt>{dt}</dt>
                        <dd>{dd}<small>{sub}</small></dd>
                      </div>
                    ))}
                  </dl>
                  <p className="proof-foot">{c.foot}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="proof-value">
              <span className="proof-big is-organic">{compare.value.big}</span>
              <p>{compare.value.text}</p>
            </Reveal>
          </div>
        </section>

        {/* 03 The playbook */}
        <section className="proof-section" aria-labelledby="g-h">
          <div className="proof-wrap">
            <SectionLabel>{playbook.label}</SectionLabel>
            <div className="proof-gap">
              <div>
                <Heading id="g-h">{playbook.title}</Heading>
                <Reveal as="p" className="proof-pull">
                  {playbook.pull[0]}
                  <span className="is-paid">{playbook.pull[1]}</span>
                  {playbook.pull[2]}
                  <span className="is-organic">{playbook.pull[3]}</span>
                  {playbook.pull[4]}
                </Reveal>
              </div>
              <Reveal as="ol" className="proof-points" delay={0.1}>
                {playbook.points.map((p, i) => (
                  <li key={p}><span className="proof-num">{String(i + 1).padStart(2, '0')}</span>{p}</li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* 04 The reels */}
        <section className="proof-section" aria-labelledby="r-h">
          <div className="proof-wrap">
            <SectionLabel>{reelsSection.label}</SectionLabel>
            <Heading id="r-h">{reelsSection.title}</Heading>
            <Reveal as="p" className="proof-intro">{reelsSection.intro}</Reveal>
            <Reveal className="proof-tbl" role="region" aria-labelledby="r-h" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th>Week</th><th>Reel</th><th>Post views</th><th>Accounts reached</th><th>Avg watch</th>
                    <th>Shares</th><th>Saves</th><th>Share rate</th><th>Viewers 25 to 44</th>
                  </tr>
                </thead>
                <tbody>
                  {data.reels.map((r) => (
                    <tr key={r.reel} className={r.highlight ? 'is-hot' : undefined}>
                      <td>{r.week}</td>
                      <td className="name">Reel {r.reel}<span>{r.angle}</span></td>
                      <td><span className="is-organic">{r.views}</span></td>
                      <td>{r.reached}</td><td>{r.watch}</td><td>{r.shares}</td>
                      <td>{r.saves}</td><td>{r.shareRate}</td><td>{r.age25to44}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td><td className="name">All six</td>
                    <td><span className="is-organic">{data.reelTotals.views}</span></td>
                    <td>{data.reelTotals.reached}</td><td></td>
                    <td>{data.reelTotals.shares}</td><td>{data.reelTotals.saves}</td><td></td><td></td>
                  </tr>
                </tfoot>
              </table>
            </Reveal>
            <Reveal as="p" className="proof-intro proof-after">{reelsSection.after}</Reveal>
          </div>
        </section>

        {/* 05 What people said */}
        <section className="proof-section" aria-labelledby="q-h">
          <div className="proof-wrap">
            <SectionLabel>{commentsSection.label}</SectionLabel>
            <Heading id="q-h">{commentsSection.title}</Heading>
            <Reveal as="p" className="proof-intro">{commentsSection.intro}</Reveal>
            <div className="proof-quotes">
              {data.comments.map((file, i) => (
                <Reveal as="figure" key={file} className="proof-q" delay={(i % 2) * 0.08}>
                  <img src={`/images/proof/comments/${file}`} alt={commentsSection.alt} width="900" loading="lazy" decoding="async" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Who stayed */}
        <section className="proof-section" aria-labelledby="a-h">
          <div className="proof-wrap">
            <SectionLabel>{audienceSection.label}</SectionLabel>
            <Heading id="a-h">{audienceSection.title}</Heading>
            <div className="proof-aud">
              {[
                ['Followers', aud.followers, 'at the end of the engagement'],
                ['Women', aud.women],
                ['Aged 25 to 44', aud.age25to44],
                ['United States', aud.us],
              ].map(([label, v, note], i) => (
                <Reveal key={label} className="proof-cell" delay={i * 0.06}>
                  <span className="proof-label">{label}</span>
                  <span className="proof-v">{v}</span>
                  {note && <span className="proof-cell-note">{note}</span>}
                </Reveal>
              ))}
            </div>
            <Reveal className="proof-agebars" role="list" aria-label="Followers by age band">
              {aud.ageBands.map(([band, pct]) => (
                <div key={band} className="proof-agebar" role="listitem">
                  <span>{band}</span>
                  <span className="track" aria-hidden="true"><span className="fill" style={{ width: `${(pct / ageMax) * 100}%` }} /></span>
                  <span>{pct.toFixed(1)}%</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 07 For your business */}
        <section className="proof-section" aria-labelledby="y-h">
          <div className="proof-wrap">
            <SectionLabel>{cta.label}</SectionLabel>
            <Heading id="y-h">{cta.title}</Heading>
            <Reveal as="p" className="proof-intro">{cta.intro}</Reveal>
            <Reveal className="proof-cta">
              <p>{cta.pitch}</p>
              <MagneticButton href={cta.href} className="proof-cta-btn">
                {cta.button}
              </MagneticButton>
            </Reveal>
          </div>
        </section>

        {/* 08 Method */}
        <section className="proof-section" aria-labelledby="s-h">
          <div className="proof-wrap">
            <SectionLabel>{method.label}</SectionLabel>
            <Heading id="s-h">{method.title}</Heading>
            <div className="proof-src">
              {method.lists.map((list, i) => (
                <Reveal as="ul" key={i} delay={i * 0.08}>
                  {list.map((item) => <li key={item}>{item}</li>)}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
