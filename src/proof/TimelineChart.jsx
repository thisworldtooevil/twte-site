import { useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import data from './metrics-data.json';

const { series, labels, notes, monthOfDay, dayOfMonth, monthTicks, paidBoosts, creatorReels } = data.chart;

// Site tokens, applied through `style` (SVG presentation attributes can't
// read CSS variables). Paid is cream, organic is the site's red, and the
// bars are the neutral data layer.
const C = {
  bar: 'var(--cream-dim)',
  grid: 'rgba(242,237,230,0.08)',
  axis: 'rgba(242,237,230,0.25)',
  text: 'var(--grey-text)',
  paidFill: 'rgba(242,237,230,0.07)',
  paidStroke: 'rgba(242,237,230,0.45)',
  paidText: 'var(--cream)',
  reel: 'var(--red-text)',
};

const MONO = "'Space Mono', monospace";

// Drawing sizes per width band, so labels stay legible once the SVG scales
// down: phones, tablets and narrow laptops, then full desktop.
const LAYOUTS = {
  phone: { W: 560, H: 440, L: 44, T: 66, fs: 15, rows: 3 },
  mid: { W: 760, H: 360, L: 48, T: 48, fs: 13, rows: 2 },
  wide: { W: 1000, H: 340, L: 52, T: 40, fs: 11, rows: 2 },
};
const R = 10, B = 34;

function niceMax(m) {
  if (!(m > 0)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(m)));
  for (const s of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (s * p >= m) return s * p;
  return 10 * p;
}

function fmtN(v) {
  if (v >= 1e6) return (v / 1e6).toFixed(v % 1e6 ? 1 : 0) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(v % 1e3 ? 1 : 0) + 'K';
  return String(v);
}

// Everything except the hover target. Memoized on series and layout, so a
// tooltip move doesn't rebuild ~370 bars.
function ChartLayer({ values, layout }) {
  const { W, H, L, T, fs, rows } = layout;
  const PW = W - L - R, PH = H - T - B;
  const N = values.length;
  const bw = PW / N;
  const max = niceMax(Math.max(...values));
  const x = (i) => L + i * bw;
  const y = (v) => T + PH - (v / max) * PH;
  const [b0, b1] = paidBoosts[paidBoosts.length - 1];
  // Reel labels step across rows so close ticks don't collide.
  let labelled = 0;

  return (
    <>
      {paidBoosts.map(([a, b]) => (
        <rect key={a} x={x(a)} y={T} width={(b - a + 1) * bw} height={PH} style={{ fill: C.paidFill, stroke: C.paidStroke }} strokeWidth={1} />
      ))}

      {[0, 1, 2, 3, 4].map((t) => {
        const v = (max * t) / 4;
        const yy = y(v);
        return (
          <g key={t}>
            <line x1={L} x2={W - R} y1={yy} y2={yy} style={{ stroke: C.grid }} strokeWidth={1} />
            <text x={L - 8} y={yy + 4} textAnchor="end" style={{ fill: C.text }} fontFamily={MONO} fontSize={fs}>{fmtN(v)}</text>
          </g>
        );
      })}

      <g style={{ fill: C.bar }}>
        {values.map((v, i) => v > 0 && (
          <rect key={i} x={x(i) + bw * 0.1} y={y(v)} width={Math.max(bw * 0.8, 1)} height={T + PH - y(v)} />
        ))}
      </g>

      {creatorReels.map(([d, lab]) => {
        const xx = x(d) + bw / 2;
        const row = lab ? labelled++ % rows : 0;
        return (
          <g key={d}>
            <line x1={xx} x2={xx} y1={T - 6} y2={T + PH} style={{ stroke: C.reel }} strokeWidth={1.5} strokeDasharray="3 3" />
            {lab && (
              <text x={xx} y={T - 10 - row * (fs + 4)} textAnchor="middle" style={{ fill: C.reel }} fontFamily={MONO} fontSize={fs - 0.5}>{lab}</text>
            )}
          </g>
        );
      })}

      <text x={x(b0) + ((b1 - b0) * bw) / 2} y={T - 10} textAnchor="middle" style={{ fill: C.paidText }} fontFamily={MONO} fontSize={fs - 0.5}>Paid</text>

      {monthTicks.map(([i, m]) => (
        <g key={i}>
          <line x1={x(i)} x2={x(i)} y1={T + PH} y2={T + PH + 5} style={{ stroke: C.axis }} />
          <text x={x(i) + 3} y={H - 12} style={{ fill: C.text }} fontFamily={MONO} fontSize={fs}>{`M${m}`}</text>
        </g>
      ))}

      <line x1={L} x2={W - R} y1={T + PH} y2={T + PH} style={{ stroke: C.axis }} />
    </>
  );
}

export function TimelineChart({ tabs }) {
  const phone = useMediaQuery('(max-width: 700px)');
  const mid = useMediaQuery('(max-width: 1100px)');
  const layout = phone ? LAYOUTS.phone : mid ? LAYOUTS.mid : LAYOUTS.wide;
  const [key, setKey] = useState('follows');
  const [tip, setTip] = useState(null);
  const boxRef = useRef(null);
  const svgRef = useRef(null);
  const tabRefs = useRef([]);

  const { W, H, L, T } = layout;
  const PW = W - L - R, PH = H - T - B;
  const values = series[key];
  const N = values.length;
  const bw = PW / N;
  const total = useMemo(() => values.reduce((a, b) => a + b, 0), [values]);
  const chart = useMemo(() => <ChartLayer values={values} layout={layout} />, [values, layout]);

  const onPointer = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const sx = (e.clientX - r.left) * (W / r.width);
    const i = Math.max(0, Math.min(N - 1, Math.floor((sx - L) / bw)));
    const br = boxRef.current.getBoundingClientRect();
    setTip({
      left: e.clientX - br.left,
      top: e.clientY - br.top - 10,
      text: `Month ${monthOfDay[i]}, day ${dayOfMonth[i]} · ${values[i].toLocaleString('en-US')}`,
    });
  };

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onTabKey = (e, idx) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (idx + dir + tabs.length) % tabs.length;
    setKey(tabs[next][0]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="proof-tabs" role="tablist" aria-label="Metric">
        {tabs.map(([k, label], idx) => (
          <button
            key={k}
            ref={(el) => { tabRefs.current[idx] = el; }}
            className="proof-tab"
            role="tab"
            type="button"
            id={`tab-${k}`}
            aria-selected={key === k}
            aria-controls="timeline-panel"
            tabIndex={key === k ? 0 : -1}
            onClick={() => setKey(k)}
            onKeyDown={(e) => onTabKey(e, idx)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="proof-chart" ref={boxRef} id="timeline-panel" role="tabpanel" aria-labelledby={`tab-${key}`}>
        <div className="proof-chart-head">
          <div>
            <span className="proof-label">{labels[key]}</span>
            <div className="proof-chart-total">{total.toLocaleString('en-US')} total</div>
          </div>
          <div className="proof-legend">
            <span><i style={{ background: C.paidFill, border: `1px solid ${C.paidStroke}` }} />Paid boost</span>
            <span><i style={{ background: C.reel, width: 3 }} />Creator reel</span>
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${labels[key]} across months 3 to 15`}
          style={{ display: 'block', width: '100%', height: 'auto', touchAction: 'pan-y' }}
        >
          {chart}
          <rect
            x={L} y={T} width={PW} height={PH} fill="transparent"
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            onPointerLeave={() => setTip(null)}
          />
        </svg>

        {tip && (
          <div className="proof-tip" style={{ left: tip.left, top: tip.top }} aria-hidden="true">{tip.text}</div>
        )}

        <p className="proof-chart-note">{notes[key]}</p>
      </div>
    </div>
  );
}
