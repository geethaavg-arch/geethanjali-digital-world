/* Portfolio gallery — category filters + masonry grid of projects. */
(function () {
  'use strict';
  var G = window.GDW;
  var current = G.params.get('category') || 'all';

  function card(p, cats) {
    var cat = cats.filter(function (c) { return c.id === p.category; })[0];
    var cover = p.cover || (p.images && p.images[0] && p.images[0].src);
    return '<a class="project-card" data-reveal href="' + G.esc(G.href('portfolio/project/?id=' + encodeURIComponent(p.id))) + '">' +
      '<div class="thumb">' + (cover ? '<img src="' + G.esc(G.src(cover)) + '" alt="' + G.esc(G.plain(p.title)) + '" loading="lazy">' : '') + '</div>' +
      (cat ? '<span class="chip">' + G.tx(cat.label) + '</span>' : '') +
      '<h3>' + G.tx(p.title) + '</h3>' + (G.t(p.client) ? '<p>' + G.tx(p.client) + '</p>' : '') + '</a>';
  }

  function grid() {
    var P = G.C.portfolio || {};
    var cats = P.categories || [];
    var list = G.visible(P.projects).filter(function (p) { return current === 'all' || p.category === current; });
    var el = document.getElementById('portfolio-grid');
    el.innerHTML = list.length ? list.map(function (p) { return card(p, cats); }).join('')
                               : '<p class="empty">' + G.tx(G.C.ui && G.C.ui.noProjects) + '</p>';
  }

  G.page(function () {
    var P = G.C.portfolio || {};
    var ui = G.C.ui || {};
    G.setMeta(P.seo);
    var cats = (P.categories || []).filter(function (c) {
      return G.visible(P.projects).some(function (p) { return p.category === c.id; });
    });
    if (current !== 'all' && !cats.some(function (c) { return c.id === current; })) current = 'all';
    var filters = '<div class="filters" role="group">' +
      '<button class="filter" type="button" data-cat="all" aria-pressed="' + (current === 'all') + '">' + G.tx(ui.allCategories) + '</button>' +
      cats.map(function (c) {
        return '<button class="filter" type="button" data-cat="' + G.esc(c.id) + '" aria-pressed="' + (current === c.id) + '">' + G.tx(c.label) + '</button>';
      }).join('') + '</div>';
    var cta = P.cta || {};
    document.getElementById('main').innerHTML =
      '<section class="section"><div class="container-wide">' + G.head(P.page, 'h1') + filters +
      '<div class="masonry" id="portfolio-grid"></div></div></section>' +
      (G.t(cta.title) ? '<section class="section band"><div class="container"><div class="band-card cta-card">' +
        G.head({ title: cta.title, text: cta.text }) + G.buttons([cta.button]) + '</div></div></section>' : '');
    grid();
    document.querySelectorAll('.filter').forEach(function (b) {
      b.addEventListener('click', function () {
        current = b.getAttribute('data-cat');
        document.querySelectorAll('.filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        grid();
        try {
          var u = new URL(location.href);
          if (current === 'all') u.searchParams.delete('category'); else u.searchParams.set('category', current);
          history.replaceState(null, '', u.toString());
        } catch (e) { /* file:// or old browser */ }
      });
    });
  });
})();
