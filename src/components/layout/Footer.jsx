import { useMediaQuery } from '../../hooks/useMediaQuery';

export function Footer() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 18 : 24,
        // Phones stack the items and leave the bottom-right corner clear for
        // the fixed watermark (24px inset, 44px tall).
        padding: isMobile ? '32px 24px 96px' : '32px 80px 32px 48px',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div style={{ opacity: 0.3 }}>
        <img src="/images/logo-nav.png" alt="TWTE" width="28" height="28" style={{ display: 'block' }} />
      </div>
      <a
        href="/proof/"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--grey-text)',
          padding: isMobile ? '6px 0' : '14px 0',
          minHeight: 44,
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red-text)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--grey-text)'; }}
      >
        Proof
      </a>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: 2,
          color: 'var(--grey-dim)',
        }}
      >
        &copy; 2026 / LOS ANGELES
      </div>
    </footer>
  );
}
