import {readFileSync, writeFileSync} from 'node:fs';

/**
 * GitHub Pages has no rewrite rules, so a deep link such as
 * /rove-bilingual-store/product/3 hits Pages' own 404 handler.
 *
 * The previous version answered that 404 with a tiny bootstrap page that used
 * `location.replace(base + '?__rove_route=...')` — a client-side redirect. That
 * meant every deep link cost FOUR extra navigations (404 page -> app root ->
 * history.replaceState -> re-render) and the visitor stared at
 * "正在打开 ROVE / Opening ROVE…" for seconds. On a slow connection this looked
 * like the site was broken.
 *
 * The fix: serve the *real* SPA shell as 404.html. The browser boots the app
 * directly on the deep URL, and the router + the existing `__rove_route`
 * handling in main.tsx resolve the path with zero extra navigations.
 */
const base = '/rove-bilingual-store/';

const shell = readFileSync('dist/index.html', 'utf8');

// The shell is served from a nested path, so root-absolute asset URLs still
// resolve correctly here — no rewriting needed. We only add a marker so the
// page can be recognised as the fallback if ever needed.
writeFileSync('dist/404.html', shell.replace('<head>', '<head>\n    <!-- served by 404.html: direct SPA boot for deep links -->'));

// Tell GitHub Pages not to run Jekyll over the build output.
writeFileSync('dist/.nojekyll', '');

console.log('[prepare-pages] 404.html now serves the full SPA shell (no redirect hop).');
