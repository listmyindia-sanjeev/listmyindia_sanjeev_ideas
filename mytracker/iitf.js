/* List My India™ — Founder Tracker add-on: IITF 2026 stall visitors (24–27 Nov 2026)
 * Loaded by one line before </body> in mytracker/dash.html:  <script src="iitf.js?v=3"></script>
 * Adds the "IITF Visitors" tab (desktop tab bar + phone "More" menu). Data = D.iitf from the IITF_Visitors sheet tab
 * (needs IITF.gs v3). Send = opens WhatsApp with the pre-filled message and ticks "Sent?" in the Sheet.
 * v3 (28 Nov 2026): edit the WhatsApp message from the card; follow-ups are a list of dated updates with Add / Edit / Delete.
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
    '.ivmsg{white-space:pre-wrap;font-size:12.5px;line-height:1.5;background:#F7F9FF;border:1px solid var(--line);border-radius:10px;padding:10px;margin-top:6px;max-height:320px;overflow:auto;overflow-wrap:anywhere}' +
    '.ivchips{display:flex;gap:6px;overflow-x:auto;padding:2px 0 8px;scrollbar-width:none}.ivchips::-webkit-scrollbar{display:none}' +
    /* v2: message editor + follow-up list */
    '.ivta{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:10px;padding:8px 10px;font:13px/1.45 Poppins,system-ui,sans-serif;background:#fff;resize:vertical;min-height:40px;color:var(--ink)}.ivta:focus{outline:2px solid var(--blue);outline-offset:-1px}' +
    '.ivta.big{min-height:220px;margin-top:6px}' +
    '.ivbar{display:flex;gap:6px;justify-content:flex-end;align-items:center;margin-top:6px;flex-wrap:wrap}.ivbar .ivhint{margin-right:auto;font-size:11.5px;color:var(--mute)}' +
    '.ivb{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:16px;padding:5px 11px;font:600 12px Poppins,system-ui,sans-serif;cursor:pointer;white-space:nowrap}.ivb:hover{border-color:var(--blue);color:var(--blue)}' +
    '.ivb.pri{background:var(--blue);border-color:var(--blue);color:#fff}.ivb.pri:hover{color:#fff;filter:brightness(1.08)}.ivb.del:hover{border-color:#C62828;color:#C62828}.ivb:disabled{opacity:.55;cursor:default}' +
    '.ivu{border-top:1px dashed var(--line);margin-top:4px;padding-top:8px;display:flex;flex-direction:column;gap:6px}' +
    '.ivuh{font-size:12px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:6px}.ivuh span{font-weight:600;color:var(--mute)}' +
    '.ivi{background:#FAFBFE;border:1px solid var(--line);border-radius:10px;padding:7px 10px}.ivit{font-size:11px;color:var(--mute);font-weight:600}' +
    '.ivix{font-size:13px;white-space:pre-wrap;overflow-wrap:anywhere;margin-top:1px}.ivi .ivbar{margin-top:4px}.ivi .ivb{padding:3px 9px;font-size:11.5px}' +
    '.ivadd{display:flex;gap:6px;align-items:flex-end}.ivadd .ivta{flex:1}' +
    '@media(max-width:759px){.iva{gap:8px}.ivwa{flex:1 1 100%;justify-content:center;min-height:46px;font-size:15px;border-radius:12px}.ivc,.ivs{flex:1 1 0;white-space:nowrap;font-size:13px;padding:7px 8px;justify-content:center;min-height:42px;margin-left:0;border-radius:12px}.ivchips .lch{padding:9px 14px}.iv details summary{padding:6px 0}.ivmsg{max-height:50vh}' +
    '.ivta{font-size:16px;min-height:46px}.ivta.big{min-height:45vh}.ivb{min-height:38px;padding:6px 14px;font-size:13px;border-radius:10px}.ivi .ivb{min-height:34px;padding:4px 12px;font-size:12.5px}.ivadd{flex-direction:column;align-items:stretch}.ivadd .ivb{justify-content:center;min-height:44px}}';
  document.head.appendChild(css);

  var FIT = { 'Franchise Partner': '#6A3FC1', 'Business Owner': '#0E8A4B', 'Growth Partner': '#B76E00', 'User': '#0046BF' };
  var WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>';
  window.IVF = { q: '', st: 'all', day: '', fit: '', src: '' };
  var OPEN = {};                     // rows whose message panel is open (kept open across redraws)

  function digits(m) { var d = String(m || '').replace(/\D/g, ''); return d.length === 10 ? '91' + d : d; }
  function srcKind(s) { s = String(s); return /team/i.test(s) ? 'team' : /^signed up/i.test(s) ? 'ref' : 'stall'; }
  var SRC = { stall: 'Stall visitors', ref: 'Signed up via P6GMQH', team: 'Team contacts' };
  function rows() { return (D.iitf && D.iitf.rows) || []; }
  function ups(r) { return r.ups || (r.rem ? [{ t: '', x: r.rem }] : []); }
  function filtered() {
    var q = IVF.q.toLowerCase().trim();
    return rows().filter(function (r) {
      if (IVF.st === 'pending' && r.sent) return false;
      if (IVF.st === 'sent' && !r.sent) return false;
      if (IVF.st === 'fu' && !ups(r).length) return false;
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
      chip('⏳ Not sent', cnt(function (r) { return !r.sent; }), IVF.st === 'pending', "IVF.st='pending'") +
      chip('✓ Sent', cnt(function (r) { return r.sent; }), IVF.st === 'sent', "IVF.st='sent'") +
      chip('📝 Has follow-ups', cnt(function (r) { return ups(r).length; }), IVF.st === 'fu', "IVF.st='fu'") + '</div>';
    if (days.length > 1) h += '<div class="ivchips">' + chip('All days', null, !IVF.day, "IVF.day=''") +
      days.map(function (d) { return chip(d, cnt(function (r) { return r.date === d; }), IVF.day === d, "IVF.day='" + d + "'"); }).join('') + '</div>';
    h += '<div class="ivchips">' + chip('Any fit', null, !IVF.fit, "IVF.fit=''") +
      Object.keys(FIT).map(function (f) { var n = cnt(function (r) { return r.fit === f; }); return n ? chip(f, n, IVF.fit === f, "IVF.fit='" + f + "'") : ''; }).join('') +
      '<span style="width:8px;flex:none"></span>' + chip('Any source', null, !IVF.src, "IVF.src=''") +
      Object.keys(SRC).map(function (k) { var n = cnt(function (r) { return srcKind(r.src) === k; }); return n ? chip(SRC[k], n, IVF.src === k, "IVF.src='" + k + "'") : ''; }).join('') + '</div>';
    return h;
  }
  function upItem(r, u, i) {
    return '<div class="ivi" id="ivi' + r.row + '_' + i + '">' +
      '<div class="ivit">' + (u.t ? esc(u.t) : 'Earlier note') + '</div>' +
      '<div class="ivix">' + esc(u.x) + '</div>' +
      '<div class="ivbar"><button class="ivb" onclick="ivUpEdit(' + r.row + ',' + i + ')">✏️ Edit</button>' +
      '<button class="ivb del" onclick="ivUpDel(' + r.row + ',' + i + ',this)">🗑 Delete</button></div></div>';
  }
  function upsHtml(r) {
    var U = ups(r);
    return '<div class="ivu" id="ivu' + r.row + '"><div class="ivuh">📝 Follow-ups <span>' + (U.length ? U.length : 'none yet') + '</span></div>' +
      U.map(function (u, i) { return upItem(r, u, i); }).join('') +
      '<div class="ivadd"><textarea class="ivta" id="ivadd' + r.row + '" rows="1" placeholder="Add a follow-up update…" oninput="ivGrow(this)" onkeydown="ivKey(event,function(){ivUpAdd(' + r.row + ')})"></textarea>' +
      '<button class="ivb pri" onclick="ivUpAdd(' + r.row + ',this)">+ Add</button></div></div>';
  }
  function msgHtml(r) {
    return '<details id="ivd' + r.row + '"' + (OPEN[r.row] ? ' open' : '') + ' ontoggle="ivOpen(' + r.row + ',this.open)"><summary>Message ▾</summary>' +
      '<div id="ivmw' + r.row + '"><div class="ivmsg">' + (r.msg ? esc(r.msg) : '<i>No message yet</i>') + '</div>' +
      '<div class="ivbar"><button class="ivb" onclick="ivMsgEdit(' + r.row + ')">✏️ Edit message</button></div></div></details>';
  }
  function cardHtml(r) {
    var c = FIT[r.fit] || '#5B6478', wa = digits(r.wa || r.mobile), tel = digits(r.mobile);
    var meta = [r.area, r.pin ? 'PIN ' + r.pin : ''].filter(String).join(' · ');
    var link = wa && r.msg ? 'https://wa.me/' + wa + '?text=' + encodeURIComponent(r.msg) : '';
    return '<div class="iv' + (r.sent ? ' sent' : '') + '" id="iv' + r.row + '">' +
      '<div class="ivh"><b>' + esc(r.name || '—') + '</b><span class="ivf" style="color:' + c + ';border-color:' + c + '44;background:' + c + '12">' + esc(r.fit || '—') + '</span></div>' +
      '<div class="ivm">' + esc(SRC[srcKind(r.src)].replace(/s$/, '')) + ' · ' + esc(r.date) + (meta ? ' · ' + esc(meta) : '') + '</div>' +
      (r.notes ? '<div class="ivn">' + esc(r.notes) + '</div>' : '') +
      '<div class="ivl ' + (/^yes/i.test(r.onLmi) ? 'y">✓ On LMI · ' + esc(r.lmi) + (r.joined ? ' · joined ' + esc(r.joined) : '') : 'n">Not on LMI yet') + '</div>' +
      (r.also ? '<div class="ivm">Also fits: ' + esc(r.also) + '</div>' : '') +
      '<div class="iva">' +
      (link ? '<a class="ivwa" href="' + esc(link) + '" target="_blank" rel="noopener" onclick="ivSend(' + r.row + ')">' + WA + 'Send WhatsApp</a>' : '<span class="ivm">' + (wa ? 'Add a message to send' : 'No WhatsApp number') + '</span>') +
      (tel ? '<a class="ivc" href="tel:+' + tel + '">📞 ' + esc(r.mobile) + '</a>' : '') +
      '<button class="ivs' + (r.sent ? ' on' : '') + '" onclick="ivTick(' + r.row + ',this)">' + (r.sent ? '✓ Sent' : 'Mark sent') + '</button></div>' +
      msgHtml(r) + upsHtml(r) +
      '</div>';
  }
  window.vIitf = function () {
    if (!D.iitf) return card('IITF 2026 visitors', '<div class="note">Visitor list will appear here after the Apps Script update (IITF.gs).</div>');
    var R = rows(), sent = R.filter(function (r) { return r.sent; }).length, onL = R.filter(function (r) { return /^yes/i.test(r.onLmi); }).length;
    var fr = R.filter(function (r) { return r.fit === 'Franchise Partner'; }).length;
    var h = '<div class="grid">' +
      tile('IITF visitors & contacts', num(R.length), 'Bharat Mandapam · 24–27 Nov 2026', '', 'hero') +
      tile('WhatsApp sent', num(sent) + ' / ' + num(R.length), num(R.length - sent) + ' still to send', '', '', R.length ? sent / R.length : null) +
      tile('Already on LMI', num(onL), num(R.length - onL) + ' not registered yet', '') +
      tile('Franchise interest', num(fr), 'best fit = Franchise Partner', '') + '</div>';
    h += card('Visitors', '<div class="ldbar"><input id="ivq" type="search" placeholder="Search name, phone, area, notes, follow-ups…" value="' + esc(IVF.q) + '" oninput="IVF.q=this.value;ivList()"></div>' +
      '<div id="ivch">' + chips() + '</div><div id="ivl"></div>',
      'Tap <b>Send WhatsApp</b>: WhatsApp opens with the message ready, and the visitor is ticked as sent. Tap ✓ Sent to undo. Open <b>Message</b> → <b>Edit message</b> to change what is sent. Under <b>Follow-ups</b>, type an update and tap <b>+ Add</b> (Ctrl+Enter also works); each update has its own Edit and Delete.');
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
  function ivCard(n) {      // redraw one card only, so drafts typed in other cards are kept
    var el = document.getElementById('iv' + n), r = byRow(n);
    if (el && r) { var t = document.createElement('div'); t.innerHTML = cardHtml(r); el.parentNode.replaceChild(t.firstChild, el); }
    var ch = document.getElementById('ivch'); if (ch) ch.innerHTML = chips();
  }
  function post(d, ok, bad) {
    var url = LMI_API + '?api=iitfSent&tok=' + encodeURIComponent(TOK) + '&d=' + encodeURIComponent(JSON.stringify(d));
    if (url.length > 7800) { bad && bad('Too long to save from here — shorten it a little, or edit it in the Sheet'); return; }
    fetch(url, { credentials: 'omit', redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .then(function (o) { if (!o.ok) throw new Error(o.error); var j = JSON.parse(o.r); if (j.iitf) D.iitf = j.iitf; ok && ok(); })
      .catch(function (e) { bad && bad(String((e && e.message) || 'Network problem — please try again')); });
  }
  function byRow(n) { return rows().filter(function (r) { return r.row === n; })[0]; }
  function busy(b, on, lbl) { if (!b) return; if (on) { b.dataset.l = b.innerHTML; b.disabled = true; b.innerHTML = lbl || 'Saving…'; } else { b.disabled = false; if (b.dataset.l) b.innerHTML = b.dataset.l; } }

  window.ivGrow = function (t) { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight + 2, 400) + 'px'; };
  window.ivKey = function (e, fn) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); fn(); } };
  window.ivOpen = function (n, o) { if (o) OPEN[n] = 1; else delete OPEN[n]; };

  window.ivSend = function (n) {
    var r = byRow(n); if (!r || r.sent) return;
    r.sent = true; var b = document.querySelector('#iv' + n + ' .ivs'); if (b) { b.className = 'ivs on'; b.textContent = '✓ Sent'; }
    var c = document.getElementById('iv' + n); if (c) c.classList.add('sent');
    post({ r: n, sent: true }, function () { ldToast('Marked as sent ✓'); var ch = document.getElementById('ivch'); if (ch) ch.innerHTML = chips(); },
      function (m) { r.sent = false; ldToast(m, 1); ivDraw(); });
  };
  window.ivTick = function (n, b) {
    var r = byRow(n); if (!r) return; var v = !r.sent; b.disabled = true;
    post({ r: n, sent: v }, function () { ldToast(v ? 'Marked as sent ✓' : 'Marked as not sent'); ivCard(n); },
      function (m) { b.disabled = false; ldToast(m, 1); });
  };

  // ── WhatsApp message editor (column Q)
  window.ivMsgEdit = function (n) {
    var r = byRow(n), w = document.getElementById('ivmw' + n); if (!r || !w) return;
    w.innerHTML = '<textarea class="ivta big" id="ivme' + n + '" onkeydown="ivKey(event,function(){ivMsgSave(' + n + ')})">' + esc(r.msg) + '</textarea>' +
      '<div class="ivbar"><span class="ivhint">*bold* _italic_ work in WhatsApp</span>' +
      '<button class="ivb" onclick="ivCard(' + n + ')">Cancel</button>' +
      '<button class="ivb pri" onclick="ivMsgSave(' + n + ',this)">Save message</button></div>';
    var t = document.getElementById('ivme' + n); t.focus(); t.setSelectionRange(0, 0); t.scrollTop = 0;
  };
  window.ivMsgSave = function (n, b) {
    var t = document.getElementById('ivme' + n); if (!t) return;
    var v = t.value.replace(/\s+$/, ''), r = byRow(n);
    if (!v.trim()) { ldToast('The message cannot be empty', 1); return; }
    if (r && v === r.msg) { ivCard(n); return; }
    busy(b, 1); OPEN[n] = 1;
    post({ r: n, msg: v }, function () { ldToast('Message saved ✓'); ivCard(n); }, function (m) { busy(b, 0); ldToast(m, 1); });
  };
  window.ivCard = ivCard;

  // ── Follow-up updates (column S)
  window.ivUpAdd = function (n, b) {
    var t = document.getElementById('ivadd' + n); if (!t) return;
    var v = t.value.trim(); if (!v) { t.focus(); ldToast('Type the update first', 1); return; }
    b = b || (t.parentNode && t.parentNode.querySelector('.ivb.pri'));
    busy(b, 1); t.disabled = true;
    post({ r: n, add: v }, function () { ldToast('Update added ✓'); ivCard(n); },
      function (m) { busy(b, 0); t.disabled = false; ldToast(m, 1); });
  };
  window.ivUpEdit = function (n, i) {
    var r = byRow(n), u = r && ups(r)[i], el = document.getElementById('ivi' + n + '_' + i); if (!u || !el) return;
    el.innerHTML = '<div class="ivit">' + (u.t ? esc(u.t) : 'Earlier note') + '</div>' +
      '<textarea class="ivta" id="ivue' + n + '_' + i + '" oninput="ivGrow(this)" onkeydown="ivKey(event,function(){ivUpSave(' + n + ',' + i + ')})">' + esc(u.x) + '</textarea>' +
      '<div class="ivbar"><button class="ivb" onclick="ivCard(' + n + ')">Cancel</button>' +
      '<button class="ivb pri" onclick="ivUpSave(' + n + ',' + i + ',this)">Save</button></div>';
    var t = document.getElementById('ivue' + n + '_' + i); ivGrow(t); t.focus(); t.setSelectionRange(t.value.length, t.value.length);
  };
  window.ivUpSave = function (n, i, b) {
    var r = byRow(n), u = r && ups(r)[i], t = document.getElementById('ivue' + n + '_' + i); if (!u || !t) return;
    var v = t.value.trim();
    if (!v) { ldToast('An update cannot be empty — use Delete instead', 1); return; }
    if (v === u.x) { ivCard(n); return; }
    busy(b, 1);
    post({ r: n, upd: v, i: i, o: u.x }, function () { ldToast('Update saved ✓'); ivCard(n); }, function (m) { busy(b, 0); ldToast(m, 1); });
  };
  window.ivUpDel = function (n, i, b) {
    var r = byRow(n), u = r && ups(r)[i]; if (!u) return;
    if (!confirm('Delete this follow-up?\n\n' + (u.t ? u.t + ' — ' : '') + u.x.slice(0, 160))) return;
    busy(b, 1, 'Deleting…');
    post({ r: n, del: i, o: u.x }, function () { ldToast('Update deleted'); ivCard(n); }, function (m) { busy(b, 0); ldToast(m, 1); });
  };

  var _render = render;
  render = function () {
    if (TAB !== 'iitf') return _render.apply(this, arguments);
    charts.forEach(function (c) { c.destroy(); }); charts = [];
    document.getElementById('view').innerHTML = vIitf();
  };
  if (D) { try { buildShell(); } catch (e) {} }
})();
