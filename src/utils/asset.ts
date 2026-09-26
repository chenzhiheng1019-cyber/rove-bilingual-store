/** Resolve public images under the current deployment base path. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\/+/, '');

/**
 * Responsive variants for the two large editorial photographs.
 *
 * `campaign.webp` and `group.webp` ship at 1536px, but they are displayed at
 * roughly 600–1200 CSS px — and on phones at ~380px. Serving the 1536px file
 * everywhere meant a phone downloaded 189–314KB for a 380px-wide box, which is
 * the main reason images felt slow to appear.
 *
 * These helpers expose a base name plus the generated widths so components can
 * emit `srcset` + `sizes` and let the browser pick.
 */
export const RESPONSIVE_WIDTHS = [640, 1024, 1536] as const;

const variant = (name: string, width: number) => asset(`/assets/${name}-${width}.webp`);

/** `srcSet` string for one of the large photographs, e.g. buildSrcSet('campaign'). */
export const buildSrcSet = (name: string) =>
  RESPONSIVE_WIDTHS.map((w) => `${variant(name, w)} ${w}w`).join(', ');

/** Best-effort single URL (used for `src` and non-srcset consumers). */
export const responsiveSrc = (name: string, width: number = 1024) => variant(name, width);
