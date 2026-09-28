/* =====================================================================
   Geethanjali Digital World — admin panel
   Edits content.js in the browser. Publishes straight to GitHub with a
   fine-grained token (stored encrypted on this device), or downloads
   content.js as a backup. Works on iPad Safari. No server needed.
   ===================================================================== */
(function () {
  'use strict';

  // ───────────────────────── 1. constants ─────────────────────────
  var ROOT = '../';
  var DRAFT_KEY = 'gdw_admin_draft';
  var TOKEN_KEY = 'gdw_admin_token';
  var REPO_KEY = 'gdw_admin_repo';
  var IMAGE_KEYS = /^(src|image|cover|poster|logo|favicon|appleTouchIcon|backgroundImage)$/;
  var LONG_KEYS = /^(body|description)$/;
  var HIDDEN = { 'settings.github': 1, 'settings.adminPasscode': 1, 'home.sectionOrder': 1 };
  var TELUGU_FONTS = ['Noto Serif Telugu', 'Tiro Telugu', 'Hind Guntur', 'Anek Telugu', 'Mandali', 'Ramaraja', 'NTR'];
  var COLORS = [['olive', 'Olive green'], ['olivegold', 'Olive gold'], ['gold', 'Gold'], ['tan', 'Tan'], ['plum', 'Plum']];
  var ACTION_TYPES = [['whatsapp', 'WhatsApp chat'], ['page', 'Page or section on this site'], ['url', 'Another website'], ['call', 'Phone call'], ['email', 'Email'], ['map', 'Google Maps'], ['', 'No link']];
  var EMOJIS = ['📞', '✉️', '💬', '📍', '🎁', '📩', '🎉', '✅', '⭐', '🌺', '🙏', '🪔', '🎨', '🖼️', '📱', '💻', '🎬', '🎵', '📢', '🛍️', '🏆', '❤️'];
  var SECTION_NAMES = {
    hero: 'Hero (top banner)', consultation: 'Free consultation', services: 'Services', portfolioPreview: 'Portfolio preview',
    blogPreview: 'Blog preview', testimonials: 'Testimonials & numbers', about: 'About us', faq: 'FAQ', contact: 'Contact & offers', legal: 'Privacy & terms'
  };
  var BI_HINT = 'Each text has a Telugu box and an English box. If one is empty, visitors see the other language.';

  var NAV = [
    { id: 'dashboard', label: 'Dashboard', special: 'dashboard' },
    { group: 'Showcase' },
    { id: 'projects', label: 'Portfolio projects', path: ['portfolio', 'projects'], intro: 'Tap a project to open it. "Show on home page" puts it in the home-page preview. New projects are added at the top.' },
    { id: 'posts', label: 'Blog articles', path: ['blog', 'posts'], intro: 'Article text: leave a blank line between paragraphs. Start a line with "## " for a heading, "- " for a bullet, "1. " for a numbered point. Wrap words in **double stars** for bold.' },
    { id: 'offers', label: 'Offers', path: ['offers'], intro: 'Switch an offer on and set its dates. It shows in the Contact section and disappears automatically after the end date.' },
    { group: 'Home page' },
    { id: 'home-order', label: 'Section order & search', special: 'homeOrder' },
    { id: 'home-hero', label: 'Hero (top banner)', path: ['home', 'hero'], sub: true },
    { id: 'home-consultation', label: 'Free consultation', path: ['home', 'consultation'], sub: true },
    { id: 'home-services', label: 'Services', path: ['home', 'services'], sub: true },
    { id: 'home-portfolioPreview', label: 'Portfolio preview', path: ['home', 'portfolioPreview'], sub: true },
    { id: 'home-blogPreview', label: 'Blog preview', path: ['home', 'blogPreview'], sub: true },
    { id: 'home-testimonials', label: 'Testimonials & numbers', path: ['home', 'testimonials'], sub: true },
    { id: 'home-about', label: 'About us', path: ['home', 'about'], sub: true },
    { id: 'home-faq', label: 'FAQ', path: ['home', 'faq'], sub: true },
    { id: 'home-contact', label: 'Contact section', path: ['home', 'contact'], sub: true },
    { id: 'home-legal', label: 'Privacy & terms', path: ['home', 'legal'], sub: true },
    { group: 'Other pages' },
    { id: 'portfolio-page', label: 'Portfolio page text', paths: [['portfolio', 'page'], ['portfolio', 'cta'], ['portfolio', 'categories'], ['portfolio', 'seo']] },
    { id: 'blog-page', label: 'Blog page text', paths: [['blog', 'page'], ['blog', 'author'], ['blog', 'cta'], ['blog', 'seo']] },
    { group: 'Whole website' },
    { id: 'contact', label: 'Contact details & social', paths: [['contact'], ['social']], intro: 'Used across the whole site. In other texts, {phone}, {whatsapp}, {email}, {website} and {address} fill in from here automatically.' },
    { id: 'nav', label: 'Header menu', path: ['nav'], intro: '"#services" jumps to a home-page section. "portfolio/" and "blog/" open those pages.' },
    { id: 'footer', label: 'Footer', path: ['footer'], intro: '{year} is replaced with the current year.' },
    { id: 'ui', label: 'Small labels', path: ['ui'], intro: 'Little words used across the site: buttons, menu, messages.' },
    { id: 'settings', label: 'Site settings', path: ['settings'], intro: 'Name, logo, first-visit language and theme, fonts and visitor statistics.' },
    { id: 'icons', label: 'Icons', special: 'icons' },
    { id: 'publishing', label: 'Publishing & security', special: 'publishing' }
  ];

  var LABELS = {
    siteName: 'Business name', tagline: 'Tagline', logo: 'Logo (round image in the header)', favicon: 'Browser tab icon (small square PNG)',
    appleTouchIcon: 'iPhone / iPad home-screen icon', defaultLanguage: 'Language for first-time visitors', defaultTheme: 'Theme for first-time visitors',
    teluguFont: 'Telugu font', goatcounterCode: 'GoatCounter code (visitor statistics)',
    phone: 'Phone number for tap-to-call', phoneDisplay: 'Phone number as shown', whatsapp: 'WhatsApp number', whatsappDisplay: 'WhatsApp number as shown',
    email: 'Email', website: 'Website (as shown)', websiteUrl: 'Website link', hours: 'Working hours', address: 'Address', mapQuery: 'Google Maps search',
    whatsappMessages: 'Ready-made WhatsApp messages', consult: 'Free consultation message', project: 'New project message', general: 'General enquiry message',
    social: 'Social media links', name: 'Name', icon: 'Icon', url: 'Link', label: 'Label', target: 'Goes to', title: 'Title',
    titleAccent: 'Coloured part of the title', text: 'Text', badge: 'Small label above the title', badgeIcon: 'Small label icon', buttons: 'Buttons',
    button: 'Button', type: 'When tapped', style: 'Button style', show: 'Show on website', backgroundImage: 'Background image', images: 'Images',
    src: 'Image', alt: 'Image description (read aloud to blind visitors)', seo: 'Google search title & description', description: 'Description',
    benefitsTitle: 'Benefits heading', benefits: 'Benefits', howTitle: '"How to reach us" heading', methods: 'Contact methods', note: 'Note',
    items: 'Items', maxItems: 'How many to show', quote: 'What they said', role: 'Role / place', highlight: 'Highlight (gold border)',
    stats: 'Numbers', value: 'Number', vision: 'Vision', mission: 'Mission', team: 'Team', members: 'Team list', question: 'Question',
    answer: 'Answer', cards: 'Contact cards', lines: 'Lines', color: 'Colour', showOffers: 'Show active offers here', blocks: 'Blocks',
    points: 'Bullet points', id: 'ID (used in the web address)', enabled: 'Offer switched on', startDate: 'Start date',
    endDate: 'End date', price: 'Price line', details: 'Details', poster: 'Poster', page: 'Page heading', cta: 'Box at the bottom',
    categories: 'Categories', projects: 'Projects', featured: 'Show on home page', category: 'Category', client: 'Client', date: 'Date',
    summary: 'One-line summary', cover: 'Grid image', caption: 'Caption', link: 'Live website link (optional)', author: 'Author',
    posts: 'Articles', excerpt: 'Short summary', body: 'Article text', showSocial: 'Show social icons', showMenu: 'Show menu links',
    image: 'Side image', offers: 'Offers', nav: 'Menu links', footer: 'Footer', ui: 'Labels', contact: 'Contact details'
  };
  var HELP = {
    titleAccent: 'Shown in plum after the title.',
    body: 'Blank line = new paragraph · "## " = heading · "- " = bullet · "1. " = numbered · **bold**',
    description: 'Blank line = new paragraph · "- " = bullet · **bold**',
    target: 'Page: portfolio/ · blog/ · #services · #contact …   WhatsApp: consult · project · general',
    id: 'Lowercase English letters, numbers and dashes. Filled in automatically if left empty.',
    lines: 'Tip: {phone} {whatsapp} {email} {website} {address} fill in from Contact details.',
    whatsapp: 'Digits only, with country code — e.g. 919390644101',
    phone: 'With country code — e.g. +919390644101',
    goatcounterCode: 'Free visitor counts from goatcounter.com. Enter your code (e.g. geethanjali). Leave empty to switch off.',
    featured: 'Featured projects appear in the home-page preview.',
    show: 'Switch off to hide it without deleting.',
    mapQuery: 'What Google Maps searches for when someone taps the office card.',
    endDate: 'The offer hides itself after this day.',
    cover: 'Used in the portfolio grid. If empty, the first image is used.',
    date: 'Format: 2026-09-27 (or 2026-09 for just the month).',
    maxItems: 'Maximum number of items shown here.',
    teluguFont: 'All fonts are free Google Fonts. Noto Serif Telugu matches the headings best.',
    alt: 'Describe the picture in a few words.',
    link: 'If this is a website, paste its address to show a "Visit website" button.',
    highlight: 'Makes this testimonial stand out.'
  };

  // ───────────────────────── 2. small helpers ─────────────────────────
  function $(sel, root) { return (root || document).querySelector(sel); }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k in el && typeof v !== 'string') el[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function getPath(obj, path) { return path.reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj); }
  function setPath(obj, path, val) {
    var o = obj;
    for (var i = 0; i < path.length - 1; i++) { if (o[path[i]] == null) o[path[i]] = typeof path[i + 1] === 'number' ? [] : {}; o = o[path[i]]; }
    o[path[path.length - 1]] = val;
  }
  function stripMeta(c) { var x = clone(c); delete x.meta; return JSON.stringify(x); }
  function isBi(v) {
    if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
    var ks = Object.keys(v);
    return ks.length > 0 && ks.every(function (k) { return (k === 'te' || k === 'en') && (typeof v[k] === 'string'); });
  }
  function biText(v) { if (v == null) return ''; if (typeof v === 'string') return v; if (isBi(v)) return v.te || v.en || ''; return ''; }
  function biEn(v) { return isBi(v) ? (v.en || '') : ''; }
  function slugify(s) {
    return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  }
  function humanize(k) {
    if (typeof k === 'number') return 'Item ' + (k + 1);
    if (LABELS[k]) return LABELS[k];
    var s = String(k).replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function today() {
    var n = new Date();
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }
  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }
  function randomHex(n) { var a = new Uint8Array(n); crypto.getRandomValues(a); return Array.prototype.map.call(a, function (b) { return b.toString(16).padStart(2, '0'); }).join(''); }
  function b64FromBytes(bytes) { var bin = ''; for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(bin); }
  function bytesFromB64(b64) { var bin = atob(b64.replace(/\s/g, '')); var a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
  function b64encodeUtf8(str) { return b64FromBytes(new TextEncoder().encode(str)); }
  function b64decodeUtf8(b64) { return new TextDecoder().decode(bytesFromB64(b64)); }
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  // ───────────────────────── 3. hashing & encryption ─────────────────────────
  // Pure-JS SHA-256 fallback for browsers without crypto.subtle (e.g. plain http).
  function sha256Fallback(ascii) {
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var bytes = new TextEncoder().encode(ascii);
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var K = [], isComp = {}, p = 0;
    for (var c = 2; K.length < 64; c++) {
      if (!isComp[c]) { for (var m = c * c; m < 313; m += c) isComp[m] = 1; K[p++] = (Math.pow(c, 1 / 3) * 4294967296) | 0; }
    }
    var l = bytes.length, words = [];
    var withPad = new Uint8Array(((l + 9 + 63) >> 6) << 6);
    withPad.set(bytes); withPad[l] = 0x80;
    var bitLen = l * 8, dv = new DataView(withPad.buffer);
    dv.setUint32(withPad.length - 4, bitLen >>> 0); dv.setUint32(withPad.length - 8, Math.floor(bitLen / 4294967296));
    for (var i = 0; i < withPad.length; i += 4) words.push(dv.getUint32(i));
    for (var j = 0; j < words.length; j += 16) {
      var w = words.slice(j, j + 16), a = H.slice(0);
      for (var r = 0; r < 64; r++) {
        if (r >= 16) {
          var w15 = w[r - 15], w2 = w[r - 2];
          w[r] = (w[r - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[r - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0;
        }
        var t1 = a[7] + (rr(a[4], 6) ^ rr(a[4], 11) ^ rr(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + K[r] + w[r];
        var t2 = (rr(a[0], 2) ^ rr(a[0], 13) ^ rr(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2]));
        a = [(t1 + t2) | 0].concat(a); a[4] = (a[4] + t1) | 0; a.length = 8;
      }
      for (var q = 0; q < 8; q++) H[q] = (H[q] + a[q]) | 0;
    }
    return H.map(function (x) { return (x >>> 0).toString(16).padStart(8, '0'); }).join('');
  }
  function sha256hex(str) {
    if (window.crypto && crypto.subtle) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      });
    }
    return Promise.resolve(sha256Fallback(str));
  }
  function hashPasscode(salt, pass) { return sha256hex(salt + ':' + pass); }

  function deriveKey(pass, salt) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: 150000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function saveToken(token, pass) {
    if (!(window.crypto && crypto.subtle)) {
      store.set(TOKEN_KEY, JSON.stringify({ v: 0, plain: btoa(token) }));
      return Promise.resolve();
    }
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(pass, salt).then(function (key) {
      return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(token));
    }).then(function (ct) {
      store.set(TOKEN_KEY, JSON.stringify({ v: 1, salt: b64FromBytes(salt), iv: b64FromBytes(iv), ct: b64FromBytes(new Uint8Array(ct)) }));
    });
  }
  function loadToken(pass) {
    var raw = store.get(TOKEN_KEY);
    if (!raw) return Promise.resolve(null);
    try {
      var rec = JSON.parse(raw);
      if (rec.v === 0) return Promise.resolve(atob(rec.plain));
      return deriveKey(pass, bytesFromB64(rec.salt)).then(function (key) {
        return crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytesFromB64(rec.iv) }, key, bytesFromB64(rec.ct));
      }).then(function (pt) { return new TextDecoder().decode(pt); }).catch(function () {
        S.tokenError = 'The GitHub key saved on this device could not be unlocked with this passcode (was the passcode changed?). Please paste the key again.';
        return null;
      });
    } catch (e) { return Promise.resolve(null); }
  }

  // ───────────────────────── 4. image store (IndexedDB) ─────────────────────────
  // New photos wait here until they are published. The site's preview mode reads them too.
  var idb = (function () {
    var dbp = null;
    function open() {
      if (dbp) return dbp;
      dbp = new Promise(function (res, rej) {
        if (!window.indexedDB) return rej(new Error('no indexedDB'));
        var r = indexedDB.open('gdw-admin', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('images'); };
        r.onsuccess = function () { res(r.result); };
        r.onerror = function () { rej(r.error); };
      });
      return dbp;
    }
    function tx(mode, fn) {
      return open().then(function (db) {
        return new Promise(function (res, rej) {
          var t = db.transaction('images', mode); var os = t.objectStore('images'); var out = fn(os);
          t.oncomplete = function () { res(out && out.result !== undefined ? out.result : out); };
          t.onerror = function () { rej(t.error); };
        });
      }).catch(function () { return null; });
    }
    return {
      put: function (k, v) { return tx('readwrite', function (os) { os.put(v, k); }); },
      del: function (k) { return tx('readwrite', function (os) { os.delete(k); }); },
      clear: function () { return tx('readwrite', function (os) { os.clear(); }); },
      all: function () {
        return open().then(function (db) {
          return new Promise(function (res) {
            var out = {}; var cur = db.transaction('images', 'readonly').objectStore('images').openCursor();
            cur.onsuccess = function () { var c = cur.result; if (c) { out[c.key] = c.value; c.continue(); } else res(out); };
            cur.onerror = function () { res(out); };
          });
        }).catch(function () { return {}; });
      }
    };
  })();

  // ───────────────────────── 5. state ─────────────────────────
  var S = {
    published: null,       // what is live (from GitHub if connected, else the loaded content.js)
    publishedJSON: '',
    baseJSON: '',          // what the current edits started from (for conflict checks)
    content: null,         // what is being edited
    images: {},            // path → data URL for photos not yet published
    pass: null, token: null, tokenError: '',
    view: 'dashboard', open: {}, iconOpen: {}, remoteNote: ''
  };

  // ───────────────────────── 6. UI primitives ─────────────────────────
  function toast(msg, isErr) {
    var t = h('div', { class: 'toast' + (isErr ? ' err' : ''), role: 'status', text: msg });
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, isErr ? 6000 : 3200);
  }
  // modal(title, body (string|Node), buttons[{label,value,cls}]) → Promise(value)
  function modal(title, body, buttons) {
    return new Promise(function (resolve) {
      var back = h('div', { class: 'modal-back' });
      var box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' }, h('h2', { text: title }),
        typeof body === 'string' ? h('div', { class: 'body', html: body }) : h('div', { class: 'body' }, body));
      var actions = h('div', { class: 'actions' });
      (buttons || [{ label: 'OK', value: 'ok', cls: 'primary' }]).forEach(function (b) {
        actions.appendChild(h('button', { class: 'btn ' + (b.cls || ''), type: 'button', text: b.label, onclick: function () { back.remove(); resolve(b.value); } }));
      });
      box.appendChild(actions); back.appendChild(box); document.body.appendChild(back);
      var focusBtn = actions.querySelector('.primary') || actions.querySelector('button');
      if (focusBtn) focusBtn.focus();
    });
  }
  function progressModal(title) {
    var line = h('p', { class: 'progress', text: '' });
    var back = h('div', { class: 'modal-back' }, h('div', { class: 'modal' }, h('h2', { text: title }), h('p', { text: 'Please keep this page open.' }), line));
    document.body.appendChild(back);
    return { step: function (s) { line.textContent = s; }, close: function () { back.remove(); } };
  }
  function icoSvg(name) {
    var lib = (S.content && S.content.icons) || {};
    if (lib[name]) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + lib[name] + '</svg>';
    return null;
  }
  function imgSrc(p) {
    if (!p) return '';
    if (S.images[p]) return S.images[p];
    if (/^(https?:|data:|blob:)/.test(p)) return p;
    return ROOT + p;
  }

  // ───────────────────────── 7. change tracking & draft ─────────────────────────
  function usedPending() {
    var used = [];
    var json = JSON.stringify(S.content);
    Object.keys(S.images).forEach(function (p) { if (json.indexOf(JSON.stringify(p)) !== -1) used.push(p); });
    return used;
  }
  function isDirty() { return stripMeta(S.content) !== S.publishedJSON || usedPending().length > 0; }
  function saveDraft() {
    var ok = store.set(DRAFT_KEY, JSON.stringify({ content: S.content, baseJSON: S.baseJSON, savedAt: Date.now() }));
    if (!ok) toast('Could not keep a backup copy on this device (storage is full).', true);
  }
  function readDraft() { try { return JSON.parse(store.get(DRAFT_KEY) || 'null'); } catch (e) { return null; } }
  var persist = debounce(function () { if (isDirty()) saveDraft(); else store.del(DRAFT_KEY); }, 400);
  function changed() { persist(); updateStatus(); }
  function updateStatus() {
    var el = $('#status'); if (!el) return;
    var d = isDirty();
    el.className = 'status' + (d ? ' dirty' : '');
    el.textContent = d ? '● Unpublished changes' : '✓ All changes published';
  }

  // ───────────────────────── 8. lock screen ─────────────────────────
  var fails = 0, lockedUntil = 0;
  function showLock() {
    var pc = ((window.SITE_CONTENT || {}).settings || {}).adminPasscode || {};
    var creating = !pc.hash;
    var logo = ((window.SITE_CONTENT || {}).settings || {}).logo;
    var err = h('p', { class: 'err', 'aria-live': 'polite' });
    var p1 = h('input', { type: 'password', placeholder: creating ? 'New passcode' : 'Passcode', autocomplete: creating ? 'new-password' : 'current-password', 'aria-label': 'Passcode' });
    var p2 = creating ? h('input', { type: 'password', placeholder: 'Type it again', autocomplete: 'new-password', 'aria-label': 'Repeat passcode' }) : null;
    var btn = h('button', { class: 'btn primary', type: 'submit', style: 'width:100%', text: creating ? 'Create passcode' : 'Unlock' });
    var card = h('form', { class: 'lock-card' },
      logo ? h('img', { src: ROOT + logo, alt: '' }) : null,
      h('h1', { text: 'Website admin' }),
      h('p', { text: creating ? 'Create a passcode to protect this admin panel.' : 'Enter the passcode to continue.' }),
      p1, p2, btn, err);
    card.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';
      if (Date.now() < lockedUntil) { err.textContent = 'Too many tries. Please wait a moment.'; return; }
      var v = p1.value;
      if (creating) {
        if (v.length < 4) { err.textContent = 'Use at least 4 characters.'; return; }
        if (v !== p2.value) { err.textContent = 'The two passcodes are different.'; return; }
        var salt = randomHex(16);
        hashPasscode(salt, v).then(function (hash) { S.pass = v; S.newPass = { salt: salt, hash: hash }; start(); });
        return;
      }
      hashPasscode(pc.salt || '', v).then(function (hash) {
        if (hash === pc.hash) { S.pass = v; start(); return; }
        fails++;
        if (fails >= 5) { lockedUntil = Date.now() + 30000; fails = 0; }
        err.textContent = 'That passcode is not right.';
        card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        p1.select();
      });
    });
    document.getElementById('app').innerHTML = '';
    document.getElementById('app').appendChild(h('div', { class: 'lock' }, card));
    p1.focus();
  }

  // ───────────────────────── 9. start-up ─────────────────────────
  function start() {
    var app = document.getElementById('app');
    app.innerHTML = '<div class="lock"><p class="muted">Loading…</p></div>';
    S.published = clone(window.SITE_CONTENT);
    loadToken(S.pass).then(function (tok) {
      S.token = tok;
      return idb.all();
    }).then(function (imgs) {
      S.images = imgs || {};
      S.content = S.published; // ghCfg reads from S.content
      var g = ghCfg();
      if (S.token && g.owner && g.repo) {
        return ghGetContent().then(function (r) {
          S.published = r.content;
          S.remoteNote = '';
        }).catch(function (e) {
          S.remoteNote = 'Could not load the latest version from GitHub (' + e.message + '). Showing the version this page loaded.';
        });
      }
    }).then(function () {
      S.publishedJSON = stripMeta(S.published);
      S.baseJSON = S.publishedJSON;
      var d = readDraft();
      if (d && d.content && stripMeta(d.content) !== S.publishedJSON) {
        var when = new Date(d.savedAt || Date.now()).toLocaleString();
        return modal('Unpublished changes found', 'You have changes on this device from <b>' + when + '</b> that are not published yet. Continue with them?',
          [{ label: 'Discard them', value: 'discard', cls: 'danger' }, { label: 'Continue editing', value: 'keep', cls: 'primary' }]).then(function (ch) {
          if (ch === 'keep') { S.content = d.content; S.baseJSON = d.baseJSON || S.publishedJSON; }
          else { store.del(DRAFT_KEY); S.content = clone(S.published); return idb.clear().then(function () { S.images = {}; }); }
        });
      }
      S.content = clone(S.published);
    }).then(function () {
      S.content.settings = S.content.settings || {};
      if (!S.content.settings.github) S.content.settings.github = { owner: '', repo: '', branch: 'main' };
      if (S.newPass) { S.content.settings.adminPasscode = S.newPass; S.newPass = null; }
      renderApp();
      changed();
    });
  }

  // ───────────────────────── 10. app shell ─────────────────────────
  function renderApp() {
    var app = document.getElementById('app');
    app.innerHTML = '';
    var sidebar = h('nav', { class: 'sidebar', id: 'sidebar', 'aria-label': 'Sections' });
    NAV.forEach(function (n) {
      if (n.group) { sidebar.appendChild(h('div', { class: 'group', text: n.group })); return; }
      sidebar.appendChild(h('button', {
        type: 'button', class: (n.sub ? 'sub ' : '') + (S.view === n.id ? 'active' : ''), text: n.label,
        onclick: function () { go(n.id); sidebar.classList.remove('open'); }
      }));
    });
    sidebar.appendChild(h('div', { class: 'group', text: 'Session' }));
    sidebar.appendChild(h('button', { type: 'button', text: '🔒 Lock admin', onclick: function () { location.reload(); } }));

    var logo = S.content.settings && S.content.settings.logo;
    var top = h('header', { class: 'topbar' },
      h('button', { class: 'icon-btn menu-toggle', type: 'button', 'aria-label': 'Sections', text: '☰', onclick: function () { sidebar.classList.toggle('open'); } }),
      h('div', { class: 'brand' }, logo ? h('img', { src: imgSrc(logo), alt: '' }) : null, h('span', { text: 'Website admin' })),
      h('span', { id: 'status', class: 'status' }),
      h('div', { class: 'spacer' }),
      h('button', { class: 'btn', type: 'button', onclick: preview, html: '👁 <span>Preview</span>' }),
      h('button', { class: 'btn', type: 'button', onclick: download, html: '⬇ <span class="lbl-long">Download</span>' }),
      h('button', { class: 'btn primary', type: 'button', onclick: publish, html: '⬆ <span>Publish</span>' })
    );
    var main = h('main', { class: 'main', id: 'main' });
    app.appendChild(h('div', { class: 'app' }, top, sidebar, main));
    renderView();
    updateStatus();
  }
  function go(id) {
    S.view = id;
    document.querySelectorAll('#sidebar button').forEach(function (b) { b.classList.remove('active'); });
    var idx = 0;
    document.querySelectorAll('#sidebar button').forEach(function (b) {
      var n = NAV.filter(function (x) { return !x.group; })[idx++];
      if (n && n.id === id) b.classList.add('active');
    });
    renderView();
    window.scrollTo(0, 0);
  }
  function renderView(keepScroll) {
    var main = $('#main'); if (!main) return;
    var y = window.scrollY;
    main.innerHTML = '';
    var n = NAV.filter(function (x) { return x.id === S.view; })[0] || NAV[0];
    main.appendChild(h('h1', { text: n.label }));
    if (n.intro || n.path || n.paths) main.appendChild(h('p', { class: 'intro', text: n.intro || BI_HINT }));
    if (n.special) VIEWS[n.special](main);
    else if (n.path) add(main, renderField(n.path, getPath(S.content, n.path), { top: true }));
    else if (n.paths) n.paths.forEach(function (p) {
      var v = getPath(S.content, p);
      if (v === undefined) return;
      var box = h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: humanize(p[p.length - 1]) }));
      add(box, renderField(p, v, { top: true }));
      main.appendChild(box);
    });
    if (keepScroll) window.scrollTo(0, y);
  }
  function rerender() { renderView(true); updateStatus(); }

  // ───────────────────────── 11. generic field editor ─────────────────────────
  function fieldWrap(key, control, path) {
    var help = HELP[key];
    if (key === 'show' && path && path[0] === 'home') help = 'Switch off to hide this whole section.';
    return h('div', { class: 'field' },
      typeof key === 'number' ? null : h('div', { class: 'label', text: humanize(key) }),
      help ? h('span', { class: 'help', text: help }) : null,
      control);
  }
  function renderField(path, value, opts) {
    opts = opts || {};
    var key = path[path.length - 1];
    if (HIDDEN[path.join('.')]) return null;
    if (isBi(value)) return fieldWrap(key, biInput(path, value, key), path);
    if (Array.isArray(value)) return opts.top ? arrayEditor(path, value) : fieldWrap(key, arrayEditor(path, value), path);
    if (value && typeof value === 'object') {
      var kids = Object.keys(value).map(function (k) { return renderField(path.concat(k), value[k]); });
      if (opts.top || opts.flat) return h('div', null, kids);
      return h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: humanize(key) }), kids);
    }
    if (typeof value === 'boolean') {
      var bhelp = key === 'show' && path[0] === 'home' ? 'Switch off to hide this whole section.' : HELP[key];
      return h('div', { class: 'field' }, toggle(path, value, humanize(key)), bhelp ? h('span', { class: 'help', style: 'margin:6px 0 0', text: bhelp }) : null);
    }
    if (typeof value === 'number') return fieldWrap(key, textInput(path, value, 'number'), path);
    // strings
    if (IMAGE_KEYS.test(key)) return fieldWrap(key, imageInput(path, value), path);
    if (key === 'icon' || key === 'badgeIcon') return fieldWrap(key, iconInput(path, value), path);
    if (key === 'type') return fieldWrap(key, select(path, value, ACTION_TYPES, true), path);
    if (key === 'style') return fieldWrap(key, select(path, value, [['primary', 'Filled (olive)'], ['outline', 'Outline']]), path);
    if (key === 'color') return fieldWrap(key, select(path, value, COLORS), path);
    if (key === 'defaultLanguage') return fieldWrap(key, select(path, value, [['te', 'తెలుగు (Telugu)'], ['en', 'English']]), path);
    if (key === 'defaultTheme') return fieldWrap(key, select(path, value, [['system', 'Follow the visitor\'s device'], ['light', 'Light'], ['dark', 'Dark']]), path);
    if (key === 'teluguFont') return fieldWrap(key, select(path, value, TELUGU_FONTS.map(function (f) { return [f, f]; })), path);
    if (key === 'category' && path[0] === 'portfolio') {
      var cats = (getPath(S.content, ['portfolio', 'categories']) || []).map(function (c) { return [c.id, biText(c.label) + (biEn(c.label) ? ' — ' + biEn(c.label) : '')]; });
      return fieldWrap(key, select(path, value, cats, true), path);
    }
    if (key === 'startDate' || key === 'endDate' || (key === 'date' && path[0] === 'blog')) return fieldWrap(key, textInput(path, value, 'date'), path);
    if (key === 'target') return fieldWrap(key, targetInput(path, value), path);
    if (key === 'id') return fieldWrap(key, textInput(path, value, 'text', function (el) {
      el.addEventListener('blur', function () { var s = slugify(el.value); if (s !== el.value) { el.value = s; setPath(S.content, path, s); changed(); } });
    }), path);
    var type = /url|link|websiteUrl/i.test(key) ? 'url' : key === 'email' ? 'email' : /phone|whatsapp/i.test(key) ? 'tel' : 'text';
    return fieldWrap(key, textInput(path, value, type), path);
  }

  function autoGrow(ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 2, 640) + 'px'; }
  function biInput(path, value, key) {
    var long = LONG_KEYS.test(key);
    function box(lang, tag) {
      var ta = h('textarea', { rows: long ? 8 : 1, lang: lang, 'aria-label': humanize(key) + ' — ' + tag });
      ta.value = value[lang] || '';
      ta.addEventListener('input', function () {
        var cur = getPath(S.content, path);
        if (!isBi(cur)) { cur = { te: '', en: '' }; setPath(S.content, path, cur); }
        cur[lang] = ta.value; autoGrow(ta); changed();
      });
      setTimeout(function () { autoGrow(ta); }, 0);
      return h('div', { class: 'lang-' + lang }, h('span', { class: 'tag', text: tag }), ta);
    }
    return h('div', { class: 'bi' }, box('te', 'తెలుగు'), box('en', 'English'));
  }
  function textInput(path, value, type, extra) {
    var el = h('input', { type: type || 'text', 'aria-label': humanize(path[path.length - 1]) });
    el.value = value == null ? '' : value;
    if (type === 'tel') el.setAttribute('inputmode', 'tel');
    el.addEventListener('input', function () {
      setPath(S.content, path, type === 'number' ? (el.value === '' ? 0 : Number(el.value)) : el.value);
      changed();
    });
    if (extra) extra(el);
    return el;
  }
  function select(path, value, options, rerenderOnChange) {
    var el = h('select', { 'aria-label': humanize(path[path.length - 1]) });
    var found = false;
    options.forEach(function (o) { var op = h('option', { value: o[0], text: o[1] }); if (o[0] === value) { op.selected = true; found = true; } el.appendChild(op); });
    if (!found && value) { var op = h('option', { value: value, text: value }); op.selected = true; el.appendChild(op); }
    el.addEventListener('change', function () { setPath(S.content, path, el.value); changed(); if (rerenderOnChange) rerender(); });
    return el;
  }
  function toggle(path, value, label) {
    var cb = h('input', { type: 'checkbox', role: 'switch' });
    cb.checked = !!value;
    cb.addEventListener('change', function () { setPath(S.content, path, cb.checked); changed(); rerender(); });
    return h('label', { class: 'toggle' }, cb, h('span', { text: label }));
  }
  function targetInput(path, value) {
    var parent = getPath(S.content, path.slice(0, -1)) || {};
    var id = 'dl-' + path.join('-');
    var el = textInput(path, value, 'text');
    el.setAttribute('list', id);
    var opts = [];
    if (parent.type === 'whatsapp') opts = Object.keys((S.content.contact || {}).whatsappMessages || {});
    else {
      opts = ['portfolio/', 'blog/'];
      var H = S.content.home || {};
      Object.keys(H).forEach(function (k) { if (H[k] && H[k].id) opts.push('#' + H[k].id); });
    }
    var dl = h('datalist', { id: id });
    opts.forEach(function (o) { dl.appendChild(h('option', { value: o })); });
    return h('div', null, el, dl);
  }
  function iconInput(path, value) {
    var key = path.join('.');
    var prev = h('span', { class: 'ip' });
    function paint(v) { var svg = icoSvg(v); prev.innerHTML = svg || ''; if (!svg) prev.textContent = v || ''; }
    paint(value);
    var el = textInput(path, value, 'text');
    el.placeholder = 'icon name or emoji';
    el.addEventListener('input', function () { paint(el.value); });
    var grid = h('div', { class: 'icon-grid' + (S.iconOpen[key] ? '' : ' hidden') });
    Object.keys(S.content.icons || {}).concat(EMOJIS).forEach(function (name) {
      var b = h('button', { type: 'button', title: name, 'aria-label': name });
      var svg = icoSvg(name); if (svg) b.innerHTML = svg; else b.textContent = name;
      b.addEventListener('click', function () { el.value = name; setPath(S.content, path, name); paint(name); changed(); });
      grid.appendChild(b);
    });
    var choose = h('button', { class: 'btn small', type: 'button', text: 'Choose…', onclick: function () { S.iconOpen[key] = !S.iconOpen[key]; grid.classList.toggle('hidden'); } });
    var clear = h('button', { class: 'btn small ghost', type: 'button', text: 'None', onclick: function () { el.value = ''; setPath(S.content, path, ''); paint(''); changed(); } });
    return h('div', { class: 'icon-field' }, prev, el, choose, clear, grid);
  }

  // ---------- images ----------
  function processImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var max = 1600, w = img.naturalWidth, hh = img.naturalHeight;
        var s = Math.min(1, max / Math.max(w, hh));
        var cw = Math.max(1, Math.round(w * s)), ch = Math.max(1, Math.round(hh * s));
        var c = document.createElement('canvas'); c.width = cw; c.height = ch;
        var ctx = c.getContext('2d');
        var png = file.type === 'image/png' && file.size < 1500000; // keep transparency for small PNG logos
        if (!png) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cw, ch); }
        ctx.drawImage(img, 0, 0, cw, ch);
        URL.revokeObjectURL(url);
        resolve({ dataUrl: png ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.85), ext: png ? 'png' : 'jpg' });
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('This file could not be opened as a picture.')); };
      img.src = url;
    });
  }
  function nameFor(path) {
    // use the nearest project/post/offer id or English title, else the field names
    for (var i = path.length; i > 0; i--) {
      var o = getPath(S.content, path.slice(0, i));
      if (o && typeof o === 'object' && !Array.isArray(o) && !isBi(o)) {
        var n = slugify((typeof o.id === 'string' && o.id) || biEn(o.title) || '');
        if (n) return n.slice(0, 40);
      }
    }
    return slugify(path.filter(function (p) { return typeof p === 'string'; }).slice(-2).join('-')) || 'image';
  }
  function imageInput(path, value) {
    var pending = !!S.images[value];
    var preview = h('div', { class: 'preview' });
    if (value) preview.appendChild(h('img', { src: imgSrc(value), alt: '', onerror: function () { preview.textContent = 'Not uploaded yet'; } }));
    else preview.textContent = 'No image';
    var file = h('input', { type: 'file', accept: 'image/*', class: 'hidden' });
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return;
      toast('Preparing photo…');
      processImage(f).then(function (r) {
        var p = 'assets/images/uploads/' + nameFor(path) + '-' + Date.now().toString(36) + '.' + r.ext;
        S.images[p] = r.dataUrl;
        idb.put(p, r.dataUrl);
        setPath(S.content, path, p);
        changed(); rerender();
        toast('Photo added. Publish to put it on the website.');
      }).catch(function (e) { toast(e.message, true); });
    });
    var pathEl = h('input', { type: 'text', 'aria-label': 'Image path', value: value || '' });
    pathEl.addEventListener('change', function () { setPath(S.content, path, pathEl.value.trim()); changed(); rerender(); });
    return h('div', { class: 'img-field' }, preview,
      h('div', { class: 'ctrl' },
        h('div', { class: 'btns' },
          h('button', { class: 'btn small primary', type: 'button', text: value ? 'Change photo' : 'Choose photo', onclick: function () { file.click(); } }),
          value ? h('button', { class: 'btn small danger', type: 'button', text: 'Remove', onclick: function () { setPath(S.content, path, ''); changed(); rerender(); } }) : null,
          pending ? h('span', { class: 'badge-new', text: 'new — publish to upload' }) : null),
        h('details', null, h('summary', { class: 'small muted', text: 'File path' }), pathEl),
        file));
  }

  // ---------- arrays ----------
  var TEMPLATES = {
    projects: function () {
      var cats = getPath(S.content, ['portfolio', 'categories']) || [];
      return { id: '', show: true, featured: false, category: cats[0] ? cats[0].id : '', title: { te: '', en: '' }, client: { te: '', en: '' }, date: today().slice(0, 7), summary: { te: '', en: '' }, description: { te: '', en: '' }, cover: '', images: [{ src: '', caption: { te: '', en: '' } }], link: '' };
    },
    posts: function () { return { id: '', show: true, date: today(), icon: 'sparkle', color: 'olive', cover: '', title: { te: '', en: '' }, excerpt: { te: '', en: '' }, body: { te: '', en: '' } }; },
    offers: function () { return { id: '', enabled: false, startDate: today(), endDate: '', icon: '🎁', title: { te: '', en: '' }, price: { te: '', en: '' }, items: [], details: [], note: { te: '', en: '' }, poster: '' }; },
    categories: function () { return { id: '', label: { te: '', en: '' } }; },
    nav: function () { return { label: { te: '', en: '' }, target: '' }; },
    social: function () { return { name: '', icon: '', url: '' }; },
    buttons: function () { return { label: { te: '', en: '' }, type: 'whatsapp', target: 'consult', style: 'primary' }; }
  };
  var KEEP_ON_BLANK = /^(type|style|color|icon|badgeIcon|category|show)$/;
  function blank(v, k) {
    if (isBi(v)) return { te: '', en: '' };
    if (Array.isArray(v)) return [];
    if (v && typeof v === 'object') { var o = {}; Object.keys(v).forEach(function (kk) { o[kk] = blank(v[kk], kk); }); return o; }
    if (typeof v === 'string') return KEEP_ON_BLANK.test(k || '') ? v : '';
    if (typeof v === 'boolean') return k === 'highlight' || k === 'featured' || k === 'enabled' ? false : v;
    return v;
  }
  // templates for lists inside home-page sections, keyed by the last two field names
  var BI = function () { return { te: '', en: '' }; };
  var PATH_TEMPLATES = {
    'services.items': function () { return { icon: 'sparkle', title: BI(), text: BI() }; },
    'testimonials.items': function () { return { quote: BI(), name: BI(), role: BI(), highlight: false }; },
    'testimonials.stats': function () { return { value: BI(), label: BI() }; },
    'faq.items': function () { return { question: BI(), answer: BI() }; },
    'contact.cards': function () { return { icon: '📞', color: 'olive', title: BI(), type: '', lines: [BI()] }; },
    'contact.buttons': function () { return TEMPLATES.buttons(); },
    'consultation.methods': function () { return { icon: '📞', label: BI(), type: 'call' }; },
    'team.members': function () { return { icon: 'arrow-right', text: BI() }; },
    'legal.blocks': function () { return { title: BI(), text: BI(), points: [] }; },
    'hero.images': function () { return { src: '', alt: BI() }; },
    'hero.buttons': function () { return TEMPLATES.buttons(); },
    'projects.images': function () { return { src: '', caption: BI() }; }
  };
  function templateFor(path) {
    var key = path[path.length - 1];
    if (TEMPLATES[key]) return TEMPLATES[key];
    var names = path.filter(function (p) { return typeof p === 'string'; });
    return PATH_TEMPLATES[names.slice(-2).join('.')] || null;
  }
  function newItem(path, arr) {
    var tpl = templateFor(path);
    if (tpl) return tpl();
    if (arr.length) return blank(arr[0]);
    return BI();
  }
  function itemSummary(it, i) {
    if (isBi(it) || typeof it === 'string') return { t1: biText(it) || '(empty)', t2: biEn(it) };
    var keys = ['title', 'label', 'name', 'question', 'quote', 'text', 'value', 'caption', 'alt'];
    for (var j = 0; j < keys.length; j++) {
      var v = it[keys[j]];
      var t1 = biText(v);
      if (t1) return { t1: t1, t2: biEn(v) && biEn(v) !== t1 ? biEn(v) : (it.id || '') };
    }
    return { t1: it.id || ('Item ' + (i + 1)), t2: '' };
  }
  function itemThumb(it) {
    if (!it || typeof it !== 'object') return '';
    return it.cover || it.src || it.poster || it.image || (it.images && it.images[0] && it.images[0].src) || '';
  }
  function itemPills(it) {
    var out = [];
    if (!it || typeof it !== 'object' || isBi(it)) return out;
    if (it.show === false) out.push(h('span', { class: 'pill off', text: 'hidden' }));
    if (it.featured) out.push(h('span', { class: 'pill', text: 'home page' }));
    if ('enabled' in it) {
      var expired = it.endDate && it.endDate < today();
      out.push(h('span', { class: 'pill ' + (it.enabled && !expired ? 'on' : 'off'), text: !it.enabled ? 'off' : expired ? 'ended' : 'on' }));
    }
    return out;
  }
  function arrayEditor(path, arr) {
    var key = path[path.length - 1];
    var pkey = path.join('.');
    var simple = arr.length ? arr.every(function (x) { return isBi(x) || typeof x === 'string'; }) : !templateFor(path);
    var addAtStart = key === 'projects' || key === 'posts' || key === 'offers';
    var list = h('div', { class: 'list' });

    function move(i, d) { var j = i + d; if (j < 0 || j >= arr.length) return; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; var o = S.open[pkey + '.' + i]; S.open[pkey + '.' + i] = S.open[pkey + '.' + j]; S.open[pkey + '.' + j] = o; changed(); rerender(); }
    function remove(i) {
      var s = itemSummary(arr[i], i);
      modal('Delete this?', '<b>' + escapeHtml(s.t1) + '</b> will be removed. (Nothing changes on the website until you publish.)', [{ label: 'Cancel' }, { label: 'Delete', value: 'del', cls: 'danger' }]).then(function (v) {
        if (v !== 'del') return; arr.splice(i, 1); S.open = {}; changed(); rerender();
      });
    }
    function dup(i) { arr.splice(i + 1, 0, clone(arr[i])); if (arr[i + 1] && arr[i + 1].id) arr[i + 1].id = ''; S.open[pkey + '.' + (i + 1)] = true; changed(); rerender(); }
    function tools(i) {
      return h('div', { class: 'tools' },
        h('button', { class: 'icon-btn', type: 'button', title: 'Move up', 'aria-label': 'Move up', text: '↑', disabled: i === 0, onclick: function () { move(i, -1); } }),
        h('button', { class: 'icon-btn', type: 'button', title: 'Move down', 'aria-label': 'Move down', text: '↓', disabled: i === arr.length - 1, onclick: function () { move(i, 1); } }),
        simple ? null : h('button', { class: 'icon-btn', type: 'button', title: 'Duplicate', 'aria-label': 'Duplicate', text: '⧉', onclick: function () { dup(i); } }),
        h('button', { class: 'icon-btn danger', type: 'button', title: 'Delete', 'aria-label': 'Delete', text: '✕', onclick: function () { remove(i); } }));
    }

    arr.forEach(function (it, i) {
      var ipath = path.concat(i);
      if (simple) {
        var ctrl = isBi(it) ? biInput(ipath, it, key) : textInput(ipath, it, 'text');
        list.appendChild(h('div', { class: 'row-item' }, ctrl, tools(i)));
        return;
      }
      var ok = pkey + '.' + i;
      var open = !!S.open[ok];
      var s = itemSummary(it, i);
      var th = itemThumb(it);
      var item = h('div', { class: 'item' + (open ? ' open' : '') });
      var head = h('div', { class: 'item-head' },
        h('button', { class: 'summary', type: 'button', 'aria-expanded': String(open), onclick: function () { S.open[ok] = !S.open[ok]; item.classList.toggle('open'); this.setAttribute('aria-expanded', String(!!S.open[ok])); } },
          h('span', { class: 'chev', text: '▸' }),
          th ? h('img', { class: 'thumb', src: imgSrc(th), alt: '' }) : null,
          h('span', { class: 'txt' }, h('span', { class: 't1' }, s.t1, itemPills(it)), s.t2 ? h('span', { class: 't2', text: s.t2 }) : null)),
        tools(i));
      var body = h('div', { class: 'item-body' });
      if (it && typeof it === 'object' && !isBi(it)) {
        if ((key === 'projects' || key === 'posts') && it.id) {
          var page = key === 'projects' ? 'portfolio/project/' : 'blog/post/';
          body.appendChild(h('p', { style: 'margin:10px 0 14px' }, h('button', { class: 'btn small', type: 'button', text: '👁 Preview this ' + (key === 'projects' ? 'project' : 'article'), onclick: function () { openPreview(page + '?id=' + encodeURIComponent(it.id) + '&preview=1'); } })));
        }
        Object.keys(it).forEach(function (k) { add(body, renderField(ipath.concat(k), it[k])); });
      } else {
        add(body, renderField(ipath, it));
      }
      item.appendChild(head); item.appendChild(body);
      list.appendChild(item);
    });

    var addLabel = { projects: '+ Add project', posts: '+ Add article', offers: '+ Add offer', categories: '+ Add category', nav: '+ Add menu link', social: '+ Add social link', buttons: '+ Add button', faq: '+ Add question' }[key] || '+ Add';
    var addBtn = h('button', { class: 'btn small', type: 'button', text: addLabel, onclick: function () {
      var n = newItem(path, arr);
      if (addAtStart) { arr.unshift(n); var shifted = {}; Object.keys(S.open).forEach(function (k) { if (k.indexOf(pkey + '.') === 0) { var idx = +k.slice(pkey.length + 1); if (!isNaN(idx)) shifted[pkey + '.' + (idx + 1)] = S.open[k]; } else shifted[k] = S.open[k]; }); S.open = shifted; S.open[pkey + '.0'] = true; }
      else { arr.push(n); S.open[pkey + '.' + (arr.length - 1)] = true; }
      changed(); rerender();
    } });
    var wrap = h('div', null, addAtStart ? h('p', { style: 'margin:0 0 12px' }, addBtn) : null, list, addAtStart ? null : addBtn);
    return wrap;
  }
  function escapeHtml(s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ───────────────────────── 12. special views ─────────────────────────
  var VIEWS = {
    dashboard: function (main) {
      var g = ghCfg();
      var connected = !!(S.token && g.owner && g.repo);
      if (S.remoteNote) main.appendChild(h('div', { class: 'notice err', text: S.remoteNote }));
      if (S.tokenError) main.appendChild(h('div', { class: 'notice err', text: S.tokenError }));
      if (!connected) {
        main.appendChild(h('div', { class: 'notice' },
          h('b', { text: 'Publishing is not set up on this device yet. ' }),
          h('span', { text: 'You can still edit and download content.js. ' }),
          h('button', { class: 'btn small', type: 'button', text: 'Set up publishing', onclick: function () { go('publishing'); } })));
      }
      if (isDirty()) {
        main.appendChild(h('div', { class: 'notice' },
          h('b', { text: 'You have unpublished changes. ' }),
          h('span', { text: 'They are saved on this device. ' }),
          h('button', { class: 'btn small', type: 'button', text: '👁 Preview', onclick: preview }), ' ',
          h('button', { class: 'btn small primary', type: 'button', text: '⬆ Publish', onclick: publish })));
      } else {
        main.appendChild(h('div', { class: 'notice ok', text: '✓ Everything is published. Last update: ' + ((S.content.meta && S.content.meta.lastUpdated) || '—').replace('T', ' ').slice(0, 16) }));
      }
      var P = S.content.portfolio || {}, B = S.content.blog || {};
      var activeOffers = (S.content.offers || []).filter(function (o) { return o.enabled && (!o.endDate || o.endDate >= today()) && (!o.startDate || o.startDate <= today()); });
      function card(title, text, btns) { return h('div', { class: 'dash-card' }, h('h3', { text: title }), h('p', { text: text }), h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, btns)); }
      function addTo(view, arrPath, tpl) {
        return function () { var arr = getPath(S.content, arrPath); arr.unshift(TEMPLATES[tpl]()); S.open = {}; S.open[arrPath.join('.') + '.0'] = true; changed(); go(view); };
      }
      main.appendChild(h('div', { class: 'cards' },
        card('Portfolio', (P.projects || []).length + ' projects', [
          h('button', { class: 'btn small primary', type: 'button', text: '+ Add project', onclick: addTo('projects', ['portfolio', 'projects'], 'projects') }),
          h('button', { class: 'btn small', type: 'button', text: 'Manage', onclick: function () { go('projects'); } })]),
        card('Blog', (B.posts || []).length + ' articles', [
          h('button', { class: 'btn small primary', type: 'button', text: '+ Add article', onclick: addTo('posts', ['blog', 'posts'], 'posts') }),
          h('button', { class: 'btn small', type: 'button', text: 'Manage', onclick: function () { go('posts'); } })]),
        card('Offers', activeOffers.length ? activeOffers.length + ' offer(s) showing now' : 'No offer showing right now', [
          h('button', { class: 'btn small', type: 'button', text: 'Manage offers', onclick: function () { go('offers'); } })]),
        card('Contact details', (S.content.contact || {}).phoneDisplay || '', [
          h('button', { class: 'btn small', type: 'button', text: 'Edit', onclick: function () { go('contact'); } })]),
        card('Website', 'Open the live website in a new tab.', [
          h('a', { class: 'btn small', href: ROOT, target: '_blank', rel: 'noopener', text: 'Open website ↗' })])
      ));
      main.appendChild(h('p', { class: 'muted small', text: 'How it works: edit anything → tap Preview to check → tap Publish. The live site updates about a minute after publishing.' }));
    },

    homeOrder: function (main) {
      var H = S.content.home;
      var order = (H.sectionOrder || []).slice();
      Object.keys(H).forEach(function (k) { if (H[k] && typeof H[k] === 'object' && 'show' in H[k] && order.indexOf(k) === -1) order.push(k); });
      H.sectionOrder = order;
      main.appendChild(h('p', { class: 'intro', text: 'Change the order of the home-page sections, or hide one. Tap "Edit" to change its text.' }));
      var list = h('div', { class: 'list' });
      order.forEach(function (k, i) {
        var sec = H[k]; if (!sec) return;
        var cb = h('input', { type: 'checkbox', role: 'switch', 'aria-label': 'Show ' + k });
        cb.checked = sec.show !== false;
        cb.addEventListener('change', function () { sec.show = cb.checked; changed(); });
        list.appendChild(h('div', { class: 'order-row' },
          h('label', { class: 'toggle' }, cb),
          h('span', { class: 'name', text: SECTION_NAMES[k] || k }),
          h('button', { class: 'icon-btn', type: 'button', text: '↑', 'aria-label': 'Move up', disabled: i === 0, onclick: function () { order.splice(i - 1, 0, order.splice(i, 1)[0]); changed(); rerender(); } }),
          h('button', { class: 'icon-btn', type: 'button', text: '↓', 'aria-label': 'Move down', disabled: i === order.length - 1, onclick: function () { order.splice(i + 1, 0, order.splice(i, 1)[0]); changed(); rerender(); } }),
          h('button', { class: 'btn small', type: 'button', text: 'Edit', onclick: function () { go('home-' + k); } })));
      });
      main.appendChild(list);
      var box = h('section', { class: 'group-box', style: 'margin-top:24px' }, h('div', { class: 'group-title', text: 'Google search title & description (home page)' }));
      add(box, renderField(['home', 'seo'], H.seo, { top: true }));
      main.appendChild(box);
    },

    icons: function (main) {
      main.appendChild(h('p', { class: 'intro', text: 'Line icons used across the site. Any icon box also accepts an emoji instead. Only change the code if you know SVG — a mistake just shows a blank icon.' }));
      var icons = S.content.icons || (S.content.icons = {});
      var grid = h('div', { class: 'list' });
      Object.keys(icons).forEach(function (name) {
        var prev = h('span', { class: 'ip', html: icoSvg(name) || '' });
        var code = h('textarea', { rows: 2, 'aria-label': 'SVG for ' + name, style: 'font-family:ui-monospace,monospace;font-size:13px' });
        code.value = icons[name];
        code.addEventListener('input', function () { icons[name] = code.value; prev.innerHTML = icoSvg(name) || ''; changed(); });
        grid.appendChild(h('div', { class: 'row-item' },
          h('div', { class: 'icon-field' }, prev, h('b', { text: name }), code),
          h('div', { class: 'tools' }, h('button', { class: 'icon-btn danger', type: 'button', text: '✕', 'aria-label': 'Delete icon', onclick: function () {
            modal('Delete icon "' + name + '"?', 'Places that use it will show nothing.', [{ label: 'Cancel' }, { label: 'Delete', value: 'del', cls: 'danger' }]).then(function (v) { if (v === 'del') { delete icons[name]; changed(); rerender(); } });
          } }))));
      });
      main.appendChild(grid);
      var nm = h('input', { type: 'text', placeholder: 'new-icon-name', style: 'max-width:220px' });
      main.appendChild(h('div', { class: 'icon-field', style: 'margin-top:12px' }, nm, h('button', { class: 'btn small', type: 'button', text: '+ Add icon', onclick: function () {
        var n = slugify(nm.value); if (!n) { toast('Type a name first.', true); return; }
        if (icons[n]) { toast('That name is taken.', true); return; }
        icons[n] = '<circle cx="12" cy="12" r="9"/>'; changed(); rerender();
      } })));
    },

    publishing: function (main) {
      var g = S.content.settings.github;
      var status = h('div', { class: 'notice' + (S.token ? ' ok' : ''), text: S.token ? '✓ A GitHub key is saved on this device (encrypted with your passcode).' : 'No GitHub key saved on this device yet.' });
      main.appendChild(status);

      var repoBox = h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: '1. Where the website lives on GitHub' }),
        h('p', { class: 'help', text: 'These are saved in content.js, so every device knows them after you publish once.' }));
      [['owner', 'GitHub username (owner)', 'e.g. bhanuprakash'], ['repo', 'Repository name', 'e.g. geethanjali-website'], ['branch', 'Branch', 'main']].forEach(function (f) {
        var el = h('input', { type: 'text', placeholder: f[2], autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' });
        el.value = g[f[0]] || '';
        el.addEventListener('input', function () { g[f[0]] = el.value.trim(); store.set(REPO_KEY, JSON.stringify(g)); changed(); });
        repoBox.appendChild(h('div', { class: 'field' }, h('div', { class: 'label', text: f[1] }), el));
      });
      main.appendChild(repoBox);

      var tok = h('input', { type: 'password', placeholder: S.token ? '•••••••• (saved — paste a new one to replace)' : 'github_pat_…', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      var out = h('div', { class: 'progress' });
      var keyBox = h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: '2. GitHub key for this device' }),
        h('p', { class: 'help', html: 'Create a <b>fine-grained personal access token</b> on github.com → Settings → Developer settings. Give it access to <b>only this repository</b>, with <b>Contents: Read and write</b>. Paste it here once — it is encrypted with your passcode and never leaves this device except to talk to GitHub.' }),
        h('div', { class: 'field' }, tok),
        h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px' },
          h('button', { class: 'btn small primary', type: 'button', text: 'Save key', onclick: function () {
            var v = tok.value.trim(); if (!v) { toast('Paste the key first.', true); return; }
            saveToken(v, S.pass).then(function () { S.token = v; S.tokenError = ''; tok.value = ''; toast('Key saved on this device.'); rerender(); });
          } }),
          h('button', { class: 'btn small', type: 'button', text: 'Test connection', onclick: function () {
            out.textContent = 'Checking…';
            testConnection().then(function (m) { out.textContent = '✓ ' + m; out.style.color = 'var(--ok)'; }).catch(function (e) { out.textContent = '✕ ' + e.message; out.style.color = 'var(--danger)'; });
          } }),
          S.token ? h('button', { class: 'btn small danger', type: 'button', text: 'Remove key from this device', onclick: function () { store.del(TOKEN_KEY); S.token = null; toast('Key removed.'); rerender(); } }) : null),
        out);
      main.appendChild(keyBox);

      var cur = h('input', { type: 'password', placeholder: 'Current passcode' });
      var n1 = h('input', { type: 'password', placeholder: 'New passcode' });
      var n2 = h('input', { type: 'password', placeholder: 'New passcode again' });
      var passBox = h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: '3. Change the admin passcode' }),
        h('p', { class: 'help', text: 'After changing it, tap Publish so other devices use the new passcode too.' }),
        h('div', { class: 'field' }, cur), h('div', { class: 'field' }, n1), h('div', { class: 'field' }, n2),
        h('p', null, h('button', { class: 'btn small', type: 'button', text: 'Change passcode', onclick: function () {
          if (cur.value !== S.pass) { toast('The current passcode is not right.', true); return; }
          if (n1.value.length < 4) { toast('Use at least 4 characters.', true); return; }
          if (n1.value !== n2.value) { toast('The new passcodes are different.', true); return; }
          var salt = randomHex(16);
          hashPasscode(salt, n1.value).then(function (hash) {
            S.content.settings.adminPasscode = { salt: salt, hash: hash };
            S.pass = n1.value;
            return S.token ? saveToken(S.token, S.pass) : null;
          }).then(function () { cur.value = n1.value = n2.value = ''; changed(); toast('Passcode changed. Publish to use it everywhere.'); });
        } })));
      main.appendChild(passBox);

      main.appendChild(h('section', { class: 'group-box' }, h('div', { class: 'group-title', text: 'No GitHub key? Use Download instead' }),
        h('ol', { class: 'steps' },
          h('li', { text: 'Tap Download (top of the screen). Safari saves content.js to the Files app → Downloads.' }),
          h('li', { text: 'On github.com open the repository → Add file → Upload files → choose content.js → Commit changes.' }),
          h('li', { text: 'New photos: upload them into the folder assets/images/uploads/ the same way.' }))));
    }
  };

  // ───────────────────────── 13. validation ─────────────────────────
  function ensureIds() {
    var fixed = false;
    function fix(list, titleKey, prefix) {
      var seen = {};
      (list || []).forEach(function (it, i) {
        var id = slugify(it.id || biEn(it[titleKey]) || (typeof it[titleKey] === 'string' ? it[titleKey] : ''));
        if (!id) id = prefix + '-' + today().replace(/-/g, '') + '-' + (i + 1);
        var base = id, n = 2;
        while (seen[id]) id = base + '-' + (n++);
        seen[id] = 1;
        if (it.id !== id) { it.id = id; fixed = true; }
      });
    }
    var P = S.content.portfolio || {};
    fix(P.projects, 'title', 'project');
    fix(P.categories, 'label', 'category');
    fix((S.content.blog || {}).posts, 'title', 'article');
    fix(S.content.offers, 'title', 'offer');
    var cats = (P.categories || []).map(function (c) { return c.id; });
    (P.projects || []).forEach(function (p) { if (cats.length && cats.indexOf(p.category) === -1) { p.category = cats[0]; fixed = true; } });
    if (fixed) { changed(); rerender(); }
  }
  function finalContent() {
    var c = clone(S.content);
    c.meta = c.meta || {};
    c.meta.version = c.meta.version || 1;
    c.meta.lastUpdated = new Date().toISOString().slice(0, 19);
    return c;
  }

  // ───────────────────────── 14. preview / download / publish ─────────────────────────
  function openPreview(rel) {
    ensureIds();
    saveDraft();
    var w = window.open(ROOT + rel, '_blank');
    if (!w) toast('Allow pop-ups to open the preview.', true);
  }
  function preview() { openPreview('?preview=1'); }

  function saveBlob(data, name, type) {
    var blob = data instanceof Blob ? data : new Blob([data], { type: type || 'application/octet-stream' });
    var a = h('a', { href: URL.createObjectURL(blob), download: name });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function dataUrlToBlob(d) { var parts = d.split(','); var mime = (parts[0].match(/data:([^;]+)/) || [])[1] || 'image/jpeg'; return new Blob([bytesFromB64(parts[1])], { type: mime }); }
  function download() {
    ensureIds();
    var text = ContentIO.serialize(finalContent());
    saveBlob(text, 'content.js', 'text/javascript');
    var used = usedPending();
    var body = h('div', null,
      h('p', { html: 'Upload <code>content.js</code> to the <b>main folder</b> of the GitHub repository, replacing the old one.' }));
    if (used.length) {
      body.appendChild(h('p', { html: 'These new photos also need uploading, into <code>assets/images/uploads/</code>:' }));
      used.forEach(function (p) {
        var name = p.split('/').pop();
        body.appendChild(h('div', { class: 'row-item', style: 'margin-bottom:6px' }, h('code', { text: name }),
          h('button', { class: 'btn small', type: 'button', text: '⬇ Download', onclick: function () { saveBlob(dataUrlToBlob(S.images[p]), name); } })));
      });
    }
    modal('content.js downloaded', body, [{ label: 'Done', cls: 'primary' }]);
  }

  // Repo details live in content.js; a copy is also kept on this device so
  // publishing works even before the live content.js has caught up.
  function ghCfg() {
    var g = ((S.content && S.content.settings) || {}).github || {};
    var local = {};
    try { local = JSON.parse(store.get(REPO_KEY) || '{}') || {}; } catch (e) { local = {}; }
    return {
      owner: (g.owner || local.owner || '').trim(),
      repo: (g.repo || local.repo || '').trim(),
      branch: (g.branch || local.branch || 'main').trim() || 'main'
    };
  }
  function ghErrorText(status, data) {
    var msg = (data && data.message) || '';
    if (status === 401) return 'GitHub did not accept the key. It may be mistyped or expired — create a new one and save it again.';
    if (status === 403 && /rate limit/i.test(msg)) return 'GitHub says too many requests. Please wait a few minutes and try again.';
    if (status === 403) return 'The key is not allowed to change this repository. It needs "Contents: Read and write" for this repository.';
    if (status === 404) return 'Not found. Check the GitHub username, repository name and branch — and that the key has access to this repository.';
    if (status === 409) return 'GitHub reported a conflict (two saves at the same moment). Please tap Publish again.';
    return 'GitHub error ' + status + (msg ? ': ' + msg : '');
  }
  function gh(method, url, body) {
    var headers = { 'Accept': 'application/vnd.github+json', 'Authorization': 'Bearer ' + S.token, 'X-GitHub-Api-Version': '2022-11-28' };
    if (body) headers['Content-Type'] = 'application/json';
    return fetch('https://api.github.com' + url, { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' })
      .catch(function () { throw new Error('Could not reach GitHub. Check the internet connection.'); })
      .then(function (r) {
        return r.json().catch(function () { return null; }).then(function (data) {
          if (!r.ok) { var e = new Error(ghErrorText(r.status, data)); e.status = r.status; throw e; }
          return data;
        });
      });
  }
  function contentsUrl(path) {
    var c = ghCfg();
    return '/repos/' + encodeURIComponent(c.owner) + '/' + encodeURIComponent(c.repo) + '/contents/' + path.split('/').map(encodeURIComponent).join('/');
  }
  function ghGetContent() {
    var c = ghCfg();
    return gh('GET', contentsUrl('content.js') + '?ref=' + encodeURIComponent(c.branch)).then(function (d) {
      var text = b64decodeUtf8(d.content || '');
      return { sha: d.sha, text: text, content: ContentIO.parse(text) };
    });
  }
  function ghSha(path) {
    return gh('GET', contentsUrl(path) + '?ref=' + encodeURIComponent(ghCfg().branch)).then(function (d) { return d.sha; })
      .catch(function (e) { if (e.status === 404) return null; throw e; });
  }
  function ghPut(path, b64, message, sha) {
    var body = { message: message, content: b64, branch: ghCfg().branch };
    if (sha) body.sha = sha;
    return gh('PUT', contentsUrl(path), body);
  }
  function testConnection() {
    var c = ghCfg();
    if (!c.owner || !c.repo) return Promise.reject(new Error('Fill in the GitHub username and repository name first.'));
    if (!S.token) return Promise.reject(new Error('Save a GitHub key first.'));
    return gh('GET', '/repos/' + encodeURIComponent(c.owner) + '/' + encodeURIComponent(c.repo)).then(function (repo) {
      if (repo.permissions && repo.permissions.push === false) throw new Error('Connected, but this key can only read — it needs "Contents: Read and write".');
      return ghGetContent().then(function () { return 'Connected to ' + c.owner + '/' + c.repo + ' (' + c.branch + '). content.js found — ready to publish.'; })
        .catch(function (e) { if (e.status === 404) return 'Connected to ' + c.owner + '/' + c.repo + '. content.js is not in the repository yet — the first Publish will create it.'; throw e; });
    });
  }

  function publish() {
    ensureIds();
    var c = ghCfg();
    if (!c.owner || !c.repo || !S.token) {
      modal('Publishing is not set up', 'Add the GitHub details and key under <b>Publishing & security</b> first — or use <b>Download</b> to save content.js.',
        [{ label: 'Close' }, { label: 'Set up publishing', value: 'go', cls: 'primary' }]).then(function (v) { if (v === 'go') go('publishing'); });
      return;
    }
    if (!isDirty()) { toast('Nothing new to publish.'); return; }
    var prog = progressModal('Publishing…');
    var remoteSha = null;
    prog.step('Checking the live website…');
    ghGetContent().then(function (r) {
      remoteSha = r.sha;
      var remoteJSON = stripMeta(r.content);
      if (remoteJSON !== S.baseJSON && remoteJSON !== stripMeta(S.content)) {
        prog.close();
        return modal('The website was changed somewhere else', 'Since you started editing, a different version was saved (from another device, or by Bhanu). Publishing now will <b>replace</b> it with your version.',
          [{ label: 'Cancel' }, { label: 'Publish my version', value: 'go', cls: 'primary' }]).then(function (v) {
          if (v !== 'go') throw new Error('cancelled');
          prog = progressModal('Publishing…');
        });
      }
    }).catch(function (e) {
      if (e.status === 404) { remoteSha = null; return; } // first publish: content.js not in repo yet
      throw e;
    }).then(function () {
      var used = usedPending();
      var chain = Promise.resolve();
      used.forEach(function (p, i) {
        chain = chain.then(function () {
          prog.step('Uploading photo ' + (i + 1) + ' of ' + used.length + '…');
          return ghSha(p).then(function (sha) { return ghPut(p, S.images[p].split(',')[1], 'Add photo ' + p.split('/').pop() + ' (admin)', sha); });
        });
      });
      return chain.then(function () { return used; });
    }).then(function (used) {
      prog.step('Saving website content…');
      var final = finalContent();
      return ghPut('content.js', b64encodeUtf8(ContentIO.serialize(final)), 'Update website content (admin)', remoteSha).then(function () {
        S.content = final;
        S.published = clone(final);
        S.publishedJSON = stripMeta(final);
        S.baseJSON = S.publishedJSON;
        S.images = {};
        store.del(DRAFT_KEY);
        return idb.clear();
      });
    }).then(function () {
      prog.close();
      renderApp();
      return modal('Published! 🎉', 'Your changes are saved. The live website updates in about <b>1–2 minutes</b>. If you still see the old version, refresh the page.',
        [{ label: 'Open website', value: 'open' }, { label: 'OK', cls: 'primary' }]).then(function (v) { if (v === 'open') window.open(ROOT, '_blank'); });
    }).catch(function (e) {
      prog.close();
      if (e && e.message === 'cancelled') return;
      modal('Publishing did not finish', escapeHtml(e.message) + '<br><br>Your changes are still saved on this device.', [{ label: 'OK', cls: 'primary' }]);
    });
  }

  // ───────────────────────── 15. boot ─────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.SITE_CONTENT || !window.ContentIO) {
      document.getElementById('app').innerHTML = '<div class="lock"><div class="lock-card"><h1>Could not load content.js</h1><p>Open this page from the website\'s /admin/ folder.</p></div></div>';
      return;
    }
    showLock();
  });
  window.addEventListener('beforeunload', function (e) {
    if (S.content && isDirty()) saveDraft();
  });
})();
