/* One blog article — opened as blog/post/?id=<post id> */
(function () {
  'use strict';
  var G = window.GDW;

  G.page(function () {
    var B = G.C.blog || {};
    var ui = G.C.ui || {};
    var posts = G.visible(B.posts);
    var id = G.params.get('id');
    var p = posts.filter(function (x) { return x.id === id; })[0];
    var main = document.getElementById('main');

    if (!p) {
      document.title = G.plain(ui.notFoundTitle);
      main.innerHTML = '<section class="section not-found"><div class="container"><p class="big">404</p><h1 class="title">' + G.tx(ui.notFoundTitle) + '</h1>' +
        '<p class="lead">' + G.tx(ui.notFoundText) + '</p><div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="' + G.esc(G.href('blog/')) + '">' + G.tx(ui.backToBlog) + '</a></div></div></section>';
      return;
    }

    var siteName = G.plain(G.C.settings.siteName);
    G.setMeta({ title: { te: G.plain(p.title) + ' — ' + siteName, en: G.plain(p.title) + ' — ' + siteName }, description: p.excerpt });
    var cover = p.cover ? '<img src="' + G.esc(G.src(p.cover)) + '" alt="">' : G.icon(p.icon || 'sparkle');
    var others = posts.filter(function (x) { return x.id !== p.id; }).slice(0, 3).map(function (o) {
      return '<a class="post-item c-' + G.esc(o.color || 'olive') + '" href="' + G.esc(G.href('blog/post/?id=' + encodeURIComponent(o.id))) + '"><h3>' + G.tx(o.title) + '</h3><p>' + G.tx(o.excerpt) + '</p></a>';
    }).join('');
    var cta = B.cta || {};

    main.innerHTML =
      '<section class="section"><div class="container"><article class="article">' +
        '<a class="back-link" href="' + G.esc(G.href('blog/')) + '">' + G.icon('arrow-left') + G.tx(ui.backToBlog) + '</a>' +
        '<div class="post-cover c-' + G.esc(p.color || 'olive') + '">' + cover + '</div>' +
        '<header class="detail-head"><h1 class="title">' + G.tx(p.title) + '</h1>' +
          '<div class="meta">' + (G.t(B.author) ? '<span>' + G.icon('user') + G.tx(B.author) + '</span>' : '') +
          '<span>' + G.icon('calendar') + G.esc(G.formatDate(p.date)) + '</span>' +
          '<span>' + G.icon('clock') + G.readingMinutes(p.body) + ' ' + G.tx(ui.minRead) + '</span></div></header>' +
        '<div class="prose">' + G.rich(p.body) + '</div>' +
      '</article></div></section>' +
      (G.t(cta.title) ? '<section class="section band"><div class="container"><div class="band-card cta-card">' +
        G.head({ title: cta.title, text: cta.text }) + G.buttons([cta.button]) + '</div></div></section>' : '') +
      (others ? '<section class="section"><div class="container"><div class="article"><h2 class="title" style="font-size:1.6rem">' + G.tx(ui.morePosts) + '</h2><div class="post-list">' + others + '</div></div></div></section>' : '');
  });
})();
