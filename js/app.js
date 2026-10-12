/* DAWAA core: state, helpers, header/footer/drawer, router, home, listing, product page */
(function () {
  const D = window.DAWAA_DATA, DW = window.DW = { D, routes: {}, after: [] };
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  DW.$ = $; DW.$$ = $$;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('dawaa_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('dawaa_' + k, JSON.stringify(v)); } catch (e) { } }
  };
  const S = DW.S = {
    lang: store.get('lang', 'en'), cart: store.get('cart', {}), user: store.get('user', null), addr: store.get('addr', null),
    loc: store.get('loc', { city: 'Gurgaon', pin: '122001' }), orders: store.get('orders', []), rx: store.get('rx', null), coupon: store.get('coupon', null), care: store.get('care', false)
  };
  DW.save = k => store.set(k, S[k]);
  DW.t = (k, v) => { let s = (I18N[S.lang] && I18N[S.lang][k]) || I18N.en[k] || k; if (v) for (const x in v) s = s.replace('{' + x + '}', v[x]); return s; };
  DW.tl = l => (S.lang !== 'en' && I18N_LABELS[S.lang] && I18N_LABELS[S.lang][l]) || l;
  const t = DW.t, tl = DW.tl, ic = window.ic;
  const money = DW.money = n => '₹' + (Math.round(n * 100) / 100);
  const esc = DW.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hash = s => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  DW.toast = (msg, link) => { const el = $('#toast'); el.innerHTML = esc(msg) + (link ? ' <a href="' + link[1] + '">' + esc(link[0]) + '</a>' : ''); el.classList.add('show'); clearTimeout(DW._tt); DW._tt = setTimeout(() => el.classList.remove('show'), 3200); };

  /* ---------- product art (generated SVG, no external images) ---------- */
  const PAL = ['#1E7BFF', '#12A07A', '#F59E3F', '#7B61FF', '#E0558F', '#0FA3B1', '#5B6B7C', '#0F5FA8'];
  const kind = f => {
    f = (f || '').toLowerCase();
    if (/tablet|capsule|lozenge/.test(f)) return 'strip';
    if (/syrup|suspension|liquid|solution|tonic|drops|dilution|gargle|shampoo|cleanser|face wash/.test(f)) return 'bottle';
    if (/gel|cream|ointment|balm|sunscreen/.test(f)) return 'tube';
    if (/powder|granules|soap|bandage|diapers/.test(f)) return 'box';
    if (/spray|inhaler|respules/.test(f)) return 'spray';
    if (/injection/.test(f)) return 'vial';
    return 'box';
  };
  const artCache = {};
  DW.art = (m, v) => {
    v = v || 0; const key = m.id + '_' + v; if (artCache[key]) return artCache[key];
    const h = hash(m.name), c = PAL[(h + v) % PAL.length], c2 = PAL[(h + v + 3) % PAL.length];
    const label = esc(m.name.split(/[ (]/)[0].slice(0, 12)), k = kind(m.form);
    let g = '';
    if (v === 2) { // carton view
      g = `<rect x="38" y="14" width="84" height="72" rx="5" fill="#fff" stroke="#CBD5E1"/><rect x="38" y="14" width="84" height="20" rx="5" fill="${c}"/><text x="80" y="29" font-size="10" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text><rect x="48" y="44" width="64" height="5" rx="2" fill="#E2E8F0"/><rect x="48" y="54" width="46" height="5" rx="2" fill="#E2E8F0"/><circle cx="102" cy="72" r="8" fill="${c2}" opacity=".85"/>`;
    } else if (k === 'strip') {
      let pills = ''; for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) pills += `<ellipse cx="${32 + i * 19}" cy="${v === 1 ? 62 + r * 0 : 50 + r * 22}" rx="7" ry="9" fill="${r ? c2 : c}" opacity=".9"/>`;
      if (v === 1) pills = [...Array(8)].map((_, i) => `<ellipse cx="${34 + (i % 4) * 30}" cy="${44 + Math.floor(i / 4) * 26}" rx="11" ry="9" fill="${i % 2 ? c2 : c}" opacity=".9"/>`).join('');
      g = `<rect x="14" y="14" width="132" height="72" rx="5" fill="#EEF2F7" stroke="#CBD5E1"/><rect x="14" y="14" width="132" height="17" rx="5" fill="${c}"/><text x="80" y="26.5" font-size="9.5" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text>${pills}`;
    } else if (k === 'bottle') {
      g = `<rect x="66" y="8" width="28" height="12" rx="3" fill="${c2}"/><rect x="70" y="20" width="20" height="8" fill="#DCE6F2"/><rect x="48" y="28" width="64" height="62" rx="12" fill="#F5F9FD" stroke="#CBD5E1"/><rect x="48" y="44" width="64" height="30" fill="${c}"/><text x="80" y="62" font-size="9" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text>`;
    } else if (k === 'tube') {
      g = `<path d="M44 20h72l-8 62H52z" fill="#F5F9FD" stroke="#CBD5E1"/><rect x="44" y="12" width="72" height="10" rx="3" fill="${c2}"/><path d="M48 44h64l-2 20H50z" fill="${c}"/><text x="80" y="58" font-size="9" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text>`;
    } else if (k === 'spray') {
      g = `<rect x="62" y="6" width="36" height="10" rx="3" fill="${c2}"/><rect x="72" y="16" width="16" height="10" fill="#DCE6F2"/><rect x="52" y="26" width="56" height="62" rx="9" fill="#F5F9FD" stroke="#CBD5E1"/><rect x="52" y="44" width="56" height="26" fill="${c}"/><text x="80" y="60" font-size="8.5" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text>`;
    } else if (k === 'vial') {
      g = `<rect x="64" y="8" width="32" height="12" rx="3" fill="${c2}"/><rect x="58" y="20" width="44" height="68" rx="8" fill="#F5F9FD" stroke="#CBD5E1"/><rect x="58" y="42" width="44" height="28" fill="${c}"/><text x="80" y="60" font-size="8" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text>`;
    } else {
      g = `<rect x="30" y="16" width="100" height="68" rx="6" fill="#fff" stroke="#CBD5E1"/><rect x="30" y="16" width="100" height="22" rx="6" fill="${c}"/><text x="80" y="31" font-size="10" font-weight="700" fill="#fff" text-anchor="middle" font-family="Poppins,Arial">${label}</text><circle cx="58" cy="62" r="13" fill="${c2}" opacity=".85"/><rect x="80" y="52" width="40" height="6" rx="3" fill="#E2E8F0"/><rect x="80" y="64" width="28" height="6" rx="3" fill="#E2E8F0"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">${g}</svg>`;
    return artCache[key] = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  /* ---------- catalogue helpers ---------- */
  DW.item = k => { k = String(k); if (k[0] === 'L') { const l = D.LABS.find(x => x.id === k); return l && Object.assign({ isLab: true, pack: l.tests + ' tests', form: 'Lab' }, l); } return D.meds.find(m => String(m.id) === k); };
  const units = m => { const r = /of (\d+) (?:tablets?|capsules?|lozenges?|sachets?|strips?|respules?|mdi|diapers|bandages|test)/i.exec(m.pack || ''); return r ? +r[1] : (/^(\d+) (?:tablets?|capsules?)$/i.test(m.pack) ? parseInt(m.pack) : null); };
  const norm = s => s.toLowerCase().replace(/\s+/g, '');
  DW.alt = m => {
    if (m.isLab || m.cls === 'dev' || m.cls === 'pc') return null;
    let best = null;
    for (const x of D.meds) { if (x.id === m.id || norm(x.comp) !== norm(m.comp) || x.form !== m.form || x.price >= m.price) continue; if (!best || x.price < best.price) best = x; }
    if (!best) return null;
    return { m: best, pct: Math.round((1 - best.price / m.price) * 100) };
  };
  DW.search = (q, lim) => {
    const toks = q.toLowerCase().split(/\s+/).filter(Boolean); if (!toks.length) return [];
    const out = [];
    for (const m of D.meds) {
      const hay = (m.name + ' ' + m.comp + ' ' + m.marketer + ' ' + m.sub + ' ' + m.parent + ' ' + m.cat).toLowerCase();
      if (!toks.every(x => hay.includes(x))) continue;
      const n = m.name.toLowerCase(); let sc = 0;
      if (n.startsWith(toks[0])) sc += 3; else if (n.includes(toks[0])) sc += 2;
      sc += Math.min(m.reviews, 3000) / 3000;
      out.push([sc, m]);
    }
    out.sort((a, b) => b[0] - a[0]);
    const r = out.map(x => x[1]); return lim ? r.slice(0, lim) : r;
  };
  const CATF = {
    'top-deals': m => m.off >= 25, vitamins: m => ['vit', 'bone'].includes(m.cls), drinks: m => /protein|ors|electral|supradyn/i.test(m.name), derma: m => ['derm', 'pc'].includes(m.cls) && m.cls === 'derm' || /face wash|sunscreen|cleanser/i.test(m.name),
    hair: m => /shampoo|minoxidil|tugain|hair/i.test(m.name + m.form), sexual: m => /unwanted|i-pill|mala-d|prega|contracept/i.test(m.name + m.comp), ayurveda: m => m.cls === 'ayur', pain: m => ['para', 'nsaid'].includes(m.cls) && !m.rx || /pain/i.test(m.name),
    homeopathy: m => m.cls === 'homeo', fitness: m => m.cls === 'vit', supports: m => m.form === 'Support', immunity: m => m.cls === 'ayur' || /vitamin c|zinc|limcee|celin/i.test(m.name + m.comp), pet: () => false,
    personal: m => m.cls === 'pc', devices: m => m.cls === 'dev', women: m => m.cls === 'women', infection: m => m.cls === 'abx', neuro: m => ['neuro', 'epi'].includes(m.cls), hormones: m => m.cls === 'thy'
  };
  const CATNAME = { 'top-deals': 'Best offers', vitamins: 'Vitamins & Supplements', drinks: 'Nutritional Drinks', derma: 'Skin Care', hair: 'Hair Care', sexual: 'Sexual Wellness', ayurveda: 'Ayurveda Products', pain: 'Pain Relief', homeopathy: 'Homeopathy', fitness: 'Fitness & Health', supports: 'Supports & Braces', immunity: 'Immunity Boosters', pet: 'Pet Care', personal: 'Personal Care', devices: 'Health Devices', women: "Women's Care", infection: 'Anti Infectives', neuro: 'Neurology', hormones: 'Hormones' };
  DW.catItems = key => { if (CATF[key]) return D.meds.filter(CATF[key]); return D.meds.filter(m => m.cat === key); };
  DW.catName = key => { const c = D.CONCERNS.find(x => x[0] === key); return c ? c[1] : (CATNAME[key] || key); };
  DW.MEGAKEY = { 'Hair Care': 'hair', 'Fitness & Health': 'fitness', 'Sexual Wellness': 'sexual', 'Vitamins & Nutrition': 'vitamins', 'Supports & Braces': 'supports', 'Immunity Boosters': 'immunity', 'Homeopathy': 'homeopathy', 'Pet Care': 'pet' };

  /* ---------- cart ---------- */
  DW.qty = k => S.cart[String(k)] || 0;
  DW.cartCount = () => Object.values(S.cart).reduce((a, b) => a + b, 0);
  DW.add = (k, n) => { k = String(k); S.cart[k] = (S.cart[k] || 0) + (n || 1); DW.save('cart'); DW.refreshCart(); };
  DW.setQty = (k, n) => { k = String(k); if (n <= 0) delete S.cart[k]; else S.cart[k] = Math.min(n, 20); DW.save('cart'); DW.refreshCart(); };
  DW.cartItems = () => Object.keys(S.cart).map(k => ({ it: DW.item(k), q: S.cart[k] })).filter(x => x.it);
  DW.bill = () => {
    const its = DW.cartItems(); let mrp = 0, sell = 0;
    its.forEach(({ it, q }) => { mrp += it.mrp * q; sell += it.price * q; });
    const CP = { DAWAANEW: [15, 200, 1200], DAWAA10: [10, 100, 300], CARE5: [5, 100, 0] };
    let cd = 0; if (S.coupon && CP[S.coupon]) { const [p, mx, mn] = CP[S.coupon]; if (sell >= mn) cd = Math.min(sell * p / 100, mx); }
    const hand = its.length ? 12 : 0, ship = !its.length ? 0 : (sell >= 499 || S.care ? 0 : (S.addr ? 40 : null));
    const careDisc = S.care ? sell * .05 : 0;
    const total = sell + hand + (ship || 0) - cd - careDisc;
    return { mrp, sell, disc: mrp - sell, cd, careDisc, hand, ship, total: Math.max(total, 0), count: its.length, save: mrp - sell + cd + careDisc };
  };
  DW.needRx = () => DW.cartItems().some(x => x.it.rx);
  const ctl = (id, big, pdp) => {
    const q = DW.qty(id);
    if (!q) return pdp ? `<button class="btn" data-a="addpdp" data-id="${id}">${t('add')}</button>` : `<button class="addb" data-a="add" data-id="${id}">${big ? t('add') : t('addToCart')}</button>`;
    return `<div class="stepper"><button data-a="dec" data-id="${id}" aria-label="-">${ic('minus', 16)}</button><span>${q}</span><button data-a="inc" data-id="${id}" aria-label="+">${ic('plus', 16)}</button></div>`;
  };
  DW.ctl = ctl;
  DW.refreshCart = () => {
    $$('.cardctl').forEach(el => { el.innerHTML = ctl(el.dataset.id, el.dataset.big, el.dataset.pdp); });
    $$('.cartcnt').forEach(el => { const n = DW.cartCount(); el.textContent = n; el.style.display = n ? '' : 'none'; });
    if (DW.onCart) DW.onCart();
  };

  /* ---------- logo / small renderers ---------- */
  const logo = () => `<a class="logo" href="#/" aria-label="DAWAA home"><svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#0F5FA8"/><g transform="rotate(-40 16 16)"><rect x="6" y="11.5" width="20" height="9" rx="4.5" fill="#fff"/><path d="M16 11.5h6.5a4.5 4.5 0 0 1 0 9H16z" fill="#12A07A"/></g></svg><span>DAW<b>AA</b></span></a>`;
  DW.logo = logo;
  const rating = m => m.reviews ? `<div class="rate"><span class="st">${m.rating} ${ic('star', 10)}</span><span class="mute">(${m.reviews})</span></div>` : '<div class="rate"></div>';
  DW.pCard = m => `<div class="pcard">${m.bestseller ? '<span class="tagb bs">' + t('bestseller') + '</span>' : (m.ad ? '<span class="tagb ad">' + t('ad') + '</span>' : (m.rx ? '<span class="tagb rx">Rx</span>' : ''))}
    <a href="#/drug/${m.id}-${m.slug}"><div class="pim"><img loading="lazy" src="${DW.art(m)}" alt="${esc(m.name)}"></div><h4>${esc(m.name)}</h4><div class="pk">${esc(m.pack)}</div>${rating(m)}<div class="eta">${m.eta}</div>
    <div class="pr"><span class="price">${money(m.price)}</span>${m.off ? `<span class="mrp">${money(m.mrp)}</span><span class="offp">${m.off}% ${t('off')}</span>` : ''}</div></a>
    <div class="addb-wrap cardctl" data-id="${m.id}" style="margin-top:8px">${ctl(m.id)}</div></div>`;
  const hs = (inner, id) => `<div class="hsw"><button class="nav l" data-a="hs" data-d="-1" aria-label="prev">${ic('chevLeft', 18)}</button><div class="hs" id="${id || ''}">${inner}</div><button class="nav r" data-a="hs" data-d="1" aria-label="next">${ic('chevRight', 18)}</button></div>`;
  DW.hs = hs;
  const labCard = l => `<div class="labcard"><h4>${esc(l.name)}</h4>${l.type === 'package' ? '' : `<div class="small mute">${t('containsTests', { n: l.tests })}</div>`}<div class="by">${ic('flask', 14)} DAWAA Labs <span class="safe">${t('safe')}</span></div><div class="mt8"><span class="price">${money(l.price)}</span>${l.off ? `<span class="mrp">${money(l.mrp)}</span><span class="offp">${l.off}% ${t('off')}</span>` : ''}</div><div class="cardctl mt8" data-id="${l.id}">${ctl(l.id)}</div></div>`;
  DW.labCard = labCard;

  /* ---------- header ---------- */
  const NAV = [['medicines', '#/', 'home'], ['labTests', '#/labs', 'labs'], ['consultDoctors', '#/doctors', 'doctors'], ['cancerCare', '#/cancer-care', 'cancer-care'], ['ayurveda', '#/ayurveda', 'ayurveda'], ['partnerships', '#/partnerships', 'partnerships'], ['corporates', '#/corporates', 'corporates'], ['carePlan', '#/careplan', 'careplan']];
  const langName = { en: 'EN', hi: 'हिं', pa: 'ਪੰ' };
  const userArea = () => S.user ? `<div class="userbox"><button class="hm" data-a="usermenu" style="display:flex;align-items:center;gap:5px">${ic('user', 17)} ${esc(S.user.short)}</button><div class="usermenu"><a href="#/orders">${t('myOrders')}</a><button data-a="logout">${t('logout')}</button></div></div>` : `<a href="javascript:void(0)" data-a="login" class="hm">${t('login')}</a><span class="hm" style="margin:0 -12px">|</span><a href="javascript:void(0)" data-a="login" class="hm">${t('signup')}</a>`;
  const langSel = () => `<div class="langsel"><button class="langbtn" data-a="langtoggle" aria-label="${t('language')}">${ic('globe', 15)} ${langName[S.lang]} ${ic('chevDown', 12)}</button><div class="langmenu"><button data-a="lang" data-l="en" class="${S.lang === 'en' ? 'on' : ''}">English</button><button data-a="lang" data-l="hi" class="${S.lang === 'hi' ? 'on' : ''}">हिंदी</button><button data-a="lang" data-l="pa" class="${S.lang === 'pa' ? 'on' : ''}">ਪੰਜਾਬੀ</button></div></div>`;
  const searchBox = ph => `<div class="searchbox"><input type="search" id="q" autocomplete="off" placeholder="${esc(ph || t('searchPh'))}" aria-label="search"><button data-a="dosearch" aria-label="search">${ic('search', 18)}</button><div class="sugg" id="sugg"></div></div>`;
  DW.header = (min, active) => {
    if (min) return `<div class="chdr"><div class="container flex ac" style="gap:26px;width:100%">${logo()}<div class="sb2">${searchBox().replace('class="searchbox"', 'class="searchbox" style="max-width:none"')}</div><a class="help" href="#/help">${t('needHelp')}</a></div></div>`;
    const cats = D.MEGA.map(([k, name, items]) => `<li><a href="${k === 'hrc' ? 'javascript:void(0)' : '#/category/' + (DW.MEGAKEY[name] || k)}">${tl(name)} ${ic('chevDown', 12)}</a><div class="mega">${items.map(i => Array.isArray(i) ? `<a href="${i[1]}">${tl(i[0])}</a>` : `<a href="#/search?q=${encodeURIComponent(i)}">${tl(i)}</a>`).join('')}</div></li>`).join('');
    const cnt = `<span class="cnt cartcnt" style="${DW.cartCount() ? '' : 'display:none'}">${DW.cartCount()}</span>`;
    return `<div class="hdr"><div class="container hdr-top">${logo()}<nav class="mnav">${NAV.map(([k, h, r]) => `<a class="nv ${active === r ? 'on' : ''}" href="${h}">${t(k)}${k === 'carePlan' ? `<span class="badge-save">${t('saveMore')}</span>` : ''}</a>`).join('')}</nav>
      <div class="hdr-r">${userArea()}<a href="#/offers" class="hm">${t('offers')}</a><a href="#/cart" class="cartbtn" aria-label="cart" style="position:relative">${ic('cart', 22)}${cnt}</a><a href="#/help" class="hm">${t('needHelp')}</a>${langSel()}</div></div>
      <div class="container hdr-mid"><div class="locbox" data-a="loc">${ic('pin', 18)}<span>${esc(S.loc.city)}</span>${ic('gps', 18)}</div>${searchBox()}<div class="qb">${ic('bolt', 18)}<span>${t('quickBuy')}</span><a class="btn sm" href="#/quick-order" style="height:38px;padding:0 16px">${t('quickOrder')}</a></div></div>
      <div class="container"><ul class="cats">${cats}</ul></div></div>
      <div class="mhdr hdr"><div class="mh1"><button class="mi" data-a="drawer" aria-label="${t('menu')}">${ic('menu', 26)}</button>${logo()}<span class="grow"></span><a class="mi" href="#/cart" aria-label="cart" style="position:relative">${ic('cart', 24)}${cnt}</a></div>
      <div class="mtabs">${[['medicines', '#/', 'home'], ['labTests', '#/labs', 'labs'], ['consultDoctors', '#/doctors', 'doctors'], ['cancerCare', '#/cancer-care', 'cancer-care']].map(([k, h, r]) => `<a class="${active === r ? 'on' : ''}" href="${h}">${t(k)}</a>`).join('')}</div>
      <div class="mh2"><div class="locbox" data-a="loc">${ic('pin', 18)}<span>${esc(S.loc.city)}</span>${ic('gps', 18)}</div>${searchBox()}</div></div>`;
  };
  DW.footer = () => {
    const L = (k, h) => `<li><a href="${h}">${t(k)}</a></li>`;
    return `<footer class="foot"><div class="container"><div class="fgrid"><div>${logo()}<p class="about">${t('heroTitle')}</p><div class="soc"><a href="#/help" aria-label="Facebook">${ic('fb', 16)}</a><a href="#/help" aria-label="Instagram">${ic('ig', 16)}</a><a href="#/help" aria-label="YouTube">${ic('yt', 18)}</a><a href="#/help" aria-label="WhatsApp">${ic('whatsapp', 16)}</a></div></div>
      <div><h5>${t('fCompany')}</h5><ul>${L('about', '#/help')}${L('careers', '#/help')}${L('contact', '#/help')}${L('blog', '#/help')}${L('partnerships', '#/partnerships')}</ul></div>
      <div><h5>${t('fServices')}</h5><ul>${L('medicines', '#/')}${L('labTests', '#/labs')}${L('consultDoctors', '#/doctors')}${L('cancerCare', '#/cancer-care')}${L('corporates', '#/corporates')}</ul></div>
      <div><h5>${t('fFeatured')}</h5><ul><li><a href="#/category/diabetes">${tl('Diabetes')}</a></li><li><a href="#/category/heart">${tl('Heart Care')}</a></li><li><a href="#/category/ayurveda">${t('ayurveda')}</a></li><li><a href="#/category/vitamins">${tl('Vitamins & Supplements')}</a></li><li><a href="#/category/personal">${t('personalCare')}</a></li></ul></div>
      <div><h5>${t('fHelp')} &amp; ${t('fPolicies')}</h5><ul>${L('faq', '#/help')}${L('returns', '#/help')}${L('privacyP', '#/help')}${L('termsP', '#/help')}${L('sitemap', '#/medicines')}</ul></div></div>
      <div class="trust"><div>${ic('verified', 20)} ${t('genuine')}</div><div>${ic('shield', 20)} ${t('pharmacist')}</div><div>${ic('truck', 20)} ${t('shipping')}: ${t('free')} ≥ ₹499</div><div>${ic('lock', 20)} ${t('secure')}</div></div>
      <div class="flex jb" style="flex-wrap:wrap;gap:12px;margin-top:16px"><div><b class="small">${t('payWith')}</b><div class="pays"><span>UPI</span><span>Visa</span><span>Mastercard</span><span>RuPay</span><span>Net banking</span><span>Wallets</span><span>COD</span></div></div><div class="small mute" style="align-self:flex-end">${t('copyright')}</div></div>
      <p class="fnote">${t('footNote')}</p></div></footer>`;
  };
  DW.callbar = () => sessionStorage.getItem('dw_nocall') ? '' : `<div class="callbar"><div class="container"><div class="t1">${ic('phone', 22, 'blue')}${t('callBar')}</div><div class="t2">${t('callUs')} <a href="tel:18002122323">1800-212-2323</a> ${t('orCallback')}</div><div class="phone"><span class="fl"></span><span>+91</span><input id="cbph" type="tel" maxlength="10" inputmode="numeric" placeholder="${t('phoneNumber')}"></div><button class="btn" data-a="callback">${t('getCall')}</button><button class="x" data-a="closecall" aria-label="${t('close')}">${ic('close', 20)}</button></div></div>`;

  /* drawer (mobile) */
  DW.drawer = () => `<div class="drawer-bg" data-a="drawerclose"></div><aside class="drawer" id="dr"><div class="dh">${logo()}<button style="background:none;border:0;color:#fff" data-a="drawerclose" aria-label="${t('close')}">${ic('close', 22)}</button></div>
    ${S.user ? `<a class="di" href="#/orders">${ic('user', 18)} &nbsp;${esc(S.user.short)} · ${t('myOrders')}</a>` : `<a class="di" href="javascript:void(0)" data-a="login">${t('login')} / ${t('signup')}</a>`}
    <a class="di" href="#/">${t('medicines')}</a>
    ${D.MEGA.map(([k, name, items]) => `<div class="dacc"><button data-a="dacc">${tl(name)} ${ic('chevDown', 16)}</button><div class="dsub">${items.map(i => Array.isArray(i) ? `<a href="${i[1]}">${tl(i[0])}</a>` : `<a href="#/search?q=${encodeURIComponent(i)}">${tl(i)}</a>`).join('')}</div></div>`).join('')}
    ${NAV.slice(1).map(([k, h]) => `<a class="di" href="${h}">${t(k)}</a>`).join('')}<a class="di" href="#/offers">${t('offers')}</a><a class="di" href="#/help">${t('needHelp')}</a><a class="di" href="#/orders">${t('myOrders')}</a>
    <div class="dlang"><button data-a="lang" data-l="en" class="${S.lang === 'en' ? 'on' : ''}">English</button><button data-a="lang" data-l="hi" class="${S.lang === 'hi' ? 'on' : ''}">हिंदी</button><button data-a="lang" data-l="pa" class="${S.lang === 'pa' ? 'on' : ''}">ਪੰਜਾਬੀ</button></div>${S.user ? `<a class="di" href="javascript:void(0)" data-a="logout">${t('logout')}</a>` : ''}</aside>`;

  /* ---------- pages: home ---------- */
  const SLIDES = [['linear-gradient(100deg,#0F5FA8,#2C8CE0)', 'Flat 25% off', 'on your first medicine order. Use code DAWAANEW', 'pill'], ['linear-gradient(100deg,#0B7A5C,#38C79C)', 'Lab tests at home', 'Free sample pickup · Reports in 24–48 hrs', 'flask'], ['linear-gradient(100deg,#2B6CB0,#6B9FE4)', 'Consult doctors online', '25+ specialities · Talk in minutes', 'steth'], ['linear-gradient(100deg,#1B8A8F,#5CCBC4)', 'Ayurveda & wellness', 'Trusted herbal brands, delivered fast', 'leaf'], ['linear-gradient(100deg,#3B5BA9,#7E93D6)', 'DAWAA Care Plan', 'Extra 5% savings + free shipping all year', 'heart']];
  let cIdx = 0, cTimer = null, cPaused = false;
  const slideHtml = SLIDES.map(s => `<a href="#/offers"><div class="slide" style="background:${s[0]}"><div><h3>${s[1]}</h3><p>${s[2]}</p><span class="pill">${t('knowMore')} →</span></div><div class="art">${ic(s[3], 120)}</div></div></a>`).join('');
  const qr = () => { let r = ''; const h = hash('pvpi'); for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) if (((h >> ((x * 3 + y * 5) % 28)) & 1) || (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7)) r += `<rect x="${x * 5}" y="${y * 5}" width="5" height="5"/>`; return `<svg width="55" height="55" viewBox="0 0 55 55" fill="#13294B">${r}</svg>`; };
  DW.setSlide = i => { const w = $('#cw'); if (!w) return; cIdx = (i + SLIDES.length) % SLIDES.length; w.style.transform = `translateX(-${cIdx * 100}%)`; $$('#dots i').forEach((d, j) => d.classList.toggle('on', j === cIdx)); };
  const startCar = () => { clearInterval(cTimer); cTimer = setInterval(() => { if (!cPaused && $('#cw')) DW.setSlide(cIdx + 1); }, 4500); };
  DW.routes.home = () => {
    const L = D.LABS, pcs = D.meds.filter(m => m.cls === 'pc').slice(0, 14), deals = D.meds.filter(m => m.off >= 20).slice(0, 20);
    const html = `<div class="container"><div class="hero"><div class="carousel"><div class="cw" id="cw">${slideHtml}</div></div><div class="advert"><div style="flex:1"><b>${t('advRep').split('.')[0].slice(0, 0)}PvPI</b>${t('advRep')}</div>${qr()}</div></div>
      <div class="cctl"><button data-a="cprev" aria-label="prev">${ic('chevLeft', 14)}</button><button data-a="cnext" aria-label="next">${ic('chevRight', 14)}</button><div class="dots" id="dots">${SLIDES.map((_, i) => `<i data-a="cdot" data-i="${i}" class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div><button data-a="cpause" id="cpause" aria-label="pause">${ic('pause', 14)}</button></div>
      <div class="h1band"><h1>${t('heroTitle')}</h1></div>
      <div class="care"><div class="face">${ic('heart', 44)}</div><div><span class="tag">Care Plan</span> <span class="small">${t('careNow')}</span><p><b>${t('careBanner')}</b></p><p class="small">${t('becomeMember')}</p></div><a class="btn" href="#/careplan">${t('knowMore')}</a></div>
      <section class="sec"><div class="sec-h"><h2>${t('shopConcern')}</h2></div>${hs(D.CONCERNS.map(c => `<a class="concern" href="#/category/${c[0]}"><div class="im" style="background:${c[2]}">${ic({ diabetes: 'drop', heart: 'heartbeat', stomach: 'stomach', liver: 'liver', bone: 'bone', kidney: 'kidney', derma: 'skin', respiratory: 'lung', eye: 'eye' }[c[0]], 54)}</div><p>${tl(c[1])}</p></a>`).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('fullBody')}</h2><a class="seeall" href="#/labs">${t('seeAll')}</a></div>${hs(L.filter(l => l.type === 'package').slice(0, 6).map(labCard).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('featuredBrands')}</h2><a class="seeall" href="#/search?q=">${t('seeAll')}</a></div>${hs(D.BRANDS.map((b, i) => `<a class="brand" href="#/search?q=${encodeURIComponent(b.split(' ')[0])}"><div class="bc" style="background:${['#0F5FA8', '#12A07A', '#1E7BFF', '#0FA3B1', '#7B61FF', '#F59E3F'][i % 6]}">${b.slice(0, 2).toUpperCase()}</div><p>${esc(b.split(' ').slice(0, 2).join(' '))}</p></a>`).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('personalCare')}</h2><a class="seeall" href="#/category/personal">${t('seeAll')}</a></div>${hs(pcs.map(DW.pCard).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('pathTests')}</h2><a class="seeall" href="#/labs">${t('seeAll')}</a></div>${hs(L.filter(l => l.type === 'test').slice(0, 10).map(labCard).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('superDeals')}</h2><a class="seeall" href="#/category/top-deals">${t('seeAll')}</a></div>${hs(deals.map(DW.pCard).join(''))}</section>
      <section class="sec"><div class="sec-h"><h2>${t('popularCats')}</h2></div><div class="popcats">${D.CATS.map(c => `<a href="#/category/${c[0]}"><span class="pi">${ic({ 'top-deals': 'gift', vitamins: 'pill', drinks: 'drop', derma: 'skin', hair: 'leaf', sexual: 'heart', ayurveda: 'leaf', pain: 'bone', homeopathy: 'flask' }[c[0]] || 'box', 22)}</span>${tl(c[1])}</a>`).join('')}</div></section></div>`;
    return { html, nav: 'home', after() { startCar(); cIdx = 0; cPaused = false; } };
  };

  /* ---------- listing ---------- */
  const FORMS = f => f;
  const listPage = (title, items, crumbs, q) => {
    const brands = {}, forms = {}; items.forEach(m => { brands[m.marketer] = (brands[m.marketer] || 0) + 1; forms[m.form] = (forms[m.form] || 0) + 1; });
    DW._list = { items, title, brands, forms, sort: 'rel', fb: new Set(), ff: new Set(), bq: '' };
    const html = `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}${crumbs.map(c => `<span>${esc(c)}</span>`).join(ic('chevRight', 12))}</div>
      <div class="list"><aside class="filters" id="filters"><div class="ftop"><b>${t('filters')}</b><button class="btn sm ghost" data-a="fclose">${t('close')}</button></div><h4 class="hide" style="display:block">${t('filters')}</h4><div class="fgroup"><h5>${t('brands')}</h5><input class="fs" id="bq" placeholder="${t('searchBrands')}"><div class="fscroll" id="bl"></div></div><div class="fgroup"><h5>${t('productForm')}</h5><div class="fscroll" id="fl"></div></div><button class="btn sm ghost block" data-a="fclear">${t('clear')}</button></aside>
      <section><div class="lhead"><h1>${q != null ? t('searchResultsFor') + ' ' + esc(q) : esc(title)} <span id="rc"></span></h1><div class="flex ac gap8"><button class="fbtn" data-a="fopen">${t('filters')}</button><select class="sortbox" id="sortsel" aria-label="${t('sortBy')}"><option value="rel">${t('sortBy')}: ${t('relevance')}</option><option value="lo">${t('priceLow')}</option><option value="hi">${t('priceHigh')}</option><option value="off">${t('discount')}</option></select></div></div><div class="grid" id="lg"></div></section></div></div>`;
    return { html, nav: 'home', after: paintList };
  };
  function paintList() {
    const L = DW._list; if (!L) return;
    const nm = s => s;
    const opt = (obj, set, cls) => Object.entries(obj).filter(([k]) => !L.bq || cls !== 'b' || k.toLowerCase().includes(L.bq)).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<label class="fopt"><input type="checkbox" data-a="ftog" data-c="${cls}" data-v="${esc(k)}" ${set.has(k) ? 'checked' : ''}>${esc(nm(k))}<span class="n">${n}</span></label>`).join('');
    const bl = $('#bl'), fl = $('#fl'); if (bl) bl.innerHTML = opt(L.brands, L.fb, 'b'); if (fl) fl.innerHTML = opt(L.forms, L.ff, 'f');
    let r = L.items.filter(m => (!L.fb.size || L.fb.has(m.marketer)) && (!L.ff.size || L.ff.has(m.form)));
    if (L.sort === 'lo') r = [...r].sort((a, b) => a.price - b.price); else if (L.sort === 'hi') r = [...r].sort((a, b) => b.price - a.price); else if (L.sort === 'off') r = [...r].sort((a, b) => b.off - a.off);
    $('#rc') && ($('#rc').textContent = '(' + r.length + ' ' + t('results') + ')');
    const g = $('#lg'); if (!g) return;
    if (!r.length) { g.innerHTML = `<div class="empty" style="grid-column:1/-1">${ic('search', 52)}<h2>${t('noResults')}</h2></div>`; return; }
    let out = '', shown = false;
    r.slice(0, 120).forEach((m, i) => {
      out += DW.pCard(m);
      if (!shown && i === 0) { const a = DW.alt(m); if (a) { shown = true; out += altCard(m, a); } }
    });
    g.innerHTML = out;
  }
  const altCard = (m, a) => `<div class="galt"><div class="gh">${t('genericAlt', { n: '<b>' + a.pct + '</b>' })}</div><div class="inner"><div style="width:90px"><div class="ct">${t('cheaperTag', { n: a.pct })}</div><img src="${DW.art(a.m)}" style="width:90px;height:64px;object-fit:contain" alt=""></div><div class="grow"><a href="#/drug/${a.m.id}-${a.m.slug}"><b style="font-size:13px">${esc(a.m.name)}</b></a><div class="small mute">${esc(a.m.pack)}</div><div class="small mute">${esc(a.m.marketer)}</div><div class="mt8"><span class="price">${money(a.m.price)}</span>${a.m.off ? `<span class="mrp">${money(a.m.mrp)}</span><span class="offp">${a.m.off}% ${t('off')}</span>` : ''}</div>${units(a.m) ? `<span class="pill-per">${money(a.m.price / units(a.m)).replace(/(\.\d\d)\d+/, '$1')} ${t('perTablet')}</span>` : ''}<div class="cardctl mt8" data-id="${a.m.id}">${ctl(a.m.id, 1)}</div></div></div><div class="foot2">${t('sameComp')}</div></div>`;
  DW.routes.search = (seg, q) => { const s = (q.get('q') || '').trim(); const items = s ? DW.search(s) : D.meds; return listPage(s || t('allMeds'), items, [s || t('allMeds')], s ? s : null); };
  DW.routes.category = seg => { const key = decodeURIComponent(seg[1] || ''); const name = tl(DW.catName(key)); return listPage(name, DW.catItems(key), [name]); };
  DW.routes.ayurveda = () => DW.routes.category(['category', 'ayurveda']);

  /* ---------- product page ---------- */
  const desc = m => {
    const c = D.CL[m.cls], uses = c[3].map(u => u.toLowerCase());
    const how = { strip: `Swallow ${m.name} whole with a glass of water. Do not crush or chew unless the pack says so. Take it at the same time every day.`, bottle: `Shake the bottle well. Measure the dose using the cap or a measuring spoon. Do not use a household spoon.`, tube: `Wash and dry the affected area. Apply a thin layer and rub in gently. Wash your hands afterwards. For external use only.`, spray: `Follow the instructions on the pack. For inhalers, shake well, breathe out, inhale deeply as you press and hold your breath for ten seconds.`, vial: `This injection is to be given by a healthcare professional. Do not self-administer unless trained.`, box: `Use as directed on the pack or by your healthcare professional.` }[kind(m.form)];
    return {
      sum: `${m.name} is ${/^[aeiou]/i.test(c[0]) ? 'an' : 'a'} ${c[0].toLowerCase()} product containing ${m.comp}. It ${c[5]}. ${m.rx ? 'It is a prescription-only medicine and should be used under medical supervision.' : 'It is available without a prescription, but should be used as directed.'}`,
      p2: `${m.name} is commonly used for ${uses.join(', ')}. Always follow your doctor's advice about dose and duration. Do not share this medicine with others and keep it out of reach of children.`,
      uses: c[3], benefits: c[3].map(u => [u, `${m.name} helps with ${u.toLowerCase()} by ${c[5]}. Regular and correct use as advised helps you feel better and carry on with your daily routine.`]),
      se: c[4], how, works: `${m.name} ${c[5]}.`, safety: c[6],
      faq: [[`Can I take ${m.name} on an empty stomach?`, `It depends on the medicine. In general, check the pack or ask your pharmacist. Taking it with food usually reduces stomach upset.`], [`What if I miss a dose of ${m.name}?`, `Take it as soon as you remember. If it is almost time for your next dose, skip the missed one. Never take a double dose.`], [`Is it safe to drink alcohol while using ${m.name}?`, `Alcohol can increase side effects with many medicines. It is best to avoid it or ask your doctor.`], [`How should I store ${m.name}?`, `Store in a cool, dry place away from direct sunlight and keep out of reach of children.`]]
    };
  };
  DW.routes.drug = seg => {
    const id = parseInt(seg[1]); const m = D.meds.find(x => x.id === id);
    if (!m) return { html: `<div class="container"><div class="empty">${ic('search', 52)}<h2>${t('noResults')}</h2><a class="btn" href="#/">${t('home')}</a></div></div>`, nav: 'home' };
    const d = desc(m), a = DW.alt(m), sim = D.meds.filter(x => x.cls === m.cls && x.id !== m.id).slice(0, 12);
    const subs = D.meds.filter(x => x.id !== m.id && x.cls === m.cls && x.comp.split(/[ (]/)[0] === m.comp.split(/[ (]/)[0]).slice(0, 8);
    const sec = (id2, h, body) => `<section class="sect" id="${id2}"><h2>${h}</h2>${body}</section>`;
    const html = `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}<a href="#/category/${m.cat}">${esc(m.parent)}</a>${ic('chevRight', 12)}<span>${esc(m.sub)}</span>${ic('chevRight', 12)}<span>${esc(m.name)}</span><span class="grow"></span><span class="langtog hm">${ic('globe', 14)} ${langName[S.lang] === 'EN' ? 'English - EN' : S.lang === 'hi' ? 'हिंदी - HI' : 'ਪੰਜਾਬੀ - PA'}</span></div>
      <div class="pdp"><div class="pdp-l"><div class="pdp-top"><div><h1>${esc(m.name)}</h1><div class="pk">${esc(m.pack.replace(/^(strip|bottle|tube|box|sachet|vial|pen|inhaler|jar|kit|pack) of /, ''))}</div>${m.rx ? `<div class="chip mt8" style="display:inline-block">${ic('rx', 14)} ${t('rxOnly')}</div>` : ''}<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">
        <div class="cmp">${t('composition')}:<a href="#/search?q=${encodeURIComponent(m.comp.split(/[ (]/)[0])}">${esc(m.comp)}</a>${t('marketer')}:<a href="#/search?q=${encodeURIComponent(m.marketer.split(' ')[0])}">${esc(m.marketer)}</a></div>
        ${a ? `<div class="cheapbox" data-a="altmodal" data-id="${m.id}">${ic('verified', 20)}<span><b>${t('cheaper', { n: a.pct })}</b></span>${ic('chevRight', 16)}</div>` : ''}</div>
        <div class="gal"><div class="main"><img id="gmain" src="${DW.art(m)}" alt="${esc(m.name)}"></div><div class="thumbs">${[0, 1, 2].map(i => `<button class="${i === 0 ? 'on' : ''}" data-a="thumb" data-i="${i}" data-id="${m.id}"><img src="${DW.art(m, i)}" alt="">${i === 2 ? '<span class="more">+3</span>' : ''}</button>`).join('')}</div></div></div>
      <div class="callrow"><div class="ci">${ic('phone', 24)}</div><div><b>${t('callBar')}</b><br>${t('callUs')} <a class="green sb" href="tel:18002122323">1800-212-2323</a> ${t('orCallback')}</div><div class="phone"><span>+91</span><input id="cbph2" type="tel" maxlength="10" placeholder="${t('phoneNumber')}"></div><button class="btn sm" data-a="callback2">${t('getCallback')}</button></div>
      <div class="assure"><div><b>${t('genuine')}</b><span>${t('authAssured')}</span></div><div><b>${t('nppa')}</b><a class="blue" data-a="nppa">${t('showDetails')}</a></div><div><b>${m.bought.toLocaleString('en-IN')} ${t('people')}</b><span>${t('peopleBought')}</span></div></div>
      <div class="getby">${ic('truck', 18)} ${t('getBy')} <b>${m.eta.replace('Get by ', '')}</b></div>
      <div class="prc"><b style="font-size:14px">${t('payReturns')}</b><div class="row">${ic('cod', 22)}<div><b>${t('cod')}</b><span>${t('codSub')}</span></div></div><div class="row">${ic('ret', 22)}<div><b>${t('return7')}</b><span>${t('returnSub')}</span></div></div><div class="row">${ic('calendar', 22)}<div><b>${t('expiryTitle')} Mar, 2029</b><span>${t('expirySub')}</span></div></div></div>
      <div class="tabs" id="tabs">${[['intro', 'intro'], ['uses', 'uses'], ['benefits', 'benefits'], ['se', 'sideEffects'], ['how', 'howToUse'], ['works', 'howWorks'], ['safety', 'safety'], ['faq', 'faqs'], ['subs', 'substitutes']].map(([a2, k], i) => `<a data-a="tab" data-t="${a2}" class="${i === 0 ? 'on' : ''}">${t(k).replace(/[:]$/, '')}</a>`).join('')}</div>
      ${sec('intro', t('intro'), `<p><b>${t('summary')}:</b> ${esc(d.sum)}</p><p>${esc(d.p2)}</p>`)}
      ${sec('uses', t('uses') + ' ' + esc(m.name), `<div class="chips">${d.uses.map(u => `<span class="chip g">${esc(u)}</span>`).join('')}</div>`)}
      ${sec('benefits', t('benefits') + ' ' + esc(m.name), d.benefits.map(b => `<p><b style="color:var(--ink)">${esc(b[0])}</b><br>${esc(b[1])}</p>`).join(''))}
      ${sec('se', t('sideEffects') + ' ' + esc(m.name), d.se.length ? `<p>${t('commonSE')}:</p><ul class="ul">${d.se.map(s => `<li>${esc(s)}</li>`).join('')}</ul><p>${t('consultDoc')}</p>` : `<p>${t('consultDoc')}</p>`)}
      ${sec('how', t('howToUse'), `<p>${esc(d.how)}</p>`)}${sec('works', t('howWorks'), `<p>${esc(d.works)}</p>`)}
      ${sec('safety', t('safety'), `<ul class="ul">${d.safety.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`)}
      ${sec('faq', t('faqs'), d.faq.map(f => `<div class="faq"><button data-a="faq">${esc(f[0])}${ic('chevDown', 16)}</button><div>${esc(f[1])}</div></div>`).join(''))}
      ${sec('subs', t('substitutes'), subs.length ? `<table class="subtbl"><tr><th>${t('name')}</th><th>${t('marketer')}</th><th>${t('mrp')}</th></tr>${subs.map(x => `<tr><td><a href="#/drug/${x.id}-${x.slug}">${esc(x.name)}</a></td><td>${esc(x.marketer)}</td><td>${money(x.price)}</td></tr>`).join('')}</table>` : `<p class="mute">${t('empty')}</p>`)}
      </div>
      <aside class="pdp-r"><div class="pbox"><div class="pp">${money(m.price)}${m.off ? `<span class="m">${t('mrp')} ${money(m.mrp)}</span><span class="o">${m.off}% ${t('off')}</span>` : ''}</div><div class="tx">${t('inclTax')}</div>
        <div class="offrow"><div class="offc"><b>${t('useCode')} DAWAANEW</b><br>Get for ${money(Math.round(m.price * 85) / 100)} on orders above ₹1200</div><div class="offc"><b>DAWAA10</b><br>10% off up to ₹100 on orders above ₹300</div></div>
        <div class="cpbox">${ic('gift', 16)} <b>Care Plan</b> · Extra 4% off + Free Delivery<br><span class="small">at ₹165 (3 months)</span></div>
        <div class="qty">${esc(m.pack.replace(/^(strip|bottle|tube|box|sachet|vial|pen|inhaler|jar|kit|pack) of /, ''))}</div>
        <div class="cardctl" data-id="${m.id}" data-big="1" data-pdp="1">${S.cart[m.id] ? ctl(m.id, 1) : `<button class="btn" data-a="addpdp" data-id="${m.id}">${t('add')}</button>`}</div>
        <p class="fine">${t('priceNote')}</p>${m.rx ? `<p class="fine blue">${ic('rx', 13)} ${t('rxNote')}</p>` : ''}
        ${a ? `<div class="gbox"><div class="gt">${t('genAvail')}</div><div class="gt" style="background:#0B7A5C;border-top:1px solid rgba(255,255,255,.2)">${t('sameComp')}: ${esc(m.comp.split('(')[0])}</div><div class="gr"><div class="gc"><div class="lbl">${t('currentlyViewing')}</div><img src="${DW.art(m)}" alt=""><b>${esc(m.name.slice(0, 22))}</b><div>${money(m.price)}</div></div><a class="gc hi" href="#/drug/${a.m.id}-${a.m.slug}"><div class="lbl" style="color:var(--green-d);font-weight:600">${t('lowerPrice', { n: a.pct })}</div><img src="${DW.art(a.m)}" alt=""><b>${esc(a.m.name.slice(0, 22))}</b><div>${money(a.m.price)}</div></a></div></div>` : ''}</div></aside></div>
      <section class="sec"><div class="sec-h"><h2>${t('similar')}</h2></div>${hs(sim.map(DW.pCard).join(''))}</section></div>`;
    return { html, nav: 'home', title: m.name + ' | DAWAA' };
  };
  DW.altModal = id => {
    const m = DW.item(id), a = DW.alt(m); if (!a) return;
    DW.modal(`<div class="altm"><div class="top"><h3>${t('savingsWith', { n: '<b>' + a.pct + '</b>' })}</h3><div class="small green" style="margin-top:6px">✓ ${t('sameComp')}</div></div>
    <div class="cmpr"><div class="c"><div class="small mute">${t('currentlyViewing')}</div><img src="${DW.art(m)}" alt=""><b>${esc(m.name)}</b><div class="small mute">${esc(m.pack)}</div><div><b>${money(m.price)}</b> <span class="mrp">${money(m.mrp)}</span></div></div><div class="c hi"><div class="small green sb">${t('cheaperTag', { n: a.pct })}</div><img src="${DW.art(a.m)}" alt=""><b>${esc(a.m.name)}</b><div class="small mute">${esc(a.m.pack)}</div><div><b>${money(a.m.price)}</b> <span class="mrp">${money(a.m.mrp)}</span></div></div></div>
    <button class="btn" data-a="switchalt" data-from="${m.id}" data-to="${a.m.id}">${t('switchAlt')}</button><button class="nn" data-a="closemodal">${t('notNow')}</button></div>`);
  };

  /* ---------- modal ---------- */
  DW.modal = (html, cls) => { $('#modals').innerHTML = `<div class="mbg open" data-a="mbg"><div class="modal ${cls || ''}" role="dialog"><button class="xx" data-a="closemodal" aria-label="${t('close')}">${ic('close', 16)}</button>${html}</div></div>`; };
  DW.closeModal = () => { $('#modals').innerHTML = ''; };
  DW.loginModal = (then) => {
    DW._then = then;
    const body = (step, val, err) => `<div class="login"><div class="lt">${ic('heartbeat', 80, 'blue')}<h3>${t('slide1')}</h3><p>${t('slide1b')}</p><div class="dots2"><i class="on"></i><i></i><i></i><i></i><i></i></div></div><div class="lr"><h2>${t('loginTitle')}</h2><p class="ls">${t('loginSub')}</p>
    ${step === 1 ? `<label class="fl"><small>${t('mobileOrEmail')}</small><input id="lid" autocomplete="username" value="${esc(val || '')}" autofocus></label>${err ? `<div class="err">${err}</div>` : ''}<button class="btn block" data-a="sendotp">${t('sendOtp')}</button><p class="mtext">${t('newTo')} <a data-a="sendotp-s">${t('signUpLink')}</a></p>`
        : `<p class="small mute" style="margin-bottom:10px">${t('otpSent')} <b>${esc(val)}</b></p><label class="fl"><small>${t('enterOtp')}</small><input id="lotp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" autofocus></label><div class="small blue" style="margin:-8px 0 12px">${t('demoOtp')}</div>${err ? `<div class="err">${err}</div>` : ''}<button class="btn block" data-a="verifyotp" data-v="${esc(val)}">${t('verify')}</button><p class="mtext"><a data-a="sendotp-r" data-v="${esc(val)}">${t('resend')}</a></p>`}
    <p class="mtext" style="margin-top:18px">${t('agree')} <a>${t('terms')}</a> ${t('and')} <a>${t('privacy')}</a></p><p class="mtext"><a href="#/help" data-a="closemodal">${t('needHelpLink')}</a> &nbsp; <a href="#/help" data-a="closemodal">${t('getInTouch')}</a></p></div></div>`;
    DW._loginBody = body; DW.modal(body(1), 'wide');
  };
  DW.locModal = () => DW.modal(`<div class="locm"><div class="mpad"><h3>${t('selectLocation')}</h3><label class="fl"><small>${t('enterPincode')}</small><input id="pin" inputmode="numeric" maxlength="6" value="${esc(S.loc.pin)}"></label><div class="err hide" id="pinerr">${t('pincodeErr')}</div><div class="flex gap8"><button class="btn grow" data-a="setpin">${t('apply')}</button><button class="btn ghost grow" data-a="detect">${ic('gps', 16)} ${t('detect')}</button></div></div></div>`);
  const PINS = { '110': 'Delhi', '122': 'Gurgaon', '201': 'Noida', '400': 'Mumbai', '560': 'Bengaluru', '600': 'Chennai', '700': 'Kolkata', '500': 'Hyderabad', '411': 'Pune', '380': 'Ahmedabad', '160': 'Chandigarh', '141': 'Ludhiana', '143': 'Amritsar', '144': 'Jalandhar', '302': 'Jaipur', '226': 'Lucknow', '147': 'Patiala' };
  const CITY = [['Delhi', 28.61, 77.21, '110001'], ['Gurgaon', 28.46, 77.03, '122001'], ['Noida', 28.57, 77.32, '201301'], ['Mumbai', 19.08, 72.88, '400001'], ['Bengaluru', 12.97, 77.59, '560001'], ['Chennai', 13.08, 80.27, '600001'], ['Kolkata', 22.57, 88.36, '700001'], ['Hyderabad', 17.39, 78.49, '500001'], ['Pune', 18.52, 73.86, '411001'], ['Chandigarh', 30.73, 76.78, '160017'], ['Ludhiana', 30.9, 75.86, '141001'], ['Amritsar', 31.63, 74.87, '143001'], ['Jaipur', 26.91, 75.79, '302001'], ['Lucknow', 26.85, 80.95, '226001']];
  DW.setLoc = (city, pin) => { S.loc = { city, pin }; DW.save('loc'); DW.closeModal(); DW.mount(); DW.toast(t('deliverTo') + ': ' + city); };
  DW.cityFromPin = pin => PINS[pin.slice(0, 3)] || (S.loc.city);
  DW.nearest = (la, lo) => CITY.map(c => [Math.hypot(c[1] - la, c[2] - lo), c]).sort((a, b) => a[0] - b[0])[0][1];

  /* ---------- chrome mounting + router ---------- */
  let current = { nav: 'home', min: false };
  DW.mount = () => {
    const seg = (location.hash.replace(/^#/, '') || '/').split('?')[0].split('/').filter(Boolean);
    const min = ['cart', 'checkout', 'order'].includes(seg[0]);
    $('#header').innerHTML = DW.header(min, current.nav);
    $('#footer').innerHTML = min ? '' : DW.footer();
    $('#callbar').innerHTML = min ? '' : DW.callbar(); document.body.classList.toggle('hascall', !min && !!$('#callbar .callbar'));
    $('#drawer').innerHTML = DW.drawer();
    $('#totop').innerHTML = ic('up', 20);
    document.documentElement.lang = S.lang; bindSearch();
  };
  let rendering = false;
  DW.render = () => {
    const raw = location.hash.replace(/^#/, '') || '/'; const [path, qs] = raw.split('?'); const q = new URLSearchParams(qs || '');
    const seg = path.split('/').filter(Boolean); const r = DW.routes[seg[0] || 'home'] || DW.routes.home;
    const res = r(seg, q) || { html: '' };
    current = { nav: res.nav || '' };
    $('#app').innerHTML = res.html; DW.mount();
    document.title = res.title || 'DAWAA | Online Pharmacy India – Buy Medicines, Book Lab Tests, Consult Doctors';
    window.scrollTo(0, 0); if (res.after) res.after(seg, q); DW.refreshCart();
    if (seg[0] === 'search' && $('#q')) $('#q').value = q.get('q') || '';
  };
  function bindSearch() {
    $$('#q').forEach(inp => {
      const box = inp.closest('.searchbox'), sg = $('.sugg', box); let act = -1;
      const run = () => {
        const v = inp.value.trim(); if (v.length < 2) { sg.classList.remove('open'); return; }
        const r = DW.search(v, 8); act = -1;
        sg.innerHTML = r.length ? `<div class="hd">${t('medicines')}</div>` + r.map(m => `<a href="#/drug/${m.id}-${m.slug}"><img src="${DW.art(m)}" alt=""><div><div class="t">${esc(m.name)}</div><div class="s">${esc(m.comp)}</div></div></a>`).join('') + `<a href="#/search?q=${encodeURIComponent(v)}" style="color:var(--blue);font-weight:600">${ic('search', 16)} ${t('searchResultsFor')} “${esc(v)}”</a>` : `<div class="hd">${t('noResults')}</div>`;
        sg.classList.add('open');
      };
      inp.addEventListener('input', run);
      inp.addEventListener('keydown', e => {
        const items = $$('a', sg);
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!items.length) return; act = (act + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items.forEach((a, i) => a.classList.toggle('act', i === act)); }
        else if (e.key === 'Enter') { e.preventDefault(); if (act >= 0 && items[act]) location.hash = items[act].getAttribute('href'); else if (inp.value.trim()) location.hash = '#/search?q=' + encodeURIComponent(inp.value.trim()); sg.classList.remove('open'); inp.blur(); }
        else if (e.key === 'Escape') sg.classList.remove('open');
      });
    });
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.searchbox')) $$('.sugg').forEach(s => s.classList.remove('open'));
    if (!e.target.closest('.langsel')) $$('.langsel').forEach(s => s.classList.remove('open'));
  });
  window.addEventListener('hashchange', () => { DW.render(); });
  window.addEventListener('scroll', () => { const b = $('#totop'); if (b) b.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  DW.start = () => { document.documentElement.lang = S.lang; DW.render(); };

  /* ---------- global actions ---------- */
  const A = {
    add(el) { const id = el.dataset.id; DW.add(id); const it = DW.item(id); DW.toast((it ? it.name.slice(0, 28) : '') + ' — ' + t('added'), [t('cart'), '#/cart']); },
    addpdp(el) { const id = el.dataset.id; DW.add(id); if (DW.alt(DW.item(id))) DW.altModal(id); else DW.toast(t('added'), [t('cart'), '#/cart']); },
    inc(el) { DW.setQty(el.dataset.id, DW.qty(el.dataset.id) + 1); }, dec(el) { DW.setQty(el.dataset.id, DW.qty(el.dataset.id) - 1); },
    altmodal(el) { DW.altModal(el.dataset.id); },
    switchalt(el) { const q = DW.qty(el.dataset.from) || 1; DW.setQty(el.dataset.from, 0); DW.add(el.dataset.to, q); DW.closeModal(); location.hash = '#/drug/' + (DW.item(el.dataset.to).id + '-' + DW.item(el.dataset.to).slug); DW.toast(t('added'), [t('cart'), '#/cart']); },
    closemodal() { DW.closeModal(); }, mbg(el, e) { if (e.target === el) DW.closeModal(); },
    login() { closeDrawer(); DW.loginModal(); },
    sendotp(el) { const v = ($('#lid').value || '').trim(); const ok = /^[6-9]\d{9}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); $('.modal').innerHTML = `<button class="xx" data-a="closemodal">${ic('close', 16)}</button>` + DW._loginBody(ok ? 2 : 1, v, ok ? '' : t('inputBad')); },
    'sendotp-s'() { A.sendotp(); }, 'sendotp-r'(el) { $('.modal').innerHTML = `<button class="xx" data-a="closemodal">${ic('close', 16)}</button>` + DW._loginBody(2, el.dataset.v, ''); DW.toast(t('otpSent') + ' ' + el.dataset.v); },
    verifyotp(el) { const o = ($('#lotp').value || '').trim(); if (o !== '123456') { $('.modal').innerHTML = `<button class="xx" data-a="closemodal">${ic('close', 16)}</button>` + DW._loginBody(2, el.dataset.v, t('otpBad')); return; } const v = el.dataset.v; S.user = { id: v, short: v.includes('@') ? v.split('@')[0].slice(0, 10) : '••' + v.slice(-4) }; DW.save('user'); DW.closeModal(); DW.mount(); DW.toast(t('welcome') + ', ' + S.user.short); const th = DW._then; DW._then = null; if (th) th(); },
    logout() { S.user = null; DW.save('user'); DW.mount(); closeDrawer(); DW.toast(t('logout')); },
    lang(el) { S.lang = el.dataset.l; DW.save('lang'); closeDrawer(); DW.render(); },
    langtoggle(el) { el.closest('.langsel').classList.toggle('open'); }, usermenu(el) { el.closest('.userbox').classList.toggle('open'); },
    drawer() { $('.drawer-bg').classList.add('open'); $('#dr').classList.add('open'); }, drawerclose() { closeDrawer(); }, dacc(el) { el.parentElement.classList.toggle('open'); },
    loc() { DW.locModal(); },
    setpin() { const v = $('#pin').value.trim(); if (!/^\d{6}$/.test(v)) { $('#pinerr').classList.remove('hide'); return; } DW.setLoc(DW.cityFromPin(v), v); },
    detect() { if (!navigator.geolocation) { DW.toast(t('pincodeErr')); return; } navigator.geolocation.getCurrentPosition(p => { const c = DW.nearest(p.coords.latitude, p.coords.longitude); DW.setLoc(c[0], c[3]); }, () => DW.toast(t('pincodeErr'))); },
    dosearch(el) { const i = $('input', el.closest('.searchbox')); if (i.value.trim()) location.hash = '#/search?q=' + encodeURIComponent(i.value.trim()); },
    cprev() { DW.setSlide(cIdx - 1); startCar(); }, cnext() { DW.setSlide(cIdx + 1); startCar(); }, cdot(el) { DW.setSlide(+el.dataset.i); startCar(); },
    cpause(el) { cPaused = !cPaused; el.innerHTML = ic(cPaused ? 'play' : 'pause', 14); },
    hs(el) { const s = $('.hs', el.closest('.hsw')); s.scrollBy({ left: +el.dataset.d * s.clientWidth * .8, behavior: 'smooth' }); },
    callback() { const v = ($('#cbph').value || '').trim(); if (!/^[6-9]\d{9}$/.test(v)) { DW.toast(t('inputBad')); return; } DW.toast(t('callbackDone')); $('#cbph').value = ''; },
    callback2() { const v = ($('#cbph2').value || '').trim(); if (!/^[6-9]\d{9}$/.test(v)) { DW.toast(t('inputBad')); return; } DW.toast(t('callbackDone')); $('#cbph2').value = ''; },
    closecall() { try { sessionStorage.setItem('dw_nocall', '1'); } catch (e) { } $('#callbar').innerHTML = ''; document.body.classList.remove('hascall'); },
    nppa() { DW.modal(`<div class="mpad"><h3>${t('nppa')}</h3><p class="small" style="margin-top:10px;color:var(--ink2)">The prices of scheduled medicines are regulated by the National Pharmaceutical Pricing Authority (NPPA). Ceiling prices are checked before each listing. (Demo information.)</p></div>`); },
    thumb(el) { const m = DW.item(el.dataset.id); $('#gmain').src = DW.art(m, +el.dataset.i); $$('.thumbs button').forEach(b => b.classList.remove('on')); el.classList.add('on'); },
    tab(el) { const s = document.getElementById(el.dataset.t); if (s) s.scrollIntoView({ behavior: 'smooth' }); $$('#tabs a').forEach(a => a.classList.remove('on')); el.classList.add('on'); },
    faq(el) { el.parentElement.classList.toggle('open'); },
    ftog(el) { const L = DW._list, set = el.dataset.c === 'b' ? L.fb : L.ff; el.checked ? set.add(el.dataset.v) : set.delete(el.dataset.v); paintList(); },
    fclear() { const L = DW._list; L.fb.clear(); L.ff.clear(); paintList(); }, fopen() { $('#filters').classList.add('open'); }, fclose() { $('#filters').classList.remove('open'); }
  };
  DW.A = A;
  function closeDrawer() { const b = $('.drawer-bg'), d = $('#dr'); b && b.classList.remove('open'); d && d.classList.remove('open'); }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-a]'); if (!el) return; const f = A[el.dataset.a]; if (!f) return;
    if (el.tagName === 'INPUT') return; if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href') !== 'javascript:void(0)' && el.dataset.a !== 'closemodal') return f(el, e); f(el, e);
  });
  document.addEventListener('change', e => { const el = e.target; if (el.dataset && el.dataset.a && el.tagName === 'INPUT' && A[el.dataset.a]) A[el.dataset.a](el, e); if (el.id === 'sortsel' && DW._list) { DW._list.sort = el.value; paintList(); } });
  document.addEventListener('input', e => { if (e.target.id === 'bq' && DW._list) { DW._list.bq = e.target.value.toLowerCase(); const L = DW._list; const bl = $('#bl'); paintList(); } });
  document.getElementById('totop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { DW.closeModal(); closeDrawer(); } });
})();
