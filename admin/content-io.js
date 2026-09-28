/* ContentIO — reads and writes content.js in a stable, readable format.
   Used by the admin panel (and by the one-time build script). */
(function (root) {
  'use strict';

  // Top-level sections, in the order they are written to content.js,
  // with the comment that appears above each one.
  var SECTIONS = [
    ['meta',      'META — managed automatically by the admin panel'],
    ['settings',  'SITE SETTINGS — name, logo, default language/theme, fonts, analytics, publishing'],
    ['contact',   'CONTACT DETAILS — used everywhere via tokens like {phone} and {email}'],
    ['social',    'SOCIAL LINKS — leave url empty to hide a link'],
    ['nav',       'HEADER MENU — "#id" jumps to a home-page section, "folder/" opens a page'],
    ['ui',        'SMALL LABELS — buttons, toggles and messages used across the site'],
    ['home',      'HOME PAGE — every section of the home page, top to bottom'],
    ['offers',    'OFFERS — festival / seasonal offers (switch on, set dates, they hide after the end date)'],
    ['portfolio', 'PORTFOLIO — page text, categories and projects'],
    ['blog',      'BLOG — page text and articles (body uses simple formatting: ## heading, - bullet, **bold**)'],
    ['footer',    'FOOTER'],
    ['icons',     'ICON LIBRARY — SVG shapes referenced by name elsewhere (e.g. "icon": "phone"). Emoji also work.']
  ];

  var HEADER = [
    '/* =====================================================================',
    '   GEETHANJALI DIGITAL WORLD — WEBSITE CONTENT',
    '   ---------------------------------------------------------------------',
    '   Every word, link, image path and icon on the website lives in this file.',
    '   The easiest way to change it is the admin panel (/admin/).',
    '',
    '   Editing by hand? A few rules:',
    '   • Text in two languages looks like  { "te": "తెలుగు", "en": "English" }',
    '   • Image paths are relative to the site root, e.g. "assets/images/…"',
    '   • Tokens replaced automatically: {year} {siteName} {phone} {whatsapp}',
    '     {email} {website} {address}',
    '   • Keep the quotes and commas — a missing comma breaks the whole site.',
    '   ===================================================================== */',
    ''
  ].join('\n');

  function indent(str, pad) {
    return str.replace(/\n/g, '\n' + pad);
  }

  function serialize(content) {
    var known = SECTIONS.map(function (s) { return s[0]; });
    var keys = known.filter(function (k) { return k in content; })
      .concat(Object.keys(content).filter(function (k) { return known.indexOf(k) === -1; }));
    var out = HEADER + 'window.SITE_CONTENT = {\n';
    keys.forEach(function (k, i) {
      var sec = SECTIONS.filter(function (s) { return s[0] === k; })[0];
      out += '\n  // ── ' + (sec ? sec[1] : k.toUpperCase()) + '\n';
      out += '  ' + JSON.stringify(k) + ': ' + indent(JSON.stringify(content[k], null, 2), '  ');
      out += (i < keys.length - 1 ? ',' : '') + '\n';
    });
    out += '};\n';
    return out;
  }

  // Runs the file in an isolated function scope and returns SITE_CONTENT.
  // Works for files written by the admin AND hand-edited files with comments.
  function parse(text) {
    var sandbox = {};
    /* eslint-disable no-new-func */
    new Function('window', 'self', 'globalThis', String(text))(sandbox, sandbox, sandbox);
    if (!sandbox.SITE_CONTENT || typeof sandbox.SITE_CONTENT !== 'object') {
      throw new Error('content.js did not define window.SITE_CONTENT');
    }
    return sandbox.SITE_CONTENT;
  }

  root.ContentIO = { serialize: serialize, parse: parse, SECTIONS: SECTIONS };
})(typeof window !== 'undefined' ? window : globalThis);
