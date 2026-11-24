/* List My India\u2122 \u2014 Founder Tracker add-on: IITF 2026 stall visitors (24\u201327 Nov 2026)
 * Loaded by one line before </body> in mytracker/dash.html:  <script src="iitf.js?v=1"></script>
 * Adds the "IITF Visitors" tab (desktop tab bar + phone "More" menu). Data = D.iitf from the IITF_Visitors sheet tab
 * (needs IITF.gs + the two Code.gs hooks). Send = opens WhatsApp with the pre-filled message and ticks "Sent?" in the Sheet.
 */
(function () {
  if (typeof TABS === 'undefined' || typeof render !== 'function') return;
  if (!TABS.some(function (t) { return t[0] === 'iitf'; })) TABS.push(['iitf', 'IITF Visitors']);
  ICON.iitf = '<path d="M3 10l2-6h14l2 6"/><path d="M3 10h18"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>';

  var css = document.createElement('style');
  css.textContent =
    '.ivg{display:grid;gap:10px;grid-template-columns:1fr}@media(min-width:760px){.ivg{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.ivg{grid-template-columns:repeat(3,minmax(0,1fr))}}' +
    '.iv{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;min-width:0}.iv.sent{background:#F5FBF7;border-color:#CFE9D9}' +
    '.ivh{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.ivh b{font-size:15px;min-width:0;overflow-wrap:anywhere}' +
    '.ivf{flex:none;font-size:11.5px;font-weight:600;border:1px solid;border-radius:12px;padding:2px 9px;white-space:nowrap}' +
    '.ivm{font-size:12.5px;color:var(--mute);overflow-wrap:anywhere}.ivn{font-size:13px;overflow-wrap:anywhere}' +
    '.ivl{font-size:12px;font-weight:600}.ivl.y{color:var(--good)}.ivl.n{color:var(--mute)}' +
    '.iva{display:flex;gap:8px;align-items:center;margin-top:4px;flex-wrap:wrap}' +
    '.ivwa{display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;border:0;border-radius:20px;padding:8px 14px;font:600 13px Poppins,system-ui,sans-serif;text-decoration:none;cursor:pointer}.ivwa:hover{box-shadow:0 3px 10px rgba(37,211,102,.45)}.ivwa:active{transform:scale(.97)}.ivwa svg{width:16px;height:16px;fill:#fff}' +
    '.ivc{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:20px;padding:7px 12px;font:600 13px Poppins,system-ui,sans-serif;text-decoration:none}' +
    '.ivs{margin-left:auto;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:#fff;border-radius:20px;padding:7px 12px;font:600 12.5px Poppins,system-ui,sans-serif;color:var(--mute);cursor:pointer}.ivs.on{background:var(--good);border-color:var(--good);color:#fff}.ivs:disabled{opacity:.6}' +
    '.iv details summary{font-size:12px;font-weight:600;color:var(--blue);cursor:pointer;list-style:none}.iv details summary::-webkit-details-marker{display:none}' +
    '.ivmsg{white-space:pre-wrap;font-size:12.5px;line-height:1.5;background:#F7F9FF;border:1px solid var(--line);border-radius:10px;padding:10px;margin-top:6px;max-height:320px;overflow:auto}' +
    '.ivr{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:10px;padding:7px 10px;font:13px Poppins,system-ui,sans-serif;background:#fff}.ivr:focus{outline:2px solid var(--blue);outline-offset:-1px}' +
    '.ivchips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 8px;scrollbar-width:none}.ivchips::-webkit-scrollbar{display:none}';
  document.head.appendChild(css);

  var FIT = { 'Franchise Partner': '#6A3FC1', 'Business Owner': '#0E8A4B', 'Growth Partner': '#B76E00', 'User': '#0046BF' };
  var WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>';
  window.IVF = { q: '', st: 'all', day: '', fit: '', src: '' };

  function digits(m) { var d = String(m || '').replace(/\D/g, ''); return d.length === 10 ? '91' + d : d; }
  function srcKind(s) { s = String(s); return /team/i.test(s) ? 'team' : /^signed up/i.test(s) ? 'ref' : 'stall'; }
  var SRC = { stall: 'Stall visitors', ref: 'Signed up via P6GMQH', team: 'Team contacts' };
  function rows() { return (D.iitf && D.iitf.rows) || []; }
  function filtered() {
    var q = IVF.q.toLowerCase().trim();
    return rows().filter(function (r) {
      if (IVF.st === 'pending' && r.sent) return false;
      if (IVF.st === 'sent' && !r.sent) return false;
      if (IVF.day && r.date !== IVF.day) return false;
      if (IVF.fit && r.fit !== IVF.fit) return false;
      if (IVF.src && srcKind(r.src) !== IVF.src) return false;
      if (q && [r.name, r.mobile, r.wa, r.area, r.pin, r.notes, r.fit, r.lmi, r.rem].join(' ').toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function chip(lbl, n, on, js) { return '<button class="lch' + (on ? ' on' : '') + '" onclick="' + js + ';ivDraw()">' + esc(lbl) + (n != null ? ' <b>' + n + '</b>' : '') + '</button>'; }
  function chips() {
    var R = rows(), cnt = function (f) { return R.filter(f).length; };
    var days = []; R.forEach(function (r) { if (r.date && days.indexOf(r.date) < 0) days.push(r.date); });
    var h = '<div class="ivchips">' +
      chip('All', R.length, IVF.st === 'all', "IVF.st='all'") +
      chip('\u23f3 Not sent', cnt(function (r) { return !r.sent; }), IVF.st === 'pending', "IVF.st='pending'") +
      chip('\u2713 Sent', cnt(function (r) { return r.sent; }), IVF.st === 'sent', "IVF.st='sent'") + '</div>';
    if (days.length > 1) h += '<div class="ivchips">' + chip('All days', null, !IVF.day, "IVF.day=''") +
      days.map(function (d) { return chip(d, cnt(function (r) { return r.date === d; }), IVF.day === d, "IVF.day='" + d + "'"); }).join('') + '</div>';
    h += '<div class="ivchips">' + chip('Any fit', null, !IVF.fit, "IVF.fit=''") +
      Object.keys(FIT).map(function (f) { var n = cnt(function (r) { return r.fit === f; }); return n ? chip(f, n, IVF.fit === f, "IVF.fit='" + f + "'") : ''; }).join('') +
      '<span style="width:8px;flex:none"></span>' + chip('Any source', null, !IVF.src, "IVF.src=''") +
      Object.keys(SRC).map(function (k) { var n = cnt(function (r) { return srcKind(r.src) === k; }); return n ? chip(SRC[k], n, IVF.src === k, "IVF.src='" + k + "'") : ''; }).join('') + '</div>';
    return h;
  }
  function cardHtml(r) {
    var c = FIT[r.fit] || '#5B6478', wa = digits(r.wa || r.mobile), tel = digits(r.mobile);
    var meta = [r.area, r.pin ? 'PIN ' + r.pin : ''].filter(String).join(' \u00b7 ');
    var link = wa && r.msg ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(r.msg) : '';
    return '<div class="iv' + (r.sent ? ' sent' : '') + '" id="iv' + r.row + '">' +
      '<div class="ivh"><b>' + esc(r.name || '\u2014') + '</b><span class="ivf" style="color:' + c + ';border-color:' + c + '44;background:' + c + '12">' + esc(r.fit || '\u2014') + '</span></div>' +
      '<div class="ivm">' + esc(SRC[srcKind(r.src)].replace(/s$/, '')) + ' \u00b7 ' + esc(r.date) + (meta ? ' \u00b7 ' + esc(meta) : '') + '</div>' +
      (r.notes ? '<div class="ivn">' + esc(r.notes) + '</div>' : '') +
      '<div class="ivl ' + (/^yes/i.test(r.onLmi) ? 'y">\u2713 On LMI \u00b7 ' + esc(r.lmi) + (r.joined ? ' \u00b7 joined ' + esc(r.joined) : '') : 'n">Not on LMI yet') + '</div>' +
      (r.also ? '<div class="ivm">Also fits: ' + esc(r.also) + '</div>' : '') +
      '<div class="iva">' +
      (link ? '<a class="ivwa" href="' + esc(link) + '" target="_blank" rel="noopener" onclick="ivSend(' + r.row + ')">' + WA + 'Send WhatsApp</a>' : '<span class="ivm">No WhatsApp number</span>') +
      (tel ? '<a class="ivc" href="tel:+' + tel + '">\ud83d\udcde ' + esc(r.mobile) + '</a>' : '') +
      '<button class="ivs' + (r.sent ? ' on' : '') + '" onclick="ivTick(' + r.row + ',this)">' + (r.sent ? '\u2713 Sent' : 'Mark sent') + '</button></div>' +
      (r.msg ? '<details><summary>Preview message \u25be</summary><div class="ivmsg">' + esc(r.msg) + '</div></details>' : '') +
      '<input class="ivr" placeholder="Follow-up / remarks\u2026" value="' + esc(r.rem) + '" onchange="ivRem(' + r.row + ',this)">' +
      '</div>';
  }
  window.vIitf = function () {
    if (!D.iitf) return card('IITF 2026 visitors', '<div class="note">Visitor list will appear here after the Apps Script update (IITF.gs).</div>');
    var R = rows(), sent = R.filter(function (r) { return r.sent; }).length, onL = R.filter(function (r) { return /^yes/i.test(r.onLmi); }).length;
    var fr = R.filter(function (r) { return r.fit === 'Franchise Partner'; }).length;
    var h = '<div class="grid">' +
      tile('IITF visitors & contacts', num(R.length), 'Bharat Mandapam \u00b7 24\u201327 Nov 2026', '', 'hero') +
      tile('WhatsApp sent', num(sent) + ' / ' + num(R.length), num(R.length - sent) + ' still to send', '', '', R.length ? sent / R.length : null) +
      tile('Already on LMI', num(onL), num(R.length - onL) + ' not registered yet', '') +
      tile('Franchise interest', num(fr), 'best fit = Franchise Partner', '') + '</div>';
    h += card('Visitors', '<div class="ldbar"><input id="ivq" type="search" placeholder="Search name, phone, area, notes\u2026" value="' + esc(IVF.q) + '" oninput="IVF.q=this.value;ivList()"></div>' +
      '<div id="ivch">' + chips() + '</div><div id="ivl"></div>',
      'Tap <b>Send WhatsApp</b>: WhatsApp opens with the message ready, and the visitor is ticked as sent in the IITF_Visitors tab. Tap \u2713 Sent to undo. Edit a message in column Q of the Sheet, then \u21bb Refresh.');
    setTimeout(ivList, 0);
    return h;
  };
  window.ivList = function () {
    var el = document.getElementById('ivl'); if (!el) return;
    var f = filtered();
    el.innerHTML = '<div class="note" style="margin:0 0 8px">' + f.length + ' shown</div>' +
      (f.length ? '<div class="ivg">' + f.map(cardHtml).join('') + '</div>' : '<div class="note">No visitors match.</div>');
  };
  window.ivDraw = function () { var c = document.getElementById('ivch'); if (c) c.innerHTML = chips(); ivList(); };
  function post(d, ok, bad) {
    fetch(LMI_API + '?api=iitfSent&tok=' + encodeURIComponent(TOK) + '&d=' + encodeURIComponent(JSON.stringify(d)), { credentials: 'omit', redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .then(function (o) { if (!o.ok) throw new Error(o.error); var j = JSON.parse(o.r); if (j.iitf) D.iitf = j.iitf; ok && ok(); })
      .catch(function (e) { bad && bad(String((e && e.message) || 'Network problem \u2014 please try again')); });
  }
  function byRow(n) { return rows().filter(function (r) { return r.row === n; })[0]; }
  window.ivSend = function (n) {
    var r = byRow(n); if (!r || r.sent) return;
    r.sent = true; var b = document.querySelector('#iv' + n + ' .ivs'); if (b) { b.className = 'ivs on'; b.textContent = '\u2713 Sent'; }
    var c = document.getElementById('iv' + n); if (c) c.classList.add('sent');
    post({ r: n, sent: true }, function () { ldToast('Marked as sent \u2713'); var ch = document.getElementById('ivch'); if (ch) ch.innerHTML = chips(); },
      function (m) { r.sent = false; ldToast(m, 1); ivDraw(); });
  };
  window.ivTick = function (n, b) {
    var r = byRow(n); if (!r) return; var v = !r.sent; b.disabled = true;
    post({ r: n, sent: v }, function () { ldToast(v ? 'Marked as sent \u2713' : 'Marked as not sent'); ivDraw(); },
      function (m) { b.disabled = false; ldToast(m, 1); });
  };
  window.ivRem = function (n, el) {
    el.classList.add('saving');
    post({ r: n, rem: el.value }, function () { el.classList.remove('saving'); el.classList.add('saved'); setTimeout(function () { el.classList.remove('saved'); }, 1500); ldToast('Saved \u2713'); },
      function (m) { el.classList.remove('saving'); el.classList.add('err'); ldToast(m, 1); });
  };

  var _render = render;
  render = function () {
    if (TAB !== 'iitf') return _render.apply(this, arguments);
    charts.forEach(function (c) { c.destroy(); }); charts = [];
    document.getElementById('view').innerHTML = vIitf();
  };
  if (D) { try { buildShell(); } catch (e) {} }
})();
