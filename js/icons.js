/* Inline SVG icon set (24px grid). Glyph shapes mirror the symbols used by the original: menu, search, pin, GPS target, cart, chevrons, pause/play, bolt, user, phone, close, etc. */
(function () {
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    cart: '<path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.4 8H6.1"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
    gps: '<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/>',
    chevDown: '<path d="M6 9l6 6 6-6"/>', chevUp: '<path d="M6 15l6-6 6 6"/>', chevLeft: '<path d="M15 5l-7 7 7 7"/>', chevRight: '<path d="M9 5l7 7-7 7"/>',
    pause: '<path d="M9 6v12M15 6v12" stroke-width="2.6"/>', play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1-4 4-5.5 7.5-5.5s6.5 1.5 7.5 5.5"/>',
    phone: '<path d="M5 4h4l1.5 4-2.3 1.4a11 11 0 0 0 5.4 5.4L15 12.5l4 1.5v4a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    bolt: '<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z" fill="currentColor" stroke="none"/>',
    trash: '<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.6-3 8-7 9.5-4-1.5-7-4.9-7-9.5V6z"/><path d="M8.8 12l2.3 2.3 4.2-4.6"/>',
    verified: '<path d="M12 2.5l2.4 1.7 2.9-.1.9 2.8 2.4 1.7-.9 2.8.9 2.8-2.4 1.7-.9 2.8-2.9-.1L12 21.5l-2.4-1.7-2.9.1-.9-2.8-2.4-1.7.9-2.8-.9-2.8 2.4-1.7.9-2.8 2.9.1z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
    truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 17v3h16v-3"/>', tag: '<path d="M3 12.5V4h8.5L21 13.5 13.5 21z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.6 1.6 0 0 0 1.4 2.4h12.2a1.6 1.6 0 0 0 1.4-2.4L14 9V3M7.5 15h9"/>',
    steth: '<path d="M6 3v6a4 4 0 0 0 8 0V3M6 3H4.5M14 3h1.5M10 13v2.5a4 4 0 0 0 8 0V14"/><circle cx="18" cy="12" r="2"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    pill: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.2 7.6l6.9 6.9" transform="rotate(0)"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.7 2.4c-.8.4-1.2 1-1.2 1.9M12 17v.1"/>',
    file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/>', camera: '<path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/>', lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>', rx: '<path d="M6 4h6a4 4 0 0 1 0 8H6zM6 4v16M12 12l6 8M18 12l-6 8"/>',
    cod: '<rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v.1M17.5 14.5v.1"/>',
    ret: '<path d="M9 5L4.5 9.5 9 14M4.5 9.5H15a5 5 0 0 1 0 10h-3"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    wallet: '<path d="M4 7.5h14a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 7.5l11-3.5v3.5"/><circle cx="16" cy="13.5" r="1.2"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    bank: '<path d="M3 9.5L12 4l9 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18"/>',
    upi: '<path d="M7 5l4 14M11 5l-4 14M14 7l5 5-5 5"/>',
    home: '<path d="M4 11l8-7 8 7M6 10v10h12V10"/>', box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5zM3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
    leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14zM5 19l7-7"/>', baby: '<circle cx="12" cy="12" r="8.5"/><path d="M9 10.5v.1M15 10.5v.1M9.5 15c1.4 1.2 3.6 1.2 5 0"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    lung: '<path d="M12 4v8M12 12c-1 3-3 6-6 6-2 0-2.5-2-2-5 .5-3 2-7 4-7 1.5 0 2.5 1.5 4 6zM12 12c1 3 3 6 6 6 2 0 2.5-2 2-5-.5-3-2-7-4-7-1.5 0-2.5 1.5-4 6z"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>', bone: '<path d="M7 7.5a2.2 2.2 0 1 1-3-3 2.2 2.2 0 0 1 3 0l10 10a2.2 2.2 0 1 1 3 3 2.2 2.2 0 1 1-3 0z"/>',
    stomach: '<path d="M9 3v4c0 2-4 2.5-4 7a6 6 0 0 0 12 0c0-3-2-3-2-5V6"/>', kidney: '<path d="M14 4c-4 0-8 2.5-8 8s3 8 6 8 3-3 1-5-1-4 1-5 4-3 0-6z"/>',
    liver: '<path d="M3 10c0-3 3-5 8-5 6 0 10 3 10 7 0 3-3 5-6 5-2 0-3-1.5-4.5-2.5C8 13.5 3 14.5 3 10z"/>', skin: '<path d="M12 3c3 0 5 2 5 5 0 2-1 3-1 5s2 3 2 6H6c0-3 2-4 2-6s-1-3-1-5c0-3 2-5 5-5z"/>',
    heartbeat: '<path d="M3 12h4l2-5 3 10 2-5h7"/>', whatsapp: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/>',
    fb: '<path d="M14 8h2.5V4.5H14a3.5 3.5 0 0 0-3.5 3.5v2H8V13.5h2.5V21H14v-7.5h2.5L17 10h-3V8.5a.5.5 0 0 1 .5-.5z" fill="currentColor" stroke="none"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2v.1"/>', yt: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10.5 9.5v5l4.2-2.5z" fill="currentColor" stroke="none"/>',
    x: '<path d="M5 4l14 16M19 4L5 20"/>', link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18v-3H3zM12 6v14M12 6c-2-3-6-2-5 0M12 6c2-3 6-2 5 0"/>', up: '<path d="M12 19V5M6 11l6-6 6 6"/>'
  };
  window.ic = function (n, s, cls) {
    s = s || 20;
    return '<svg class="ic ' + (cls || '') + '" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
  };
})();
