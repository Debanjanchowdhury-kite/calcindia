/**
 * Daily blog publisher — moves the next queued post from _queue/ to /blog/<slug>/
 * and updates blog.html + sitemap.xml. Called by GitHub Actions cron.
 *
 * Queue file format: `_queue/<NNN>-<slug>.html`
 * File must contain these metadata comments in the <head>:
 *   <!-- SLUG: my-post-slug -->
 *   <!-- TITLE: Title for card / listing -->
 *   <!-- EXCERPT: One-line description for the blog index card -->
 *   <!-- CATEGORY: sip | ppf | tax | gst | emi -->
 *   <!-- READTIME: 7 -->
 */
const fs = require('fs');
const path = require('path');

const QUEUE_DIR = '_queue';
const BLOG_DIR = 'blog';
const BLOG_INDEX = 'blog.html';
const SITEMAP = 'sitemap.xml';

function log(m){ console.log(m); }
function err(m){ console.error('ERROR: '+m); process.exit(1); }

// 1. Find next queued post (lowest-numbered filename)
if (!fs.existsSync(QUEUE_DIR)){
  log('No _queue/ folder — nothing to publish.');
  process.exit(0);
}
const queued = fs.readdirSync(QUEUE_DIR)
  .filter(f => f.endsWith('.html'))
  .sort();
if (queued.length === 0){
  log('Queue is empty — nothing to publish today.');
  process.exit(0);
}
const nextFile = queued[0];
const nextPath = path.join(QUEUE_DIR, nextFile);
log('Publishing: '+nextFile);

// 2. Extract metadata
const html = fs.readFileSync(nextPath, 'utf8');
function meta(name){
  // Match until the closing --> (non-greedy)
  const m = html.match(new RegExp('<!--\\s*'+name+':\\s*([\\s\\S]*?)\\s*-->'));
  return m ? m[1].trim() : null;
}
const slug = meta('SLUG'); if (!slug) err('missing SLUG in '+nextFile);
const title = meta('TITLE'); if (!title) err('missing TITLE in '+nextFile);
const excerpt = meta('EXCERPT') || '';
const category = (meta('CATEGORY') || 'sip').toLowerCase();
const readTime = meta('READTIME') || '7';

// 3. Set today's date (UTC) for dateModified / lastmod
const today = new Date().toISOString().slice(0,10);

// 4. Update datePublished/dateModified in the post's BlogPosting schema (if placeholder)
let publishHtml = html
  .replace(/"datePublished":"__DATE__"/g, `"datePublished":"${today}"`)
  .replace(/"dateModified":"__DATE__"/g, `"dateModified":"${today}"`)
  .replace(/<!-- PUBLISH_DATE -->/g, today);

// 5. Write to /blog/<slug>/index.html
const outDir = path.join(BLOG_DIR, slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), publishHtml, 'utf8');
log('  → wrote '+path.join(outDir,'index.html'));

// 6. Add card to blog.html — insert as first card in the post-grid
const catClass = 'cat-' + category;
const catLabel = {
  sip: '📈 SIP', ppf: '🏦 PPF', tax: '💜 Tax', gst: '🧾 GST',
  emi: '🏠 EMI', home: '🏠 Home Loans'
}[category] || '📝 Guide';
const dateLabel = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
const card = `    <a class="post-card" href="/blog/${slug}/">
      <span class="art-cat ${catClass}">${catLabel}</span>
      <h2 class="pc-title">${title.replace(/&/g,'&amp;')}</h2>
      <p class="pc-ex">${excerpt.replace(/&/g,'&amp;')}</p>
      <div class="pc-foot"><span>${dateLabel} · ${readTime} min read</span><span class="pc-more">Read article →</span></div>
    </a>
`;

let blog = fs.readFileSync(BLOG_INDEX, 'utf8');
// Insert directly after the opening <div class="post-grid">
const gridOpen = blog.indexOf('class="post-grid"');
if (gridOpen === -1) err('no post-grid in blog.html');
const gridStart = blog.indexOf('>', gridOpen) + 1;
blog = blog.slice(0, gridStart) + '\n' + card + blog.slice(gridStart);
fs.writeFileSync(BLOG_INDEX, blog, 'utf8');
log('  → prepended card to blog.html');

// 7. Add to sitemap.xml
let sm = fs.readFileSync(SITEMAP, 'utf8');
const url = `https://indicalculator.in/blog/${slug}/`;
if (!sm.includes(url)){
  const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  sm = sm.replace('</urlset>', entry + '</urlset>');
  fs.writeFileSync(SITEMAP, sm, 'utf8');
  log('  → added to sitemap.xml');
}

// 8. Remove from queue
fs.unlinkSync(nextPath);
log('  → removed '+nextFile+' from queue');

log('Published successfully.');
