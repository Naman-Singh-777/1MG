/* DAWAA pages: cart, checkout, orders, labs, doctors and informational pages */
(function () {
  const DW = window.DW, D = DW.D, S = DW.S, t = DW.t, tl = DW.tl, ic = window.ic, money = DW.money, esc = DW.esc, $ = DW.$, $$ = DW.$$, A = DW.A;

  /* ---------- cart ---------- */
  const cartRow = ({ it, q }) => {
    const a = !it.isLab && DW.alt(it);
    return `<div class="citem"><img src="${it.isLab ? 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 56"><rect width="70" height="56" fill="#E3F6EF"/><path d="M30 12h10M32 12v14L22 44a3 3 0 0 0 2.6 4.4h20.8A3 3 0 0 0 48 44L38 26V12" fill="none" stroke="#12A07A" stroke-width="2.5" stroke-linecap="round"/></svg>') : DW.art(it)}" alt="">
      <div><a class="nm" href="${it.isLab ? '#/labs' : '#/drug/' + it.id + '-' + it.slug}">${esc(it.name)}</a><div class="pk">${it.isLab ? t('lab') + ' · ' + it.tests + ' tests' : esc(it.pack.charAt(0).toUpperCase() + it.pack.slice(1))}</div>${a ? `<span class="gen" data-a="altmodal" data-id="${it.id}">${ic('verified', 13)} ${t('cheaper', { n: a.pct })}</span>` : ''}</div>
      <div class="rt"><div><b>${money(it.price * q)}</b> ${it.off ? `<span class="mrp">${money(it.mrp * q)}</span> <span class="offp">${it.off}% ${t('off')}</span>` : ''}</div>
      <div class="qtybox"><button class="${q > 1 ? '' : 'del'}" data-a="${q > 1 ? 'dec' : 'del'}" data-id="${it.id}" aria-label="${q > 1 ? '-' : t('remove')}">${ic(q > 1 ? 'minus' : 'trash', 16)}</button><span>${q}</span><button data-a="inc" data-id="${it.id}" aria-label="+">${ic('plus', 16)}</button></div></div></div>`;
  };
  DW.routes.cart = () => {
    const its = DW.cartItems();
    if (!its.length) return { html: `<div class="container"><div class="empty">${ic('cart', 64)}<h2>${t('cartEmpty')}</h2><p>${t('cartEmptySub')}</p><a class="btn" href="#/">${t('continueShopping')}</a></div></div>`, nav: '', title: t('cart') + ' | DAWAA' };
    const b = DW.bill(), rxs = its.filter(x => x.it.rx && !x.it.isLab), nrx = its.filter(x => !x.it.rx && !x.it.isLab), labs = its.filter(x => x.it.isLab);
    const inCart = new Set(its.map(x => String(x.it.id)));
    const deals = D.meds.filter(m => !inCart.has(String(m.id)) && m.off >= 10).slice(0, 12), last = D.meds.filter(m => !inCart.has(String(m.id)) && m.price < 60).slice(0, 12);
    const pkg = D.LABS.find(l => l.id === 'L101');
    const html = `<div class="container"><div class="cartwrap"><div class="cartl"><h2>${b.count === 1 ? t('itemAdded', { n: 1 }) : t('itemsAdded', { n: b.count })}</h2>
      ${nrx.length ? `<div class="sub">${t('noRx')}</div>${nrx.map(cartRow).join('')}` : ''}
      ${rxs.length ? `<div class="sub">${t('rxItems')}</div><div class="rxwarn ${S.rx ? 'rxok' : ''}">${ic('rx', 20)}<span>${S.rx ? t('rxUploaded') + ': ' + esc(S.rx.name) : t('rxNeeded')}</span><button class="btn sm ${S.rx ? 'ghost' : ''}" data-a="rxmodal">${t('uploadRx')}</button></div>${rxs.map(cartRow).join('')}` : ''}
      ${labs.length ? `<div class="sub">${t('lab')} · ${t('sampleAtHome')}</div>${labs.map(cartRow).join('')}` : ''}
      <h2 style="margin-top:34px">${t('topDeals')}</h2><div class="mt16">${DW.hs(deals.map(DW.pCard).join(''))}</div>
      <h2 style="margin-top:20px">${t('lastMinute')}</h2><div class="mt16">${DW.hs(last.map(DW.pCard).join(''))}</div></div>
      <aside class="cartr">
      ${S.care ? `<div class="cardbox"><span class="chip g">${ic('check', 14)} Care Plan</span></div>` : `<div class="cardbox"><span class="chip">Care Plan</span><div class="t mt8">${t('saveExtra', { n: Math.max(1, Math.round(b.sell * .05)) })}</div><div class="small mt8" style="color:var(--warn)">${t('becomeCare')}</div><div class="small mute">${t('careFor')} <span class="mrp">₹549</span> <span class="offp">70% ${t('off')}</span></div><div class="flex gap16 mt16 ac"><a class="blue sb" href="#/careplan" style="flex:1;text-align:center">${t('knowMore')}</a><button class="btn" style="flex:1" data-a="addcare">${t('addMembership')}</button></div></div>`}
      <div class="cardbox"><button class="coup" data-a="coupon">${ic('tag', 20)} ${S.coupon ? S.coupon + ' ✓' : t('applyCoupon')} <span class="grow"></span>${S.coupon ? `<span class="small blue" data-a="rmcoupon">${t('remove')}</span>` : ic('chevRight', 16)}</button><div class="coupin" id="coupin"><input id="cpv" placeholder="${t('couponPh')}" value=""><button class="btn" data-a="applycp" style="height:38px">${t('apply')}</button></div></div>
      <div class="cardbox"><div class="t">${t('vitalOrgans')}</div><label class="fopt mt8" style="align-items:flex-start"><input type="checkbox" data-a="pkgtog" ${S.cart.L101 ? 'checked' : ''}><span class="small">${t('bookPkg').replace(/₹\d+/, money(pkg.price))}<br><span class="blue">${t('sampleAtHome')}</span></span></label></div>
      <div class="cardbox bill"><div class="t">${t('billSummary')}</div>
        <div class="r"><span>${t('itemTotal')}</span><span>${money(b.mrp)}</span></div><div class="r"><span>${t('handling')}</span><span>${money(b.hand)}</span></div><div class="r"><span>${t('totalDisc')}</span><span class="g">-${money(b.disc + b.cd + b.careDisc)}</span></div><div class="r"><span>${t('shipping')}</span><span class="g">${b.ship === null ? 'As per delivery address' : (b.ship ? money(b.ship) : t('free'))}</span></div>
        <div class="r t"><span>${t('toPay')}</span><span>${money(b.total)}</span></div>${b.save > 0 ? `<div class="savebar">${t('youSave', { n: Math.round(b.save * 100) / 100 })}</div>` : ''}</div>
      <div class="delv"><div style="display:flex;gap:10px;align-items:center">${ic('pin', 20, 'blue')}<div><span class="small mute">${t('deliveringTo')}</span><b>${esc(S.addr ? S.addr.city + ' – ' + S.addr.pin : S.loc.city)}</b></div></div><a data-a="loc">${S.addr ? t('change') : t('addAddress')}</a></div>
      <button class="btn" data-a="cont">${t('continue')}</button></aside></div></div>`;
    return { html, nav: '', title: t('cart') + ' | DAWAA' };
  };
  DW.onCart = () => {
    if (!/^#\/cart/.test(location.hash)) return;
    const y = window.scrollY; $('#app').innerHTML = DW.routes.cart().html;
    $$('#app .cardctl').forEach(el => { el.innerHTML = DW.ctl(el.dataset.id, el.dataset.big); }); window.scrollTo(0, y);
  };
  A.del = el => DW.setQty(el.dataset.id, 0);
  A.addcare = () => { S.care = true; DW.save('care'); DW.refreshCart(); DW.toast('Care Plan ' + t('added')); };
  A.coupon = el => { if (S.coupon) return; $('#coupin').classList.toggle('open'); };
  A.rmcoupon = () => { S.coupon = null; DW.save('coupon'); DW.refreshCart(); };
  A.applycp = () => { const v = ($('#cpv').value || '').trim().toUpperCase(); if (['DAWAANEW', 'DAWAA10', 'CARE5'].includes(v)) { S.coupon = v; DW.save('coupon'); DW.refreshCart(); DW.toast(t('couponOk')); } else DW.toast(t('couponBad')); };
  A.pkgtog = el => { DW.setQty('L101', el.checked ? 1 : 0); };
  A.rxmodal = () => DW.modal(`<div class="mpad"><h3>${t('uploadRx')}</h3><p class="small mute" style="margin:8px 0 14px">JPG, PNG or PDF · Max 5 MB</p><label class="dropz" style="margin:0;display:block">${ic('upload', 34, 'blue')}<div class="mt8 sb">${t('uploadRx')}</div><input type="file" id="rxf" accept="image/*,.pdf" class="sr"></label></div>`);
  document.addEventListener('change', e => {
    if (e.target.id === 'rxf' && e.target.files[0]) { const f = e.target.files[0]; if (f.size > 5 * 1048576) { DW.toast('Max 5 MB'); return; } S.rx = { name: f.name.slice(0, 40), ts: Date.now() }; DW.save('rx'); DW.closeModal(); DW.toast(t('rxUploaded')); DW.refreshCart(); if (/quick-order/.test(location.hash)) DW.render(); }
  });
  A.cont = () => {
    const its = DW.cartItems(); if (!its.length) return;
    if (DW.needRx() && !S.rx) { A.rxmodal(); return; }
    const go = () => { location.hash = '#/checkout'; };
    if (!S.user) DW.loginModal(go); else go();
  };

  /* ---------- checkout ---------- */
  const CO = { pay: 'upi', bank: '', wallet: 'Paytm', editing: false };
  const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Mahindra'];
  const WALLETS = ['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'];
  const addrForm = () => { const a = S.addr || {}; return `<div class="row2"><label class="fl"><small>${t('name')} *</small><input id="a_name" value="${esc(a.name || '')}" autocomplete="name"></label><label class="fl"><small>${t('mobile')} *</small><input id="a_mob" inputmode="numeric" maxlength="10" value="${esc(a.mob || (S.user && /^\d{10}$/.test(S.user.id) ? S.user.id : ''))}" autocomplete="tel-national"></label></div>
    <div class="row2"><label class="fl"><small>${t('pincode')} *</small><input id="a_pin" inputmode="numeric" maxlength="6" value="${esc(a.pin || S.loc.pin)}"></label><label class="fl"><small>${t('city')} *</small><input id="a_city" value="${esc(a.city || S.loc.city)}"></label></div>
    <label class="fl"><small>${t('house')} *</small><input id="a_house" value="${esc(a.house || '')}"></label><label class="fl"><small>${t('area')} *</small><input id="a_area" value="${esc(a.area || '')}"></label><label class="fl"><small>${t('state')}</small><input id="a_state" value="${esc(a.state || '')}"></label><div class="err hide" id="a_err">${t('fillAll')}</div><button class="btn" data-a="saveaddr">${t('saveAddress')}</button>`; };
  const payOpt = (k, icon, title, sub, body) => `<div class="payopt ${CO.pay === k ? 'sel' : ''}"><label><input type="radio" name="pay" data-a="paysel" data-k="${k}" ${CO.pay === k ? 'checked' : ''}><span class="pi">${ic(icon, 20)}</span><div><b>${title}</b><small>${sub}</small></div></label><div class="pb">${body || ''}</div></div>`;
  DW.routes.checkout = () => {
    if (!DW.cartItems().length) { location.hash = '#/cart'; return { html: '' }; }
    if (!S.user) { setTimeout(() => DW.loginModal(() => DW.render()), 50); }
    const b = DW.bill(), its = DW.cartItems(), hasA = !!S.addr && !CO.editing;
    const html = `<div class="container"><div class="cowrap"><div>
      <div class="step"><h3><i>1</i>${t('address')}</h3>${hasA ? `<div class="addrc"><b>${esc(S.addr.name)}</b> · ${esc(S.addr.mob)}<br>${esc(S.addr.house)}, ${esc(S.addr.area)}<br>${esc(S.addr.city)}${S.addr.state ? ', ' + esc(S.addr.state) : ''} – ${esc(S.addr.pin)}</div><button class="btn sm ghost mt16" data-a="editaddr">${t('change')}</button>` : addrForm()}</div>
      <div class="step ${hasA ? '' : 'dis'}"><h3><i>2</i>${t('payment')}</h3>
        ${payOpt('upi', 'upi', t('upi'), t('upiSub'), `<label class="fl"><small>${t('upiId')}</small><input id="p_upi" autocomplete="off"></label>`)}
        ${payOpt('card', 'card', t('card'), t('cardSub'), `<label class="fl"><small>${t('cardNo')}</small><input id="p_card" inputmode="numeric" maxlength="19" autocomplete="off"></label><label class="fl"><small>${t('cardName')}</small><input id="p_cname" autocomplete="off"></label><div class="row2"><label class="fl"><small>${t('expiry')}</small><input id="p_exp" maxlength="5" placeholder="MM/YY" autocomplete="off"></label><label class="fl"><small>${t('cvv')}</small><input id="p_cvv" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></label></div>`)}
        ${payOpt('net', 'bank', t('netbank'), t('netbankSub'), `<div class="small mute" style="margin-bottom:8px">${t('chooseBank')}</div><div class="banks">${BANKS.map(x => `<button data-a="bank" data-v="${esc(x)}" class="${CO.bank === x ? 'on' : ''}">${x}</button>`).join('')}</div>`)}
        ${payOpt('wallet', 'wallet', t('wallet'), t('walletSub'), `<div class="banks">${WALLETS.map(x => `<button data-a="wallet" data-v="${x}" class="${CO.wallet === x ? 'on' : ''}">${x}</button>`).join('')}</div>`)}
        ${payOpt('cod', 'cod', t('codOpt'), t('codSub2'), '')}<div class="err hide" id="p_err">${t('payInvalid')}</div></div></div>
      <aside class="sumbox"><h3>${t('orderSummary')}</h3>${its.map(({ it, q }) => `<div class="sumit"><span>${esc(it.name.slice(0, 34))} × ${q}</span><b>${money(it.price * q)}</b></div>`).join('')}<hr style="border:0;border-top:1px dashed var(--line)">
        <div class="sumit"><span>${t('itemTotal')}</span><span>${money(b.mrp)}</span></div><div class="sumit"><span>${t('totalDisc')}</span><span class="green">-${money(b.disc + b.cd + b.careDisc)}</span></div><div class="sumit"><span>${t('handling')}</span><span>${money(b.hand)}</span></div><div class="sumit"><span>${t('shipping')}</span><span class="green">${b.ship ? money(b.ship) : t('free')}</span></div>
        <div class="sumit" style="font-size:15px;font-weight:600;border-top:1px solid var(--line);margin-top:6px;padding-top:12px"><span>${t('toPay')}</span><span>${money(b.total)}</span></div>
        <button class="btn block mt16" data-a="place" ${hasA ? '' : 'disabled'} style="height:46px">${CO.pay === 'cod' ? t('placeOrder') : t('payNow', { n: Math.round(b.total * 100) / 100 })}</button><div class="testnote">${t('testNote')}</div></aside></div></div>`;
    return { html, nav: '', title: t('checkout') + ' | DAWAA' };
  };
  const rerenderCo = () => { const y = scrollY; $('#app').innerHTML = DW.routes.checkout().html; scrollTo(0, y); };
  A.saveaddr = () => {
    const g = id => ($('#' + id).value || '').trim(); const a = { name: g('a_name'), mob: g('a_mob'), pin: g('a_pin'), city: g('a_city'), house: g('a_house'), area: g('a_area'), state: g('a_state') };
    if (!a.name || !/^[6-9]\d{9}$/.test(a.mob) || !/^\d{6}$/.test(a.pin) || !a.city || !a.house || !a.area) { $('#a_err').classList.remove('hide'); return; }
    S.addr = a; DW.save('addr'); S.loc = { city: a.city, pin: a.pin }; DW.save('loc'); CO.editing = false; rerenderCo();
  };
  A.editaddr = () => { CO.editing = true; rerenderCo(); };
  A.paysel = el => { CO.pay = el.dataset.k; const keep = {}; $$('.pb input').forEach(i => keep[i.id] = i.value); rerenderCo(); Object.entries(keep).forEach(([k, v]) => { const i = $('#' + k); if (i) i.value = v; }); };
  A.bank = el => { CO.bank = el.dataset.v; $$('.banks button', el.parentElement).forEach(b => b.classList.toggle('on', b === el)); };
  A.wallet = el => { CO.wallet = el.dataset.v; $$('.banks button', el.parentElement).forEach(b => b.classList.toggle('on', b === el)); };
  const luhn = n => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
  A.place = el => {
    const v = id => (($('#' + id) || {}).value || '').trim(); let ok = true;
    if (CO.pay === 'upi') ok = /^[\w.\-]{2,}@[a-z]{2,}$/i.test(v('p_upi'));
    else if (CO.pay === 'card') { const n = v('p_card').replace(/\s/g, ''), e = /^(0[1-9]|1[0-2])\/(\d\d)$/.exec(v('p_exp')); ok = /^\d{13,19}$/.test(n) && luhn(n) && !!v('p_cname') && !!e && (2000 + +e[2]) * 12 + +e[1] >= new Date().getFullYear() * 12 + new Date().getMonth() + 1 && /^\d{3,4}$/.test(v('p_cvv')); }
    else if (CO.pay === 'net') ok = !!CO.bank;
    if (!ok) { $('#p_err').classList.remove('hide'); $('#p_err').scrollIntoView({ block: 'center' }); return; }
    el.disabled = true; el.textContent = t('loading');
    setTimeout(() => {
      const b = DW.bill(), id = 'DW' + Date.now().toString().slice(-9), d = new Date(), eta = new Date(Date.now() + 86400000 * 2);
      const o = { id, items: DW.cartItems().map(({ it, q }) => ({ name: it.name, q, price: it.price })), total: Math.round(b.total * 100) / 100, addr: S.addr, pay: CO.pay === 'net' ? 'Net banking – ' + CO.bank : CO.pay === 'wallet' ? CO.wallet : CO.pay === 'cod' ? 'Cash on delivery' : CO.pay.toUpperCase(), date: d.toISOString(), eta: eta.toDateString() };
      S.orders.unshift(o); DW.save('orders'); S.cart = {}; DW.save('cart'); S.coupon = null; DW.save('coupon'); S.rx = null; DW.save('rx'); CO.pay = 'upi';
      location.hash = '#/order/' + id;
    }, 1200);
  };
  DW.routes.order = seg => {
    const o = S.orders.find(x => x.id === seg[1]); if (!o) { return { html: `<div class="container"><div class="empty">${ic('box', 60)}<h2>${t('noOrders')}</h2><a class="btn" href="#/">${t('continueShopping')}</a></div></div>` }; }
    return { html: `<div class="container"><div class="done"><div class="ok">${ic('check', 46)}</div><h1>${t('orderPlaced')}</h1><p>${t('thankYou')}</p><div class="orderbox"><div class="sumit"><span>${t('orderId')}</span><b>${o.id}</b></div><div class="sumit"><span>${t('expectedBy')}</span><b>${o.eta}</b></div><div class="sumit"><span>${t('payment')}</span><b>${esc(o.pay)}</b></div><hr style="border:0;border-top:1px dashed var(--line)">${o.items.map(i => `<div class="sumit"><span>${esc(i.name)} × ${i.q}</span><b>${money(i.price * i.q)}</b></div>`).join('')}<div class="sumit" style="font-weight:600;font-size:15px"><span>${t('total')}</span><span>${money(o.total)}</span></div><div class="small mute mt8">${esc(o.addr.name)}, ${esc(o.addr.house)}, ${esc(o.addr.area)}, ${esc(o.addr.city)} – ${esc(o.addr.pin)}</div></div><div class="flex gap16" style="justify-content:center;flex-wrap:wrap"><a class="btn" href="#/orders">${t('trackOrder')}</a><a class="btn ghost" href="#/">${t('continueShopping')}</a></div></div></div>`, title: t('orderPlaced') };
  };
  DW.routes.orders = () => ({ html: `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}<span>${t('myOrders')}</span></div><h1 style="font-size:20px;margin-bottom:16px">${t('myOrders')}</h1>${S.orders.length ? S.orders.map(o => `<div class="ordcard"><div class="oh"><span>${t('orderId')}: <b>${o.id}</b></span><span>${t('ordersOn')} ${new Date(o.date).toLocaleDateString('en-IN')}</span><span class="st">${t('confirmed')}</span></div>${o.items.map(i => `<div class="sumit"><span>${esc(i.name)} × ${i.q}</span><b>${money(i.price * i.q)}</b></div>`).join('')}<div class="sumit" style="border-top:1px solid var(--line);margin-top:6px;padding-top:8px"><span>${esc(o.pay)} · ${t('expectedBy')}: ${o.eta}</span><b>${t('total')}: ${money(o.total)}</b></div></div>`).join('') : `<div class="empty">${ic('box', 60)}<h2>${t('noOrders')}</h2><a class="btn" href="#/">${t('continueShopping')}</a></div>`}</div>`, nav: '' });

  /* ---------- labs / doctors / info pages ---------- */
  const hero = (title, sub, extra) => `<div class="pg-hero"><h1>${title}</h1><p>${sub}</p>${extra || ''}</div>`;
  DW.routes.labs = () => ({ nav: 'labs', title: t('labTests') + ' | DAWAA', html: `<div class="container">${hero(t('labsTitle'), t('labsSub'))}<section class="sec"><div class="sec-h"><h2>${t('packages')}</h2></div><div class="flex" style="flex-wrap:wrap;gap:14px">${D.LABS.filter(l => l.type === 'package').map(DW.labCard).join('')}</div></section><section class="sec"><div class="sec-h"><h2>${t('tests')}</h2></div><div class="flex" style="flex-wrap:wrap;gap:14px">${D.LABS.filter(l => l.type === 'test').map(DW.labCard).join('')}</div></section></div>` });
  const SPEC = [['General Physician', 'steth', 399], ['Dermatology', 'skin', 499], ['Gynaecology', 'heart', 549], ['Paediatrics', 'baby', 449], ['Cardiology', 'heartbeat', 699], ['Psychiatry', 'heart', 599], ['Diabetology', 'drop', 499], ['ENT', 'eye', 449]];
  DW.routes.doctors = () => ({ nav: 'doctors', title: t('consultDoctors') + ' | DAWAA', html: `<div class="container">${hero(t('doctorsTitle'), t('doctorsSub'))}<section class="sec"><div class="sec-h"><h2>${t('specialities')}</h2></div><div class="cards3">${SPEC.map(s => `<div class="infocard"><div class="pi">${ic(s[1], 24)}</div><h4>${s[0]}</h4><p>${t('fee')}: ${money(s[2])}</p><button class="btn sm mt16" data-a="consult" data-s="${s[0]}">${t('consultNow')}</button></div>`).join('')}</div></section></div>` });
  A.consult = el => { const go = () => DW.modal(`<div class="mpad"><h3>${esc(el.dataset.s)}</h3><p class="small mute mt8">${t('callbackDone')}</p><button class="btn block mt16" data-a="closemodal">OK</button></div>`); S.user ? go() : DW.loginModal(go); };
  const info = (nav, title, sub, cards) => () => ({ nav, title: title() + ' | DAWAA', html: `<div class="container">${hero(title(), sub())}<section class="sec"><div class="cards3">${cards.map(c => `<div class="infocard"><div class="pi">${ic(c[0], 24)}</div><h4>${c[1]}</h4><p>${c[2]}</p></div>`).join('')}</div></section></div>` });
  DW.routes['cancer-care'] = info('cancer-care', () => t('cancerTitle'), () => t('cancerSub'), [['heartbeat', 'Screening', 'Early detection packages for breast, cervical, oral and colon cancer.'], ['steth', 'Second opinion', 'Reviews of reports by experienced oncologists.'], ['pill', 'Oncology medicines', 'Verified supply of oncology medicines at transparent prices.'], ['phone', 'Care coordinator', 'One point of contact for appointments, tests and refills.']]);
  DW.routes.partnerships = info('partnerships', () => t('partnersTitle'), () => t('partnersSub'), [['box', 'Pharmacy partners', 'Bring your store online and reach more customers.'], ['flask', 'Diagnostic labs', 'List tests and receive bookings with home collection.'], ['steth', 'Doctors & clinics', 'Offer online consults with e-prescriptions.'], ['link', 'Brand partners', 'Showcase your health brands to engaged customers.']]);
  DW.routes.corporates = info('corporates', () => t('corpTitle'), () => t('corpSub'), [['heartbeat', 'Annual health checkups', 'Camps and at-home sample collection for employees.'], ['steth', 'Doctor consults', 'Unlimited teleconsultation for staff and families.'], ['pill', 'Pharmacy benefits', 'Special discounts on medicines and refills.'], ['shield', 'Wellness analytics', 'Anonymised insights for HR teams.']]);
  DW.routes.careplan = () => ({ nav: 'careplan', title: t('carePlanTitle') + ' | DAWAA', html: `<div class="container">${hero(t('carePlanTitle'), t('carePlanSub'), `<button class="btn mt16" style="background:#fff;color:var(--blue)" data-a="addcare">${t('addMembership')} · ₹165</button>`)}<section class="sec"><div class="cards3">${[['tag', 'Extra 5% off', 'On all medicines, every order.'], ['truck', 'Free shipping', 'No minimum order value.'], ['clock', 'Same-day delivery', 'In select pincodes.'], ['phone', 'Priority support', 'Faster resolution from our team.']].map(c => `<div class="infocard"><div class="pi">${ic(c[0], 24)}</div><h4>${c[1]}</h4><p>${c[2]}</p></div>`).join('')}</div></section></div>` });
  DW.routes.offers = () => ({ nav: '', title: t('offersTitle') + ' | DAWAA', html: `<div class="container">${hero(t('offersTitle'), '')}<section class="sec"><div class="cards3">${[['DAWAANEW', '15% off up to ₹200', 'On your first order above ₹1200'], ['DAWAA10', '10% off up to ₹100', 'On orders above ₹300'], ['CARE5', '5% off', 'Extra savings for Care Plan members']].map(c => `<div class="infocard"><div class="pi">${ic('gift', 24)}</div><h4>${c[1]}</h4><p>${c[2]}</p><span class="codebox">${c[0]}</span> <button class="btn sm ghost mt8" data-a="copycode" data-c="${c[0]}">${t('copy')}</button></div>`).join('')}</div></section></div>` });
  A.copycode = el => { try { navigator.clipboard.writeText(el.dataset.c); } catch (e) { } S.coupon = el.dataset.c; DW.save('coupon'); DW.toast(el.dataset.c + ' ✓ ' + t('couponOk')); };
  DW.routes.help = () => ({ nav: '', title: t('helpTitle') + ' | DAWAA', html: `<div class="container">${hero(t('helpTitle'), t('helpSub'))}<section class="sec"><div class="cards3"><div class="infocard"><div class="pi">${ic('phone', 24)}</div><h4>1800-212-2323</h4><p>${t('helpSub')}</p></div><div class="infocard"><div class="pi">${ic('link', 24)}</div><h4>support@dawaa.example</h4><p>Demo address</p></div></div></section><section class="sec"><h2 style="font-size:16px;margin-bottom:12px">${t('faqs')}</h2>${[['How do I order?', 'Search a medicine, add it to the cart, upload a prescription if needed, then continue to checkout.'], ['Is cash on delivery available?', 'Yes, on eligible orders.'], ['Can I return a product?', 'Yes, within 7 days of delivery if unused and sealed.'], ['Is this a real store?', 'No. DAWAA is a demo project. Do not use it for real purchases.']].map(f => `<div class="faq"><button data-a="faq">${f[0]}${ic('chevDown', 16)}</button><div>${f[1]}</div></div>`).join('')}</section></div>` });
  DW.routes['quick-order'] = () => ({ nav: 'home', title: t('quickTitle') + ' | DAWAA', html: `<div class="container">${hero(t('quickTitle'), t('quickSub'))}<label class="dropz" style="display:block">${ic('upload', 40, 'blue')}<div class="sb mt8">${S.rx ? t('rxUploaded') + ': ' + esc(S.rx.name) : t('uploadRx')}</div><input type="file" id="rxf" accept="image/*,.pdf" class="sr"></label>${S.rx ? `<a class="btn mt16" href="#/cart">${t('cart')}</a>` : ''}</div>` });
  const lettersPage = (q) => { const l = (q.get('l') || 'A').toUpperCase(), r = D.meds.filter(m => m.name[0].toUpperCase() === l).sort((a, b) => a.name.localeCompare(b.name)); return { nav: 'home', title: t('allMeds') + ' | DAWAA', html: `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}<span>${t('allMeds')}</span></div><h1 style="font-size:20px">${t('allMeds')} (${D.meds.length})</h1><div class="alpha">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => `<a href="#/medicines?l=${c}" class="${c === l ? 'on' : ''}">${c}</a>`).join('')}</div><div class="mlist">${r.map(m => `<a href="#/drug/${m.id}-${m.slug}">${esc(m.name)}</a>`).join('') || `<p class="mute">${t('empty')}</p>`}</div></div>` }; };
  DW.routes.medicines = (seg, q) => lettersPage(q);
  DW.routes.classes = () => ({ nav: 'home', title: t('classes') + ' | DAWAA', html: `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}<span>${t('classes')}</span></div><h1 style="font-size:20px;margin-bottom:14px">${t('classes')}</h1><div class="cards3">${Object.values(D.CL).map(c => `<a class="infocard" href="#/search?q=${encodeURIComponent(c[0])}"><h4>${c[0]}</h4><p>${c[1]}</p></a>`).join('')}</div></div>` });
  DW.routes.diseases = () => { const u = [...new Set(Object.values(D.CL).flatMap(c => c[3]))].sort(); return { nav: 'home', title: t('diseases') + ' | DAWAA', html: `<div class="container"><div class="bc"><a href="#/">${t('home')}</a>${ic('chevRight', 12)}<span>${t('diseases')}</span></div><h1 style="font-size:20px;margin-bottom:14px">${t('diseases')}</h1><div class="chips">${u.map(x => `<a class="chip" href="#/search?q=${encodeURIComponent(x.split(' ')[0])}">${esc(x)}</a>`).join('')}</div></div>` }; };

  DW.start();
})();
