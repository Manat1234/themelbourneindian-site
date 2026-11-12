/* The Melbourne Indian service worker.
   News must be fresh: pages and data/site.json always try the network first and only fall back
   to the saved copy when offline. Photos are kept for offline reading (newest 80). */
const V = 'tmi-9bb667dc10', IMG = 'tmi-img';
const CORE = ['/', '/data/site.json', '/manifest.webmanifest', '/favicon.png', '/icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== IMG).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const timeout = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), ms))]);
async function networkFirst(req, key) {
  const c = await caches.open(V);
  try {
    const res = await timeout(fetch(req), 6000);
    if (res.ok) c.put(key || req, res.clone());
    return res;
  } catch (err) {
    return (await c.match(key || req, { ignoreSearch: true })) || (req.mode === 'navigate' ? c.match('/') : Response.error());
  }
}
async function trim(c, max) { const ks = await c.keys(); for (let i = 0; i < ks.length - max; i++) await c.delete(ks[i]); }
async function imageFirst(req) {
  const c = await caches.open(IMG); const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) { c.put(req, res.clone()); trim(c, 80); }
  return res;
}
self.addEventListener('fetch', e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(networkFirst(req, u.pathname)); return; }
  if (u.pathname === '/data/site.json') { e.respondWith(networkFirst(req, '/data/site.json')); return; }
  if (/^\/(img|og|icons)\//.test(u.pathname)) { e.respondWith(imageFirst(req)); return; }
  if (/^\/app\.[0-9a-f]+\.js$/.test(u.pathname)) { e.respondWith(caches.open(V).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; })))); return; }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
