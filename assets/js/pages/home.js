/* Home page — recreates the original Gamma layout, section by section. */
(function () {
  'use strict';
  var G = window.GDW;

  function sectionAttrs(s, cls) {
    return 'class="section ' + (cls || '') + '"' + (s.id ? ' id="' + G.esc(s.id) + '"' : '');
  }

  var R = {
    hero: function (s) {
      var bg = s.backgroundImage ? ' style="background-image:url(\'' + G.esc(G.src(s.backgroundImage)) + '\')"' : '';
      var imgs = (s.images || []).filter(function (i) { return i && i.src; }).map(function (i) {
        return '<figure data-reveal><img src="' + G.esc(G.src(i.src)) + '" alt="' + G.esc(G.plain(i.alt)) + '" loading="eager"></figure>';
      }).join('');
      return '<section class="hero" id="top"><div class="hero-card' + (s.backgroundImage ? ' has-image' : '') + '"' + bg + '>' +
        '<div class="container">' + G.head({ title: s.title, titleAccent: s.titleAccent, text: s.text }, 'h1') + G.buttons(s.buttons) +
        (imgs ? '<div class="hero-images">' + imgs + '</div>' : '') +
        '</div></div></section>';
    },

    consultation: function (s) {
      var c = G.C.contact || {};
      var methods = (s.methods || []).map(function (m) {
        var val = m.type === 'call' ? c.phoneDisplay : m.type === 'email' ? c.email : m.type === 'whatsapp' ? c.whatsappDisplay : '';
        return '<li>' + G.icon(m.icon) + '<span>' + G.tx(m.label) + ': <a ' + G.attrs({ type: m.type, target: 'general' }) + '>' + G.esc(val) + '</a></span></li>';
      }).join('');
      return '<section ' + sectionAttrs(s) + '><div class="container">' + G.head(s) +
        '<div class="two-col" data-reveal>' +
          '<div class="plum-card"><h3>' + G.tx(s.benefitsTitle) + '</h3><ul>' +
            (s.benefits || []).map(function (b) { return '<li>' + G.tx(b) + '</li>'; }).join('') + '</ul></div>' +
          '<div class="how"><h3>' + G.tx(s.howTitle) + '</h3><ul class="method-list">' + methods + '</ul>' +
            (G.t(s.note) ? '<p>' + G.tx(s.note) + '</p>' : '') + G.buttons([s.button]) + '</div>' +
        '</div></div></section>';
    },

    services: function (s) {
      var items = (s.items || []).map(function (it) {
        return '<div class="service" data-reveal><span class="svc-icon">' + G.icon(it.icon) + '</span><h3>' + G.tx(it.title) + '</h3><p>' + G.tx(it.text) + '</p></div>';
      }).join('');
      return '<section ' + sectionAttrs(s) + '><div class="container">' + G.head(s) + '<div class="service-grid">' + items + '</div></div></section>';
    },

    portfolioPreview: function (s) {
      var P = G.C.portfolio || {};
      var projects = G.visible(P.projects);
      var featured = projects.filter(function (p) { return p.featured; });
      if (!featured.length) featured = projects;
      featured = featured.slice(0, s.maxItems || 3);
      var cards = featured.map(function (p) { return projectCard(p, false); }).join('');
      return '<section ' + sectionAttrs(s, 'band') + '><div class="container-wide"><div class="band-card">' + G.head(s) +
        '<div class="project-grid">' + cards + '</div>' + G.buttons([s.button]) + '</div></div></section>';
    },

    blogPreview: function (s) {
      var B = G.C.blog || {};
      var posts = G.visible(B.posts).slice(0, s.maxItems || 4);
      var items = posts.map(function (p) {
        return '<a class="post-item c-' + G.esc(p.color || 'olive') + '" href="' + G.esc(G.href('blog/post/?id=' + encodeURIComponent(p.id))) + '">' +
          '<h3>' + G.tx(p.title) + '</h3><p>' + G.tx(p.excerpt) + '</p></a>';
      }).join('');
      var art = s.image ? '<img src="' + G.esc(G.src(s.image)) + '" alt="" loading="lazy">' : G.icon('palette');
      return '<section ' + sectionAttrs(s) + '><div class="container-wide"><div class="blog-split">' +
        '<div class="blog-art" data-reveal>' + art + '</div>' +
        '<div>' + G.head(s) + '<div class="post-list">' + items + '</div>' + G.buttons([s.button]) + '</div>' +
        '</div></div></section>';
    },

    testimonials: function (s) {
      var bg = s.backgroundImage ? ' style="background-image:url(\'' + G.esc(G.src(s.backgroundImage)) + '\')"' : '';
      var quotes = (s.items || []).map(function (q) {
        return '<figure class="quote-card' + (q.highlight ? ' highlight' : '') + '" data-reveal><blockquote>' + G.tx(q.quote) + '</blockquote>' +
          '<figcaption class="who"><strong>— ' + G.tx(q.name) + '</strong>' + (G.t(q.role) ? G.tx(q.role) : '') + '</figcaption></figure>';
      }).join('');
      var stats = (s.stats || []).map(function (st) {
        return '<div class="stat" data-reveal><div class="num">' + G.tx(st.value) + '</div><div class="lbl">' + G.tx(st.label) + '</div></div>';
      }).join('');
      return '<section class="section bg-image' + (s.backgroundImage ? '' : ' no-image') + '"' + (s.id ? ' id="' + G.esc(s.id) + '"' : '') + bg + '>' +
        '<div class="container-wide">' + G.head(s) + '<div class="quote-grid">' + quotes + '</div>' +
        (stats ? '<div class="stats">' + stats + '</div>' : '') + '</div></section>';
    },

    about: function (s) {
      var v = s.vision || {}, m = s.mission || {}, tm = s.team || {};
      var members = (tm.members || []).map(function (x) {
        return '<li>' + G.icon(x.icon || 'arrow-right') + '<span>' + G.tx(x.text) + '</span></li>';
      }).join('');
      return '<section ' + sectionAttrs(s) + '><div class="container">' + G.head(s) +
        '<div class="two-col" data-reveal>' +
          '<div class="plum-card"><h3>' + G.tx(v.title) + '</h3><p>' + G.tx(v.text) + '</p><hr><h3>' + G.tx(m.title) + '</h3><p>' + G.tx(m.text) + '</p></div>' +
          '<div class="team"><h3>' + G.tx(tm.title) + '</h3><p>' + G.tx(tm.text) + '</p><ul class="team-list">' + members + '</ul></div>' +
        '</div></div></section>';
    },

    faq: function (s) {
      var items = (s.items || []).map(function (f) {
        return '<div class="faq-item" data-reveal><span class="dot" aria-hidden="true"></span><div><h3>' + G.tx(f.question) + '</h3><p>' + G.tx(f.answer) + '</p></div></div>';
      }).join('');
      return '<section ' + sectionAttrs(s, 'band') + '><div class="container-wide"><div class="band-card">' + G.head(s) +
        '<div class="faq-grid">' + items + '</div></div></div></section>';
    },

    contact: function (s) {
      var cards = (s.cards || []).map(function (c) {
        var inner = '<h3>' + G.icon(c.icon) + '<span>' + G.tx(c.title) + '</span></h3><p>' +
          (c.lines || []).map(G.tx).join('<br>') + '</p>';
        var cls = 'contact-card c-' + G.esc(c.color || 'olive');
        return c.type ? '<a class="' + cls + '" ' + G.attrs({ type: c.type, target: c.type === 'whatsapp' ? 'general' : '' }) + ' data-reveal>' + inner + '</a>'
                      : '<div class="' + cls + '" data-reveal>' + inner + '</div>';
      }).join('');
      var offers = s.showOffers === false ? '' : G.activeOffers().map(offerBox).join('');
      return '<section ' + sectionAttrs(s) + '><div class="container">' + G.head(s) +
        '<div class="contact-grid">' + cards + '</div>' + offers + G.buttons(s.buttons) + '</div></section>';
    },

    legal: function (s) {
      var blocks = (s.blocks || []).map(function (b) {
        return '<div class="legal-card" data-reveal><h3>' + G.tx(b.title) + '</h3><p>' + G.tx(b.text) + '</p>' +
          ((b.points || []).length ? '<ul>' + b.points.map(function (p) { return '<li>' + G.tx(p) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
      }).join('');
      return '<section ' + sectionAttrs(s) + '><div class="container">' + G.head(s) + '<div class="legal-grid">' + blocks + '</div></div></section>';
    }
  };

  function projectCard(p) {
    var P = G.C.portfolio || {};
    var cat = (P.categories || []).filter(function (c) { return c.id === p.category; })[0];
    var cover = p.cover || (p.images && p.images[0] && p.images[0].src);
    return '<a class="project-card" data-reveal href="' + G.esc(G.href('portfolio/project/?id=' + encodeURIComponent(p.id))) + '">' +
      '<div class="thumb">' + (cover ? '<img src="' + G.esc(G.src(cover)) + '" alt="' + G.esc(G.plain(p.title)) + '" loading="lazy">' : '') + '</div>' +
      (cat ? '<span class="chip">' + G.tx(cat.label) + '</span>' : '') +
      '<h3>' + G.tx(p.title) + '</h3><p>' + G.tx(p.summary) + '</p></a>';
  }

  function offerBox(o) {
    var ui = G.C.ui || {};
    var items = (o.items || []).map(function (i) { return '<li>✅ ' + G.tx(i) + '</li>'; }).join('');
    var details = (o.details || []).map(function (d) { return '<p>' + G.tx(d) + '</p>'; }).join('');
    return '<div class="offer-box" data-reveal><span class="note-icon">' + G.icon('note') + '</span><div>' +
      '<h3>' + (o.icon ? G.icon(o.icon) + ' ' : '') + G.tx(o.title) + '</h3>' +
      (G.t(o.price) ? '<p class="price">' + G.tx(o.price) + '</p>' : '') +
      (items ? '<ul>' + items + '</ul>' : '') +
      (details ? '<div class="details">' + details + '</div>' : '') +
      (G.t(o.note) ? '<p class="offer-note">' + G.tx(o.note) + '</p>' : '') +
      (o.endDate ? '<p class="ends">' + G.tx(ui.offerEnds) + ' ' + G.esc(G.formatDate(o.endDate)) + '</p>' : '') +
      (o.poster ? '<div class="poster"><img src="' + G.esc(G.src(o.poster)) + '" alt="' + G.esc(G.plain(o.title)) + '" loading="lazy" data-poster></div>' : '') +
      '</div></div>';
  }

  G.page(function () {
    var H = G.C.home || {};
    G.setMeta(H.seo);
    var order = H.sectionOrder && H.sectionOrder.length ? H.sectionOrder : Object.keys(R);
    var html = order.map(function (key) {
      var s = H[key];
      if (!s || s.show === false || !R[key]) return '';
      try { return R[key](s); } catch (e) { console.error('Section ' + key + ' failed:', e); return ''; }
    }).join('');
    var main = document.getElementById('main');
    main.innerHTML = html;
    main.querySelectorAll('img[data-poster]').forEach(function (img) {
      img.addEventListener('click', function () { G.openLightbox([{ src: img.src, alt: img.alt }], 0); });
    });
  });
})();
