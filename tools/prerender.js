// Prerender: puts the rendered page HTML inside <div id="app"> of each static page,
// so search engines (and Google News) see headlines and story text without running JavaScript.
// Usage: node tools/prerender.js <routes.json>   (routes = [[file, hash], ...], written by build_public.py)
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '..');
const routes = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.webmanifest': 'application/json' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
(async () => {
  await new Promise(ok => srv.listen(0, '127.0.0.1', ok));
  const port = srv.address().port, b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await pg.route(u => !u.hostname.startsWith('127.0.0.1'), r => r.abort());   // no outside requests while rendering
  await pg.addInitScript(() => { try { localStorage.setItem('umami.disabled', '1'); } catch (e) {} });
  await pg.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  await pg.waitForSelector('#main', { timeout: 20000 });
  let n = 0;
  for (const [file, hash] of routes) {
    const html = await pg.evaluate(async h => {
      if (location.hash !== '#' + h) { location.hash = h; await new Promise(r => setTimeout(r, 30)); }
      const a = document.getElementById('app'); return a ? a.innerHTML : '';
    }, hash);
    if (!html || !html.includes('id="main"')) { console.error('prerender: nothing rendered for', hash); continue; }
    const fp = path.join(ROOT, file); let s = fs.readFileSync(fp, 'utf8');
    const k = s.indexOf('<div id="app"></div>'); if (k < 0) continue;
    s = s.slice(0, k) + '<div id="app">' + html.replace(/<\/script/gi, '<\\/script') + '</div>' + s.slice(k + 20);
    fs.writeFileSync(fp, s); n++;
  }
  await b.close(); srv.close(); console.log(`prerendered ${n} of ${routes.length} pages`);
})().catch(e => { console.error('prerender failed:', e.message); process.exit(1); });
