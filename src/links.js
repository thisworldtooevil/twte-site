// The /proof -> intake form handoff. /proof links here, and the form reads
// the same param to record where the visitor came from.
export const FROM_PARAM = 'from';
export const FROM_PROOF = 'proof';
export const PROOF_CONTACT_HREF = `/?${FROM_PARAM}=${FROM_PROOF}#contact`;
