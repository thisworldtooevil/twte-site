// The /proof -> intake form handoff. /proof links here, and the form reads
// the same param to record where the visitor came from.
export const FROM_PARAM = 'from';
export const FROM_PROOF = 'proof';
export const PROOF_CONTACT_HREF = `/?${FROM_PARAM}=${FROM_PROOF}#contact`;

// In-page links to the form fire this so it shows fully on arrival instead of
// waiting for the scroll reveal. Page loads at #contact are read from the hash.
export const CONTACT_ARRIVE_EVENT = 'contact:arrive';
export const announceContactArrival = () => window.dispatchEvent(new Event(CONTACT_ARRIVE_EVENT));
