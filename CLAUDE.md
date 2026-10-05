# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, bilingual (Telugu `te` / English `en`) business website hosted on GitHub Pages at `geethanjalidigitalworld.in`. It has no build step, framework, package manager, linter or tests: it is plain HTML, CSS and ES5-style JavaScript. All site content lives in `content.js`. A browser-based admin panel at `/admin/` edits that file and commits it straight to GitHub. The non-technical owner ("Amma") uses the admin on an iPad. `README.md` covers deployment, token setup and security in detail. `docs/ADMIN-GUIDE.md` is the owner's guide.

## Hosting: GitHub Pages

- **Every push to `main` goes live.** Pages is set to "Deploy from a branch", using `main` and the root folder `/`. There is no GitHub Actions workflow, no build and no staging site, so test locally (or with the admin's Preview) before pushing. A push is usually live in 1–2 minutes, but Pages caches files for about 10 minutes, so visitors may briefly see the old version.
- **Custom domain.** `CNAME` contains `geethanjalidigitalworld.in`, and the site is also reachable at `<user>.github.io/<repo>/`. Keep every path relative, never root-absolute (`/assets/...`), so the site works at both addresses.
- **`.nojekyll`** tells Pages to serve the files as they are, without Jekyll processing. Do not delete it or `CNAME`.
- **`404.html`** is served by Pages for any missing address, at any folder depth. Instead of using `data-root`, it works out the site root at runtime and writes a `<base href>` tag (`/<repo>/` on `*.github.io`, `/` on the custom domain).
- **Folder URLs.** `portfolio/` serves `portfolio/index.html`. Pages are folders containing an `index.html`, not `.html` files.
- **Static only.** There is no server code, so no forms, email sending, redirects or custom headers. Contact goes through WhatsApp, `tel:` and `mailto:` links. Link-preview crawlers don't run JavaScript, which is why each HTML file has fallback `<head>` meta tags.
- **Everything in the repository is public**, including `content.js` and the admin passcode hash. The GitHub token is never stored in the repository: it lives only in the browser storage of each device that uses it, encrypted with the passcode.

## Admin commits directly to `main`

Each admin publish creates commits on `main` through the GitHub Contents API, named `Update website content (admin)` and `Add photo … (admin)`. Each of these commits deploys the site. **Run `git pull` before editing, especially `content.js`**, or you will be working on stale content. Before it publishes, the admin compares the remote `content.js` (ignoring `meta`) with the version it started from, and warns the owner if someone else changed it.

## Architecture

**Rendering pipeline.** Every HTML file is an empty shell (`#site-header`, `#main`, `#site-footer`) that loads the following scripts in order:
1. `content.js` defines `window.SITE_CONTENT`.
2. `assets/js/site.js` reads it, applies language, theme and fonts, renders the header and footer, and exposes helpers as `window.GDW`.
3. `assets/js/pages/<page>.js` registers a render function with `GDW.page(fn)`. That function runs on load and again on every language switch, so it must rebuild `#main` from scratch each time.

**Paths.** `<html data-root="../../" data-page="project">` tells `site.js` where the site root is relative to the current page. All links and images must go through `G.href(target)` and `G.src(path)`, never hardcoded paths. Paths in `content.js` are relative to the site root. Detail pages use a single template with a query string (`portfolio/project/?id=…`, `blog/post/?id=…`), so new projects and posts need no new HTML.

**Text helpers** in `site.js`. Pages build HTML by string concatenation into `innerHTML`, so always escape with one of these:
- `t(v)` picks the current language from `{te, en}` and falls back to the other language if one is empty.
- `tx(v)` translates, replaces tokens, escapes and converts newlines to `<br>`. Use it for normal text.
- `plain(v)` translates and replaces tokens without escaping. Use it for attributes, and pass the result through `esc()`.
- `rich(v)` applies mini-markdown (`##`, `###`, `-`, `1.`, `**bold**`, `[text](url)`) to long fields (`body`, `description`).
- Tokens `{phone} {whatsapp} {email} {website} {address} {year} {siteName}` are resolved from `content.contact` and `settings`.
- Buttons and cards use an action object `{type, target}`, where `type` is one of `whatsapp|call|email|map|url|page`. A WhatsApp `target` is a key into `contact.whatsappMessages`.

**Home page.** `home.sectionOrder` sets the order of the sections in `home.*`. Each section is rendered by the matching function in the `R` map in `assets/js/pages/home.js`, and `show: false` hides it.

**Standalone demo sites** (e.g. `portfolio/tea-biscuit/`). A website built for a portfolio project lives in its own folder with its own `index.html`, `style.css` and `script.js`. It does not load `content.js` or `site.js` and has its own look. It is shown in the portfolio by a normal project entry in `content.js`, whose `link` can be a site-relative path such as `portfolio/tea-biscuit/` (`project.js` passes it through `G.href`). Its screenshots go in `assets/images/portfolio/`.

**Preview mode** (`?preview=1`). `site.js` replaces the published content with the admin's draft from `localStorage['gdw_admin_draft']`, and loads photos that are not yet published from IndexedDB `gdw-admin`. `href()` carries `preview=1` along to every link.

## The admin is schema-less (important when adding fields)

`renderField()` in `admin/admin.js` walks the content tree and chooses an editor widget **by value shape and key name**:
- `{te, en}` objects become two text boxes. Keys matching `LONG_KEYS` (`body|description`) become large text areas.
- Keys matching `IMAGE_KEYS` (`src|image|cover|poster|logo|favicon|appleTouchIcon|backgroundImage`) become photo uploaders.
- `icon`, `type`, `style`, `color`, `target`, `id`, `category`, `startDate`/`endDate` and a few other keys get special widgets.
- Booleans become toggles. Arrays get add, reorder, duplicate and delete controls.

New fields therefore get an editor automatically. Choose key names on purpose, because a key named `image` becomes an uploader. Friendly labels and help text come from `LABELS` and `HELP`. New array items come from `TEMPLATES` (keyed by array name) or `PATH_TEMPLATES` (keyed by the last two path segments, e.g. `faq.items`); otherwise the admin blanks a copy of the first item. `HIDDEN` hides paths from the editor.

To add a new home-page section:
1. Add the data under `home.<key>` in `content.js`.
2. Add `<key>` to `home.sectionOrder`.
3. Add a renderer to `R` in `home.js`.
4. In `admin.js`, add an entry to `SECTION_NAMES`, a `NAV` entry (`path: ['home','<key>']`), and `PATH_TEMPLATES` for any lists.

## `content.js` is regenerated on every admin publish

`admin/content-io.js` reads the file by evaluating it (`new Function`) and writes it back with `serialize()`, which rewrites the whole file: a fixed header comment, plus one comment per top-level key taken from the `SECTIONS` list. Because of this:
- Any comments you add by hand inside `content.js` are lost the next time the owner publishes. Put explanations in `HELP`/`LABELS` or in the docs instead.
- If you add a new top-level key, also add it to `SECTIONS` in `content-io.js`, so it gets a section comment and a stable position.
- The file must stay evaluatable as `window.SITE_CONTENT = { … };` with JSON-compatible values.
- `meta.lastUpdated`, `settings.github` and `settings.adminPasscode` (a salted SHA-256 hash) are managed by the admin.

Uploaded photos are resized in the browser to at most 1600 px. They are saved as JPEG at quality 0.85; small PNGs (under 1.5 MB) stay PNG to keep transparency. They are committed to `assets/images/uploads/<slug>-<base36 timestamp>.<ext>`.

## Values duplicated across files (keep them in sync)

- **Card colour names** (`olive`, `olivegold`, `gold`, `tan`, `plum`): `--c-*` variables and `.c-*` classes in `style.css`, and the `COLORS` list in `admin.js`.
- **Telugu font list**: `TELUGU_FONTS` in both `site.js` (Google Fonts query strings) and `admin.js` (dropdown).
- **Theme colours**: light colours in `:root`, dark colours in `:root[data-theme="dark"]` in `assets/css/style.css`. The `theme-color` meta tags in every HTML `<head>` repeat the two background colours.
- **Fallback `<title>`, description and `og:*` tags** in every HTML file's `<head>`. Link-preview crawlers don't run JavaScript, so these do not come from `content.js`.
- **Icons**: `content.icons` maps a name to the inner markup of a 24×24 stroke SVG. `icon(name)` renders any value that isn't a library name as emoji or text.

## Docs to keep current

- `docs/ADMIN-GUIDE.md`: the owner's iPad instructions. Update it whenever admin behaviour or wording changes. Admin UI text is deliberately plain, non-technical English.
- `docs/CONTENT-CHANGES.md`: records text changes made while moving from the original Gamma site.
- `README.md`, section 8: known gaps and to-do items.
