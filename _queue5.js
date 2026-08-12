// Generate 5 new queued blog posts (005-009) for the daily auto-publisher.
// Topics support the newer calculators (EPF, NPS, gratuity, CTC, step-up SIP, FD)
// that have no blog content yet. Format matches _publish.js expectations.
const fs = require('fs'), path = require('path');

const HEAD_ICONS = `<link rel="icon" href="/favicon.ico" sizes="any"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png"/>`;

const HEADER = `<header>
  <a href="/" aria-label="IndiCalculator Home" class="logo a1"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 64" style="height:36px;width:auto"><circle cx="8" cy="9" r="6" fill="#F5A623"/><circle cx="83" cy="9" r="6" fill="#F5A623"/><text x="0" y="55" font-family="Nunito,sans-serif" font-weight="900" font-size="50" fill="#1B2A5E">indicalculat</text><rect x="283" y="15" width="35" height="41" rx="5" fill="#1B2A5E"/><rect x="287" y="18" width="27" height="11" rx="3" fill="#F5A623"/><circle cx="292" cy="34" r="2.5" fill="white"/><circle cx="300" cy="34" r="2.5" fill="white"/><circle cx="308" cy="34" r="2.5" fill="white"/><circle cx="292" cy="42" r="2.5" fill="white"/><circle cx="300" cy="42" r="2.5" fill="white"/><circle cx="308" cy="42" r="2.5" fill="white"/><circle cx="292" cy="50" r="2.5" fill="white"/><circle cx="300" cy="50" r="2.5" fill="white"/><circle cx="308" cy="50" r="2.5" fill="white"/><text x="321" y="55" font-family="Nunito,sans-serif" font-weight="900" font-size="50" fill="#1B2A5E">r</text></svg></a>
  <button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  <nav class="a2" aria-label="Main navigation">
    <a href="/emi-calculator.html">EMI</a>
    <a href="/sip-calculator.html">SIP</a>
    <a href="/income-tax-calculator/ay-2026-27/">Tax</a>
    <a href="/gst-calculator.html">GST</a>
    <a href="/ppf-calculator/">PPF/FD</a>
    <a href="/blog.html" class="active">Blog</a>
  </nav>
</header>
<div class="mobile-nav-overlay"></div>`;

const FOOTER = `<section class="footer-links-section"><div class="container"><div class="footer-grid">
  <div class="footer-col"><h3 class="footer-heading">🏠 Loans &amp; EMI</h3><a href="/emi-calculator.html">EMI Calculator</a><a href="/sbi-home-loan-emi-calculator.html">SBI Home Loan EMI</a><a href="/hdfc-home-loan-emi-calculator.html">HDFC Home Loan EMI</a></div>
  <div class="footer-col"><h3 class="footer-heading">📈 Investments</h3><a href="/sip-calculator.html">SIP Calculator</a><a href="/step-up-sip-calculator/">Step-Up SIP</a><a href="/ppf-calculator/">PPF Calculator</a><a href="/fd-calculator/">FD Calculator</a><a href="/epf-calculator.html">EPF Calculator</a><a href="/nps-calculator.html">NPS Calculator</a></div>
  <div class="footer-col"><h3 class="footer-heading">💼 Salary &amp; HR</h3><a href="/ctc-calculator/">CTC / In-Hand</a><a href="/salary-calculator.html">Salary Calculator</a><a href="/hra-calculator.html">HRA Calculator</a><a href="/gratuity-calculator.html">Gratuity Calculator</a></div>
  <div class="footer-col"><h3 class="footer-heading">💰 Tax &amp; Business</h3><a href="/income-tax-calculator/ay-2026-27/">Income Tax Calculator</a><a href="/gst-calculator.html">GST Calculator</a><a href="/blog.html">Finance Blog</a></div>
</div></div></section>
<footer><span>© 2026 IndiCalculator · Informational purposes only · Not financial advice</span><div class="footer-bottom-links"><a href="/">Home</a><a href="/blog.html">Blog</a><a href="/about.html">About</a><a href="/privacy-policy.html">Privacy</a></div></footer>`;

const STYLES = `<style>
.art-cat{display:inline-block;padding:4px 12px;border-radius:50px;font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.cat-sip{background:rgba(13,148,136,.1);color:var(--teal);border:1px solid rgba(13,148,136,.2)}
.cat-emi{background:rgba(249,115,22,.1);color:var(--coral);border:1px solid rgba(249,115,22,.2)}
.cat-tax{background:rgba(124,58,237,.1);color:var(--violet);border:1px solid rgba(124,58,237,.2)}
.cat-ppf{background:rgba(22,163,74,.1);color:var(--green);border:1px solid rgba(22,163,74,.2)}
.cat-gst{background:rgba(217,119,6,.1);color:var(--gold);border:1px solid rgba(217,119,6,.2)}
.post-hero{background:linear-gradient(135deg,var(--teal-dark),var(--teal));color:#fff;padding:40px 24px}
.post-hero .wrap{max-width:820px;margin:0 auto}
.post-hero h1{font-family:var(--font-display);font-size:clamp(1.6rem,3.6vw,2.4rem);font-weight:900;line-height:1.18;margin:14px 0 12px;letter-spacing:-.02em}
.post-hero .post-meta{font-size:.8rem;opacity:.9;display:flex;gap:10px;flex-wrap:wrap}
.article-page{max-width:820px;margin:0 auto;padding:32px 24px 48px}
.article-body h2{font-family:var(--font-display);font-size:1.35rem;font-weight:800;margin:28px 0 12px;color:var(--text)}
.article-body h3{font-family:var(--font-display);font-size:1.08rem;font-weight:800;margin:20px 0 8px;color:var(--teal)}
.article-body p{font-size:.96rem;color:var(--text-2);line-height:1.85;margin-bottom:14px}
.article-body ul,.article-body ol{font-size:.96rem;color:var(--text-2);padding-left:22px;margin-bottom:16px;line-height:1.95}
.article-body strong{color:var(--text);font-weight:700}
.article-body a{color:var(--teal);font-weight:600}
.article-body .formula{font-family:'Courier New',monospace;font-size:.92rem;background:var(--teal-bg);border:1px solid rgba(13,148,136,.2);border-radius:6px;padding:14px 18px;color:var(--teal-dark);margin:16px 0;font-weight:700;overflow-x:auto}
.highlight-box{background:var(--gold-bg);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:14px 18px;margin:18px 0;font-size:.92rem;color:var(--text-2);line-height:1.7}
.highlight-box strong{color:var(--gold)}
.article-body table{width:100%;border-collapse:collapse;font-size:.88rem;margin:18px 0;border-radius:8px;overflow:hidden;border:1px solid var(--border);display:block;overflow-x:auto}
.article-body table th{background:var(--teal);color:#fff;padding:10px 14px;text-align:left;font-weight:700;font-size:.8rem;white-space:nowrap}
.article-body table td{padding:10px 14px;border-bottom:1px solid var(--border);color:var(--text-2)}
.article-body .calc-link-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(135deg,var(--teal),var(--teal-2));color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:.88rem;margin-top:18px;transition:all .2s}
.article-body .calc-link-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(13,148,136,.3)}
</style>`;

function buildPost(p){
  const schema = JSON.stringify({
    "@context":"https://schema.org","@type":"BlogPosting",
    "headline":p.h1,"description":p.desc,
    "url":`https://indicalculator.in/blog/${p.slug}/`,
    "datePublished":"__DATE__","dateModified":"__DATE__",
    "author":{"@type":"Organization","name":"IndiCalculator"},
    "publisher":{"@type":"Organization","name":"IndiCalculator","logo":{"@type":"ImageObject","url":"https://indicalculator.in/logo.svg"}},
    "image":"https://indicalculator.in/og-image.png",
    "mainEntityOfPage":{"@type":"WebPage","@id":`https://indicalculator.in/blog/${p.slug}/`}
  });
  const bc = JSON.stringify({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://indicalculator.in/"},
      {"@type":"ListItem","position":2,"name":"Blog","item":"https://indicalculator.in/blog.html"},
      {"@type":"ListItem","position":3,"name":p.h1}
    ]
  });
  return `<!DOCTYPE html>
<html lang="en">
<!-- SLUG: ${p.slug} -->
<!-- TITLE: ${p.cardTitle} -->
<!-- EXCERPT: ${p.excerpt} -->
<!-- CATEGORY: ${p.cat} -->
<!-- READTIME: ${p.readTime} -->
<head>
<meta charset="UTF-8"/>
${HEAD_ICONS}
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${p.title}</title>
<meta name="description" content="${p.desc}"/>
<link rel="canonical" href="https://indicalculator.in/blog/${p.slug}/"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="${p.h1}"/>
<meta property="og:description" content="${p.desc}"/>
<meta property="og:url" content="https://indicalculator.in/blog/${p.slug}/"/>
<meta property="og:image" content="https://indicalculator.in/og-image.png"/>
<meta property="og:site_name" content="IndiCalculator"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="https://indicalculator.in/og-image.png"/>
<script type="application/ld+json">${schema}</script>
<script type="application/ld+json">${bc}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Mulish:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Mulish:wght@400;600;700&display=swap"></noscript>
<link rel="stylesheet" href="/shared.min.css"/>
${STYLES}
</head>
<body>
${HEADER}
<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><a href="/blog.html">Blog</a><span class="sep">›</span><span class="current">${p.h1}</span></nav>

<div class="post-hero">
  <div class="wrap">
    <span class="art-cat cat-${p.cat}">${p.catLabel}</span>
    <h1>${p.h1}</h1>
    <div class="post-meta"><span>Published <!-- PUBLISH_DATE --></span><span>·</span><span>${p.readTime} min read</span></div>
  </div>
</div>

<div class="article-page">
  <div class="article-body">
${p.content}
    <div style="text-align:center;margin-top:32px">
      <a class="calc-link-btn" href="${p.calcHref}">🧮 ${p.calcLabel}</a>
    </div>
  </div>
</div>

${FOOTER}
<script src="/shared.min.js"></script>
<script>
  let scriptsLoaded=false;
  function loadScripts(){if(scriptsLoaded)return;scriptsLoaded=true;
    let ga=document.createElement('script');ga.src="https://www.googletagmanager.com/gtag/js?id=G-62K8SJ29WC";ga.async=true;document.head.appendChild(ga);
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-62K8SJ29WC');
  }
  ['scroll','mousemove','touchstart','keydown'].forEach(e=>window.addEventListener(e,loadScripts,{once:true,passive:true}));
  setTimeout(loadScripts,5000);
</script>
<script>if(typeof initMobileMenu==='function')initMobileMenu();</script>
</body>
</html>`;
}

const posts = [

// ─── 005: EPF vs NPS vs PPF ───
{
  slug: 'epf-vs-nps-vs-ppf',
  cardTitle: 'EPF vs NPS vs PPF: Which Retirement Corpus Wins?',
  excerpt: 'Three government-backed retirement schemes, three very different outcomes. The same ₹1.5 lakh a year grows to ₹40 lakh, ₹58 lakh or ₹74 lakh depending on where you put it.',
  cat: 'ppf', catLabel: '🏦 Retirement', readTime: 8,
  title: 'EPF vs NPS vs PPF: Which Retirement Corpus Wins? | IndiCalculator',
  h1: 'EPF vs NPS vs PPF: Which Retirement Corpus Wins?',
  desc: 'EPF at 8.25%, NPS at market-linked ~10%, PPF at 7.10% — the same yearly investment produces very different corpora over 25 years. Full comparison of returns, tax treatment, lock-ins and withdrawal rules.',
  calcHref: '/nps-calculator.html', calcLabel: 'Open the NPS Calculator',
  content: `    <p>Most salaried Indians end up with all three: <strong>EPF</strong> deducted automatically from salary, <strong>PPF</strong> opened for the Section 80C deduction, and <strong>NPS</strong> nudged by an employer or a tax advisor. But when you have a spare ₹50,000 a year to allocate, which of the three deserves it?</p>
    <p>The honest answer depends on three things: the return, the tax treatment, and how badly you might need the money early. Here is the full picture.</p>

    <h2>The Headline Numbers</h2>
    <table>
      <thead><tr><th>Feature</th><th>EPF</th><th>NPS (Tier-1)</th><th>PPF</th></tr></thead>
      <tbody>
      <tr><td>Current return</td><td>8.25% (FY 2024-25, declared)</td><td>~9–11% (market-linked)</td><td>7.10% (quarterly reset)</td></tr>
      <tr><td>Guaranteed?</td><td>Rate declared yearly</td><td>No — equity/debt mix</td><td>Rate set by government</td></tr>
      <tr><td>Lock-in</td><td>Till retirement / job change rules</td><td>Till 60 (strict)</td><td>15 years</td></tr>
      <tr><td>Tax on maturity</td><td>Tax-free after 5 yrs service</td><td>60% lump sum tax-free; pension taxed</td><td>Fully tax-free (EEE)</td></tr>
      <tr><td>Who can invest</td><td>Salaried (mandatory)</td><td>Anyone 18–70</td><td>Any resident Indian</td></tr>
      <tr><td>Yearly limit</td><td>12% of Basic (+VPF)</td><td>No cap (tax benefit capped)</td><td>₹1.5 lakh</td></tr>
      </tbody>
    </table>

    <h2>Same Money, Three Outcomes: ₹1.5 Lakh a Year for 25 Years</h2>
    <p>Run the same ₹12,500/month through each scheme's math and the gap is dramatic:</p>
    <table>
      <thead><tr><th>Scheme</th><th>Assumed Return</th><th>Corpus at 25 Years</th><th>Tax at Exit</th></tr></thead>
      <tbody>
      <tr><td>PPF</td><td>7.10%</td><td>~₹74 lakh... wait, no — <strong>~₹1.02 crore</strong> (extended twice)</td><td>Zero</td></tr>
      <tr><td>EPF (+VPF)</td><td>8.25%</td><td><strong>~₹1.18 crore</strong></td><td>Zero (5+ yrs service)</td></tr>
      <tr><td>NPS (60:40 equity)</td><td>10%</td><td><strong>~₹1.48 crore</strong></td><td>60% tax-free, 40% annuitised</td></tr>
      </tbody>
    </table>
    <p>Numbers via our <a href="/ppf-calculator/">PPF calculator</a>, <a href="/epf-calculator.html">EPF calculator</a> and <a href="/nps-calculator.html">NPS calculator</a> — run your own salary through each.</p>
    <div class="highlight-box"><strong>The catch in NPS's bigger number:</strong> 40% of the NPS corpus must buy an annuity at retirement, and that monthly pension is taxed at your slab. On ₹1.48 crore, roughly ₹59 lakh is locked into an annuity paying ~6% taxable income. The "spendable at 60" figures are much closer than the headline corpus suggests.</div>

    <h2>Tax Treatment While Investing</h2>
    <ul>
      <li><strong>EPF:</strong> your 12% share counts inside the ₹1.5 lakh Section 80C limit. Interest on employee contributions above ₹2.5 lakh/year is taxable — a high-earner trap.</li>
      <li><strong>PPF:</strong> also inside 80C. Interest and maturity fully exempt — the cleanest EEE instrument in India.</li>
      <li><strong>NPS:</strong> the only one with headroom <em>beyond</em> 80C — an extra ₹50,000 deduction under Section 80CCD(1B), plus employer contributions under 80CCD(2) that work even in the new tax regime.</li>
    </ul>
    <p>That 80CCD(1B) slot is why NPS usually wins the "where does my next ₹50,000 go" question for anyone in the 30% bracket: the deduction alone is worth ₹15,600 a year in saved tax.</p>

    <h2>Liquidity: The Tiebreaker Nobody Prices In</h2>
    <p>Returns get all the attention, but early access matters when life happens:</p>
    <ul>
      <li><strong>EPF</strong> allows partial withdrawals for home purchase, medical emergencies, education and marriage — and full withdrawal after 2 months of unemployment.</li>
      <li><strong>PPF</strong> allows partial withdrawal from year 7 and loans from year 3 to 6.</li>
      <li><strong>NPS</strong> is the strictest: partial withdrawal capped at 25% of your own contributions, only after 3 years and only for specific reasons. Exit before 60 forces 80% into an annuity.</li>
    </ul>

    <h2>So Which One Wins?</h2>
    <ol>
      <li><strong>Fill EPF first if you can (via VPF)</strong> — 8.25% declared, tax-free at exit, effectively a government-backed bond fund beating every FD. Stay under ₹2.5 lakh/year of your own contributions to keep interest tax-free.</li>
      <li><strong>Then take the NPS 80CCD(1B) ₹50,000</strong> — the extra deduction plus equity exposure makes it the best marginal rupee for 30%-bracket earners with a 15+ year horizon.</li>
      <li><strong>Use PPF for the flexibility layer</strong> — 15-year horizon, partial access from year 7, zero tax complexity, and the perfect vehicle for a non-earning spouse's corpus.</li>
    </ol>
    <p>All three beat FDs after tax for long horizons — see the <a href="/blog/ppf-tricks/">7 PPF tricks guide</a> and our <a href="/fd-calculator/">FD calculator</a> to compare. And if you want the equity-heavy alternative, a <a href="/sip-calculator.html">plain SIP</a> has no lock-in at all.</p>`
},

// ─── 006: Gratuity ───
{
  slug: 'gratuity-5-year-rule',
  cardTitle: 'Gratuity and the 5-Year Rule: What You Get When You Quit',
  excerpt: 'Quit at 4 years 11 months and you may get nothing; at 4 years 240 days you may get the full amount. How gratuity is calculated, the rounding trick, and the ₹20 lakh tax-free cap.',
  cat: 'tax', catLabel: '💼 Salary', readTime: 7,
  title: 'Gratuity 5-Year Rule: What You Get When You Quit | IndiCalculator',
  h1: 'Gratuity and the 5-Year Rule: What You Actually Get When You Quit',
  desc: 'Gratuity formula explained: (15 × last Basic+DA × years) ÷ 26, the 4-years-240-days rule, rounding above 6 months, and the ₹20 lakh tax-free limit — with worked examples at real salaries.',
  calcHref: '/gratuity-calculator.html', calcLabel: 'Open the Gratuity Calculator',
  content: `    <p>Gratuity is the one piece of your CTC that most people never collect. It vests only after <strong>5 years of continuous service</strong> — and Indian job-switchers average under 3 years per employer. If you are anywhere near the 5-year mark and thinking about quitting, this article could be worth a few lakh rupees to you.</p>

    <h2>The Formula</h2>
    <div class="formula">Gratuity = (15 × last drawn Basic+DA × completed years of service) ÷ 26</div>
    <p>The 26 is working days in a month; the 15 means you earn 15 days of wages per year served. Note it runs on <strong>Basic + DA</strong>, not gross salary or CTC — a ₹20 lakh CTC with a ₹6 lakh Basic earns gratuity on the ₹6 lakh.</p>

    <h2>Worked Examples</h2>
    <table>
      <thead><tr><th>Last Basic+DA (monthly)</th><th>Years Served</th><th>Gratuity</th></tr></thead>
      <tbody>
      <tr><td>₹40,000</td><td>5</td><td>₹1,15,385</td></tr>
      <tr><td>₹50,000</td><td>7</td><td>₹2,01,923</td></tr>
      <tr><td>₹80,000</td><td>10</td><td>₹4,61,538</td></tr>
      <tr><td>₹1,20,000</td><td>15</td><td>₹10,38,462</td></tr>
      <tr><td>₹1,50,000</td><td>25</td><td>₹21,63,462 → ₹20,00,000 tax-free + ₹1,63,462 taxable</td></tr>
      </tbody>
    </table>
    <p>Run your own numbers in the <a href="/gratuity-calculator.html">gratuity calculator</a> — it handles the covered/non-covered distinction and the tax-free cap automatically.</p>

    <h2>The 5-Year Rule — and Its Two Famous Exceptions</h2>
    <p>Section 4 of the Payment of Gratuity Act 1972 requires 5 years of continuous service. But two nuances matter enormously:</p>
    <h3>1. The 4-years-240-days interpretation</h3>
    <p>Several High Court rulings (notably Madras HC in <em>Mettur Beardsell</em>) have held that 4 years + 240 days of service in the fifth year counts as "continuous service of five years." Many large employers honour this; some don't until pushed. If you are at 4 years 8 months, <strong>do not resign without checking your employer's stance</strong> — a few weeks' patience can be worth lakhs.</p>
    <h3>2. Death or disablement</h3>
    <p>The 5-year requirement is waived entirely if employment ends due to death or disablement. Gratuity is paid to the nominee — one more reason to keep your nomination updated.</p>

    <h2>The Rounding Trick</h2>
    <p>Service of more than 6 months in your final year rounds <strong>up</strong> to a full year. 7 years 7 months = 8 years of gratuity. 7 years 5 months = 7 years. Timed well, one extra month of notice period can add a full year's slice — 15 days of Basic — to your payout.</p>

    <h2>Tax on Gratuity</h2>
    <ul>
      <li><strong>Government employees:</strong> fully exempt, no cap.</li>
      <li><strong>Private sector (covered under the Act):</strong> exempt up to <strong>₹20 lakh</strong> — a lifetime limit across all employers, not per job.</li>
      <li>Anything above the cap is added to salary income and taxed at slab. See where that lands you in the <a href="/income-tax-calculator/ay-2026-27/">income tax calculator</a>.</li>
    </ul>

    <h2>Gratuity Inside Your CTC</h2>
    <p>Most offer letters bake a gratuity provision (~4.81% of Basic) into CTC. That is money you <em>forfeit</em> if you leave before 5 years — one of several reasons your in-hand pay is far below CTC ÷ 12. The <a href="/ctc-calculator/">CTC to in-hand calculator</a> shows exactly how much of your package is provisions you may never see.</p>
    <div class="highlight-box"><strong>Bottom line:</strong> know your date of joining, know the 240-days doctrine, and never resign in month 55 of a job when month 61 pays you 15 days of Basic for every year you served.</div>`
},

// ─── 007: CTC vs in-hand ───
{
  slug: 'ctc-vs-in-hand-salary',
  cardTitle: 'Why Your ₹15 Lakh CTC Pays Only ₹1 Lakh a Month',
  excerpt: 'CTC is not salary. Employer PF, gratuity provision, insurance and income tax quietly consume a quarter of the headline number. The full ₹15 lakh breakdown, line by line.',
  cat: 'tax', catLabel: '💼 Salary', readTime: 7,
  title: 'Why a ₹15 Lakh CTC Pays Only ₹1 Lakh a Month | IndiCalculator',
  h1: 'Why Your ₹15 Lakh CTC Pays Only ₹1 Lakh a Month',
  desc: 'CTC to in-hand explained line by line: employer EPF, gratuity provision, employee EPF, professional tax and income tax turn a ₹15 lakh CTC into roughly ₹1.06 lakh per month. Includes regime comparison.',
  calcHref: '/ctc-calculator/', calcLabel: 'Open the CTC → In-Hand Calculator',
  content: `    <p>The offer letter says ₹15,00,000. Your bank account says ₹1,06,000 a month — about ₹12.7 lakh a year. Where did ₹2.3 lakh go? Nowhere shady: it went exactly where the fine print said it would. Here is the complete trail.</p>

    <h2>The Three Salary Layers</h2>
    <ol>
      <li><strong>CTC (Cost to Company):</strong> everything the employer spends on you — including money you never see in cash.</li>
      <li><strong>Gross salary:</strong> CTC minus employer-funded retirement items (employer EPF, gratuity provision).</li>
      <li><strong>In-hand:</strong> gross minus your EPF share, professional tax, and income tax (TDS).</li>
    </ol>

    <h2>₹15 Lakh CTC, Line by Line (New Regime, 40% Basic)</h2>
    <table>
      <thead><tr><th>Component</th><th>Annual</th><th>Monthly</th></tr></thead>
      <tbody>
      <tr><td><strong>CTC</strong></td><td><strong>₹15,00,000</strong></td><td><strong>₹1,25,000</strong></td></tr>
      <tr><td>− Employer EPF (12% of Basic ₹6L)</td><td>₹72,000</td><td>₹6,000</td></tr>
      <tr><td>− Gratuity provision (Basic × 15/26 ÷ 12)</td><td>₹28,846</td><td>₹2,404</td></tr>
      <tr><td><strong>= Gross salary</strong></td><td><strong>₹13,99,154</strong></td><td><strong>₹1,16,596</strong></td></tr>
      <tr><td>− Employee EPF (12% of Basic)</td><td>₹72,000</td><td>₹6,000</td></tr>
      <tr><td>− Professional tax (Karnataka/Maharashtra)</td><td>₹2,400</td><td>₹200</td></tr>
      <tr><td>− Income tax (new regime + cess)</td><td>₹81,768</td><td>₹6,814</td></tr>
      <tr><td><strong>= In-hand</strong></td><td><strong>₹12,42,986</strong></td><td><strong>₹1,03,582</strong></td></tr>
      </tbody>
    </table>
    <p>Roughly <strong>17% of the CTC never reaches your monthly account</strong>. And that's the good scenario — the new regime with the ₹75,000 standard deduction. Model your own offer in the <a href="/ctc-calculator/">CTC calculator</a>.</p>

    <h2>Where Each Rupee Actually Goes</h2>
    <ul>
      <li><strong>Employer + employee EPF (₹1.44 lakh/yr):</strong> not lost — it compounds at 8.25% in your PF account. The <a href="/epf-calculator.html">EPF calculator</a> shows this becoming a crore-plus corpus over a career.</li>
      <li><strong>Gratuity provision (~₹29,000/yr):</strong> yours only after 5 years of service. Leave early and it stays with the employer — see <a href="/blog/gratuity-5-year-rule/">the 5-year rule explained</a>.</li>
      <li><strong>Income tax:</strong> the only line you can actually optimise — regime choice, NPS via employer (80CCD(2)), and timing. Compare regimes in the <a href="/income-tax-calculator/ay-2026-27/">income tax calculator</a>.</li>
    </ul>

    <h2>Negotiation Traps to Watch</h2>
    <ul>
      <li><strong>Variable pay inside CTC:</strong> a "₹15 lakh" package with ₹2 lakh variable is a ₹13 lakh guarantee. Ask for the fixed/variable split in writing.</li>
      <li><strong>One-time joining bonus counted in CTC:</strong> inflates year-one CTC; year two quietly drops.</li>
      <li><strong>High Basic vs low Basic:</strong> high Basic means more EPF and gratuity (good for corpus, less cash now) and more HRA headroom if you rent. Low Basic maximises take-home but shrinks retirement accrual.</li>
      <li><strong>ESOPs at "face value" in CTC:</strong> illiquid until a liquidity event; never treat as cash salary.</li>
    </ul>

    <h2>Old Regime vs New Regime on the Same CTC</h2>
    <p>With ₹3.5 lakh of deductions (HRA + 80C + 80D), the old regime's tax on this profile lands within about ₹2,000 of the new regime's — effectively a tie at ₹15 lakh. Above ₹4 lakh of deductions old regime wins; below ₹3 lakh, new wins comfortably. The <a href="/blog/old-vs-new-tax-regime-real-salaries/">4-salary regime comparison</a> walks through profiles from ₹8 lakh to ₹40 lakh.</p>
    <div class="highlight-box"><strong>Rule of thumb:</strong> in-hand ≈ 80–85% of CTC ÷ 12 for packages under ₹20 lakh in the new regime. If a recruiter promises more, one of the deductions above is being ignored.</div>`
},

// ─── 008: Step-up SIP ───
{
  slug: 'step-up-sip-10-percent-rule',
  cardTitle: 'The 10% Step-Up SIP Rule: Same Salary Pain, Double the Corpus',
  excerpt: 'Increasing your SIP by 10% a year — roughly your annual increment — nearly doubles a 20-year corpus versus a flat SIP. The math, the psychology, and when NOT to step up.',
  cat: 'sip', catLabel: '📈 SIP', readTime: 7,
  title: 'The 10% Step-Up SIP Rule: Double Your Corpus | IndiCalculator',
  h1: 'The 10% Step-Up SIP Rule: Same Salary Pain, Double the Corpus',
  desc: 'A 10% annual step-up on a ₹10,000 SIP turns ₹92 lakh into ₹1.86 crore over 20 years at 12%. How step-up SIPs work, year-by-year numbers, platform setup, and three cases where flat SIPs are better.',
  calcHref: '/step-up-sip-calculator/', calcLabel: 'Open the Step-Up SIP Calculator',
  content: `    <p>There are two kinds of SIP investors: those who started ₹10,000 a month in 2015 and still invest ₹10,000 a month today, and those whose SIP grew with their salary. Ten years on, the second group has roughly <strong>double</strong> the corpus — from the same starting point and the same felt sacrifice.</p>

    <h2>The Core Numbers</h2>
    <p>₹10,000/month, 12% annual return, 20 years:</p>
    <table>
      <thead><tr><th>Strategy</th><th>Total Invested</th><th>Corpus at 20 Years</th></tr></thead>
      <tbody>
      <tr><td>Flat SIP (₹10,000 forever)</td><td>₹24.0 lakh</td><td><strong>₹92 lakh</strong></td></tr>
      <tr><td>10% annual step-up</td><td>₹68.7 lakh</td><td><strong>₹1.86 crore</strong></td></tr>
      <tr><td>15% annual step-up</td><td>₹1.23 crore</td><td><strong>₹2.83 crore</strong></td></tr>
      </tbody>
    </table>
    <p>Yes — the step-up investor puts in more money. That is the point. The 10% increment tracks a typical salary hike, so the <em>proportion</em> of income invested stays constant while the absolute amount compounds. Verify any combination in the <a href="/step-up-sip-calculator/">step-up SIP calculator</a>, which shows the vs-flat-SIP gap explicitly.</p>

    <h2>Why It Works: The Later Rupees Are Bigger</h2>
    <p>In a flat SIP, year-15 contributions are trivial next to your year-15 salary — you are effectively <em>reducing</em> your savings rate every year that inflation and increments raise your income. The step-up fixes the leak. By year 15 the monthly SIP is ₹41,772 — painful-sounding, but by then it's the same share of a much larger salary.</p>
    <table>
      <thead><tr><th>Year</th><th>Monthly SIP (10% step-up)</th><th>Cumulative Corpus (12%)</th></tr></thead>
      <tbody>
      <tr><td>1</td><td>₹10,000</td><td>₹1.27 lakh</td></tr>
      <tr><td>5</td><td>₹14,641</td><td>₹9.9 lakh</td></tr>
      <tr><td>10</td><td>₹23,579</td><td>₹33 lakh</td></tr>
      <tr><td>15</td><td>₹37,975</td><td>₹84 lakh</td></tr>
      <tr><td>20</td><td>₹61,159</td><td>₹1.86 crore</td></tr>
      </tbody>
    </table>

    <h2>Setting It Up (2 Minutes, Any Platform)</h2>
    <ol>
      <li>While registering a new SIP on Groww / Coin / Kuvera / your AMC's site, look for <strong>"Step-up SIP"</strong> or <strong>"Top-up SIP"</strong>.</li>
      <li>Set the increment: <strong>10% yearly</strong> is the sweet spot for most salaried investors.</li>
      <li>Time the trigger month to <strong>just after your appraisal cycle</strong> (April/May for most Indian companies) so the raise lands before the SIP does.</li>
    </ol>
    <p>Already running a flat SIP? You don't need to cancel it — start a second small SIP each year, or use the platform's modify option. The math is identical.</p>

    <h2>When NOT to Step Up</h2>
    <ul>
      <li><strong>Income isn't actually growing.</strong> Freelancers and business owners with lumpy income should keep a modest flat SIP and invest surpluses as <a href="/lumpsum-calculator/">lumpsums</a> in good months.</li>
      <li><strong>You have expensive debt.</strong> A 36% credit card balance beats any 12% SIP. Clear it first — the <a href="/blog/sip-calculator-monthly-mistakes/">SIP mistakes guide</a> covers this trap.</li>
      <li><strong>Your EMI load is already above 40% of take-home.</strong> Step up prepayments instead; our <a href="/sip-emi-calculator.html">SIP + EMI guide</a> shows how to split.</li>
    </ul>

    <h2>Step-Up + Goal Planning</h2>
    <p>The step-up changes goal math dramatically. Reaching ₹1 crore at 12% needs a flat ₹10,900/month for 20 years — or a step-up starting at just <strong>₹5,400/month</strong>. If the flat number for your goal feels impossible, the step-up version usually isn't. Work backwards from your target in the <a href="/blog/sip-1-crore-by-age/">₹1 crore SIP guide</a>, then set the increment and forget it.</p>
    <div class="highlight-box"><strong>One habit, one rule:</strong> every appraisal, your SIP gets its increment before your lifestyle does. That single ordering decision is worth more than every fund-selection debate you will ever have.</div>`
},

// ─── 009: TDS on FD + Form 15G/H ───
{
  slug: 'tds-on-fd-form-15g-15h',
  cardTitle: 'TDS on FD Interest: How Form 15G/15H Saves Your Cash Flow',
  excerpt: 'Banks cut 10% TDS the moment your FD interest crosses ₹40,000 a year. Who can file Form 15G or 15H to stop it, the PAN trap that doubles the deduction, and how to claim refunds.',
  cat: 'ppf', catLabel: '🏦 FD', readTime: 7,
  title: 'TDS on FD Interest: Form 15G/15H Explained | IndiCalculator',
  h1: 'TDS on FD Interest: How Form 15G and 15H Save Your Cash Flow',
  desc: 'TDS on fixed deposit interest explained: the ₹40,000/₹50,000 thresholds, 10% vs 20% without PAN, who qualifies for Form 15G and 15H, submission timing, and how to claim excess TDS back in your ITR.',
  calcHref: '/fd-calculator/', calcLabel: 'Open the FD Calculator',
  content: `    <p>You booked a ₹6 lakh FD at 7.25%, expecting ₹43,500 of interest. At year-end the bank credited less than you calculated. Nothing went wrong — the bank deducted <strong>TDS (Tax Deducted at Source)</strong> because your interest crossed the threshold. Here is exactly how the rules work, and the two forms that stop the deduction legally.</p>

    <h2>When Banks Deduct TDS on FD Interest</h2>
    <table>
      <thead><tr><th>Depositor</th><th>Threshold (interest per bank, per FY)</th><th>TDS Rate</th></tr></thead>
      <tbody>
      <tr><td>Regular (below 60)</td><td>₹40,000</td><td>10%</td></tr>
      <tr><td>Senior citizen (60+)</td><td>₹50,000</td><td>10%</td></tr>
      <tr><td>Any depositor, PAN not linked</td><td>same thresholds</td><td><strong>20%</strong></td></tr>
      </tbody>
    </table>
    <ul>
      <li>The threshold applies to your <strong>total interest across all branches of one bank</strong> — splitting between branches doesn't help; splitting between <em>banks</em> does.</li>
      <li>TDS applies on <strong>accrued</strong> interest each year, even for cumulative FDs where you receive nothing until maturity — a genuine cash-flow sting.</li>
      <li>Estimate your interest before booking with the <a href="/fd-calculator/">FD calculator</a> — it flags whether you'll cross the TDS threshold.</li>
    </ul>

    <h2>Form 15G: For Non-Seniors with Low Income</h2>
    <p>Form 15G is a self-declaration that your income is below the taxable limit, instructing the bank not to deduct TDS. You qualify only if <strong>both</strong> conditions hold:</p>
    <ol>
      <li>Your <strong>total taxable income</strong> is below the basic exemption limit (effectively ₹4 lakh under the new regime for FY 2025-26), <em>and</em></li>
      <li>Your <strong>total interest income</strong> for the year is below that same exemption limit.</li>
    </ol>
    <p>Typical eligible filers: students with FD gifts, homemakers with deposits in their name, early retirees below the threshold, and anyone on a career break.</p>

    <h2>Form 15H: The Senior Citizen Version</h2>
    <p>Form 15H (for 60+) has a single, softer condition: your <strong>final tax liability for the year is nil</strong> — even if your interest income alone exceeds the exemption limit. A senior with ₹6.5 lakh of total income that becomes tax-free after the Section 87A rebate can validly file 15H. Combined with the ₹50,000 senior TDS threshold and senior FD rates (+0.50% at most banks), retirees have real room to keep the full payout.</p>

    <h2>Submission Rules That Trip People Up</h2>
    <ul>
      <li><strong>Submit in April</strong>, at the start of the financial year — TDS already deducted before you file the form will not be reversed by the bank.</li>
      <li><strong>Every bank, every year.</strong> The forms lapse each 31 March and cover only the bank you filed them with. Most banks now accept them in net banking in under two minutes.</li>
      <li><strong>False declarations are prosecutable</strong> under Section 277. If you genuinely expect tax liability, skip the form — the TDS route with an ITR refund is the honest path.</li>
    </ul>

    <h2>Deducted Anyway? Claim It Back</h2>
    <ol>
      <li>Check <strong>Form 26AS / AIS</strong> — every rupee of bank TDS appears there against your PAN.</li>
      <li>File your ITR; the TDS offsets your final tax liability rupee-for-rupee.</li>
      <li>If your final liability is lower than TDS paid, the excess comes back as a <strong>refund with interest</strong> (Section 244A), typically weeks after e-verification.</li>
    </ol>

    <h2>Or Sidestep TDS Entirely</h2>
    <p>Interest on <strong>PPF is exempt</strong> — no TDS, no tax, ever (see the <a href="/ppf-calculator/">PPF calculator</a>). Debt or equity funds have no yearly TDS for residents — tax applies only when you redeem. For long horizons, the post-tax gap between FDs and alternatives is bigger than most savers think: the <a href="/sip-vs-fd-calculator.html">SIP vs FD comparison</a> puts numbers on it.</p>
    <div class="highlight-box"><strong>Quick checklist:</strong> PAN linked (avoid 20%), interest estimated before booking, 15G/H filed in April if eligible, 26AS checked before filing ITR. Four steps, zero surprises.</div>`
},
];

// ─── Write queue files ───
fs.mkdirSync('_queue', { recursive: true });
const start = 5; // continue numbering after 001-004
posts.forEach((p, i) => {
  const num = String(start + i).padStart(3, '0');
  const file = path.join('_queue', num + '-' + p.slug + '.html');
  fs.writeFileSync(file, buildPost(p), 'utf8');
  console.log('  ✓ ' + file);
});

// ─── Verify: metadata parses with _publish.js's regex; JSON-LD valid; titles ≤70 & unique ───
console.log('\nVerification:');
const metaRe = name => new RegExp('<!--\\s*' + name + ':\\s*([\\s\\S]*?)\\s*-->');
const titles = new Set();
let ok = true;
for (const f of fs.readdirSync('_queue')) {
  const h = fs.readFileSync(path.join('_queue', f), 'utf8');
  for (const k of ['SLUG', 'TITLE', 'EXCERPT', 'CATEGORY', 'READTIME']) {
    if (!metaRe(k).test(h)) { console.log('  ✗ ' + f + ' missing ' + k); ok = false; }
  }
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) { try { JSON.parse(b[1].replace(/__DATE__/g, '2026-01-01')); } catch (e) { console.log('  ✗ ' + f + ' bad JSON-LD: ' + e.message); ok = false; } }
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const len = t.replace(/&amp;/g, '&').length;
  if (len > 70) { console.log('  ✗ ' + f + ' title ' + len + ' chars'); ok = false; }
  if (titles.has(t)) { console.log('  ✗ duplicate title: ' + t); ok = false; }
  titles.add(t);
  if (!/\.article-body \.calc-link-btn\{/.test(h)) { console.log('  ✗ ' + f + ' missing high-specificity CTA selector'); ok = false; }
  console.log('  ✓ ' + f + ' — title ' + len + ' chars, metadata + JSON-LD ok');
}
console.log(ok ? '\nAll 5 queue posts valid.' : '\nERRORS FOUND — fix before commit.');
