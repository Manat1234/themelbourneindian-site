#!/usr/bin/env python3
"""Merge the newsroom desk's published snapshot into the public site's data/site.json.

usage: python3 tools/sync_from_desk.py DESK_SITE_JSON [--assets DIR]

DESK_SITE_JSON is the artifact's data/site.json (read with the Artifact tool, path "data/site.json").
Photos the desk stores as /_blob/<id> are matched to photos already in images/ by their Commons sourceUrl.
New photos must be downloaded from the artifact asset store into DIR (files named <id>.<ext>);
if any are missing the script prints {"need_assets": [...]} and exits with status 3.
After a successful merge, run tools/build_public.py.
"""
import glob, json, os, re, sys
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
PRIVATE = ("desk_note", "risk_note", "image_candidates", "red_reviewed", "_id")

def main():
    args = sys.argv[1:]
    if not args: sys.exit(__doc__)
    desk = json.load(open(args[0], encoding="utf-8"))
    assets = args[args.index("--assets") + 1] if "--assets" in args else None
    repo = json.load(open(P("data", "site.json"), encoding="utf-8"))
    ok = set(json.load(open(P("tools", "translations_ok.json")))["allowed"])
    by_src = {}
    for a in repo["articles"]:
        im = a.get("image") or {}
        if im.get("sourceUrl") and im.get("file"): by_src[im["sourceUrl"]] = im
    need, out = [], []
    for a in desk.get("articles", []):
        if a.get("status") != "published": continue
        a = {k: v for k, v in a.items() if k not in PRIVATE}
        tr = a.get("translations") or {}
        for l in ("hi", "pa"):
            if a.get(l) and not (f"{a['slug']}/{l}" in ok or tr.get(l) == "reviewed"): a.pop(l)
        if not any(a.get(l) for l in ("hi", "pa")): a.pop("translations", None)
        im = a.get("image")
        if im and im.get("url", "").startswith("/_blob/"):
            aid = im.get("assetId") or im["url"].rsplit("/", 1)[-1]
            prev = by_src.get(im.get("sourceUrl"))
            if prev:
                im.update({k: prev[k] for k in ("file", "url", "srcset", "og") if k in prev})
            else:
                found = glob.glob(os.path.join(assets, aid + ".*")) if assets else []
                if not found: need.append(aid); out.append(a); continue
                m = re.search(r"File:([^/?#]+)", im.get("sourceUrl") or "")
                name = re.sub(r"[^a-z0-9]+", "-", os.path.splitext(m.group(1))[0].lower() if m else a["slug"]).strip("-")[:80]
                dst = P("images", name + ".jpg")
                if not os.path.exists(dst): Image.open(found[0]).convert("RGB").save(dst, "JPEG", quality=92)
                im["file"] = f"images/{name}.jpg"; im["url"] = im["file"]; im.pop("srcset", None); im.pop("og", None)
            im.pop("assetId", None)
        out.append(a)
    if need:
        print(json.dumps({"need_assets": sorted(set(need))})); sys.exit(3)
    site = {k: v for k, v in desk.items() if k != "articles"}; site["articles"] = out
    json.dump(site, open(P("data", "site.json"), "w", encoding="utf-8"), ensure_ascii=False, sort_keys=True)
    print(json.dumps({"published": len(out), "slugs": sorted(a["slug"] for a in out)}))

if __name__ == "__main__":
    main()
