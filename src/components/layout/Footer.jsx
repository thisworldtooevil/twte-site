export function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 80px 32px 48px',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div style={{ opacity: 0.3 }}>
        <img src="/images/logo-nav.png" alt="TWTE" width="28" height="28" style={{ display: 'block' }} />
      </div>
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
