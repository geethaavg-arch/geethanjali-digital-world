# Geethanjali Digital World — website

A static, bilingual (తెలుగు / English) website with light and dark themes, built for **GitHub Pages**. It has no build step and no framework: plain HTML, CSS and JavaScript. Every word, link, image path and icon lives in **`content.js`**, and the **admin panel** at `/admin/` edits that file from any browser, including Amma's iPad.

The layout, colours and section order follow the original Gamma design. New: a sticky header with language and theme switches, the portfolio gallery with project pages, full blog articles, and the admin panel.

---

## 1. Folder structure

```
/
├── index.html                    Home page (all Gamma sections, rendered from content.js)
├── content.js                    ALL site content — text (te + en), links, images, icons, settings
├── 404.html                      "Page not found" (GitHub Pages uses it automatically)
├── .nojekyll                     Tells GitHub Pages to serve files as-is (keep it!)
│
├── portfolio/
│   ├── index.html                Portfolio gallery with category filters
│   └── project/index.html        One project  →  portfolio/project/?id=<project-id>
├── blog/
│   ├── index.html                Article list
│   └── post/index.html           One article  →  blog/post/?id=<article-id>
│
├── admin/
│   ├── index.html                Admin panel (passcode lock)
│   ├── admin.js                  Editor, preview, download, GitHub publishing
│   ├── admin.css
│   └── content-io.js             Reads/writes content.js in a stable format
│
├── assets/
│   ├── css/style.css             Theme: light colours in :root, dark in [data-theme="dark"]
│   ├── js/site.js                Shared: language, theme, fonts, header, footer, helpers
│   ├── js/pages/*.js             One small script per page (home, portfolio, project, blog, post)
│   └── images/
│       ├── brand/                Logo, favicons, brand banner
│       ├── portfolio/            Portfolio images + thumbnails
│       ├── offers/               Offer posters
│       └── uploads/              Photos added from the admin panel (created on first upload)
│
├── README.md                     This file
└── docs/
    ├── ADMIN-GUIDE.md            Step-by-step guide for Amma (iPad)
    └── CONTENT-CHANGES.md        Every text fix made while moving from Gamma
```

The portfolio and blog detail pages use **one template each**, with `?id=` in the address. That is what lets Amma add a project or article from the admin without anyone creating new HTML files.

---

## 2. Put it on GitHub Pages (one time)

1. Copy **everything** in this folder into the root of your repository. On Windows, make sure the hidden file `.nojekyll` comes along.
2. Commit and push:
   ```bash
   git add .
   git commit -m "Geethanjali Digital World static site"
   git push origin main
   ```
3. On github.com, open the repository → **Settings → Pages**.
   - **Source:** Deploy from a branch
   - **Branch:** `main`, folder `/ (root)` → **Save**
4. After about a minute the site is live at `https://<username>.github.io/<repo>/`.

All links are relative, so the site works at `username.github.io/repo/`, on a custom domain, or opened straight from the folder.

---

## 3. Set up the admin panel for Amma (one time)

The admin publishes by saving `content.js` (and new photos) to the repository through the GitHub Application Programming Interface (API). It needs a **fine-grained personal access token (PAT)** that can touch only this one repository.

**a) Create the token (on your computer)**

1. github.com → your photo → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Fill it in:
   - **Name:** `Amma website admin (iPad)`
   - **Expiration:** up to 1 year. Put a reminder in your calendar.
   - **Repository access:** *Only select repositories* → this repository
   - **Permissions → Repository permissions → Contents:** *Read and write* (GitHub adds *Metadata: Read-only* automatically)
3. **Generate token** and copy it (it starts with `github_pat_`).

**b) Connect Amma's iPad**

1. In Safari, open `https://<username>.github.io/<repo>/admin/` and enter the passcode.
2. Go to **Publishing & security**:
   - Fill in the GitHub username, repository name and branch (`main`).
   - Paste the token → **Save key** → **Test connection**. It should say *ready to publish*.
3. Tap **Publish** once. This saves the repository details into `content.js`, so other devices know them.
4. Optional: Safari **Share → Add to Home Screen**. Amma then gets a "Site Admin" icon.

**When the token expires,** Publish shows *"GitHub did not accept the key"*. Create a new token the same way and paste it under Publishing & security.

**No token?** The admin still works. **Download** saves `content.js`, which you upload on github.com (**Add file → Upload files**). New photos go into `assets/images/uploads/`.

---

## 4. How the pieces work

| Feature | How it works | Where to change it |
|---|---|---|
| **Languages** | Every text is `{ "te": "…", "en": "…" }`. Telugu is the default. The visitor's choice is remembered, and `?lang=en` in a link forces English. If one language is empty, the other is shown. | Admin → any section · `settings.defaultLanguage` |
| **Light / dark theme** | Follows the visitor's device. The moon/sun button overrides it and is remembered. | Colours: `assets/css/style.css` (`:root` and `[data-theme="dark"]`) |
| **Fonts** | *Brygada 1918* (from Gamma) for English, plus a Telugu Google Font. | Admin → Site settings → Telugu font |
| **Icons** | Any icon field takes a name from the icon library (SVG, stored in `content.js`) or an emoji. | Admin → Icons |
| **Home sections** | Show/hide and reorder. | Admin → Section order & search |
| **Portfolio** | Categories plus projects. "Show on home page" puts a project in the home preview. | Admin → Portfolio projects |
| **Offers** | Switch on, set start and end dates. They appear in the Contact section and hide themselves after the end date. | Admin → Offers |
| **Contact buttons** | Every "consultation / start project" button opens WhatsApp with a pre-filled message. There is no form, because GitHub Pages cannot send email. | Admin → Contact details & social |
| **Tokens in text** | `{phone}` `{whatsapp}` `{email}` `{website}` `{address}` `{year}` `{siteName}` fill in automatically. | Anywhere in content |
| **Preview** | The admin's **Preview** opens the real site with unpublished changes, including new photos, and a purple banner. | — |
| **Visitor statistics** | GoatCounter (free, no cookies). It stays off until you add a code. | Admin → Site settings → GoatCounter code |

**Caching:** GitHub Pages caches files for about 10 minutes, so visitors may see the old version for a few minutes after publishing. The admin always reads the newest version straight from GitHub.

---

## 5. Editing without the admin

- **Local preview:** double-click `index.html`, or run `python -m http.server 8000` in this folder and open <http://localhost:8000>. The admin's Preview and Publish need `http://` or `https://`, so use the server for those.
- **Hand edits:** `content.js` is plain data with section comments. Edit it in VS Code, then commit and push. If Amma has unpublished changes at that moment, the admin warns her before replacing your version.
- **Styling:** everything visual is in `assets/css/style.css`. Page layouts are in `assets/js/pages/*.js`.

---

## 6. Security notes

- The **passcode is a lock screen, not server security**. GitHub Pages is static, so anyone can load `/admin/`, but nobody can change the live site without the GitHub token.
- The token is stored **only on the devices where you pasted it**, encrypted (AES-GCM) with a key derived from the passcode. It can only change files in this one repository. Every publish is a normal commit, so any change can be rolled back from the repository history.
- The passcode's hash is public inside `content.js`. Choose a passcode that is not easy to guess, and change it any time under Publishing & security.
- All `*.github.io/…` project sites under one account share a browser origin. If you host other experimental projects under the same account, moving this site to its own domain (next section) isolates the admin's stored key completely.

---

## 7. Moving to the custom domain later (geethanjalidigitalworld.in)

1. Repository **Settings → Pages → Custom domain** → `www.geethanjalidigitalworld.in` → Save. GitHub adds a `CNAME` file.
2. At the domain registrar's Domain Name System (DNS) settings:
   - `CNAME` record: `www` → `<username>.github.io`
   - `A` records for the bare domain: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. When GitHub offers it, tick **Enforce HTTPS**.
4. Browser storage is per domain, so paste the admin token again on the new address.
5. After the new site is live, the WordPress hosting can be retired.

---

## 8. Known gaps / to-do

- **Three Gamma AI background images** were not in the folder: the hero background, the blog side illustration and the testimonials background. The site uses soft gradient backgrounds instead. To add them, save each one from Gamma and set it in Admin → *Hero → Background image*, *Blog preview → Side image* and *Testimonials & numbers → Background image*.
- **More portfolio work:** the JVV Samatha poster and pamphlets and the clinic prescription booklet are mentioned in the testimonials but have no images yet. Add them from the admin.
- **Social links** are empty, so they are hidden. Add them under Contact details & social.
- **The Jatara offer poster** shows placeholder contact details (`+91 99123 45678`, `geethanjalidigitalworld.com`). The real ones are `+91-9390644101` and `.in`. Fix the poster artwork before reusing it.
- **Link previews** (WhatsApp/Facebook) use the fallback title and description in each HTML file's `<head>`. Crawlers don't run JavaScript. Once the final domain is set, you can make `og:image` an absolute URL.
