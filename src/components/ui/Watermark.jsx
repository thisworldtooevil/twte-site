export function Watermark() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 90,
        opacity: 0.12,
        pointerEvents: 'none',
      }}
    >
      <img src="/images/logo-watermark.png" alt="" width="44" height="44" />
    </div>
  );
}
