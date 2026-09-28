/* One portfolio project — opened as portfolio/project/?id=<project id> */
(function () {
  'use strict';
  var G = window.GDW;

  G.page(function () {
    var P = G.C.portfolio || {};
    var ui = G.C.ui || {};
    var list = G.visible(P.projects);
    var id = G.params.get('id');
    var idx = -1;
    list.forEach(function (p, i) { if (p.id === id) idx = i; });
    var main = document.getElementById('main');

    if (idx === -1) {
      document.title = G.plain(ui.notFoundTitle);
      main.innerHTML = '<section class="section not-found"><div class="container"><p class="big">404</p><h1 class="title">' + G.tx(ui.notFoundTitle) + '</h1>' +
        '<p class="lead">' + G.tx(ui.notFoundText) + '</p><div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="' + G.esc(G.href('portfolio/')) + '">' + G.tx(ui.backToPortfolio) + '</a></div></div></section>';
      return;
    }

    var p = list[idx];
    var cat = (P.categories || []).filter(function (c) { return c.id === p.category; })[0];
    var images = (p.images || []).filter(function (i) { return i && i.src; });
    if (!images.length && p.cover) images = [{ src: p.cover }];
    var items = images.map(function (i) { return { src: G.src(i.src), alt: G.plain(p.title), caption: G.plain(i.caption) }; });
    G.setMeta({ title: { te: G.plain(p.title) + ' — ' + G.plain(G.C.settings.siteName), en: G.plain(p.title) + ' — ' + G.plain(G.C.settings.siteName) }, description: p.summary });

    var thumbs = items.length > 1 ? '<div class="gallery-thumbs">' + items.map(function (it, i) {
      return '<button type="button" data-i="' + i + '" aria-current="' + (i === 0) + '" aria-label="' + G.esc(G.plain(ui.next)) + ' ' + (i + 1) + '"><img src="' + G.esc(it.src) + '" alt="" loading="lazy"></button>';
    }).join('') + '</div>' : '';

    var facts = '<div class="facts"><dl>' +
      (G.t(p.client) ? '<dt>' + G.tx(ui.client) + '</dt><dd>' + G.tx(p.client) + '</dd>' : '') +
      (cat ? '<dt>' + G.tx(ui.category) + '</dt><dd>' + G.tx(cat.label) + '</dd>' : '') +
      (p.date ? '<dt>' + G.tx(ui.date) + '</dt><dd>' + G.esc(G.formatDate(p.date)) + '</dd>' : '') +
      '</dl>' + (p.link ? '<div class="btn-row"><a class="btn btn-outline" href="' + G.esc(p.link) + '" target="_blank" rel="noopener">' + G.tx(ui.visitSite) + G.icon('external') + '</a></div>' : '') + '</div>';

    var prev = list[idx - 1], next = list[idx + 1];
    var pn = '<nav class="prev-next">' +
      (prev ? '<a href="' + G.esc(G.href('portfolio/project/?id=' + encodeURIComponent(prev.id))) + '"><span class="dir">' + G.icon('arrow-left') + G.tx(ui.previous) + '</span>' + G.tx(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="next" href="' + G.esc(G.href('portfolio/project/?id=' + encodeURIComponent(next.id))) + '"><span class="dir">' + G.tx(ui.next) + G.icon('arrow-right') + '</span>' + G.tx(next.title) + '</a>' : '') +
      '</nav>';

    var cta = P.cta || {};
    main.innerHTML =
      '<section class="section"><div class="container-wide">' +
        '<a class="back-link" href="' + G.esc(G.href('portfolio/')) + '">' + G.icon('arrow-left') + G.tx(ui.backToPortfolio) + '</a>' +
        '<div class="detail-head">' + (cat ? '<span class="badge">' + G.tx(cat.label) + '</span>' : '') +
          '<h1 class="title">' + G.tx(p.title) + '</h1>' + (G.t(p.summary) ? '<p class="lead">' + G.tx(p.summary) + '</p>' : '') + '</div>' +
        '<div class="detail-grid">' +
          '<div>' + (items.length ? '<div class="gallery-main" role="button" tabindex="0"><img id="main-img" src="' + G.esc(items[0].src) + '" alt="' + G.esc(items[0].alt) + '"></div>' +
            '<p class="caption" id="main-cap">' + G.esc(items[0].caption) + '</p>' + thumbs : '') + '</div>' +
          '<div>' + facts + '<div class="prose" style="margin-top:22px">' + G.rich(p.description) + '</div></div>' +
        '</div>' + pn +
      '</div></section>' +
      (G.t(cta.title) ? '<section class="section band"><div class="container"><div class="band-card cta-card">' +
        G.head({ title: cta.title, text: cta.text }) + G.buttons([cta.button]) + '</div></div></section>' : '');

    var cur = 0;
    function show(i) {
      cur = i;
      document.getElementById('main-img').src = items[i].src;
      document.getElementById('main-cap').textContent = items[i].caption || '';
      main.querySelectorAll('.gallery-thumbs button').forEach(function (b) { b.setAttribute('aria-current', String(+b.getAttribute('data-i') === i)); });
    }
    main.querySelectorAll('.gallery-thumbs button').forEach(function (b) {
      b.addEventListener('click', function () { show(+b.getAttribute('data-i')); });
    });
    var gm = main.querySelector('.gallery-main');
    if (gm) {
      gm.addEventListener('click', function () { G.openLightbox(items, cur); });
      gm.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); G.openLightbox(items, cur); } });
    }
  });
})();
