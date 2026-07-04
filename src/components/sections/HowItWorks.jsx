import { ScrollReveal } from '../animation/ScrollReveal';
import { SectionLabel } from '../layout/Section';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const steps = [
  {
    num: '01 / Working Hours',
    name: '9AM to 6PM PST',
    desc: 'Monday through Friday. Outside these windows responses come as soon as possible. If there is a delay during hours, another session is in progress.',
  },
  {
    num: '02 / Weekends',
    name: 'Pre-approved only',
    desc: 'Premium and Elite clients retain weekend posting coverage. All content is signed off before the weekend begins, no exceptions.',
  },
  {
    num: '03 / Approvals',
    name: 'Nothing posts blind',
    desc: 'All content including graphics, captions, and video is submitted for client review before publishing. The process protects the brand at every stage.',
  },
  {
    num: '04 / Alignment',
    name: 'We start with a conversation',
    desc: 'Every engagement opens with a full brand audit and alignment call. If the vision is not locked before we start, we do not start.',
  },
];

export function HowItWorks() {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <section
      id="how"
      aria-label="How it works"
      style={{ padding: isMobile ? '80px 24px' : '120px 48px' }}
    >
      <SectionLabel>How It Works</SectionLabel>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 0 : 2,
        }}
      >
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.12} x={-40} y={0} scale={0.97}>
            <div
              style={{
                background: 'var(--card-bg)',
                padding: isMobile ? '36px 28px' : '48px 40px',
                border: '1px solid var(--rule)',
                transition: 'border-color 0.4s, transform 0.4s, box-shadow 0.4s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--red)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--rule)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: 'var(--red-text)',
                letterSpacing: 2,
                marginBottom: 20,
                textTransform: 'uppercase',
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: "'job-clarendon', serif",
                fontWeight: 900,
                fontSize: 22,
                marginBottom: 16,
                lineHeight: 1.2,
              }}>
                {step.name}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--cream-dim)' }}>
                {step.desc}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
