#!/usr/bin/env python3
"""Build the public edition of The Melbourne Indian for GitHub Pages.

Input : data/site.json (published stories only) and images/<name>.jpg (original licensed photos)
        tools/app-page.html (the single-page app, public-site version)
Output: index.html, <lang>/<slug>/index.html (one page per story, with link-preview tags),
        img/*.webp (resized photos), og/*.jpg (1200x630 share cards), sitemap.xml, robots.txt,
        feed.xml (English RSS), favicon.png, apple-touch-icon.png,
        manifest.webmanifest, sw.js, icons/ (installable app; see tools/pwa.py)
Run from the repo root:  python3 tools/build_public.py
"""
import datetime as dt, html, json, os, re, shutil
from email.utils import format_datetime
from PIL import Image, ImageDraw, ImageFont
import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import pwa

SITE = "https://themelbourneindian.com.au"
NAME = "The Melbourne Indian"
TAG = "Independent, free-to-read news for Melbourne's Indian communities in English, Hindi and Punjabi."
LOCALE = {"en": "en_AU", "hi": "hi_IN", "pa": "pa_IN"}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
esc = lambda s: html.escape(s or "", quote=True)

def fit_cover(im, w, h):
    sw, sh = im.size; s = max(w / sw, h / sh)
    im = im.resize((round(sw * s), round(sh * s)), Image.LANCZOS)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((l, t, l + w, t + h))

def build_images(site):
    os.makedirs(P("img"), exist_ok=True); os.makedirs(P("og"), exist_ok=True)
    for a in site["articles"]:
        im_ = a.get("image")
        if not im_: continue
        f = im_.get("file") or im_["url"]
        if not f.startswith("images/"): raise SystemExit(f"{a['slug']}: image needs images/<name>.jpg, got {f}")
        im_["file"] = f; base = os.path.splitext(os.path.basename(f))[0]
        src = Image.open(P(f)).convert("RGB"); W = src.width
        sizes = [w for w in (800, 1600) if w < W] + [min(W, 1600)]
        sizes = sorted(set(sizes))
        for w in sizes:
            out = P("img", f"{base}-{w}.webp")
            if not os.path.exists(out):
                r = src.resize((w, round(src.height * w / W)), Image.LANCZOS) if w != W else src
                r.save(out, "WEBP", quality=78, method=6)
        im_["url"] = f"img/{base}-{sizes[-1]}.webp"
        if len(sizes) > 1: im_["srcset"] = ", ".join(f"img/{base}-{w}.webp {w}w" for w in sizes)
        else: im_.pop("srcset", None)
        og = P("og", f"{base}.jpg")
        if not os.path.exists(og): fit_cover(src, 1200, 630).save(og, "JPEG", quality=82, optimize=True, progressive=True)
        im_["og"] = f"og/{base}.jpg"
        im_.pop("assetId", None)

def font(bold=True, size=40):
    for f in ("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",):
        if os.path.exists(f): return ImageFont.truetype(f, size)
    return ImageFont.load_default()

def roundel(size):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    b = max(2, size // 16); d.ellipse((0, 0, size - 1, size - 1), fill="#BD5125"); d.ellipse((b, b, size - 1 - b, size - 1 - b), fill="#181F1C")
    f = font(True, int(size * 0.5)); d.text((size / 2, size / 2 + size * 0.02), "m.", font=f, fill="white", anchor="mm")
    return im

def build_brand():
    if not os.path.exists(P("og", "site.jpg")):
        im = Image.new("RGB", (1200, 630), "#182920"); d = ImageDraw.Draw(im)
        im.paste(roundel(170), (90, 230), roundel(170))
        d.text((300, 250), "The Melbourne", font=font(True, 84), fill="#E9EFEA")
        d.text((300, 350), "Indian.", font=font(True, 84), fill="#EF9D6D")
        d.text((92, 520), "Indian roots. Melbourne stories.  English · Hindi · Punjabi", font=font(False, 34), fill="#A9BAB0")
        im.save(P("og", "site.jpg"), "JPEG", quality=88)
    roundel(64).save(P("favicon.png")); pwa.build_icons(roundel, P)

def head_tags(title, desc, url, image, kind="website", lang="en", extra=""):
    return (f'<base href="/"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}">'
            f'<link rel="canonical" href="{esc(url)}"><meta property="og:site_name" content="{NAME}">'
            f'<meta property="og:type" content="{kind}"><meta property="og:title" content="{esc(title)}">'
            f'<meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{esc(url)}">'
            f'<meta property="og:image" content="{esc(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
            f'<meta property="og:locale" content="{LOCALE.get(lang, "en_AU")}"><meta name="twitter:card" content="summary_large_image">'
            f'<meta name="robots" content="max-image-preview:large"><link rel="icon" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">'
            f'<link rel="alternate" type="application/rss+xml" title="{NAME}" href="/feed.xml">{pwa.HEAD}{extra}')

def clean_template(t):
    pre, sep, post = t.partition('<template id="headbits">')
    pre = re.sub(r"<title>.*?</title>", "", pre, count=1, flags=re.S)
    pre = re.sub(r'<meta name="(robots|description)" content="[^"]*">', "", pre)
    post = post.replace('<meta name="robots" content="noindex,nofollow">', "")
    return pre + sep + post

def page(template, site, head):
    h = template.replace('<meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">',
                         '<meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">' + head, 1)
    assert head in h
    m = re.search(r'(<script id="snapshot" type="application/json">)(.*?)(</script>)', h, re.S)
    return pwa.inject(h[:m.start(2)] + json.dumps(site, ensure_ascii=False, sort_keys=True).replace("<", "\\u003c") + h[m.end(2):])

MEL = dt.timezone(dt.timedelta(hours=11))  # AEDT; good enough for publication timestamps
def iso(v):
    """Full ISO 8601 timestamp in Melbourne time ('2026-11-09' -> 9am that day)."""
    if not v: return ""
    try:
        if len(v) == 10: return dt.datetime.fromisoformat(v).replace(hour=9, tzinfo=MEL).isoformat()
        return dt.datetime.fromisoformat(v.replace("Z", "+00:00")).astimezone(MEL).isoformat(timespec="seconds")
    except Exception: return v
PUBLISHER = {"@type": "NewsMediaOrganization", "name": NAME, "url": SITE + "/",
             "logo": {"@type": "ImageObject", "url": SITE + "/icons/icon-512.png", "width": 512, "height": 512},
             "publishingPrinciples": SITE + "/standards/", "correctionsPolicy": SITE + "/standards/",
             "ethicsPolicy": SITE + "/standards/", "masthead": SITE + "/about/"}
PAGES = {"about": ("About us", "about"), "standards": ("Editorial standards", "standards"), "advertise": ("Advertise with us", "advertise"), "privacy": ("Privacy policy", "privacy"), "directory": ("Business directory", "directory")}
DIR_DESC = "Local businesses, places of worship and community organisations serving Melbourne's Indian communities."

def V(a, l): return a.get(l) if (a.get(l) or {}).get("headline") else None

def main():
    site = json.load(open(P("data", "site.json"), encoding="utf-8"))
    site["articles"] = [a for a in site["articles"] if a.get("status") == "published"]
    build_images(site); build_brand()
    json.dump(site, open(P("data", "site.json"), "w", encoding="utf-8"), ensure_ascii=False, sort_keys=True)
    tpl = clean_template(open(P("tools", "app-page.html"), encoding="utf-8").read())
    assert 'noindex' not in tpl
    org = dict(PUBLISHER, **{"@context": "https://schema.org", "description": TAG, "email": "news@themelbourneindian.com.au", "areaServed": "Melbourne, Victoria, Australia", "inLanguage": ["en", "hi", "pa"]})
    org_ld = '<script type="application/ld+json">' + json.dumps(org, ensure_ascii=False).replace("<", "\\u003c") + "</script>"
    open(P("index.html"), "w", encoding="utf-8").write(page(tpl, site, head_tags(NAME, TAG, SITE + "/", SITE + "/og/site.jpg", extra=org_ld)))
    urls = [(SITE + "/", site.get("builtAt", "")[:10])]
    for key, (title, path) in PAGES.items():  # crawlable copies of the About / Standards / Advertise pages
        body = (site.get("pages") or {}).get(key) or (DIR_DESC if key == "directory" else None)
        if not body: continue
        m = re.search(r'<p class="dek">(.*?)</p>', body, re.S); desc = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else (DIR_DESC if key == "directory" else TAG)
        extra = f"<script>if(!location.hash)history.replaceState(null,'',location.pathname+location.search+'#en-p-{key}')</script>"
        os.makedirs(P(path), exist_ok=True)
        open(P(path, "index.html"), "w", encoding="utf-8").write(page(tpl, site, head_tags(f"{title} · {NAME}", desc, f"{SITE}/{path}/", SITE + "/og/site.jpg", extra=extra)))
        urls.append((f"{SITE}/{path}/", site.get("builtAt", "")[:10]))
    keep = set()
    for a in site["articles"]:
        langs = [l for l in ("en", "hi", "pa") if V(a, l)]
        for l in langs:
            v = V(a, l); url = f"{SITE}/{l}/{a['slug']}/"; keep.add(f"{l}/{a['slug']}")
            img = SITE + "/" + (a["image"]["og"] if a.get("image") else "og/site.jpg")
            alts = "".join(f'<link rel="alternate" hreflang="{x}" href="{SITE}/{x}/{a["slug"]}/">' for x in langs) if len(langs) > 1 else ""
            ld = {"@context": "https://schema.org", "@type": "NewsArticle", "headline": v["headline"][:110], "description": v.get("dek", ""),
                  "image": [img], "datePublished": iso(a.get("approvedAt") or a.get("date")), "dateModified": iso(a.get("updated") or a.get("approvedAt") or a.get("date")),
                  "inLanguage": l, "mainEntityOfPage": url, "author": {"@type": "Organization", "name": a.get("byline") or f"{NAME} newsroom", "url": SITE + "/about/"},
                  "publisher": PUBLISHER, "isAccessibleForFree": True}
            extra = (alts + f'<meta property="article:published_time" content="{esc(iso(a.get("approvedAt") or a.get("date")))}">'
                     + '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("<", "\\u003c") + "</script>"
                     + f"<script>if(!location.hash)history.replaceState(null,'',location.pathname+location.search+'#{l}-a-{a['slug']}')</script>")
            head = head_tags(f"{v['headline']} · {NAME}", v.get("dek", ""), url, img, "article", l, extra)
            os.makedirs(P(l, a["slug"]), exist_ok=True)
            open(P(l, a["slug"], "index.html"), "w", encoding="utf-8").write(page(tpl, site, head))
            urls.append((url, (a.get("updated") or a.get("date") or "")[:10]))
    for l in ("en", "hi", "pa"):  # remove pages for stories no longer published
        if os.path.isdir(P(l)):
            for d in os.listdir(P(l)):
                if f"{l}/{d}" not in keep: shutil.rmtree(P(l, d))
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"<url><loc>{esc(u)}</loc>" + (f"<lastmod>{m}</lastmod>" if m else "") + "</url>" for u, m in urls]
    open(P("sitemap.xml"), "w", encoding="utf-8").write("\n".join(sm + ["</urlset>"]) + "\n")
    open(P("robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\nSitemap: {SITE}/news-sitemap.xml\n")
    # Google News sitemap: stories published in the last 2 days (Google's rule), in every reviewed language
    cutoff = dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=2)
    ns = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">']
    for a in site["articles"]:
        when = iso(a.get("approvedAt") or a.get("date"))
        try: recent = dt.datetime.fromisoformat(when) >= cutoff
        except Exception: recent = False
        if not recent: continue
        for l in ("en", "hi", "pa"):
            v = V(a, l)
            if v: ns.append(f"<url><loc>{SITE}/{l}/{a['slug']}/</loc><news:news><news:publication><news:name>{NAME}</news:name><news:language>{l}</news:language></news:publication><news:publication_date>{when}</news:publication_date><news:title>{esc(v['headline'])}</news:title></news:news></url>")
    open(P("news-sitemap.xml"), "w", encoding="utf-8").write("\n".join(ns + ["</urlset>"]) + "\n")
    items = sorted([a for a in site["articles"] if V(a, "en")], key=lambda a: (a.get("date") or "", a.get("updated") or ""), reverse=True)[:30]
    def rfc(d):
        try: return format_datetime(dt.datetime.fromisoformat(d[:10]).replace(hour=9, tzinfo=dt.timezone(dt.timedelta(hours=11))))
        except Exception: return ""
    rss = ['<?xml version="1.0" encoding="UTF-8"?>', '<rss version="2.0"><channel>', f"<title>{NAME}</title>", f"<link>{SITE}/</link>",
           f"<description>{esc(TAG)}</description>", "<language>en-au</language>"]
    for a in items:
        u = f"{SITE}/en/{a['slug']}/"
        rss.append(f"<item><title>{esc(a['en']['headline'])}</title><link>{u}</link><guid>{u}</guid><description>{esc(a['en'].get('dek',''))}</description><pubDate>{rfc(a.get('date',''))}</pubDate></item>")
    open(P("feed.xml"), "w", encoding="utf-8").write("\n".join(rss + ["</channel></rss>"]) + "\n")
    pwa.write(P, NAME, TAG, open(P("index.html"), encoding="utf-8").read())
    print(f"built: {len(site['articles'])} stories, {len(urls)-1} story pages, app manifest + service worker")

if __name__ == "__main__":
    main()
