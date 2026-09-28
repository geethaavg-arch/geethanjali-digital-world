/* =====================================================================
   Geethanjali Digital World — shared site runtime
   Reads window.SITE_CONTENT (content.js), handles language + theme,
   renders the header and footer, and gives page scripts small helpers.
   No build step, no framework — plain browser JavaScript.
   ===================================================================== */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var ROOT = docEl.getAttribute('data-root') || './';
  var PAGE = docEl.getAttribute('data-page') || 'home';
  var params = new URLSearchParams(location.search);
  var IS_FILE = location.protocol === 'file:';
  var IS_PREVIEW = params.has('preview');

  // ---------- safe storage (private mode / blocked storage never breaks the page)
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ---------- content (preview mode swaps in the admin's unsaved draft)
  var C = window.SITE_CONTENT;
  if (IS_PREVIEW) {
    try {
      var draft = JSON.parse(store.get('gdw_admin_draft') || 'null');
      if (draft && draft.content) C = draft.content;
    } catch (e) { /* use published content */ }
  }
  if (!C) {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.innerHTML = '<p class="noscript">content.js could not be loaded.</p>';
    });
    return;
  }
  var pendingImages = {}; // preview only: images picked in admin, not yet published

  // ---------- language
  var lang = params.get('lang') || store.get('gdw_lang') || (C.settings && C.settings.defaultLanguage) || 'te';
  if (lang !== 'te' && lang !== 'en') lang = 'te';

  // ---------- theme (applied immediately to avoid a flash)
  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function currentTheme() {
    var saved = store.get('gdw_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    var def = C.settings && C.settings.defaultTheme;
    return def === 'light' || def === 'dark' ? def : systemTheme();
  }
  docEl.setAttribute('data-theme', currentTheme());
  docEl.setAttribute('lang', lang);

  // ---------- fonts (Brygada 1918 for Latin; Telugu font chosen in settings)
  var TELUGU_FONTS = {
    'Noto Serif Telugu': 'Noto+Serif+Telugu:wght@400;500;600;700',
    'Tiro Telugu': 'Tiro+Telugu:ital@0;1',
    'Hind Guntur': 'Hind+Guntur:wght@400;500;600;700',
    'Anek Telugu': 'Anek+Telugu:wght@400;500;600;700',
    'Mandali': 'Mandali',
    'Ramaraja': 'Ramaraja',
    'NTR': 'NTR'
  };
  (function loadFonts() {
    var tf = (C.settings && C.settings.teluguFont) || 'Noto Serif Telugu';
    var fam = TELUGU_FONTS[tf] || encodeURIComponent(tf).replace(/%20/g, '+');
    var href = 'https://fonts.googleapis.com/css2?family=Brygada+1918:ital,wght@0,400;0,500;0,600;0,700;1,400&family=' + fam + '&display=swap';
    var pre = document.createElement('link'); pre.rel = 'preconnect'; pre.href = 'https://fonts.gstatic.com'; pre.crossOrigin = '';
    var link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href;
    document.head.appendChild(pre); document.head.appendChild(link);
    docEl.style.setProperty('--font-body', '"Brygada 1918", "' + tf + '", "Noto Serif Telugu", Georgia, serif');
  })();

  // ---------- text helpers
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // pick the current language from { te, en } (falls back to the other language)
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (typeof v === 'object') {
      var other = lang === 'te' ? 'en' : 'te';
      return v[lang] != null && v[lang] !== '' ? String(v[lang]) : (v[other] != null ? String(v[other]) : '');
    }
    return '';
  }
  function tokens(s) {
    var c = C.contact || {};
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      switch (k) {
        case 'year': return String(new Date().getFullYear());
        case 'siteName': return t(C.settings && C.settings.siteName);
        case 'phone': return c.phoneDisplay || c.phone || '';
        case 'whatsapp': return c.whatsappDisplay || c.whatsapp || '';
        case 'email': return c.email || '';
        case 'website': return c.website || '';
        case 'address': return t(c.address);
        default: return m;
      }
    });
  }
  // translated + tokens + escaped + line breaks → safe HTML
  function tx(v) { return esc(tokens(t(v))).replace(/\n/g, '<br>'); }
  function plain(v) { return tokens(t(v)); }

  // tiny formatter for long text: ## heading, ### subheading, - bullets, 1. numbers, **bold**, [text](url)
  function rich(v) {
    var src = esc(tokens(t(v))).replace(/\r/g, '');
    var blocks = src.split(/\n{2,}/);
    function inline(s) {
      return s
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\n/g, '<br>');
    }
    return blocks.map(function (b) {
      var lines = b.split('\n');
      if (/^###\s/.test(b)) return '<h3>' + inline(b.replace(/^###\s+/, '')) + '</h3>';
      if (/^##\s/.test(lines[0])) {
        var h = '<h2>' + inline(lines[0].replace(/^##\s+/, '')) + '</h2>';
        var rest = lines.slice(1).join('\n');
        return rest ? h + blockHtml(rest) : h;
      }
      return blockHtml(b);
      function blockHtml(x) {
        var ls = x.split('\n');
        if (ls.every(function (l) { return /^[-•]\s/.test(l); })) {
          return '<ul>' + ls.map(function (l) { return '<li>' + inline(l.replace(/^[-•]\s+/, '')) + '</li>'; }).join('') + '</ul>';
        }
        if (ls.every(function (l) { return /^\d+[.)]\s/.test(l); })) {
          return '<ol>' + ls.map(function (l) { return '<li>' + inline(l.replace(/^\d+[.)]\s+/, '')) + '</li>'; }).join('') + '</ol>';
        }
        return '<p>' + inline(x) + '</p>';
      }
    }).join('');
  }

  // ---------- icons: a name from the icon library, or any emoji/text
  function icon(name, extraClass) {
    if (!name) return '';
    var lib = C.icons || {};
    if (lib[name]) {
      return '<span class="icon ' + (extraClass || '') + '" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + lib[name] + '</svg></span>';
    }
    return '<span class="emoji ' + (extraClass || '') + '" aria-hidden="true">' + esc(name) + '</span>';
  }

  // ---------- links & images
  function withQuery(path) {
    if (!IS_PREVIEW) return path;
    return path + (path.indexOf('?') === -1 ? '?' : '&') + 'preview=1';
  }
  function href(target) {
    target = String(target || '');
    if (!target) return '#';
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(target)) return target;
    var hash = '';
    var hi = target.indexOf('#');
    if (hi !== -1) { hash = target.slice(hi); target = target.slice(0, hi); }
    if (!target) {
      if (PAGE === 'home') return hash;
      target = '';
    }
    var q = '';
    var qi = target.indexOf('?');
    if (qi !== -1) { q = target.slice(qi); target = target.slice(0, qi); }
    if (IS_FILE && (target === '' || /\/$/.test(target))) target += 'index.html';
    var path = ROOT + target + q;
    if (path.indexOf('./') === 0 && path.length > 2) path = path.slice(2);
    if (path === './' && !IS_PREVIEW) return path + hash;
    return withQuery(path) + hash;
  }
  function src(path) {
    if (!path) return '';
    if (pendingImages[path]) return pendingImages[path];
    if (/^(https?:|data:|blob:)/i.test(path)) return path;
    return ROOT + path;
  }
  function waLink(key) {
    var c = C.contact || {};
    var msgs = c.whatsappMessages || {};
    var msg = msgs[key] ? plain(msgs[key]) : (key ? tokens(String(key)) : '');
    return 'https://wa.me/' + String(c.whatsapp || '').replace(/\D/g, '') + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }
  // an action = { type, target } → { href, external }
  function action(a) {
    var c = C.contact || {};
    switch (a && a.type) {
      case 'whatsapp': return { href: waLink(a.target), external: true };
      case 'call': return { href: 'tel:' + String(c.phone || '').replace(/[^\d+]/g, ''), external: false };
      case 'email': return { href: 'mailto:' + (c.email || ''), external: false };
      case 'map': return { href: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(a.target || c.mapQuery || plain(c.address)), external: true };
      case 'url': return { href: a.target || '#', external: true };
      default: return { href: href(a && a.target), external: false };
    }
  }
  function attrs(a) {
    var r = action(a);
    return 'href="' + esc(r.href) + '"' + (r.external ? ' target="_blank" rel="noopener"' : '');
  }
  function button(b) {
    if (!b || !t(b.label)) return '';
    var ic = b.type === 'whatsapp' ? icon('whatsapp') : '';
    return '<a class="btn ' + (b.style === 'outline' ? 'btn-outline' : 'btn-primary') + '" ' + attrs(b) + '>' + ic + '<span>' + tx(b.label) + '</span></a>';
  }
  function buttons(list) {
    list = (list || []).filter(function (b) { return b && t(b.label); });
    return list.length ? '<div class="btn-row">' + list.map(button).join('') + '</div>' : '';
  }
  // standard section heading: badge, two-tone title, lead text
  function head(s, level) {
    if (!s) return '';
    var tag = level || 'h2';
    var h = '';
    if (t(s.badge)) h += '<span class="badge">' + (s.badgeIcon ? icon(s.badgeIcon) : '') + tx(s.badge) + '</span>';
    if (t(s.title) || t(s.titleAccent)) {
      h += '<' + tag + ' class="title">' + tx(s.title) + (t(s.titleAccent) ? ' <span class="accent">' + tx(s.titleAccent) + '</span>' : '') + '</' + tag + '>';
    }
    if (t(s.text)) h += '<p class="lead">' + tx(s.text) + '</p>';
    return '<div class="section-head">' + h + '</div>';
  }
  function formatDate(d) {
    if (!d) return '';
    var parts = String(d).split('-');
    try {
      var dt = new Date(Date.UTC(+parts[0], parts[1] ? +parts[1] - 1 : 0, parts[2] ? +parts[2] : 1));
      var opts = parts.length >= 3 ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' } : { month: 'long', year: 'numeric', timeZone: 'UTC' };
      return new Intl.DateTimeFormat(lang === 'te' ? 'te-IN' : 'en-IN', opts).format(dt);
    } catch (e) { return d; }
  }
  function todayISO() {
    var n = new Date();
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }
  function activeOffers() {
    var today = todayISO();
    return (C.offers || []).filter(function (o) {
      if (!o || !o.enabled) return false;
      if (o.startDate && today < o.startDate) return false;
      if (o.endDate && today > o.endDate) return false;
      return true;
    });
  }
  function visible(list) { return (list || []).filter(function (x) { return x && x.show !== false; }); }
  function readingMinutes(v) {
    var words = t(v).split(/\s+/).filter(Boolean).length;
    // Telugu words are longer, so fewer words per minute
    return Math.max(1, Math.round(words / (lang === 'te' ? 100 : 180)));
  }
  function setMeta(seo) {
    var title = seo && t(seo.title);
    if (title) document.title = tokens(title);
    var desc = seo && t(seo.description);
    if (desc) {
      var m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.setAttribute('content', tokens(desc));
    }
  }

  // ---------- header
  function isCurrent(target) {
    var clean = String(target || '').replace(/[#?].*$/, '').replace(/\/$/, '');
    if (!clean) return false;
    return (PAGE === 'portfolio' || PAGE === 'project') ? clean === 'portfolio' : (PAGE === 'blog' || PAGE === 'post') ? clean === 'blog' : false;
  }
  function renderHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    var s = C.settings || {};
    var ui = C.ui || {};
    var theme = docEl.getAttribute('data-theme');
    var navHtml = (C.nav || []).map(function (n) {
      return '<li><a href="' + esc(href(n.target)) + '"' + (isCurrent(n.target) ? ' aria-current="page"' : '') + '>' + tx(n.label) + '</a></li>';
    }).join('');
    el.className = 'site-header';
    el.innerHTML =
      '<a class="skip-link" href="#main">' + tx(ui.skipToContent) + '</a>' +
      '<div class="container-wide header-inner">' +
        '<a class="brand" href="' + esc(href('')) + '">' +
          (s.logo ? '<img src="' + esc(src(s.logo)) + '" alt="" width="42" height="42">' : '') +
          '<span>' + tx(s.siteName) + '</span></a>' +
        '<nav class="main-nav" id="main-nav" aria-label="' + esc(plain(ui.menu)) + '"><ul>' + navHtml + '</ul></nav>' +
        '<div class="header-tools">' +
          '<button class="tool-btn lang-btn" type="button" aria-label="' + esc(plain(ui.languageButtonLabel)) + '">' + icon('globe') + '<span>' + tx(ui.languageButton) + '</span></button>' +
          '<button class="tool-btn theme-btn" type="button" aria-label="' + esc(plain(theme === 'dark' ? ui.themeToLight : ui.themeToDark)) + '" title="' + esc(plain(theme === 'dark' ? ui.themeToLight : ui.themeToDark)) + '">' + icon(theme === 'dark' ? 'sun' : 'moon') + '</button>' +
          '<button class="tool-btn menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="' + esc(plain(ui.menu)) + '">' + icon('menu') + '</button>' +
        '</div>' +
      '</div>';

    el.querySelector('.lang-btn').addEventListener('click', function () {
      setLanguage(lang === 'te' ? 'en' : 'te');
    });
    el.querySelector('.theme-btn').addEventListener('click', function () {
      var next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      docEl.setAttribute('data-theme', next);
      store.set('gdw_theme', next);
      renderHeader();
    });
    var menuBtn = el.querySelector('.menu-btn');
    var nav = el.querySelector('.main-nav');
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.innerHTML = icon(open ? 'close' : 'menu');
      menuBtn.setAttribute('aria-label', plain(open ? ui.closeMenu : ui.menu));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.innerHTML = icon('menu'); }
    });
  }

  // ---------- footer
  function socialHtml() {
    var links = (C.social || []).filter(function (s) { return s && s.url; });
    if (!links.length) return '';
    return '<div class="social" aria-label="' + esc(plain(C.ui && C.ui.followUs)) + '">' + links.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '">' + icon(s.icon || s.name) + '</a>';
    }).join('') + '</div>';
  }
  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var f = C.footer || {};
    var nav = f.showMenu === false ? '' : '<ul class="footer-nav">' + (C.nav || []).map(function (n) {
      return '<li><a href="' + esc(href(n.target)) + '">' + tx(n.label) + '</a></li>';
    }).join('') + '</ul>';
    el.className = 'site-footer';
    el.innerHTML = '<div class="container-wide footer-inner">' + nav + (f.showSocial === false ? '' : socialHtml()) +
      '<p class="footer-copy">' + tx(f.text) + '</p></div>';
  }

  // ---------- lightbox (used by project page and offer poster)
  var lb = null, lbItems = [], lbIndex = 0;
  function openLightbox(items, index) {
    lbItems = items; lbIndex = index || 0;
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.innerHTML = '<img alt=""><p class="lb-caption"></p>' +
        '<button class="lb-close" type="button"></button><button class="lb-prev" type="button"></button><button class="lb-next" type="button"></button>';
      document.body.appendChild(lb);
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
      lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
      lb.querySelector('.lb-prev').addEventListener('click', function () { stepLightbox(-1); });
      lb.querySelector('.lb-next').addEventListener('click', function () { stepLightbox(1); });
      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
      });
      var sx = null;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (sx == null) return;
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
        sx = null;
      });
    }
    var ui = C.ui || {};
    lb.querySelector('.lb-close').innerHTML = icon('close'); lb.querySelector('.lb-close').setAttribute('aria-label', plain(ui.close));
    lb.querySelector('.lb-prev').innerHTML = icon('chevron-left'); lb.querySelector('.lb-prev').setAttribute('aria-label', plain(ui.previous));
    lb.querySelector('.lb-next').innerHTML = icon('chevron-right'); lb.querySelector('.lb-next').setAttribute('aria-label', plain(ui.next));
    showLightbox();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function showLightbox() {
    var it = lbItems[lbIndex] || {};
    var img = lb.querySelector('img');
    img.src = it.src; img.alt = it.alt || '';
    lb.querySelector('.lb-caption').textContent = it.caption || '';
    var multi = lbItems.length > 1;
    lb.querySelector('.lb-prev').style.display = multi ? '' : 'none';
    lb.querySelector('.lb-next').style.display = multi ? '' : 'none';
  }
  function stepLightbox(d) { if (lbItems.length < 2) return; lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLightbox(); }
  function closeLightbox() { if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } }

  // ---------- reveal-on-scroll
  function reveal(root) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    (root || document).querySelectorAll('[data-reveal]').forEach(function (n) {
      n.classList.add('reveal'); io.observe(n);
    });
  }

  // ---------- analytics (GoatCounter — only on the live site)
  function analytics() {
    var code = C.settings && C.settings.goatcounterCode;
    if (!code || IS_PREVIEW || IS_FILE || PAGE === 'admin') return;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + String(code).replace(/[^\w-]/g, '') + '.goatcounter.com/count');
    document.body.appendChild(s);
  }

  // ---------- page lifecycle
  var pageRender = null;
  function renderAll() {
    docEl.setAttribute('lang', lang);
    renderHeader();
    renderFooter();
    if (pageRender) pageRender();
    reveal();
  }
  function setLanguage(l) {
    lang = l;
    store.set('gdw_lang', l);
    var y = window.scrollY;
    renderAll();
    window.scrollTo(0, y);
  }
  function favicon() {
    var s = C.settings || {};
    if (s.favicon) {
      var l = document.querySelector('link[rel="icon"]') || document.createElement('link');
      l.rel = 'icon'; l.href = src(s.favicon); document.head.appendChild(l);
    }
    if (s.appleTouchIcon) {
      var a = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement('link');
      a.rel = 'apple-touch-icon'; a.href = src(s.appleTouchIcon); document.head.appendChild(a);
    }
  }
  function previewBar() {
    if (!IS_PREVIEW) return;
    var b = document.createElement('div');
    b.className = 'preview-banner';
    b.textContent = plain(C.ui && C.ui.previewBanner) || 'Preview';
    document.body.insertBefore(b, document.body.firstChild);
  }
  // In preview, images picked in the admin live in IndexedDB until published.
  function loadPendingImages() {
    return new Promise(function (resolve) {
      if (!IS_PREVIEW || !window.indexedDB) return resolve();
      try {
        var req = indexedDB.open('gdw-admin', 1);
        req.onupgradeneeded = function () { req.result.createObjectStore('images'); };
        req.onerror = function () { resolve(); };
        req.onsuccess = function () {
          try {
            var db = req.result;
            var tx = db.transaction('images', 'readonly');
            var os = tx.objectStore('images');
            var cur = os.openCursor();
            cur.onsuccess = function () {
              var c = cur.result;
              if (c) { pendingImages[c.key] = c.value; c.continue(); } else resolve();
            };
            cur.onerror = function () { resolve(); };
          } catch (e) { resolve(); }
        };
      } catch (e) { resolve(); }
    });
  }

  // follow the device theme live, unless the visitor picked one
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      if (store.get('gdw_theme')) return;
      docEl.setAttribute('data-theme', currentTheme());
      renderHeader();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  window.GDW = {
    get C() { return C; },
    get lang() { return lang; },
    ROOT: ROOT, PAGE: PAGE, params: params, isPreview: IS_PREVIEW,
    t: t, tx: tx, plain: plain, rich: rich, esc: esc, icon: icon, href: href, src: src,
    action: action, attrs: attrs, button: button, buttons: buttons, head: head,
    formatDate: formatDate, activeOffers: activeOffers, visible: visible,
    readingMinutes: readingMinutes, setMeta: setMeta, openLightbox: openLightbox,
    // page scripts call GDW.page(fn); fn runs now and again after a language change
    page: function (fn) { pageRender = fn; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    loadPendingImages().then(function () {
      favicon();
      previewBar();
      renderAll();
      analytics();
      // honour #hash links after content is rendered
      if (location.hash) {
        var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) setTimeout(function () { target.scrollIntoView(); }, 30);
      }
    });
  });
})();
