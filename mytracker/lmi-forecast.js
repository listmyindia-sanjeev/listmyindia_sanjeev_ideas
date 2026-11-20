/* LMI Founder Tracker — "Free cash after dues" now reserves one month of expected spend (v1, 21 Nov 2026).
   Expected next-month spend = last closed month's operating spend (from Zoho, one-time items optional)
                             + recurring subscriptions that were NOT billed in that month.
   Tap the Free cash box (Overview / Cash & Funds) for a clickable breakup down to each Zoho entry.
   Loaded after lmi-info.js:  <script src="lmi-forecast.js?v=1"></script> */
(function () {
  var FC = { inc: false, u: [], c: null };
  try { FC.inc = localStorage.getItem('lmi_fc_inc') === '1'; } catch (e) {}
  var ONE_G = ['Equipment & Assets', 'Franchise Kit & Equipment'];

  function key(d) { return String(d).slice(0, 7); }
  function shift(k, n) { var y = +k.slice(0, 4), m = +k.slice(5, 7) - n; while (m < 1) { m += 12; y--; } return y + '-' + ('0' + m).slice(-2); }
  function nowKey() { var t = new Date(); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2); }
  function groupMap() {
    var M = {}, h = (D.exp && D.exp.head) || [], am = h.indexOf('ACCOUNTS ▸');
    if (am > 0) h.slice(am + 1).forEach(function (x) { x = String(x || ''); var i = x.indexOf(' | '); if (i > 0) M[x.slice(i + 3).toLowerCase()] = x.slice(0, i); });
    return M;
  }
  function kind(e, G) {
    var a = e.a.toLowerCase();
    if (/franchise revenue share/.test(a) || G[a] === 'Franchise Payout (not opex)') return 'payout';
    if (ONE_G.indexOf(G[a]) >= 0 || /exhibition|trade fair/.test(a)) return 'oneoff';
    return 'ops';
  }
  function sum(l) { return l.reduce(function (t, e) { return t + e.amt; }, 0); }

  function calc() {
    if (!window.D || !D.expTags || !D.expTags.length) return null;
    var G = groupMap(), nk = nowKey(), lm = shift(nk, 1), win0 = shift(nk, 3);
    var E = D.expTags.map(function (r) {
      return { d: String(r[0]).slice(0, 10), m: key(r[0]), v: String(r[1] || ''), a: String(r[2] || ''), amt: Number(r[4]) || 0, desc: String(r[8] || r[3] || ''), url: String(r[9] || '') };
    }).filter(function (e) { return e.amt > 0 && /^\d{4}-\d\d/.test(e.d); });
    E.forEach(function (e) { e.g = G[e.a.toLowerCase()] || 'Other'; e.k = kind(e, G); });
    var recent = E.filter(function (e) { return e.m === lm && e.k !== 'payout'; });
    var ops = recent.filter(function (e) { return e.k === 'ops'; }), one = recent.filter(function (e) { return e.k === 'oneoff'; });
    // recurring subscriptions: same vendor + Zoho account billed in 2+ of the last 4 months (incl. this month)
    var S = {};
    E.forEach(function (e) {
      if (e.k !== 'ops' || !e.v || e.m < win0 || e.m > nk || e.g === 'Bank & PG Charges') return;
      var k = e.v.toLowerCase() + '|' + e.a.toLowerCase(), s = S[k] || (S[k] = { v: e.v, a: e.a, mo: {}, last: '' });
      s.mo[e.m] = (s.mo[e.m] || 0) + e.amt; if (e.d > s.last) s.last = e.d;
    });
    var subs = Object.keys(S).map(function (k) { return S[k]; }).filter(function (s) { return Object.keys(s.mo).length >= 2; }).map(function (s) {
      var ms = Object.keys(s.mo), avg = ms.reduce(function (t, m) { return t + s.mo[m]; }, 0) / ms.length;
      return { v: s.v, a: s.a, amt: avg, n: ms.length, inRecent: s.mo[lm] != null, last: s.last };
    }).sort(function (x, y) { return y.amt - x.amt; });
    var miss = subs.filter(function (s) { return !s.inRecent; });
    var opsT = sum(ops), oneT = sum(one), missT = miss.reduce(function (t, s) { return t + s.amt; }, 0);
    return { lm: lm, ops: ops, one: one, subs: subs, miss: miss, opsT: opsT, oneT: oneT, missT: missT, exp: opsT + missT + (FC.inc ? oneT : 0) };
  }
  function freeNow(c) { return (Number(K('bank')) || 0) - (Number(K('liab_tot')) || 0) - (c ? c.exp : 0); }
  function by(list, f) { var M = {}, o = []; list.forEach(function (e) { var k = f(e); if (!M[k]) { M[k] = { k: k, l: [], t: 0 }; o.push(M[k]); } M[k].l.push(e); M[k].t += e.amt; }); return o.sort(function (a, b) { return b.t - a.t; }); }
  function ent(e) {
    var i = FC.u.push(e.url) - 1;
    return dri(esc(e.v || e.a), dt(e.d, 1) + ' · ' + esc(e.a) + (e.desc ? ' · ' + esc(e.desc.slice(0, 60)) : ''), inr(e.amt, 1), e.url ? 'fcGo(' + i + ')' : '');
  }
  window.fcGo = function (i) { if (FC.u[i]) window.open(FC.u[i], '_blank', 'noopener'); };
  window.fcTog = function () {
    FC.inc = !FC.inc; try { localStorage.setItem('lmi_fc_inc', FC.inc ? '1' : '0'); } catch (e) {}
    var o = document.getElementById('dr').classList.contains('on'); if (window.render) render(); if (o) fcOpen();
  };
  window.fcOpen = function () {
    var c = calc(); FC.c = c; FC.u = [];
    if (!c) { DR = [{ t: 'Free cash after dues', s: '', h: '<p class="drs">Expense entries are not loaded yet. Press Refresh and try again.</p>' }]; drShow(); return; }
    var L = dt(c.lm + '-01'), bank = Number(K('bank')) || 0, dues = Number(K('liab_tot')) || 0, free = freeNow(c);
    var h = dri('Bank balance', 'Zoho Books, latest sync', inr(bank, 1), '') + dri('− Dues', 'Franchise payable + GST + TDS + CTO payable', inr(dues, 1), '') +
      dri('− Expected spend next month', 'Recent month + subscriptions (below)', inr(c.exp, 1), '') +
      dri('<span style="color:' + (free < 0 ? 'var(--bad)' : 'var(--good)') + '">= Free cash after dues &amp; 1 month’s spend</span>', '', '<b>' + inr(free, 1) + '</b>', '') +
      '<div class="drs" style="margin-top:14px"><b>How the expected spend is built — tap a line</b></div>' +
      dri('' + L + ' operating spend', c.ops.length + ' Zoho entries (expenses + bills)', inr(c.opsT, 1), 'fcGrp(0)') +
      dri('Subscriptions not billed in ' + L, c.miss.length + ' recurring vendor' + (c.miss.length === 1 ? '' : 's') + ' still to come', inr(c.missT, 1), 'fcSubs()') +
      dri('One-time items in ' + L + (FC.inc ? ' — included' : ' — not included'), 'equipment, franchise kit, exhibition', inr(c.oneT, 1), 'fcGrp(1)') +
      '<div style="margin:12px 0 4px"><button class="ldsec" onclick="fcTog()">' + (FC.inc ? 'Leave one-time items out' : 'Include one-time items too') + '</button></div>' +
      '<div class="drs">Payouts to franchise partners are not counted here — they are already in Dues. A subscription already billed in ' + L + ' is inside that month’s spend, so it is not added twice.</div>';
    DR = [{ t: 'Free cash after dues', s: 'Reserves one month of expected spend so a normal month never starts you in the red.', h: h }]; drShow();
  };
  window.fcGrp = function (w) {
    var c = FC.c, list = w ? c.one : c.ops, G = by(list, function (e) { return e.g; });
    DR.push({ t: w ? 'One-time items' : 'Operating spend', s: dt(c.lm + '-01') + ' · ' + inr(sum(list), 1) + ' · tap a group', h: G.map(function (g, i) { return dri(esc(g.k), g.l.length + ' entr' + (g.l.length === 1 ? 'y' : 'ies'), inr(g.t, 1), 'fcEnt(' + w + ',' + i + ')'); }).join('') || '<p class="drs">Nothing here.</p>' });
    drShow();
  };
  window.fcEnt = function (w, i) {
    var c = FC.c, list = w ? c.one : c.ops, g = by(list, function (e) { return e.g; })[i];
    DR.push({ t: g.k, s: inr(g.t, 1) + ' · tap an entry to open it in Zoho Books', h: g.l.sort(function (a, b) { return b.amt - a.amt; }).map(ent).join('') }); drShow();
  };
  window.fcSubs = function () {
    var c = FC.c, L = dt(c.lm + '-01');
    var row = function (s, add) { return dri(esc(s.v), esc(s.a) + ' · billed in ' + s.n + ' of the last 4 months · last ' + dt(s.last, 1) + (add ? '' : ' · already in ' + L + ' spend'), inr(s.amt, 1) + (add ? '' : '<i>✓</i>'), ''); };
    DR.push({ t: 'Recurring subscriptions', s: 'Amount = average of its monthly bills. Added now: ' + inr(c.missT, 1) + '. Rule: same vendor + Zoho account billed in 2 or more of the last 4 months.',
      h: (c.miss.length ? '<div class="drs"><b>Added to next month</b></div>' + c.miss.map(function (s) { return row(s, 1); }).join('') : '') +
        (c.subs.length - c.miss.length ? '<div class="drs"><b>Already inside ' + L + ' spend (not added again)</b></div>' + c.subs.filter(function (s) { return s.inRecent; }).map(function (s) { return row(s, 0); }).join('') : '') ||
        '<p class="drs">No recurring subscriptions detected yet.</p>' }); drShow();
  };

  function wrap(name, fn) { var o = window[name]; if (typeof o !== 'function') return; window[name] = function () { return fn(o, arguments); }; }
  wrap('tile', function (o, a) {
    if (a[0] === 'Free cash after dues' || a[0] === 'Free cash') {
      var c = calc(); if (c) {
        var f = freeNow(c); a = [].slice.call(a);
        a[1] = inr(f); a[2] = 'Dues ' + inr(K('liab_tot')) + ' + 1 month spend ' + inr(c.exp); a[3] = '!fcOpen()'; a[4] = f < 0 ? 'alert' : '';
      }
    }
    return o.apply(this, a);
  });
  wrap('card', function (o, a) {
    var h = o.apply(this, a);
    if (String(a[0]) === 'Dues right now') {
      var c = calc(); if (c) {
        var f = freeNow(c);
        h = h.replace('</div></div>', '</div><div>Expected spend next month <a class="lk" href="javascript:void(0)" onclick="fcOpen()">breakup ›</a></div><div>' + inr(c.exp, 1) + '</div><div><b>Free cash after dues &amp; 1 month’s spend</b></div><div class="' + (f < 0 ? 'neg' : 'pos') + '">' + inr(f, 1) + '</div></div>');
      }
    }
    return h;
  });
})();
