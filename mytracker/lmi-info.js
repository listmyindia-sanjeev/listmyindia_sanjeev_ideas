/* LMI Founder Tracker — "What does this mean?" helper (v1, 21 Nov 2026)
   Adds hover explanations (desktop) and tap-on-ⓘ sheets (phone) to every tab, KPI box and key card.
   Needs no change to dash.html except one line:  <script src="lmi-info.js?v=1"></script>  before </body>.
   Ideal ranges are rules of thumb for LMI's stage, tied to the SME IPO plan (3 audited years, positive EBITDA,
   clean compliance). Confirm exchange eligibility numbers with CA Manit Kunal / the merchant banker before filing. */
(function () {
  var I = {};
  function A(k, t, what, read, ideal, mean) { I[k] = { t: t, w: what, r: read, i: ideal, m: mean }; }

  /* ───────────── TABS ───────────── */
  A('tab_overview', 'Overview', 'One-screen health check of cash, sales, profit, network and what you owe.',
    'Top row = survival (cash). Middle = growth (sales, EBITDA, franchises, listings). Last = obligations (payables, GST). Red boxes need action. Pick Month / Quarter / FY / Op-Year at the top to change the sales and EBITDA boxes.',
    'No red boxes. Bank balance above 3 months of spend, sales achievement 90%+ of plan, all dues funded.',
    'This is the page an investor or merchant banker will want you to know by heart. If you open only one page a day, open this.');
  A('tab_pnl', 'P&L', 'Profit and loss for the chosen period — planned vs actual, line by line, down to EBITDA and PAT.',
    'Planned = the 36-month plan. Actual = Zoho invoices and bills. Variance is coloured green when it helps you, red when it hurts. Achieved % = actual ÷ planned. Actual EBITDA is approximate (no GP/SGP or kit-cost split yet).',
    'Sales achieved 90–110% of plan; opex within 100% of plan; EBITDA moving from negative to positive by the planned breakeven month.',
    'SME IPO exchanges look at 3 audited years and expect operating profit (EBITDA) in at least 2 of them. This tab is your monthly rehearsal for that.');
  A('tab_cash', 'Cash & Funds', 'Cash in the bank, what is owed, how long the money lasts, and the full bank statement since inception.',
    'Bank − dues = free cash. Runway = free cash ÷ average monthly spend. Planned low point shows the month your cash is thinnest and how much you must bring in to stay above ₹0.',
    'Runway 6+ months; planned low point never below ₹0; statement balance equals Zoho balance.',
    'Cash, not profit, decides whether the company survives to IPO. A negative low point means arrange funding (owners’ contribution, advance fees) before that month.');
  A('tab_gst', 'GST & TDS', 'Tax you collected for the government, tax credit (ITC) you can set off, and TDS to deposit.',
    'Output GST − ITC = net GST payable by the 20th of next month. TDS is due by the 7th. Planned rows are forecasts; the Actual row comes from Zoho invoices.',
    'Filed and paid on or before the due date every month, zero late fees, GST credit balance never negative.',
    'A spotless compliance record is a diligence item for an SME IPO. Late fees you already paid (₹500 × 3, ₹120) are exactly the kind of thing auditors ask about — keep it clean from here.');
  A('tab_pay', 'Payables', 'Money LMI owes to franchise partners and to the CTO (Penny Software), and how it is worked out.',
    'Franchise table: revenue share − TDS = net payable; Outstanding = still unpaid. Settle by the 10th. The CTO block shows the 25% pool, IT costs LMI paid on his behalf and the carry-forward.',
    'Outstanding franchise payable ₹0 after the 10th; CTO carry-forward shrinking month on month.',
    'Late partner payouts damage franchise trust and can trigger agreement disputes. Unrecovered CTO carry-forward is cost LMI has already borne.');
  A('tab_fr', 'Franchises', 'Each franchise PIN against its agreement targets — paid listings, free listings, users, sponsorship.',
    'Meter = actual ÷ target. The red tick is the Franchise Minimum (floor). Green chip = on target, amber = above floor, red = below floor. Tap a card for monthly history. Lower down: revenue vs expenses PIN by PIN.',
    'Every franchise above the floor; most on target; franchise-tagged expenses well below the revenue earned.',
    'Franchise revenue is your fastest scalable engine. A franchise below its floor is both a revenue risk and a contractual lever (Clause 9).');
  A('tab_exp', 'Expenses', 'Where the money went — by group, sub-group, Zoho expense head and individual entry.',
    'Tap a bar or slice to drill down; tap an entry to open it in Zoho. Share % = part of grand total. Franchise-tagged costs are moved into their PIN so nothing is counted twice. Table below shows every bank payment.',
    'Marketing and franchise costs growing together with sales; admin, travel and software under about 20% of spend; nothing under “Other” or “Not categorised”.',
    'Investors read the expense mix to judge discipline. Clean categories also make audit and the SME IPO draft prospectus far cheaper to prepare.');
  A('tab_cto', 'CTO Share', 'Settlement of the CTO’s 25% revenue share against IT and tech costs LMI paid.',
    'Share = 25% of sales (GST-inclusive) → taxable 21.19% + GST 3.81%. IT costs are recovered first; shortfall carries forward. Payout = taxable surplus + 18% GST − TDS.',
    'Carry-forward falling to ₹0 and a payout only when sales are healthy; IT cost under roughly 20–25% of the pool.',
    'This is a related-party arrangement, so the IPO will need it documented and defensible. Keep every cost tagged and every settlement invoiced.');
  A('tab_plan', 'Planned 36m', 'The 36-month business plan — franchises, listings, revenue, costs, EBITDA, PAT and planned bank balance.',
    'Each column is a month, quarter, FY or Op-Year. “Live vs saved baseline” compares today’s plan with a snapshot you saved earlier.',
    'Plan assumptions you can defend with actuals; actual running within about ±20% of plan; baselines saved before every big commercial change.',
    'This is the plan an IPO banker will challenge. The further actuals drift from it, the less credible the Year-3 numbers look, so re-base it honestly when reality differs.');
  A('tab_rates', 'Rate Card', 'Prices, fees, discounts, revenue-share % and commissions in force, with history and scheduled changes.',
    'Top card = what applies today. Table = every change with its effective date. Past dates correct history; future dates schedule a change.',
    'Every change is dated, with a reason recorded.',
    'Pricing changes are the biggest driver of the plan. A dated rate history keeps agreements, invoices and the plan consistent.');
  A('tab_users', 'Users & Points', 'Registered users, referral points held, voucher redemptions and user list from admin.listmyindia.com.',
    'Points value = points ÷ points-per-₹1. It is a liability the day redemptions switch on. Changes since the last sync show how many points were issued. Updated when you press Sync to Tracker.',
    'Users and users-with-listings rising; points value small compared with free cash; redemptions turned on only when cash covers the points value.',
    'User growth is a leading signal of listing revenue; points are a future cash outflow. Track both before opening redemptions.');
  A('tab_leads', 'Leads', 'Your partner and franchise lead pipeline — editable.',
    'Chips filter by stage; red “Follow-up due” shows leads whose date has arrived. Edits save straight to the Leads tab of the Sheet.',
    'No follow-ups overdue; every lead has a next step and date; steady conversion from Presented/Met to Converted.',
    'Franchise fees fund the early plan. A dry pipeline now means a cash gap two to three months from now.');

  /* ───────────── OVERVIEW + CASH TILES ───────────── */
  A('bank_balance', 'Bank balance', 'Money in the HDFC current account right now, as read from Zoho Books.',
    'Updated at each Zoho sync. If it differs from the real bank balance, some bank lines are not yet categorised in Zoho.',
    'At least 3 months of average spend; 6 months is comfortable for a company heading to IPO.',
    'The one number that cannot be spun. Below one month of spend, hiring, ads and partner payouts all become decisions about survival.');
  A('free_cash_after_dues', 'Free cash after dues', 'Bank balance minus everything due soon: franchise payable, GST, TDS, CTO payable.',
    'Positive = money truly yours to spend. Negative = you owe more than you hold, so some obligation will go late.',
    'Positive always; at least one month of spend above dues.',
    'Treat negative free cash as an alert, not a statistic. It is the earliest warning before a missed GST or partner payment.');
  A('runway', 'Runway', 'How many months the free cash lasts at the current monthly spend, with no new revenue.',
    'Free cash ÷ average spend of the last 2 closed months. Zero or negative means already below dues.',
    '6+ months comfortable; 3–6 watch closely; under 3 critical.',
    'Runway sets your decision time. Under 3 months, the priorities are collections, franchise fees and owner funding, not new spending.');
  A('planned_cash_low_point', 'Planned cash low point', 'The lowest bank balance forecast in the 36-month plan, and the month it happens.',
    'If negative, “need ₹X” is the extra cash required in that month to stay at ₹0.',
    '₹0 or above in every month, ideally with a buffer.',
    'This is your fund-raising or owner-funding target: bring that amount in before that month, not during it.');
  A('sales', 'Sales', 'Revenue before GST for the selected period, with the plan next to it and the % achieved.',
    'The blue bar is actual ÷ planned. Note that a single big one-time fee (franchise licence or kit) can lift a month and hide a shortfall in recurring listings.',
    '90–110% of plan; over 100% is good only if the mix is recurring revenue.',
    'Consistent plan achievement builds the track record an IPO needs. Watch recurring listing revenue separately from one-time fees.');
  A('ebitda', 'EBITDA', 'Operating profit before interest, tax, depreciation — actual (approximate) against plan.',
    'Negative is expected in the launch months. What matters is the direction and whether it meets the planned breakeven month.',
    'Trend toward positive by the planned breakeven month, then positive every month. Exchanges look for operating profit in at least 2 of the last 3 FYs (current rule: about ₹1 Cr or more — confirm with the CA).',
    'EBITDA is the headline profit metric for an SME IPO. Your plan shows Op-Year 1 EBITDA of about ₹66.7 L and far higher in Years 2–3, so actuals must start tracking it soon.');
  A('active_franchises', 'Active franchises', 'Franchise partners currently Active in the register, against the plan for this month.',
    'The bar shows actual ÷ planned. Active means signed and live, not leads.',
    'At or above plan every month. At least 80% of plan is a healthy pace.',
    'Each franchise adds licence/kit fees now and recurring territory revenue later. Falling behind here delays almost every other number.');
  A('paid_listings', 'Paid listings', 'Distinct customers with a paid listing or setup-fee invoice in Zoho, against the planned active listings.',
    'Tap to see PIN by PIN, then each customer and invoice. Active = paid within the last 35 days; Renewal due = lapsed.',
    '80–100% of planned active listings; renewal-due customers under 20%.',
    'Listings are the recurring-revenue heart of LMI. Today’s gap between actual and planned is the biggest lever on Year-1 EBITDA.');
  A('referral_points', 'Referral points', 'Value of points users hold, from the admin panel.',
    'Points ÷ points-per-₹1 = rupee value. It is only a liability when redemptions are on.',
    'Low compared with free cash; users and listings growing faster than points.',
    'A reward liability that can turn into cash outflow. Keep redemptions off until the bank can cover the full value.');
  A('franchise_payable', 'Franchise payable', 'Revenue share still owed to franchise partners; “below floor” counts franchises under the agreement minimum.',
    'Zero outstanding is correct. Below floor above zero means a franchise is under its Red Flag level (Clause 9).',
    '₹0 outstanding after the 10th; zero franchises below floor.',
    'Paying on time protects trust; a franchise below floor is a performance conversation to start early.');
  A('hemadri_it_carry_forward', 'CTO Revenue Share (25%) — IT carry-forward', 'IT and tech cost LMI paid that has not yet been recovered from the CTO’s 25% share.',
    'It reduces future payouts to the CTO until it is cleared. Shown as recoverable.',
    'Falling toward ₹0 as sales grow; not rising for several months in a row.',
    'Until sales are large enough, LMI carries this cost. In IPO diligence it is a related-party receivable that needs clean documentation.');
  A('ebitda_breakeven', 'EBITDA breakeven', 'First month the business stops losing money at the operating level (actual to date + planned after).',
    'Cash breakeven is when monthly net cash flow stays at or above zero.',
    'Planned breakeven within 6–9 months of launch and still true when actuals are fed in. Slipping by more than 2 months needs a plan review.',
    'A reachable breakeven is the core of the SME IPO story. Treat any slip as a signal to cut cost or raise sales speed.');
  A('gst_payable', 'GST payable', 'GST for closed months not yet paid: output GST − actual ITC − challans paid, from the GST_Ledger tab.',
    'Fill GST_Ledger monthly with GSTR-2B credit and challans paid. Shows ₹0 once paid.',
    '₹0 after each 20th; never more than the next month’s expected GST.',
    'GST is collected money, not yours. Paying exactly on time keeps the record clean for the IPO.');
  A('bank_zoho', 'Bank (Zoho)', 'Latest bank balance pulled from Zoho Books.',
    'Same figure as Overview → Bank balance. Compare with the bank statement card at the bottom of this tab.',
    'Equals the real bank balance.', 'A mismatch means uncategorised lines or duplicates in Zoho. Fix them before relying on any other number.');
  A('total_dues', 'Total dues', 'Everything LMI owes in the near term: franchise payable, GST, TDS and CTO payable.',
    'See “Dues right now” below for the split.', 'Covered by bank balance at all times.',
    'If dues exceed the bank balance, the shortfall is the amount you must arrange this month.');
  A('free_cash', 'Free cash', 'Bank balance − total dues.', 'Positive = spendable.', 'Positive always.', 'Negative = you are short on obligations, not just on growth.');
  A('avg_monthly_spend', 'Avg monthly spend', 'Average actual spend of the last 2 closed months, LMI + CTO IT costs.',
    'It feeds runway. One-time costs (exhibition, equipment) inflate it temporarily.',
    'Within plan; one-offs flagged separately.', 'This is your burn. Compare it with sales every month.');
  A('lowest_planned_balance', 'Lowest planned balance', 'Lowest forecast bank balance in the plan.', 'The month appears under the value.', '₹0 or above.',
    'Shows when cash is most strained — plan funding before it.');
  A('funding_needed', 'Funding needed', 'Extra cash required to keep the forecast bank balance at or above ₹0.', 'Zero is the target; any amount is the fundraising or owner-contribution need.',
    '₹0.', 'This is the figure to take to owners/investors, with the month it is needed by.');
  A('hemadri_token_due', 'CTO token due', 'Part of the ₹3.5 L token commitment from the CTO not yet received.', 'Remaining balance receivable.',
    'Collected on the agreed schedule.', 'Money owed to LMI. Collecting it improves free cash with no new sales effort.');
  A('money_in', 'Money in', 'Total of every credit in the bank since inception.', 'Includes owner contributions and customer receipts.', 'Customer receipts growing share of total.',
    'If most “money in” is still owner funding, the business is not yet funding itself.');
  A('money_out', 'Money out', 'Total of every debit in the bank since inception.', 'Compare with Money in.', 'Spend tracked against plan.', 'Sustained money out above money in is the cash gap owners have to fund.');
  A('closing_balance_statement', 'Closing balance (statement)', 'Money in − money out, rebuilt from the bank transactions in Zoho.',
    'Compare with the Zoho Books balance; a difference is shown in red.', 'Within ₹1 of Zoho.', 'A difference means a bank line is missing, duplicated or uncategorised.');

  /* ───────────── GST ───────────── */
  A('gst_payable_now', 'GST payable now', 'GST for the last closed month still to be paid.', 'Same as Overview → GST payable.', '₹0 after payment, on time.', 'Compliance and cash item in one: fund it before the 20th.');
  A('tds_payable_now', 'TDS payable now', 'TDS deducted from franchise/GP/SGP and CTO payments, to be deposited by the 7th.', 'Due by the 7th of next month.', 'Deposited on or before the 7th.',
    'Late TDS attracts interest and a notice; keep it separate from operating cash.');

  /* ───────────── EXPENSES ───────────── */
  A('spend', 'Spend', 'Total actual spend in the selected period: LMI-borne + CTO-borne.', 'Split under the number.', 'At or below plan.', 'Your monthly burn. Watch it against sales every month.');
  A('avg_monthly_last_2', 'Avg monthly (last 2)', 'Average spend of the last 2 closed months.', 'Feeds runway on Overview.', 'Falling or stable as sales grow.', 'A rising average without rising sales shortens runway.');

  /* ───────────── CTO ───────────── */
  A('sales_ex_gst', 'Sales (ex-GST)', 'Zoho invoice sales for the period before GST — the base for the CTO share.', 'All revenue streams.', 'At or above plan.', 'The CTO payout depends directly on this.');
  A('cto_revenue_share_25', 'CTO Revenue Share (25%)', '25% of sales, GST-inclusive; split into taxable 21.19% and GST 3.81%.', 'Taxable part is a cost in the P&L.', 'Stable at 25% of sales.', 'It scales with sales, so it grows with you.');
  A('it_and_tech_cost_borne_by_cto', 'IT & tech cost borne by CTO', 'IT and tech cost LMI paid that is chargeable to the CTO share.', 'Tap to open Expenses.', 'Under about 20–25% of the pool.', 'This is cost LMI advances and recovers later from the share.');
  A('net_payout_to_cto', 'Net payout to CTO', 'Amount payable after recovering IT cost, plus GST and minus TDS.', 'Shown only when the share exceeds cost.', 'Paid by the due date.', 'Shows the share is large enough to cover IT cost.');
  A('carry_forward_owed_by_cto', 'Carry-forward owed by CTO', 'IT cost not yet covered by the CTO share.', 'Recovered from future share.', 'Falling to ₹0.', 'Cost LMI has borne until sales catch up.');

  /* ───────────── USERS ───────────── */
  A('points_value_owed_if_redeemed', 'Points value', 'Rupee value of all points held by users.', 'Points ÷ points-per-₹1.', 'Small compared with free cash.', 'The size of the reward liability when redemptions open.');
  A('registered_users', 'Registered users', 'Total sign-ups on listmyindia.com.', 'Small text shows new in 30 days.', 'Growing steadily, faster than listings.', 'Top of the funnel for listings and sponsors.');
  A('users_with_listings', 'Users with listings', 'Users who have at least one business listing and how many PINs they cover.', 'Compare with registered users.', 'Rising share of users.', 'Shows how many sign-ups become supply.');
  A('vouchers_redeemed', 'Vouchers redeemed', 'Value of reward vouchers already issued.', 'Zero while redemptions are off.', 'Covered by cash before turning redemptions on.', 'Real cash outflow when it starts.');

  /* ───────────── KEY CARDS ───────────── */
  A('card_dues_right_now', 'Dues right now', 'Each obligation that adds up to Total dues.', 'GST is the last closed month; TDS is due by the 7th.', 'All covered by cash.', 'Know what is due before deciding what to spend.');
  A('card_bank_statement', 'Bank statement — since inception', 'Every bank transaction from Zoho, grouped by month, quarter or FY.', 'Tap a row to open it. A yellow chip marks a line not categorised in Zoho.', 'Zero uncategorised lines.', 'This is what your CA and auditors will tie everything to.');
  A('card_franchise_scorecard', 'Franchise scorecard', 'Each franchise against its Annexure A targets.', 'Red tick on a meter is the floor.', 'On target or above floor.', 'Your early warning for under-performing territories.');
  A('card_franchise_wise_revenue_and_expenses', 'Franchise-wise revenue & expenses', 'Revenue and Zoho-tagged costs per franchise PIN.', 'Revenue is before the franchise share.', 'Positive net contribution in every PIN.', 'Shows which territories actually make money for LMI.');
  A('card_by_group', 'By group', 'Chart of spend in the selected period.', 'Tap a bar to drill down.', 'No single group over about 40%, except launch spends.', 'Quick view of where the money went.');
  A('card_actual_spend', 'Actual spend', 'Grouped, expandable table of spend by period.', 'Tap ▸ to open a group down to each Zoho entry.', 'Mix stable and explainable.', 'The base for audit and cost planning.');
  A('card_cto_settlement', 'CTO settlement', 'Line by line workings of the CTO share and recovery.', 'Sections A–E: Sales → share → cost → surplus → bank payout.', 'Carry-forward falling.', 'The exact numbers behind each payout.');
  A('card_36_month_planned', '36-month planned', 'The plan the dashboard measures actuals against.', 'Edit Assumptions, Drivers and Rate_Card in the Sheet.', 'Defensible assumptions.', 'The story you will present to investors.');
  A('card_p_and_l', 'P&L', 'Planned vs actual for the period.', 'See tab help for the columns.', 'Achieved 90–110%.', 'Where profit is won or lost.');
  A('card_cash_flow', 'Cash flow', 'Planned cash in, out, net and closing bank, with actual bank from Zoho.', 'Collections are assumed in the month of sale; partner shares, CTO and GST are paid the next month.', 'Closing bank never below ₹0.', 'Shows timing gaps even when the business is profitable.');

  /* ───────────── ENGINE ───────────── */
  function ik(s) { return String(s).replace(/<[^>]*>/g, '').replace(/&amp;|&/g, ' and ').split(' — ')[0].toLowerCase().replace(/ by (month|quarter|fy|op-year)$/, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
  function body(k) {
    var x = I[k]; if (!x) return '';
    return '<div class="itp"><b>' + x.t + '</b><p><u>What it is</u>' + x.w + '</p><p><u>How to read it</u>' + x.r + '</p><p><u>Ideal range</u>' + x.i + '</p><p><u>As a founder</u>' + x.m + '</p></div>';
  }
  window.lmiInfo = function (k) {
    var x = I[k]; if (!x) return; hide();
    window.DR = [{ t: x.t, s: '', h: body(k) }]; window.drShow();
  };
  var css = document.createElement('style');
  css.textContent = '.tile{position:relative}.ib{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;border:1px solid currentColor;font:600 11px/1 Poppins,system-ui,sans-serif;font-style:normal;cursor:help;opacity:.55;flex:none;margin-left:6px;vertical-align:middle}.ib:hover{opacity:1}.tile>.ib{position:absolute;top:10px;right:10px;margin:0}.tile.hero>.ib{color:#fff}.card h3 .ib{color:var(--blue)}'
    + '.bkbtn.ibk{margin-left:auto;flex:none}.lminote{font-size:12px;color:var(--mute);background:var(--soft);border-radius:10px;padding:8px 12px;margin:0 0 10px}'
    + '#lmitip{position:fixed;z-index:80;max-width:340px;background:var(--navy);color:#fff;border-radius:12px;padding:12px 14px;box-shadow:0 10px 30px rgba(5,19,45,.35);font-size:12.5px;line-height:1.45;display:none;pointer-events:none}'
    + '#lmitip b,.itp b{display:block;font-size:14px;margin-bottom:4px}#lmitip u,.itp u{display:block;text-decoration:none;font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--yel);margin-top:8px}#lmitip p,.itp p{margin:0}'
    + '.itp u{color:var(--blue)}.itp p{font-size:13.5px;line-height:1.5;margin-bottom:2px}@media(max-width:759px){#lmitip{display:none!important}}';
  document.head.appendChild(css);
  var tip = document.createElement('div'); tip.id = 'lmitip'; document.body.appendChild(tip);
  function hide() { tip.style.display = 'none'; }
  var hov = window.matchMedia && window.matchMedia('(hover:hover)').matches;
  document.addEventListener('mouseover', function (e) {
    if (!hov) return; var t = e.target.closest && e.target.closest('[data-i]'); if (!t) return; var h = body(t.getAttribute('data-i')); if (!h) return;
    tip.innerHTML = h; tip.style.display = 'block'; var r = t.getBoundingClientRect(), w = tip.offsetWidth, hh = tip.offsetHeight;
    var x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8), y = r.bottom + 8; if (y + hh > window.innerHeight - 8) y = Math.max(8, r.top - hh - 8);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  });
  document.addEventListener('mouseout', function (e) { var t = e.target.closest && e.target.closest('[data-i]'); if (t && !t.contains(e.relatedTarget)) hide(); });
  window.addEventListener('scroll', hide, { passive: true });

  function wrap(name, fn) { var o = window[name]; if (typeof o !== 'function') return; window[name] = function () { return fn(o, arguments); }; }
  // KPI boxes
  wrap('tile', function (o, a) {
    var k = ik(a[0]), h = o.apply(this, a); if (!I[k]) return h;
    return h.replace('<div class="tile ', '<div data-i="' + k + '" class="tile ').replace('<div class="l">', '<i class="ib" data-i="' + k + '" onclick="event.stopPropagation();lmiInfo(\'' + k + '\')">i</i><div class="l">');
  });
  // Cards
  wrap('card', function (o, a) {
    var k = 'card_' + ik(a[0]), h = o.apply(this, a); if (!I[k]) return h;
    return h.replace('</h3>', ' <i class="ib" data-i="' + k + '" onclick="lmiInfo(\'' + k + '\')">i</i></h3>');
  });
  // Tabs: hover on desktop tab bar, ⓘ button on every tab page, intro line on Overview
  wrap('buildShell', function (o, a) {
    var r = o.apply(this, a), bs = document.querySelectorAll('nav#tabs button');
    [].forEach.call(bs, function (b, i) { if (window.TABS && TABS[i]) b.setAttribute('data-i', 'tab_' + TABS[i][0]); }); return r;
  });
  wrap('bkBar0', function (o, a) {
    var r = o.apply(this, a), b = document.querySelector('#bk .bkb');
    if (b && window.TAB && I['tab_' + TAB]) b.insertAdjacentHTML('beforeend', '<button class="bkbtn ibk" onclick="lmiInfo(\'tab_' + TAB + '\')">ⓘ How to read this tab</button>'); return r;
  });
  wrap('render', function (o, a) {
    var r = o.apply(this, a), v = document.getElementById('view');
    if (v && window.TAB === 'overview') v.insertAdjacentHTML('afterbegin', '<div class="lminote">Hover over any box or tab (or tap its ⓘ on a phone) to see what it means, how to read it, the ideal range and what it tells you as a founder.</div>');
    return r;
  });
})();
