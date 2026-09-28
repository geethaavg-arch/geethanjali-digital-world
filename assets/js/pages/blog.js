/* Blog list page. */
(function () {
  'use strict';
  var G = window.GDW;

  G.page(function () {
    var B = G.C.blog || {};
    var ui = G.C.ui || {};
    G.setMeta(B.seo);
    var posts = G.visible(B.posts);
    var cards = posts.map(function (p) {
      var cover = p.cover ? '<img src="' + G.esc(G.src(p.cover)) + '" alt="" loading="lazy">' : G.icon(p.icon || 'sparkle');
      return '<a class="post-card c-' + G.esc(p.color || 'olive') + '" data-reveal href="' + G.esc(G.href('blog/post/?id=' + encodeURIComponent(p.id))) + '">' +
        '<div class="cover">' + cover + '</div><div class="body">' +
        '<div class="meta"><span>' + G.icon('calendar') + G.esc(G.formatDate(p.date)) + '</span><span>' + G.icon('clock') + G.readingMinutes(p.body) + ' ' + G.tx(ui.minRead) + '</span></div>' +
        '<h2>' + G.tx(p.title) + '</h2><p>' + G.tx(p.excerpt) + '</p></div></a>';
    }).join('');
    document.getElementById('main').innerHTML =
      '<section class="section"><div class="container-wide">' + G.head(B.page, 'h1') +
      (cards ? '<div class="post-grid">' + cards + '</div>' : '<p class="empty">' + G.tx(ui.noPosts) + '</p>') +
      '</div></section>';
  });
})();
