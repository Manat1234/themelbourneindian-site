# The Melbourne Indian: public website

The public site for [themelbourneindian.com.au](https://themelbourneindian.com.au), served by GitHub Pages.

This repository holds only the published edition: `index.html`, the published stories in `data/site.json`, and their photos in `images/`. Stories are written and approved in the private newsroom desk; this folder is regenerated from the desk after each approval. Photos are from Wikimedia Commons; each photo's author, licence and source link appear with it on the site.

## Building

After changing `data/site.json` (published stories only; each photo's original lives in `images/<name>.jpg` and is referenced as `image.url` or `image.file`), run:

    python3 tools/build_public.py

This regenerates `index.html`, one page per story at `/<lang>/<slug>/` with link-preview tags and structured data, resized WebP photos in `img/`, share cards in `og/`, `sitemap.xml`, `robots.txt`, `feed.xml` and the site icons. `tools/app-page.html` is the public version of the app; keep it in step with the desk's `source/src/app.js` and `app.css`.
