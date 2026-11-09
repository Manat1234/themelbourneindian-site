"""Installable app (PWA) pieces for the public site: icons, web app manifest, service worker,
head tags and the small "Get the app" prompt. Used by build_public.py."""
import hashlib, json, os
from PIL import Image

INK, PAPER, SAFFRON = "#181F1C", "#FAF8F3", "#BD5125"
SHORT = "Melb Indian"

HEAD = ('<link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#FAF8F3">'
        '<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">'
        f'<meta name="apple-mobile-web-app-title" content="{SHORT}"><meta name="apple-mobile-web-app-status-bar-style" content="default">')


def tile(roundel, size, inset):
    """Full-bleed square icon: ink background with the roundel centred (inset = share of the side it fills)."""
    im = Image.new("RGB", (size, size), INK)
    r = roundel(round(size * inset)); o = (size - r.width) // 2
    im.paste(r, (o, o), r)
    return im


def build_icons(roundel, P):
    os.makedirs(P("icons"), exist_ok=True)
    tile(roundel, 180, .86).save(P("apple-touch-icon.png"))           # iPhone home screen
    tile(roundel, 192, .86).save(P("icons", "icon-192.png"))
    tile(roundel, 512, .86).save(P("icons", "icon-512.png"))
    tile(roundel, 512, .64).save(P("icons", "icon-maskable-512.png"))  # Android adaptive icons crop to a circle


def manifest(name, tag):
    return {
        "id": "/", "name": name, "short_name": SHORT, "description": tag, "lang": "en-AU", "dir": "ltr",
        "start_url": "/?source=app", "scope": "/", "display": "standalone", "orientation": "portrait-primary",
        "background_color": PAPER, "theme_color": PAPER, "categories": ["news"],
        "icons": [
            {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
            {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
            {"src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
        "shortcuts": [
            {"name": "हिन्दी संस्करण", "short_name": "हिन्दी", "url": "/?source=app#hi", "icons": [{"src": "/icons/icon-192.png", "sizes": "192x192"}]},
            {"name": "ਪੰਜਾਬੀ ਐਡੀਸ਼ਨ", "short_name": "ਪੰਜਾਬੀ", "url": "/?source=app#pa", "icons": [{"src": "/icons/icon-192.png", "sizes": "192x192"}]},
        ],
    }


SW = r"""/* The Melbourne Indian service worker.
   News must be fresh: pages and data/site.json always try the network first and only fall back
   to the saved copy when offline. Photos are kept for offline reading (newest 80). */
const V = 'tmi-__STAMP__', IMG = 'tmi-img';
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
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
"""

# Runs on the public website only (never inside the newsroom desk).
PROMPT_JS = r"""<script id="pwa">(function(){
var H=location.hostname;if(!(H==='themelbourneindian.com.au'||H==='www.themelbourneindian.com.au'||H==='localhost'))return;
if(!location.hash){var sp=location.pathname.match(/^\/(en|hi|pa)\/([a-z0-9-]+)\/?$/);if(sp)location.replace('#'+sp[1]+'-a-'+sp[2])}
if('serviceWorker'in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
var standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;if(standalone)return;
var K='tmi-app-prompt',now=Date.now();try{var s=+localStorage.getItem(K)||0;if(now-s<30*864e5)return}catch(e){}
var ua=navigator.userAgent,ios=/iphone|ipad|ipod/i.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1),safari=ios&&/Safari/.test(ua)&&!/CriOS|FxiOS|EdgiOS/.test(ua);
var T={en:['Get The Melbourne Indian app','Free. Opens in one tap and works offline.','Install','Tap the Share button, then “Add to Home Screen”.','Not now'],
hi:['द मेलबर्न इंडियन ऐप पाएँ','मुफ़्त। एक टैप में खुलता है और ऑफ़लाइन भी चलता है।','इंस्टॉल करें','शेयर बटन दबाएँ, फिर “Add to Home Screen” चुनें।','अभी नहीं'],
pa:['ਦ ਮੈਲਬਰਨ ਇੰਡੀਅਨ ਐਪ ਲਓ','ਮੁਫ਼ਤ। ਇੱਕ ਟੈਪ ਵਿੱਚ ਖੁੱਲ੍ਹਦੀ ਹੈ ਅਤੇ ਔਫ਼ਲਾਈਨ ਵੀ ਚੱਲਦੀ ਹੈ।','ਇੰਸਟਾਲ ਕਰੋ','ਸ਼ੇਅਰ ਬਟਨ ਦਬਾਓ, ਫਿਰ “Add to Home Screen” ਚੁਣੋ।','ਹੁਣੇ ਨਹੀਂ']};
var deferred=null,shown=false;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;setTimeout(show,6000)});
if(safari)setTimeout(show,9000);
function lang(){var m=(location.hash.match(/^#(hi|pa)/)||location.pathname.match(/^\/(hi|pa)\//));return m?m[1]:'en'}
function close(){try{localStorage.setItem(K,String(Date.now()))}catch(e){}var b=document.getElementById('tmi-app');if(b){b.classList.remove('in');setTimeout(function(){b.remove()},300)}}
function show(){if(shown||document.getElementById('tmi-app'))return;if(location.hash.indexOf('#desk')===0)return;shown=true;var t=T[lang()],b=document.createElement('div');b.id='tmi-app';b.setAttribute('role','dialog');b.setAttribute('aria-label',t[0]);b.lang=lang();
b.innerHTML='<img src="/icons/icon-192.png" alt="" width="48" height="48"><div class="tx"><strong>'+t[0]+'</strong><span>'+(deferred?t[1]:t[3])+'</span></div><div class="ac">'+(deferred?'<button type="button" class="go">'+t[2]+'</button>':'')+'<button type="button" class="x" aria-label="'+t[4]+'">'+t[4]+'</button></div>';
document.body.appendChild(b);requestAnimationFrame(function(){b.classList.add('in')});
b.querySelector('.x').onclick=close;var g=b.querySelector('.go');if(g)g.onclick=function(){deferred.prompt();deferred.userChoice.finally(function(){deferred=null;close()})};}
window.addEventListener('appinstalled',close);
})();</script>
<style id="pwa-css">#tmi-app{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:60;max-width:520px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:12px 12px 12px 12px;background:#181F1C;color:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.28);font:15px/1.35 var(--sans,system-ui,sans-serif);transform:translateY(130%);opacity:0;transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .3s}
#tmi-app.in{transform:none;opacity:1}#tmi-app img{width:48px;height:48px;border-radius:11px;flex:none}
#tmi-app .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}#tmi-app strong{font-weight:700}#tmi-app span{color:#C8D2CC;font-size:13.5px}
#tmi-app .ac{display:flex;flex-direction:column;gap:6px;flex:none}#tmi-app button{appearance:none;border:0;border-radius:999px;padding:9px 14px;font:700 13px/1 var(--sans,system-ui,sans-serif);cursor:pointer}
#tmi-app .go{background:#BD5125;color:#fff}#tmi-app .x{background:transparent;color:#C8D2CC;padding:6px 10px}#tmi-app button:focus-visible{outline:2px solid #fff;outline-offset:2px}
@media (prefers-reduced-motion:reduce){#tmi-app{transition:none}}</style>
"""


def write(P, name, tag, stamp_src):
    json.dump(manifest(name, tag), open(P("manifest.webmanifest"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    stamp = hashlib.sha1(stamp_src.encode("utf-8")).hexdigest()[:10]
    open(P("sw.js"), "w", encoding="utf-8").write(SW.replace("__STAMP__", stamp))


def inject(html):
    i = html.rfind("</body>")
    return html[:i] + PROMPT_JS + html[i:]
