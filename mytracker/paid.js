/* List My India™ — Founder Tracker add-on: Paid Customers (from Zoho Books)
 * Loaded by one line before </body> in mytracker/dash.html:  <script src="paid.js?v=1"></script>
 * Adds the "Paid Customers" tab (desktop tab bar + phone "More" menu). Data = D.paid (PaidCustomers.gs → Paid_Customers tab).
 * Every customer name and invoice number opens in Zoho Books; phone numbers are tap-to-call.
 */
(function () {
  if (typeof TABS === 'undefined' || typeof render !== 'function') return;
  if (!TABS.some(function (t) { return t[0] === 'paid'; })) {
    var at = -1; TABS.forEach(function (t, i) { if (t[0] === 'fr') at = i; });
    TABS.splice(at >= 0 ? at + 1 : TABS.length, 0, ['paid', 'Paid Customers']);
  }
  ICON.paid = '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h6M7 13h4"/><path d="M15.5 15.5l1.5 1.5 3-3"/>';

  var css = document.createElement('style');
  css.textContent =
    '.pcl a.zl{color:var(--blue);text-decoration:none;font-weight:600}.pcl a.zl:hover{text-decoration:underline}' +
    '.pcl .pin{display:inline-block;font-size:11.5px;font-weight:600;background:var(--soft);color:var(--navy);border-radius:9px;padding:1px 8px;margin:1px 4px 1px 0}' +
    '.pcl .inv{display:inline-block;font-size:12px;font-weight:600;border:1px solid var(--line);border-radius:9px;padding:1px 8px;margin:2px 4px 2px 0;color:var(--blue);text-decoration:none;background:#fff}.pcl .inv:hover{border-color:var(--blue)}' +
    '.pcl .inv.due{border-color:#F3C1C1;color:var(--bad)}' +
    '.pct td{vertical-align:top}.pct td:nth-child(-n+4),.pct th:nth-child(-n+4){text-align:left}.pct td:nth-child(4){white-space:normal;min-width:150px;max-width:240px}.pct td.ct{font-size:12px;line-height:1.6}.pct td:first-child{white-space:normal;min-width:190px}' +
    '.pct .ex{border:0;background:none;color:var(--blue);font:600 13px Poppins,system-ui,sans-serif;cursor:pointer;padding:0 6px 0 0}' +
    '.pct tr.sub td:nth-child(n+3){text-align:right}.pct tr.sub td{background:#FAFBFE;font-size:12px;color:var(--mute);white-space:normal}.pct tr.sub td:first-child{padding-left:28px;background:#FAFBFE}' +
    '.pcc{background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px;margin:0 0 8px}' +
    '.pcc .h{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.pcc .h b{font-size:15px;min-width:0;overflow-wrap:anywhere}' +
    '.pcc .amt{flex:none;text-align:right;font-weight:700;font-size:14px}.pcc .amt small{display:block;font-size:11.5px;font-weight:600}' +
    '.pcc .m{font-size:12.5px;color:var(--mute);margin-top:6px;line-height:1.7;overflow-wrap:anywhere}.pcc .m a{color:var(--blue)}' +
    '.pcc .pciv{margin-top:6px}';
  document.head.appendChild(css);

  window.PCF = { q: '', pin: '', st: '' };
  var OPEN = {};
  function P() { return D.paid || {}; }
  function zl(url, txt) { return '<a class="zl" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(txt) + ' ↗</a>'; }
  function tel(m) { m = String(m || '').trim(); if (!m) return '—'; var d = m.replace(/\D/g, ''); if (d.length === 10) d = '91' + d;
    return '<a href="tel:+' + d + '">' + esc(m) + '</a>'; }
  function pins(s) { return String(s || '').split(/,\s*/).filter(String).map(function (p) { return '<span class="pin">' + esc(p) + '</span>'; }).join('') || '—'; }
  function invsOf(c) { return (P().invs || []).filter(function (v) { return v.cid === c.id; }); }
  function invChips(c) { return invsOf(c).map(function (v) {
    return '<a class="inv' + (v.due > 0.5 ? ' due' : '') + '" href="' + esc(v.url) + '" target="_blank" rel="noopener" title="' + esc(dt(v.date, 1) + ' · ' + inr(v.total, 1) + ' · ' + v.status) + '">' + esc(v.no) + '</a>'; }).join(''); }
  function stOf(c) { return c.due > 0.5 ? (c.paid > 0.5 ? 'part' : 'due') : 'paid'; }
  function filtered() {
    var q = PCF.q.toLowerCase().trim();
    return (P().custs || []).filter(function (c) {
      if (PCF.pin && (', ' + c.pins + ', ').indexOf(', ' + PCF.pin + ', ') < 0) return false;
      if (PCF.st === 'due' && !(c.due > 0.5)) return false;
      if (PCF.st === 'paid' && c.due > 0.5) return false;
      if (q && [c.name, c.pins, c.email, c.mobile, c.rzp].concat(invsOf(c).map(function (v) { return v.no + ' ' + v.items; })).join(' ').toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function chips() {
    var C = P().custs || [], pc = {};
    C.forEach(function (c) { String(c.pins || '').split(/,\s*/).forEach(function (p) { if (p) pc[p] = (pc[p] || 0) + 1; }); });
    var pl = Object.keys(pc).sort(function (a, b) { return pc[b] - pc[a] || (a < b ? -1 : 1); });
    var due = C.filter(function (c) { return c.due > 0.5; }).length;
    var b = function (lbl, n, on, js) { return '<button class="lch' + (on ? ' on' : '') + '" onclick="' + js + ';pcDraw()">' + esc(lbl) + (n != null ? ' <b>' + n + '</b>' : '') + '</button>'; };
    return '<div class="lchips">' + b('All', C.length, !PCF.st, "PCF.st=''") + b('✓ Fully paid', C.length - due, PCF.st === 'paid', "PCF.st='paid'") +
      (due ? b('⚠ Payment due', due, PCF.st === 'due', "PCF.st='due'") : '') + '</div>' +
      (pl.length ? '<div class="lchips">' + b('All PINs', null, !PCF.pin, "PCF.pin=''") + pl.map(function (p) { return b('PIN ' + p, pc[p], PCF.pin === p, "PCF.pin='" + p + "'"); }).join('') + '</div>' : '');
  }
  function list() {
    var f = filtered(), wide = window.innerWidth >= 760;
    var tt = f.reduce(function (s, c) { return s + c.total; }, 0), td = f.reduce(function (s, c) { return s + c.due; }, 0);
    var h = '<div class="note" style="margin:0 0 8px">' + f.length + ' customer' + (f.length === 1 ? '' : 's') + ' · invoiced ' + inr(tt, 1) + (td > 0.5 ? ' · due ' + inr(td, 1) : '') + '</div>';
    if (!f.length) return h + '<div class="note">No customers match.</div>';
    if (wide) {
      h += '<div class="tbl pct"><table><thead><tr><th>Customer (opens Zoho)</th><th>PIN</th><th>Contact</th><th>Invoices (click to open)</th><th>Total incl. GST</th><th>Received</th><th>Due</th><th>Last invoice</th></tr></thead><tbody>';
      f.forEach(function (c, i) {
        var k = c.id, on = !!OPEN[k];
        h += '<tr><td><button class="ex" onclick="pcTog(\'' + k + '\')" title="Show invoice details">' + (on ? '▾' : '▸') + '</button>' + zl(c.url, c.name) + '</td><td>' + pins(c.pins) + '</td><td class="ct">' + tel(c.mobile) +
          (c.email ? '<br><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' : '') + '</td><td>' + invChips(c) + '</td><td><b>' + inr(c.total, 1) + '</b></td><td class="pos">' + inr(c.paid, 1) + '</td><td class="' + (c.due > 0.5 ? 'neg' : '') + '">' + (c.due > 0.5 ? '<b>' + inr(c.due, 1) + '</b>' : '—') + '</td><td>' + dt(c.last, 1) + '</td></tr>';
        if (on) invsOf(c).forEach(function (v) {
          h += '<tr class="sub"><td colspan="3">' + zl(v.url, v.no) + ' · ' + dt(v.date, 1) + (v.pin ? ' · PIN ' + esc(v.pin) : '') + ' · <span class="chip ' + (/paid/i.test(v.status) ? 'g' : 'r') + '">' + esc(v.status) + '</span></td><td>' + esc(v.items || '—') + '</td><td>' + inr(v.total, 1) + '</td><td>' + inr(v.total - v.due, 1) + '</td><td>' + (v.due > 0.5 ? inr(v.due, 1) : '—') + '</td><td class="note">GST ' + inr(v.tax, 1) + '</td></tr>';
        });
      });
      h += '</tbody></table></div>';
    } else {
      h += f.map(function (c) {
        return '<div class="pcc"><div class="h"><b>' + zl(c.url, c.name) + '</b><div class="amt">' + inr(c.total, 1) + '<small class="' + (c.due > 0.5 ? 'neg' : 'pos') + '">' + (c.due > 0.5 ? 'Due ' + inr(c.due, 1) : 'Paid') + '</small></div></div>' +
          '<div class="m">' + pins(c.pins) + (c.mobile ? ' · 📞 ' + tel(c.mobile) : '') + (c.email ? '<br>✉️ <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' : '') +
          '<br>' + c.n + ' invoice' + (c.n === 1 ? '' : 's') + ' · last ' + dt(c.last, 1) + '</div><div class="pciv">' + invChips(c) + '</div></div>';
      }).join('');
    }
    return h;
  }
  window.vPaid = function () {
    var p = P();
    if (!D.paid) return card('Paid customers', '<div class="note">Appears after the Apps Script update (PaidCustomers.gs) and the next Zoho sync — or LMI Tracker → <b>Paid customers: refresh now</b> in the Sheet.</div>');
    if (p.error) return card('Paid customers', '<div class="note">Could not read the Paid_Customers tab: ' + esc(p.error) + '</div>');
    var C = p.custs || [], tt = 0, td = 0; C.forEach(function (c) { tt += c.total; td += c.due; });
    var h = '<div class="grid">' +
      tile('Paid customers', num(C.length), (p.invs || []).length + ' invoices in Zoho Books', '', 'hero') +
      tile('Total invoiced (incl. GST)', inr(tt), 'all invoices, all customers', '') +
      tile('Received', inr(tt - td), tt ? pct((tt - td) / tt) + ' collected' : '', '') +
      tile('Payment due', inr(td), C.filter(function (c) { return c.due > 0.5; }).length + ' customer(s)', '', td > 0.5 ? 'alert' : '') + '</div>';
    h += card('Customers', '<div class="pcl"><div class="ldbar"><input id="pcq" type="search" placeholder="Search name, PIN, phone, email, invoice no…" value="' + esc(PCF.q) + '" oninput="PCF.q=this.value;pcList()"></div>' +
      '<div id="pcch">' + chips() + '</div><div id="pcl"></div></div>',
      'From Zoho Books · ' + esc(p.updated.replace(/^.*?updated /, 'updated ').replace(/ ·.*$/, '')) + '. Tap a customer or an invoice number to open it in Zoho Books' + (window.innerWidth >= 760 ? ' · ▸ shows each invoice\'s items' : '') + '. PIN = the Franchise tag on the invoice.');
    var iv = p.invs || [];
    if (iv.length) h += card('All invoices', table(['Invoice', 'Date', 'Customer', 'PIN', 'Items', 'Total', 'Due', 'Status'], iv.map(function (v) {
      var c = C.filter(function (x) { return x.id === v.cid; })[0];
      return ['<span class="pcl">' + zl(v.url, v.no) + '</span>', dt(v.date, 1), '<span class="pcl">' + (c ? zl(c.url, v.cust) : esc(v.cust)) + '</span>', esc(v.pin || '—'), esc(v.items || '—'),
        inr(v.total, 1), v.due > 0.5 ? '<span class="neg">' + inr(v.due, 1) + '</span>' : '—', '<span class="chip ' + (/paid/i.test(v.status) ? 'g' : 'r') + '">' + esc(v.status) + '</span>'];
    })), 'Latest first. Full list with GST split is in the Paid_Customers tab of the Sheet.');
    setTimeout(pcList, 0);
    return h;
  };
  window.pcList = function () { var el = document.getElementById('pcl'); if (el) el.innerHTML = list(); };
  window.pcDraw = function () { var c = document.getElementById('pcch'); if (c) c.innerHTML = chips(); pcList(); };
  window.pcTog = function (k) { OPEN[k] = !OPEN[k]; pcList(); };
  window.addEventListener('resize', function () { if (TAB === 'paid') pcList(); });

  var _render = render;
  render = function () {
    if (TAB !== 'paid') return _render.apply(this, arguments);
    charts.forEach(function (c) { c.destroy(); }); charts = [];
    document.getElementById('view').innerHTML = vPaid();
  };
  if (D) { try { buildShell(); } catch (e) {} }
})();
