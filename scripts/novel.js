// Hexo web-novel promotion card tag plugin
// Usage:
// {% novel platform="GoodNovel" cover="/images/cover.jpg" title="Novel Title" author="Pen Name" status="Ongoing" chapters="486" rating="4.8" genres="Werewolf, Romance" desc="One-line hook." free="First 30 chapters free" link="https://..." btn="Start Reading" %}
// Only title and link are required.
// Known platform badge colors: Novellia, GoodNovel, PlotNovel, Novel Master,
// Royal Road, Wattpad, WebNovel, Kindle, Kobo, Bookshop.org.
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var COLORS = {
  novellia: '#7C3AED', goodnovel: '#E53935', plotnovel: '#0EA5E9',
  novelmaster: '#F59E0B', novelmasterapp: '#F59E0B',
  amazon: '#FF9900', kindle: '#FF9900', royalroad: '#1D1D1D',
  royal: '#1D1D1D', wattpad: '#FF5428', webnovel: '#1D9BF0',
  kobo: '#9A5CF5', bookshop: '#009379', direct: '#6E7781'
};
var DARK_TEXT = { novelmaster: true, amazon: true, kindle: true };

var STYLE =
  '.nvl-card{display:flex;gap:18px;max-width:680px;margin:1.5em auto;padding:18px;border:1px solid #d0d7de;border-radius:14px;background:linear-gradient(135deg,#fff,#f7f9fd);box-shadow:0 3px 14px rgba(0,0,0,.07)}' +
  '.nvl-cover{flex:0 0 128px;width:128px;align-self:flex-start;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.18)}' +
  '.nvl-cover img{width:100%;height:auto;display:block;aspect-ratio:2/3;object-fit:cover}' +
  '.nvl-main{flex:1;min-width:0;display:flex;flex-direction:column}' +
  '.nvl-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}' +
  '.nvl-platform{display:inline-block;padding:3px 12px;border-radius:999px;font-size:.74em;font-weight:800;letter-spacing:.4px}' +
  '.nvl-status{display:inline-block;padding:3px 10px;border-radius:999px;font-size:.72em;font-weight:700;background:#eef2f7;color:#44505f;border:1px solid #d0d7de}' +
  '.nvl-st-ongoing{background:#e6f7ec;color:#1a7f37;border-color:#9ee0b0}' +
  '.nvl-st-completed,.nvl-st-complete{background:#e8f0ff;color:#1d47c9;border-color:#a9c4ff}' +
  '.nvl-st-hiatus,.nvl-st-dropped{background:#fdf3e0;color:#8a6300;border-color:#f0d18a}' +
  '.nvl-rating{margin-left:auto;color:#e0a200;font-size:.9em;font-weight:800}' +
  '.nvl-title{font-size:1.2em;line-height:1.3;margin:.1em 0 .15em}' +
  '.nvl-title a{color:inherit;text-decoration:none}' +
  '.nvl-title a:hover{color:#2e5ff7}' +
  '.nvl-author{color:#57606a;font-size:.88em;margin-bottom:8px}' +
  '.nvl-genres{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}' +
  '.nvl-tag{display:inline-block;padding:2px 10px;border-radius:6px;background:#eef1fb;color:#3b4a7a;font-size:.78em;font-weight:600}' +
  '.nvl-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:.83em;color:#57606a;margin-bottom:8px}' +
  '.nvl-free{color:#1a7f37;font-weight:600}' +
  '.nvl-desc{margin:0 0 12px;color:#3d4654;font-size:.93em;line-height:1.65}' +
  '.nvl-btn{align-self:flex-start;margin-top:auto;display:inline-block;padding:9px 22px;border-radius:9px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.94em;font-weight:700}' +
  '.nvl-btn:hover{background:#1d47c9}' +
  '@media(max-width:520px){.nvl-card{flex-direction:column;align-items:center;text-align:left}.nvl-cover{flex-basis:auto;width:150px}.nvl-rating{margin-left:0}}' +
  '@media (prefers-color-scheme: dark){' +
  '.nvl-card{background:linear-gradient(135deg,#1c2128,#19222d);border-color:#3d444d}' +
  '.nvl-author,.nvl-desc{color:#b6c0cc}.nvl-meta{color:#9aa4b1}' +
  '.nvl-tag{background:#25314a;color:#a9bcff}' +
  '.nvl-status{background:#232a35;color:#aeb9c6;border-color:#3d444d}}' +
  '.dark .nvl-card,[data-theme="dark"] .nvl-card,[data-user-color-scheme="dark"] .nvl-card{background:linear-gradient(135deg,#1c2128,#19222d);border-color:#3d444d}' +
  '.dark .nvl-author,[data-theme="dark"] .nvl-author,[data-user-color-scheme="dark"] .nvl-author,.dark .nvl-desc,[data-theme="dark"] .nvl-desc,[data-user-color-scheme="dark"] .nvl-desc{color:#b6c0cc}' +
  '.dark .nvl-meta,[data-theme="dark"] .nvl-meta,[data-user-color-scheme="dark"] .nvl-meta{color:#9aa4b1}' +
  '.dark .nvl-tag,[data-theme="dark"] .nvl-tag,[data-user-color-scheme="dark"] .nvl-tag{background:#25314a;color:#a9bcff}';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

hexo.extend.tag.register('novel', function (args) {
  var o = parseArgs(args);
  var platform = o.platform || 'Web Novel';
  var cover = o.cover || '';
  var title = o.title || 'Untitled Novel';
  var author = o.author || '';
  var status = o.status || '';
  var chapters = o.chapters || '';
  var rating = o.rating || '';
  var genres = o.genres || '';
  var desc = o.desc || '';
  var free = o.free || '';
  var link = o.link || '#';
  var btn = o.btn || 'Start Reading';

  var slug = platform.toLowerCase().replace(/[^a-z0-9]/g, '');
  var bg = COLORS[slug] || '#2e5ff7';
  var txt = DARK_TEXT[slug] ? '#111111' : '#ffffff';
  var statusSlug = status.toLowerCase().replace(/[^a-z]/g, '');

  var coverHtml = cover ? '<a class="nvl-cover" href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener"><img src="' + esc(cover) + '" alt="' + esc(title) + ' book cover" loading="lazy"></a>' : '';
  var statusHtml = status ? '<span class="nvl-status nvl-st-' + statusSlug + '">' + esc(status) + '</span>' : '';
  var ratingHtml = rating ? '<span class="nvl-rating">&#9733; ' + esc(rating) + '</span>' : '';
  var authorHtml = author ? '<div class="nvl-author">by ' + esc(author) + '</div>' : '';
  var tagsHtml = '';
  if (genres) {
    tagsHtml = '<div class="nvl-genres">' + genres.split(',').map(function (g) {
      g = g.trim();
      return g ? '<span class="nvl-tag">' + esc(g) + '</span>' : '';
    }).join('') + '</div>';
  }
  var chaptersHtml = chapters ? '<span class="nvl-chapters">&#128214; ' + esc(chapters) + ' chapters</span>' : '';
  var freeHtml = free ? '<span class="nvl-free">&#127873; ' + esc(free) + '</span>' : '';
  var metaHtml = (chaptersHtml || freeHtml) ? '<div class="nvl-meta">' + chaptersHtml + freeHtml + '</div>' : '';
  var descHtml = desc ? '<p class="nvl-desc">' + esc(desc) + '</p>' : '';

  return '<style>' + STYLE + '</style>' +
    '<div class="nvl-card">' + coverHtml +
    '<div class="nvl-main">' +
    '<div class="nvl-head"><span class="nvl-platform" style="background:' + bg + ';color:' + txt + '">' + esc(platform) + '</span>' +
    statusHtml + ratingHtml + '</div>' +
    '<h3 class="nvl-title"><a href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener">' + esc(title) + '</a></h3>' +
    authorHtml + tagsHtml + metaHtml + descHtml +
    '<a class="nvl-btn" href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener">' + esc(btn) + ' &#8599;</a>' +
    '</div></div>';
}, { ends: false });
