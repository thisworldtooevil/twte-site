// Keeps a headline's last two words on one line, so no word sits alone on
// the last line. text-wrap can't do this on SplitText headlines: SplitText
// puts every word in its own box (and splits non-breaking spaces too), but it
// leaves this span's no-wrap in place.
// minWords skips short phrases, where pinning two words forces an early break.
export function keepLastTwo(s, minWords = 3) {
  if (typeof s !== 'string' || s.trim().split(/\s+/).length < minWords) return s;
  const m = s.match(/^(.*)\s(\S+\s\S+)$/);
  if (!m) return s;
  return <>{m[1]} <span className="keep-together">{m[2]}</span></>;
}
