/* =====================================================================
   Demo tea shop — "Owner Access" panel
   The shop details in index.html are the defaults. The owner can change
   them from the panel at the top; they are saved only in this browser
   (localStorage), so other visitors still see the defaults.
   No build step, no framework — plain browser JavaScript.
   ===================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'mana_tea_shop_details_v1';
  var DEFAULTS = {
    shopName: 'మన టీ With బిస్కెట్',
    phoneDisplay: '+91 98765 43210',
    phoneTel: '919876543210',
    waDisplay: '+91 98765 43210',
    waDigits: '919876543210',
    address: 'Venkatagiri Bus Stand, Main Road',
    mapSrc: 'https://www.google.com/maps?q=Venkatagiri&z=15&output=embed',
    timings: 'ఉదయం 6:00 - రాత్రి 9:00 వరకు (సోమ - ఆది)'
  };
  var FIELDS = ['shopName', 'timings', 'phoneDisplay', 'waDisplay', 'address', 'mapSrc'];

  // ---------- safe storage (private mode / blocked storage never breaks the page)
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ---------- phone helpers
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function withCountry(d) { return d.indexOf('91') === 0 ? d : '91' + d.slice(-10); }
  function pretty(d) {
    if (!d) return '';
    if (d.indexOf('91') === 0 && d.length >= 12) return ('+91 ' + d.slice(2, 7) + ' ' + d.slice(7)).trim();
    return '+91 ' + d.slice(-10, -5) + ' ' + d.slice(-5);
  }
  function str(v) { return v == null ? '' : String(v); }

  // ---------- load saved details (falls back to the defaults field by field)
  function load() {
    var y;
    try { y = JSON.parse(store.get(STORE_KEY) || 'null'); } catch (e) { y = null; }
    if (!y || typeof y !== 'object') return DEFAULTS;
    var D = DEFAULTS;
    var k = {
      shopName: str(y.shopName) || D.shopName,
      phoneDisplay: str(y.phoneDisplay) || D.phoneDisplay,
      phoneTel: str(y.phoneTel) || digits(y.phoneDisplay || D.phoneDisplay),
      waDisplay: str(y.waDisplay) || str(y.phoneDisplay) || D.waDisplay,
      waDigits: str(y.waDigits) || digits(y.waDisplay || y.phoneDisplay || D.waDisplay),
      address: str(y.address) || D.address,
      mapSrc: str(y.mapSrc) || D.mapSrc,
      timings: str(y.timings) || D.timings
    };
    if (!k.phoneTel) k.phoneTel = digits(k.phoneDisplay);
    if (!k.waDigits) k.waDigits = digits(k.waDisplay);
    return k;
  }

  // ---------- show details on the page
  // data-prefix="WhatsApp " keeps fixed words in front of the value
  function setText(sel, text) {
    var list = document.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) list[i].textContent = (list[i].getAttribute('data-prefix') || '') + text;
  }
  function setHref(sel, href) {
    var list = document.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) list[i].setAttribute('href', href);
  }
  // "మన టీ With బిస్కెట్" → "మన టీ" + line break + coloured "With బిస్కెట్"
  function renderTitle(name) {
    var h1 = document.getElementById('shop-name');
    var at = name.toLowerCase().indexOf('with');
    h1.textContent = '';
    if (at === -1) { h1.textContent = name; return; }
    var span = document.createElement('span');
    span.textContent = name.slice(at).trim();
    h1.appendChild(document.createTextNode(name.slice(0, at).trim()));
    h1.appendChild(document.createElement('br'));
    h1.appendChild(span);
  }
  function renderMeta(d) {
    document.title = d.shopName + ' - Venkatagiri Best Tea Shop';
    var m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.content = 'మన టీ With బిస్కెట్ - Venkatagiri lo best tea shop. Masala tea, coffee, biscuit, samosa. Timings ' + d.timings + '. Call cheyandi.';
    // structured data so Google can show the shop's details
    var ld = document.getElementById('shop-ld');
    if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'shop-ld'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: d.shopName,
      description: 'Venkatagiri lo best tea shop. Masala tea, coffee, biscuit, samosa. Timings ' + d.timings,
      address: { '@type': 'PostalAddress', streetAddress: d.address, addressLocality: 'Venkatagiri', addressRegion: 'Andhra Pradesh', addressCountry: 'IN' },
      telephone: '+91' + d.phoneTel.slice(-10),
      openingHours: 'Mo-Su 06:00-21:00',
      url: location.href,
      servesCuisine: ['Tea', 'Coffee', 'Snacks'],
      priceRange: '₹'
    });
  }
  function render(d) {
    FIELDS.forEach(function (f) { if (f !== 'mapSrc') setText('[data-shop="' + f + '"]', d[f]); });
    renderTitle(d.shopName);
    setHref('[data-link="tel"]', 'tel:+' + digits(d.phoneTel));
    setHref('[data-link="wa"]', 'https://wa.me/' + digits(d.waDigits));
    // only web addresses are used as the map
    var map = document.querySelector('[data-shop-map]');
    var src = /^https?:\/\//i.test(d.mapSrc) ? d.mapSrc : DEFAULTS.mapSrc;
    if (map && map.getAttribute('src') !== src) map.setAttribute('src', src);
    renderMeta(d);
  }

  // ---------- owner panel
  var details = load();
  var toastTimer = null;

  function field(name) { return document.querySelector('[data-field="' + name + '"]'); }
  function fillForm(d) { FIELDS.forEach(function (f) { field(f).value = d[f]; }); }
  function setOpen(open) {
    var panel = document.getElementById('owner-panel');
    var btn = document.querySelector('.owner-toggle');
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? '✕ మూసివేయి' : '⚙️ Shop Details Edit';
  }
  function save() {
    var v = {};
    FIELDS.forEach(function (f) { v[f] = field(f).value; });
    var tel = withCountry(digits(v.phoneDisplay) || details.phoneTel);
    var wa = withCountry(digits(v.waDisplay) || details.waDigits);
    details = {
      shopName: v.shopName.trim() || DEFAULTS.shopName,
      phoneDisplay: v.phoneDisplay.trim() || pretty(tel),
      phoneTel: tel,
      waDisplay: v.waDisplay.trim() || pretty(wa),
      waDigits: wa,
      address: v.address.trim() || DEFAULTS.address,
      mapSrc: v.mapSrc.trim() || DEFAULTS.mapSrc,
      timings: v.timings.trim() || DEFAULTS.timings
    };
    render(details);
    store.set(STORE_KEY, JSON.stringify(details));
    setOpen(false);
    var toast = document.querySelector('.saved-toast');
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 2600);
  }

  document.addEventListener('DOMContentLoaded', function () {
    render(details);
    document.querySelector('.owner-toggle').addEventListener('click', function () {
      var opening = document.getElementById('owner-panel').hidden;
      if (opening) fillForm(details);
      setOpen(opening);
    });
    document.querySelector('.btn-save').addEventListener('click', save);
    document.querySelector('.btn-cancel').addEventListener('click', function () { setOpen(false); });
  });
})();
