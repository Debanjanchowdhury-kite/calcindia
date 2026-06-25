// Generate 4 new calculator pages (Reverse GST, Gratuity, NPS, EPF) matching
// the site's exact structure (header, breadcrumb, byline, layout, sidebars, FAQ).
const fs = require('fs');

const HEAD_ICONS = `<link rel="icon" href="favicon.ico" sizes="any"/>
<link rel="icon" type="image/svg+xml" href="favicon.svg"/>
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="favicon-180.png"/>`;

const HEADER = `<header>
  <a href="/" aria-label="IndiCalculator Home" class="logo a1"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 64" style="height:36px;width:auto"><circle cx="8" cy="9" r="6" fill="#F5A623"/><circle cx="83" cy="9" r="6" fill="#F5A623"/><text x="0" y="55" font-family="Nunito,sans-serif" font-weight="900" font-size="50" fill="#1B2A5E">indicalculat</text><rect x="283" y="15" width="35" height="41" rx="5" fill="#1B2A5E"/><rect x="287" y="18" width="27" height="11" rx="3" fill="#F5A623"/><circle cx="292" cy="34" r="2.5" fill="white"/><circle cx="300" cy="34" r="2.5" fill="white"/><circle cx="308" cy="34" r="2.5" fill="white"/><circle cx="292" cy="42" r="2.5" fill="white"/><circle cx="300" cy="42" r="2.5" fill="white"/><circle cx="308" cy="42" r="2.5" fill="white"/><circle cx="292" cy="50" r="2.5" fill="white"/><circle cx="300" cy="50" r="2.5" fill="white"/><circle cx="308" cy="50" r="2.5" fill="white"/><text x="321" y="55" font-family="Nunito,sans-serif" font-weight="900" font-size="50" fill="#1B2A5E">r</text></svg></a>
  <button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  <nav class="a2" aria-label="Main navigation">
    <a href="emi-calculator.html">EMI</a>
    <a href="sip-calculator.html">SIP</a>
    <a href="income-tax-calculator.html">Tax</a>
    <a href="gst-calculator.html">GST</a>
    <a href="ppf-fd-calculator.html">PPF/FD</a>
    <a href="blog.html">Blog</a>
  </nav>
</header>
<div class="mobile-nav-overlay"></div>`;

const LEFTNAV = `<aside class="left-nav a3">
  <span class="left-nav-label">Calculators</span>
  <a href="emi-calculator.html" class="nav-card"><div class="nc-icon">🏠</div><div class="nc-info"><span class="nc-name">EMI</span><span class="nc-desc">Loan calculator</span></div></a>
  <a href="sip-calculator.html" class="nav-card"><div class="nc-icon">📈</div><div class="nc-info"><span class="nc-name">SIP Returns</span><span class="nc-desc">Mutual fund growth</span></div></a>
  <a href="income-tax-calculator.html" class="nav-card"><div class="nc-icon">💰</div><div class="nc-info"><span class="nc-name">Income Tax</span><span class="nc-desc">Old vs New regime</span></div></a>
  <a href="gst-calculator.html" class="nav-card"><div class="nc-icon">🧾</div><div class="nc-info"><span class="nc-name">GST</span><span class="nc-desc">Add/remove tax</span></div></a>
  <a href="ppf-fd-calculator.html" class="nav-card"><div class="nc-icon">🏦</div><div class="nc-info"><span class="nc-name">PPF / FD</span><span class="nc-desc">Savings maturity</span></div></a>
  <a href="epf-calculator.html" class="nav-card" data-nav="epf"><div class="nc-icon">💵</div><div class="nc-info"><span class="nc-name">EPF</span><span class="nc-desc">PF retirement corpus</span></div></a>
  <a href="nps-calculator.html" class="nav-card" data-nav="nps"><div class="nc-icon">🪙</div><div class="nc-info"><span class="nc-name">NPS</span><span class="nc-desc">Pension corpus</span></div></a>
  <a href="gratuity-calculator.html" class="nav-card" data-nav="gratuity"><div class="nc-icon">🎁</div><div class="nc-info"><span class="nc-name">Gratuity</span><span class="nc-desc">On resignation</span></div></a>
  <a href="salary-calculator.html" class="nav-card"><div class="nc-icon">💼</div><div class="nc-info"><span class="nc-name">Salary</span><span class="nc-desc">In-hand pay</span></div></a>
  <a href="hra-calculator.html" class="nav-card"><div class="nc-icon">🏘️</div><div class="nc-info"><span class="nc-name">HRA Exemption</span><span class="nc-desc">Tax saving on rent</span></div></a>
  <a href="reverse-gst-calculator.html" class="nav-card" data-nav="rgst"><div class="nc-icon">🔄</div><div class="nc-info"><span class="nc-name">Reverse GST</span><span class="nc-desc">Remove GST from total</span></div></a>
  <hr class="nav-divider"/>
  <a href="blog.html" class="nav-card"><div class="nc-icon">📝</div><div class="nc-info"><span class="nc-name">Blog</span><span class="nc-desc">Finance guides</span></div></a>
</aside>`;

const RIGHT_SIDEBAR = `<aside class="right-sidebar">
  <div class="widget">
    <div class="widget-title">📊 Live Rates</div><div class="rate-updated">Updated 25 Jun 2026 · rates indicative</div>
    <div class="rate-row"><span class="rate-label">RBI Repo Rate</span><span class="rate-val coral">5.25%</span></div>
    <div class="rate-row"><span class="rate-label">EPF Rate (FY24-25)</span><span class="rate-val green">8.25%</span></div>
    <div class="rate-row"><span class="rate-label">PPF Rate</span><span class="rate-val green">7.10%</span></div>
    <div class="rate-row"><span class="rate-label">NSC Rate</span><span class="rate-val green">7.70%</span></div>
    <div class="rate-row"><span class="rate-label">SBI Home Loan</span><span class="rate-val teal">7.50%</span></div>
    <div class="rate-row"><span class="rate-label">SBI Senior FD</span><span class="rate-val green">7.05%</span></div>
    <div class="rate-row"><span class="rate-label">HDFC FD (1Y)</span><span class="rate-val teal">7.25%</span></div>
  </div>
  <div class="widget">
    <div class="widget-title">⭐ All Calculators</div>
    <a class="bank-link" href="emi-calculator.html">EMI Calculator</a>
    <a class="bank-link" href="sip-calculator.html">SIP Calculator</a>
    <a class="bank-link" href="income-tax-calculator.html">Income Tax Calculator</a>
    <a class="bank-link" href="gst-calculator.html">GST Calculator</a>
    <a class="bank-link" href="reverse-gst-calculator.html">Reverse GST Calculator</a>
    <a class="bank-link" href="ppf-fd-calculator.html">PPF / FD Calculator</a>
    <a class="bank-link" href="epf-calculator.html">EPF Calculator</a>
    <a class="bank-link" href="nps-calculator.html">NPS Calculator</a>
    <a class="bank-link" href="gratuity-calculator.html">Gratuity Calculator</a>
    <a class="bank-link" href="salary-calculator.html">Salary Calculator</a>
    <a class="bank-link" href="hra-calculator.html">HRA Calculator</a>
  </div>
</aside>`;

const FOOTER = `<section class="footer-links-section"><div class="container"><div class="footer-grid">
  <div class="footer-col"><h3 class="footer-heading">🏠 Loans &amp; EMI</h3><a href="emi-calculator.html">EMI Calculator</a><a href="sbi-home-loan-emi-calculator.html">SBI Home Loan EMI</a><a href="hdfc-home-loan-emi-calculator.html">HDFC Home Loan EMI</a></div>
  <div class="footer-col"><h3 class="footer-heading">📈 Investments &amp; Retirement</h3><a href="sip-calculator.html">SIP Calculator</a><a href="ppf-fd-calculator.html">PPF / FD Calculator</a><a href="epf-calculator.html">EPF Calculator</a><a href="nps-calculator.html">NPS Calculator</a></div>
  <div class="footer-col"><h3 class="footer-heading">💼 Salary &amp; HR</h3><a href="salary-calculator.html">Salary Calculator</a><a href="hra-calculator.html">HRA Calculator</a><a href="gratuity-calculator.html">Gratuity Calculator</a></div>
  <div class="footer-col"><h3 class="footer-heading">💰 Tax &amp; Business</h3><a href="income-tax-calculator.html">Income Tax Calculator</a><a href="gst-calculator.html">GST Calculator</a><a href="reverse-gst-calculator.html">Reverse GST Calculator</a><a href="blog.html">Finance Blog</a></div>
</div></div></section>
<footer><span>© 2026 IndiCalculator · Informational purposes only · Not financial advice</span><div class="footer-bottom-links"><a href="/">Home</a><a href="blog.html">Blog</a><a href="about.html">About</a><a href="privacy-policy.html">Privacy</a></div></footer>`;

const LAZY = `<!-- Lazy Load Third-Party Scripts -->
<script>
  let scriptsLoaded=false;
  function loadScripts(){if(scriptsLoaded)return;scriptsLoaded=true;
    let ga=document.createElement('script');ga.src="https://www.googletagmanager.com/gtag/js?id=G-62K8SJ29WC";ga.async=true;document.head.appendChild(ga);
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-62K8SJ29WC');
  }
  ['scroll','mousemove','touchstart','keydown'].forEach(e=>window.addEventListener(e,loadScripts,{once:true,passive:true}));
  setTimeout(loadScripts,5000);
</script>`;

const BYLINE = `<!-- AUTHOR BYLINE — replace the [placeholder] text below with real author/reviewer name & credential -->
<div class="author-byline">
  <span>✍️ Written by <strong>[Author Name — placeholder]</strong></span>
  <span aria-hidden="true">·</span>
  <span>✔️ Reviewed by <strong>[Reviewer Name, Credential — placeholder]</strong></span>
  <span aria-hidden="true">·</span>
  <span>Updated June 2026</span>
</div>`;

function page(c){
  const faqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":c.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))});
  const appSchema = JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":c.appName,"applicationCategory":"FinanceApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0"},"url":"https://indicalculator.in/"+c.file});
  const bcSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://indicalculator.in/"},{"@type":"ListItem","position":2,"name":"Calculators","item":"https://indicalculator.in/calculators/"},{"@type":"ListItem","position":3,"name":c.crumb}]});
  const faqVisible = c.faqs.map(f=>`    <div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('\n');
  const related = c.related.map(r=>`  <a class="related-card" href="${r.href}"><div class="related-icon">${r.icon}</div><div class="related-info"><span>${r.name}</span><small>${r.desc}</small></div></a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
${HEAD_ICONS}
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${c.title}</title>
<meta name="description" content="${c.desc}"/>
<meta name="keywords" content="${c.keywords}"/>
<link rel="canonical" href="https://indicalculator.in/${c.file}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${c.ogTitle}"/>
<meta property="og:description" content="${c.ogDesc}"/>
<meta property="og:url" content="https://indicalculator.in/${c.file}"/>
<meta property="og:image" content="https://indicalculator.in/og-image.png"/>
<meta property="og:site_name" content="IndiCalculator"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="https://indicalculator.in/og-image.png"/>
<script type="application/ld+json">${appSchema}</script>
<script type="application/ld+json">${bcSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Mulish:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Mulish:wght@400;600;700&display=swap"></noscript>
<link rel="stylesheet" href="shared.min.css"/>
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com"/>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</head>
<body>
${HEADER}
<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><a href="/calculators/">Calculators</a><span class="sep">›</span><span class="current">${c.crumb}</span></nav>
${BYLINE}

<div class="layout">
${LEFTNAV}

<main class="a4">
  <div class="panel-top">
    <div class="panel-badge">${c.badge}</div>
    <h1 class="panel-title">${c.h1}</h1>
    <p class="panel-sub">${c.sub}</p>
  </div>

  <div class="calc-card">
    <div class="form-grid">
${c.inputs}
    </div>
    <button class="go-btn" onclick="${c.calcFn}()">${c.btn} →</button>

    <div class="results-wrap" id="${c.id}-res">
      <div class="results-divider"><span>${c.resultsTitle}</span></div>
      <div class="stat-grid">
${c.stats}
      </div>
      <div class="chart-area one-col">
        <div class="chart-box">
          <div class="chart-title"><span>🍩</span> ${c.chartTitle}</div>
          <div class="chart-canvas-wrap" style="height:240px"><canvas id="${c.id}-donut"></canvas></div>
        </div>
      </div>
    </div>
  </div>

  <div class="disclaimer"><strong>Disclaimer:</strong> ${c.disclaimer}</div>

  <article class="info-section">
${c.content}
  </article>

  <div class="info-section">
    <h2>Frequently Asked Questions</h2>
${faqVisible}
  </div>

  <div class="info-section">
    <h2>Related Calculators</h2>
    <div class="related-grid">
${related}
    </div>
  </div>
</main>

${RIGHT_SIDEBAR}
</div>
${FOOTER}

<script src="shared.min.js"></script>
<script>
${c.js}
initMobileMenu();initFAQ();
${c.calcFn}();
</script>
${LAZY}
</body>
</html>`;
}

// ─────────────────────────── CONFIGS ───────────────────────────
const calcs = [];

// 1) REVERSE GST
calcs.push({
  file:'reverse-gst-calculator.html', id:'rg', calcFn:'calcRGST', appName:'Reverse GST Calculator', crumb:'Reverse GST Calculator',
  title:'Reverse GST Calculator | Remove GST from Total Amount | IndiCalculator',
  desc:'Free reverse GST calculator to remove GST from a total (inclusive) amount. Find the base price and GST component for 5%, 12%, 18% and 28% slabs, with CGST/SGST/IGST split.',
  keywords:'reverse gst calculator, remove gst from total, gst inclusive calculator, gst reverse calculation, extract gst from amount, gst back calculation',
  ogTitle:'Reverse GST Calculator — Remove GST from Total', ogDesc:'Find the base price and GST hidden inside any GST-inclusive amount.',
  badge:'🔄 Indirect Tax', h1:'Reverse GST Calculator — Remove GST from Total',
  sub:'A focused reverse GST calculator to extract the base price and GST amount from any GST-inclusive total. Enter the amount you paid, choose the slab, and see the net price plus the CGST/SGST or IGST split instantly.',
  btn:'Remove GST', resultsTitle:'Your Reverse GST Breakdown', chartTitle:'Base vs GST', disclaimer:'GST rates vary by product/service. Verify with CBIC before raising invoices. For indicative use only.',
  inputs:`      <div class="field"><label>Total Amount (incl. GST) (₹)</label><input type="number" id="rg-amt" value="11800" min="1" step="100"/></div>
      <div class="field"><label>GST Rate</label><select id="rg-rate" onchange="tRG()"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option><option value="c">Custom</option></select></div>
      <div class="field" id="rg-cw" style="display:none"><label>Custom Rate (%)</label><input type="number" id="rg-crate" value="10" min="0" max="100" step="0.5"/></div>
      <div class="field"><label>Transaction</label><select id="rg-txn"><option value="intra">Intrastate (CGST+SGST)</option><option value="inter">Interstate (IGST)</option></select></div>`,
  stats:`        <div class="stat-card green"><div class="stat-label">Base (excl. GST)</div><div class="stat-val" id="rg-base">—</div></div>
        <div class="stat-card teal"><div class="stat-label">GST Amount</div><div class="stat-val" id="rg-gst">—</div></div>
        <div class="stat-card coral"><div class="stat-label" id="rg-l1">CGST</div><div class="stat-val" id="rg-v1">—</div></div>
        <div class="stat-card violet"><div class="stat-label" id="rg-l2">SGST</div><div class="stat-val" id="rg-v2">—</div></div>`,
  js:`function tRG(){el('rg-cw').style.display=el('rg-rate').value==='c'?'':'none';}
function calcRGST(){
  const rv=el('rg-rate').value, rate=rv==='c'?(parseFloat(el('rg-crate').value)||0):parseFloat(rv);
  const total=parseFloat(el('rg-amt').value)||0, txn=el('rg-txn').value;
  const base=total/(1+rate/100), gst=total-base, half=gst/2;
  el('rg-base').textContent=fmtFull(base); el('rg-gst').textContent=fmtFull(gst);
  if(txn==='intra'){
    el('rg-l1').textContent='CGST ('+(rate/2)+'%)'; el('rg-v1').textContent=fmtFull(half);
    el('rg-l2').textContent='SGST ('+(rate/2)+'%)'; el('rg-v2').textContent=fmtFull(half);
    makeDonut('rg-donut',['Base','CGST','SGST'],[Math.round(base),Math.round(half),Math.round(half)],[COLORS.green,COLORS.coral,COLORS.violet]);
  } else {
    el('rg-l1').textContent='IGST ('+rate+'%)'; el('rg-v1').textContent=fmtFull(gst);
    el('rg-l2').textContent='Base Amount'; el('rg-v2').textContent=fmtFull(base);
    makeDonut('rg-donut',['Base','IGST'],[Math.round(base),Math.round(gst)],[COLORS.green,COLORS.coral]);
  }
}`,
  content:`    <h2>What is a Reverse GST Calculation?</h2>
    <p>A reverse GST calculation works backwards from a GST-inclusive price to find the original base amount and the tax hidden inside it. It answers the question: "If I paid ₹11,800 including 18% GST, how much was the product and how much was GST?" This is the opposite of a normal GST calculator, which adds GST to a base price.</p>
    <h2>Reverse GST Formula</h2>
    <div class="formula">Base Amount = Total ÷ (1 + GST Rate / 100)<br/>GST Amount = Total − Base Amount</div>
    <p><strong>Example:</strong> ₹11,800 inclusive of 18% GST → Base = 11,800 ÷ 1.18 = ₹10,000, and GST = ₹1,800. For an intrastate sale that ₹1,800 splits into ₹900 CGST + ₹900 SGST; interstate, it is ₹1,800 IGST.</p>
    <h2>Reverse GST at Each Slab (on ₹1,000 base)</h2>
    <table class="data-table"><thead><tr><th>Slab</th><th>Inclusive Price</th><th>Base</th><th>GST</th></tr></thead><tbody>
    <tr><td>5%</td><td>₹1,050</td><td>₹1,000</td><td>₹50</td></tr>
    <tr><td>12%</td><td>₹1,120</td><td>₹1,000</td><td>₹120</td></tr>
    <tr><td>18%</td><td>₹1,180</td><td>₹1,000</td><td>₹180</td></tr>
    <tr><td>28%</td><td>₹1,280</td><td>₹1,000</td><td>₹280</td></tr></tbody></table>
    <h2>When Do You Need Reverse GST?</h2>
    <ul><li><strong>Purchase invoices:</strong> separating GST for input tax credit (ITC) claims</li><li><strong>Retail receipts:</strong> verifying the GST charged on an MRP-inclusive bill</li><li><strong>E-commerce payouts:</strong> reconciling marketplace settlements net of GST</li><li><strong>Accounting:</strong> recording the correct CGST/SGST/IGST from inclusive totals</li></ul>`,
  faqs:[
    {q:'How do I remove GST from a total amount?',a:'Divide the total by (1 + GST rate/100). For 18% GST, divide by 1.18 to get the base price; the difference is the GST. Example: ₹1,180 ÷ 1.18 = ₹1,000 base + ₹180 GST.'},
    {q:'Is the reverse GST result split into CGST and SGST?',a:'For an intrastate sale, the GST is split equally — CGST = SGST = half the GST. For an interstate sale, the entire GST is IGST. The base amount is the same either way.'},
    {q:'What is the difference between this and a normal GST calculator?',a:'A normal GST calculator adds GST to a base price (exclusive → inclusive). A reverse GST calculator removes GST from a total (inclusive → base), which is what you need when the price already includes tax.'},
  ],
  related:[
    {href:'gst-calculator.html',icon:'🧾',name:'GST Calculator',desc:'Add or remove GST'},
    {href:'income-tax-calculator.html',icon:'💰',name:'Income Tax',desc:'Old vs New regime'},
    {href:'emi-calculator.html',icon:'🏠',name:'EMI Calculator',desc:'All loans'},
  ],
});

// 2) GRATUITY
calcs.push({
  file:'gratuity-calculator.html', id:'gr', calcFn:'calcGratuity', appName:'Gratuity Calculator', crumb:'Gratuity Calculator',
  title:'Gratuity Calculator 2026 | Payment of Gratuity Act Formula | IndiCalculator',
  desc:'Free gratuity calculator using the Payment of Gratuity Act 1972 formula: (15 × last Basic+DA × years) ÷ 26. See your gratuity amount, the ₹20 lakh tax-free limit and any taxable excess.',
  keywords:'gratuity calculator, gratuity formula, payment of gratuity act, gratuity calculation, gratuity eligibility 5 years, gratuity tax exemption, gratuity 20 lakh limit',
  ogTitle:'Gratuity Calculator — Payment of Gratuity Act 1972', ogDesc:'Calculate your gratuity and the tax-free portion in seconds.',
  badge:'🎁 Salary &amp; HR', h1:'Gratuity Calculator — Payment of Gratuity Act',
  sub:'Calculate the gratuity payable when you resign or retire, using the Payment of Gratuity Act 1972 formula. Enter your last drawn Basic+DA and years of service to see your gratuity, the ₹20 lakh tax-free limit and any taxable amount.',
  btn:'Calculate Gratuity', resultsTitle:'Your Gratuity', chartTitle:'Tax-Free vs Taxable', disclaimer:'Applies to establishments covered under the Payment of Gratuity Act 1972. The ₹20 lakh exemption is the current statutory tax-free limit. Consult your employer/HR for the exact figure.',
  inputs:`      <div class="field"><label>Last Drawn Basic + DA (monthly ₹)</label><input type="number" id="gr-basic" value="50000" min="0" step="1000"/></div>
      <div class="field"><label>Years of Service (completed)</label><input type="number" id="gr-years" value="10" min="0" step="1"/></div>
      <div class="field"><label>Additional Months (0–11)</label><input type="number" id="gr-months" value="0" min="0" max="11" step="1"/></div>
      <div class="field"><label>Covered under Gratuity Act?</label><select id="gr-cov"><option value="yes" selected>Yes (most companies, 10+ employees)</option><option value="no">No (not covered)</option></select></div>`,
  stats:`        <div class="stat-card teal"><div class="stat-label">Gratuity Amount</div><div class="stat-val" id="gr-amt">—</div></div>
        <div class="stat-card green"><div class="stat-label">Tax-Free (up to ₹20L)</div><div class="stat-val" id="gr-free">—</div></div>
        <div class="stat-card coral"><div class="stat-label">Taxable Excess</div><div class="stat-val" id="gr-tax">—</div></div>
        <div class="stat-card violet"><div class="stat-label">Eligible (5+ yrs)?</div><div class="stat-val" id="gr-elig">—</div></div>`,
  js:`function calcGratuity(){
  const basic=parseFloat(el('gr-basic').value)||0;
  let years=parseInt(el('gr-years').value)||0; const months=parseInt(el('gr-months').value)||0;
  const covered=el('gr-cov').value==='yes';
  let g;
  if(covered){ const ry=years+(months>=6?1:0); g=(15*basic*ry)/26; }
  else { g=(15*basic*years)/30; }
  const cap=2000000, taxFree=Math.min(g,cap), taxable=Math.max(0,g-cap);
  el('gr-amt').textContent=fmtFull(g);
  el('gr-free').textContent=fmtFull(taxFree);
  el('gr-tax').textContent=fmtFull(taxable);
  el('gr-elig').textContent=(years>=5?'Yes':'Not yet');
  makeDonut('gr-donut',['Tax-Free','Taxable'],[Math.round(taxFree),Math.round(taxable)],[COLORS.green,COLORS.coral]);
}`,
  content:`    <h2>How Gratuity Is Calculated</h2>
    <p>Gratuity is a lump-sum reward for long service, paid when you resign, retire or are terminated after at least 5 years of continuous service. For employees covered under the Payment of Gratuity Act 1972, the formula is:</p>
    <div class="formula">Gratuity = (15 × Last drawn Basic+DA × Years of service) ÷ 26</div>
    <p>The 26 represents working days in a month, and 15 represents 15 days' wages for each completed year. A period of more than six months counts as a full year — so 10 years 7 months is treated as 11 years.</p>
    <h2>If Your Employer Is Not Covered Under the Act</h2>
    <div class="formula">Gratuity = (15 × Average Basic+DA × Years of service) ÷ 30</div>
    <p>Here the month is treated as 30 days and part-years are not rounded up.</p>
    <h2>Eligibility</h2>
    <ul><li>Minimum <strong>5 years of continuous service</strong> with the same employer.</li><li>The 5-year rule is <strong>waived</strong> in case of death or disablement due to accident or disease.</li><li>Covered employers: factories, mines, companies and shops employing <strong>10 or more</strong> people.</li></ul>
    <h2>Tax on Gratuity</h2>
    <p>For non-government employees, gratuity is tax-free up to <strong>₹20 lakh</strong> (lifetime limit across employers). Any amount above ₹20 lakh is added to your income and taxed at your slab rate. Government employees receive gratuity fully tax-free.</p>`,
  faqs:[
    {q:'What is the gratuity formula?',a:'For employers covered under the Payment of Gratuity Act 1972: Gratuity = (15 × last drawn Basic+DA × years of service) ÷ 26. A service period over 6 months in the final year is rounded up to a full year.'},
    {q:'How many years of service are needed for gratuity?',a:'A minimum of 5 years of continuous service with the same employer. This condition is waived if employment ends due to death or disablement.'},
    {q:'Is gratuity taxable?',a:'For private-sector employees, gratuity is tax-free up to ₹20 lakh (the current statutory limit). Anything above ₹20 lakh is taxed at your income-tax slab. Government employees get it fully tax-free.'},
    {q:'Is gratuity calculated on basic salary or gross?',a:'It is calculated on your last drawn Basic salary plus Dearness Allowance (DA) — not on gross salary or CTC.'},
  ],
  related:[
    {href:'nps-calculator.html',icon:'🪙',name:'NPS Calculator',desc:'Pension corpus'},
    {href:'epf-calculator.html',icon:'💵',name:'EPF Calculator',desc:'PF retirement corpus'},
    {href:'salary-calculator.html',icon:'💼',name:'Salary Calculator',desc:'In-hand pay'},
  ],
});

// 3) NPS
calcs.push({
  file:'nps-calculator.html', id:'np', calcFn:'calcNPS', appName:'NPS Calculator', crumb:'NPS Calculator',
  title:'NPS Calculator 2026 | Pension & Corpus Calculator | IndiCalculator',
  desc:'Free NPS calculator to project your National Pension System corpus, the 60% tax-free lump sum and your monthly pension from the 40% annuity. Models 80CCD(1), 80CCD(1B) and 80CCD(2) tax benefits.',
  keywords:'nps calculator, national pension system calculator, nps pension calculator, nps corpus calculator, 80ccd 1b, nps annuity calculator, nps maturity',
  ogTitle:'NPS Calculator — Pension & Corpus Projection', ogDesc:'Project your NPS corpus, tax-free lump sum and monthly pension.',
  badge:'🪙 Retirement', h1:'NPS Calculator — Corpus &amp; Pension',
  sub:'Project your National Pension System (NPS) Tier-1 corpus at retirement, the 60% tax-free lump sum, and the monthly pension from the mandatory 40% annuity. Adjust the expected return and annuity rate to match your own assumptions.',
  btn:'Calculate NPS', resultsTitle:'Your NPS Projection', chartTitle:'Invested vs Returns', disclaimer:'NPS returns are market-linked and not guaranteed. Pension depends on the annuity rate at retirement. Figures are projections based on your inputs.',
  inputs:`      <div class="field"><label>Monthly Contribution (₹)</label><input type="number" id="np-cont" value="5000" min="500" step="500"/></div>
      <div class="field"><label>Current Age</label><input type="number" id="np-age" value="30" min="18" max="65" step="1"/></div>
      <div class="field"><label>Retirement Age</label><input type="number" id="np-ret" value="60" min="60" max="75" step="1"/></div>
      <div class="field"><label>Expected Return (% p.a.)</label><input type="number" id="np-rr" value="10" min="1" max="15" step="0.5"/></div>
      <div class="field"><label>Annuity Portion (% — min 40)</label><input type="number" id="np-ann" value="40" min="40" max="100" step="5"/></div>
      <div class="field"><label>Annuity Return (% p.a.)</label><input type="number" id="np-ar" value="6" min="1" max="10" step="0.5"/></div>`,
  stats:`        <div class="stat-card violet"><div class="stat-label">Total Invested</div><div class="stat-val" id="np-inv">—</div></div>
        <div class="stat-card teal"><div class="stat-label">Corpus at Retirement</div><div class="stat-val" id="np-corpus">—</div></div>
        <div class="stat-card green"><div class="stat-label">Lump Sum (tax-free)</div><div class="stat-val" id="np-lump">—</div></div>
        <div class="stat-card coral"><div class="stat-label">Monthly Pension</div><div class="stat-val" id="np-pension">—</div></div>`,
  js:`function calcNPS(){
  const cont=parseFloat(el('np-cont').value)||0, age=parseInt(el('np-age').value)||0, ret=parseInt(el('np-ret').value)||60;
  const rr=(parseFloat(el('np-rr').value)||0)/12/100; let ann=parseFloat(el('np-ann').value)||40; if(ann<40)ann=40;
  const ar=(parseFloat(el('np-ar').value)||0)/100;
  const n=Math.max(0,(ret-age))*12;
  const corpus = rr>0 ? cont*((Math.pow(1+rr,n)-1)/rr)*(1+rr) : cont*n;
  const invested=cont*n;
  const lump=corpus*(1-ann/100), annuityCorpus=corpus*(ann/100), pension=annuityCorpus*ar/12;
  el('np-inv').textContent=fmt(invested);
  el('np-corpus').textContent=fmt(corpus);
  el('np-lump').textContent=fmt(lump);
  el('np-pension').textContent=fmtFull(pension);
  makeDonut('np-donut',['Invested','Returns'],[Math.round(invested),Math.round(Math.max(0,corpus-invested))],[COLORS.violet,COLORS.teal]);
}`,
  content:`    <h2>How the NPS Calculator Works</h2>
    <p>The National Pension System (NPS) is a market-linked retirement scheme regulated by PFRDA. Your monthly Tier-1 contributions are invested across equity and debt and grow until age 60. The calculator projects your corpus using the standard future-value formula:</p>
    <div class="formula">Corpus = P × [ ((1+r)^n − 1) / r ] × (1+r)</div>
    <p>where P is the monthly contribution, r the monthly return, and n the number of months to retirement.</p>
    <h2>What Happens at Retirement</h2>
    <ul><li>You can withdraw up to <strong>60% of the corpus as a tax-free lump sum</strong> (exempt under Section 10(12A)).</li><li>At least <strong>40% must be used to buy an annuity</strong>, which pays your monthly pension. The pension itself is taxable as income.</li></ul>
    <h2>NPS Tax Benefits (Three Layers)</h2>
    <ul><li><strong>Section 80CCD(1):</strong> contributions within the overall ₹1.5 lakh 80C limit.</li><li><strong>Section 80CCD(1B):</strong> an extra ₹50,000 deduction, over and above 80C — exclusive to NPS.</li><li><strong>Section 80CCD(2):</strong> employer contribution (up to 10% of salary, 14% for government) deductible separately, available even in the new regime.</li></ul>
    <h2>Note on Assumptions</h2>
    <p>Equity returns are not guaranteed; 8–11% is a common long-term assumption. The annuity rate (around 6% currently) is set when you retire. Change both inputs above to model conservative and optimistic scenarios.</p>`,
  faqs:[
    {q:'How much pension will I get from NPS?',a:'Your pension depends on the corpus at 60, the share used for annuity (minimum 40%) and the annuity rate. For example, a ₹1 crore corpus with 40% (₹40 lakh) annuitised at 6% pays roughly ₹20,000 per month.'},
    {q:'Is the NPS lump sum tax-free?',a:'Yes. Up to 60% of the corpus withdrawn at retirement is exempt from tax under Section 10(12A). The remaining 40% must buy an annuity, and the monthly pension from it is taxable at your slab.'},
    {q:'What is the 80CCD(1B) benefit?',a:'Section 80CCD(1B) gives an additional ₹50,000 deduction for NPS, over and above the ₹1.5 lakh limit under Section 80C — so NPS can save tax on up to ₹2 lakh combined.'},
    {q:'Can I invest more than 40% in annuity?',a:'Yes. 40% is the minimum annuity portion; you can choose a higher share for a larger pension and a smaller lump sum. This calculator lets you set any value from 40% upward.'},
  ],
  related:[
    {href:'epf-calculator.html',icon:'💵',name:'EPF Calculator',desc:'PF retirement corpus'},
    {href:'gratuity-calculator.html',icon:'🎁',name:'Gratuity Calculator',desc:'On resignation'},
    {href:'income-tax-calculator.html',icon:'💰',name:'Income Tax',desc:'80CCD deductions'},
  ],
});

// 4) EPF
calcs.push({
  file:'epf-calculator.html', id:'ep', calcFn:'calcEPF', appName:'EPF Calculator', crumb:'EPF Calculator',
  title:'EPF Calculator 2026 | PF Maturity & Corpus Calculator | IndiCalculator',
  desc:'Free EPF calculator to project your Provident Fund corpus at retirement. 12% employee + 12% employer on Basic+DA, compounded at 8.25%, with salary growth and the ₹15,000 wage-ceiling option.',
  keywords:'epf calculator, pf calculator, provident fund calculator, epf maturity calculator, epf interest 8.25, pf corpus retirement, employee provident fund',
  ogTitle:'EPF Calculator — PF Corpus at Retirement', ogDesc:'Project your EPF retirement corpus at 8.25% with salary growth.',
  badge:'💵 Retirement', h1:'EPF Calculator — PF Retirement Corpus',
  sub:'Project your Employee Provident Fund (EPF) corpus at retirement. The calculator compounds 12% employee + 12% employer contributions on Basic+DA at the current 8.25% EPF rate, with annual salary growth and an option to cap contributions at the ₹15,000 statutory wage.',
  btn:'Calculate EPF', resultsTitle:'Your EPF Corpus', chartTitle:'Contributions vs Interest', disclaimer:'EPF rate (8.25%, FY 2024-25) is declared annually by EPFO and is editable above. Employer\'s 8.33% actually goes to EPS (pension); this tool follows the common 12%+12% EPF model. Indicative only.',
  inputs:`      <div class="field"><label>Monthly Basic + DA (₹)</label><input type="number" id="ep-basic" value="30000" min="0" step="1000"/></div>
      <div class="field"><label>Current Age</label><input type="number" id="ep-age" value="25" min="15" max="58" step="1"/></div>
      <div class="field"><label>Retirement Age</label><input type="number" id="ep-ret" value="58" min="40" max="60" step="1"/></div>
      <div class="field"><label>Current EPF Balance (₹)</label><input type="number" id="ep-bal" value="0" min="0" step="1000"/></div>
      <div class="field"><label>Annual Salary Growth (%)</label><input type="number" id="ep-growth" value="5" min="0" max="20" step="0.5"/></div>
      <div class="field"><label>EPF Interest Rate (%)</label><input type="number" id="ep-rate" value="8.25" min="1" max="12" step="0.05"/></div>
      <div class="field"><label>Wage Base</label><select id="ep-wb"><option value="actual" selected>Actual Basic+DA</option><option value="cap">Capped at ₹15,000</option></select></div>`,
  stats:`        <div class="stat-card teal"><div class="stat-label">Your Contribution</div><div class="stat-val" id="ep-emp">—</div></div>
        <div class="stat-card coral"><div class="stat-label">Employer Contribution</div><div class="stat-val" id="ep-empr">—</div></div>
        <div class="stat-card violet"><div class="stat-label">Interest Earned</div><div class="stat-val" id="ep-int">—</div></div>
        <div class="stat-card green"><div class="stat-label">Total Corpus</div><div class="stat-val" id="ep-corpus">—</div></div>`,
  js:`function calcEPF(){
  let basic=parseFloat(el('ep-basic').value)||0;
  const age=parseInt(el('ep-age').value)||0, ret=parseInt(el('ep-ret').value)||58;
  let bal=parseFloat(el('ep-bal').value)||0;
  const growth=(parseFloat(el('ep-growth').value)||0)/100, rate=(parseFloat(el('ep-rate').value)||0)/100;
  const cap=el('ep-wb').value==='cap';
  const years=Math.max(0,ret-age);
  let empTot=0, emprTot=0;
  for(let y=0;y<years;y++){
    const cb=cap?Math.min(basic,15000):basic;
    const emp=cb*0.12*12, empr=cb*0.12*12;       // 12% + 12% on Basic+DA
    empTot+=emp; emprTot+=empr;
    const yearlyContrib=emp+empr;
    bal = bal*(1+rate) + yearlyContrib*(1+rate/2); // interest on opening + ~half-year on the year's inflow
    basic = basic*(1+growth);
  }
  const totalContrib=empTot+emprTot+ (parseFloat(el('ep-bal').value)||0);
  const interest=Math.max(0,bal-totalContrib);
  el('ep-emp').textContent=fmt(empTot);
  el('ep-empr').textContent=fmt(emprTot);
  el('ep-int').textContent=fmt(interest);
  el('ep-corpus').textContent=fmt(bal);
  makeDonut('ep-donut',['Your','Employer','Interest'],[Math.round(empTot),Math.round(emprTot),Math.round(interest)],[COLORS.teal,COLORS.coral,COLORS.violet]);
}`,
  content:`    <h2>How the EPF Calculator Works</h2>
    <p>The Employee Provident Fund (EPF) is a mandatory retirement scheme for salaried employees. Each month you contribute <strong>12% of Basic+DA</strong>, and your employer matches it with another 12%. The combined balance earns interest — currently <strong>8.25% per year</strong> (FY 2024-25), declared annually by EPFO and credited to your account.</p>
    <div class="formula">Monthly contribution = 24% × (Basic + DA)<br/>Corpus grows yearly at the EPF interest rate, on a rising salary</div>
    <h2>The ₹15,000 Wage Ceiling</h2>
    <p>The statutory minimum requires contributions on Basic+DA up to ₹15,000/month. Many private employers contribute on your <em>actual</em> Basic instead, giving a larger corpus. Use the <strong>Wage Base</strong> toggle to model either case.</p>
    <h2>EPF vs EPS — Where the Employer's Share Goes</h2>
    <p>In practice, of the employer's 12%, <strong>8.33% is diverted to the Employee Pension Scheme (EPS)</strong> (capped at ₹15,000 → ₹1,250/month) and only 3.67% goes to EPF. This calculator follows the simplified 12% + 12% EPF model used by most online tools; treat the corpus as an upper estimate of the EPF portion.</p>
    <h2>EPF Tax Benefits</h2>
    <ul><li>Employee contributions qualify for <strong>Section 80C</strong> deduction (within ₹1.5 lakh).</li><li>Interest and maturity are tax-free if you complete <strong>5 years of continuous service</strong>.</li><li>Interest on employee contributions above ₹2.5 lakh/year is taxable (high earners).</li></ul>`,
  faqs:[
    {q:'What is the current EPF interest rate?',a:'The EPF interest rate for FY 2024-25 is 8.25%, declared by EPFO. It is reviewed every year. You can edit the rate in the calculator when a new rate is announced.'},
    {q:'How much do employee and employer contribute to EPF?',a:'Both contribute 12% of Basic+DA. Of the employer\'s 12%, 8.33% goes to the pension scheme (EPS, capped at ₹15,000 wages) and 3.67% to EPF.'},
    {q:'Is EPF taxable on withdrawal?',a:'EPF is tax-free if withdrawn after 5 years of continuous service. Withdrawal before 5 years is taxable. Also, interest on employee contributions exceeding ₹2.5 lakh in a year is taxable.'},
    {q:'What is the ₹15,000 wage ceiling?',a:'The statutory EPF contribution is calculated on Basic+DA up to ₹15,000/month. Employers may contribute on actual Basic instead. The toggle lets you compare both.'},
  ],
  related:[
    {href:'nps-calculator.html',icon:'🪙',name:'NPS Calculator',desc:'Pension corpus'},
    {href:'gratuity-calculator.html',icon:'🎁',name:'Gratuity Calculator',desc:'On resignation'},
    {href:'ppf-fd-calculator.html',icon:'🏦',name:'PPF / FD',desc:'Savings maturity'},
  ],
});

// ─────────────────────────── WRITE ───────────────────────────
for (const c of calcs){
  const html = page(c);
  fs.writeFileSync(c.file, html, 'utf8');
  // syntax-check the inline calc JS
  try { new Function(c.js + '\n' + c.calcFn + ';'); console.log('  ✓ '+c.file+' (JS ok)'); }
  catch(e){ console.log('  ✗ '+c.file+' JS ERROR: '+e.message); }
}
console.log('\nGenerated '+calcs.length+' calculator pages.');
