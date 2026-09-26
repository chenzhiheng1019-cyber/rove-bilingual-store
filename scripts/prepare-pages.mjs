import {writeFileSync} from 'node:fs';
const base='/rove-bilingual-store/';
writeFileSync('dist/.nojekyll','');
writeFileSync('dist/404.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ROVE — Opening your route</title></head><body><p>正在打开 ROVE / Opening ROVE…</p><a href="${base}">返回首页 / Return home</a><script>const base=${JSON.stringify(base)};const path=location.pathname.startsWith(base)?'/'+location.pathname.slice(base.length):'/';location.replace(base+'?__rove_route='+encodeURIComponent(path+location.search+location.hash));</script></body></html>`);
