// Hexo product / affiliate card tag plugin
// Usage:
//   {% product img="https://..." badge="Best Pick" title="Product Name" desc="One-line intro" price="$69.99" old="$99.99" rating="4.7" link="https://..." btn="Check Price" %}
// Legacy (novel) usage is still supported:
//   {% product name="Title" platform="Novellia" url="https://..." desc="Intro" rating="9.5" tag="Recommended" %}
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var STYLE =
  '.pc-card{display:flex;gap:16px;max-width:680px;margin:1.5em auto;padding:16px;border:1px solid #d0d7de;border-radius:12px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.06)}' +
  '.pc-media{flex:0 0 130px;width:130px;height:130px;border-radius:10px;overflow:hidden;background:#f0f4fa}' +
  '.pc-media img{width:100%;height:100%;object-fit:cover;display:block}' +
  '.pc-main{flex:1;min-width:0;display:flex;flex-direction:column}' +
  '.pc-head{display:flex;align-items:center;gap:8px;margin-bottom:4px;min-height:1.4em}' +
  '.pc-badge{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.75em;font-weight:700;letter-spacing:.3px;color:#fff;background:#e0600a}' +
  '.pc-stars{margin-left:auto;color:#e0a200;font-size:.88em;font-weight:700}' +
  '.pc-title{font-size:1.12em;line-height:1.35;margin:.1em 0 .35em}' +
  '.pc-title a{color:inherit;text-decoration:none}' +
  '.pc-title a:hover{color:#2e5ff7}' +
  '.pc-desc{margin:0 0 10px;color:#57606a;font-size:.92em;line-height:1.6}' +
  '.pc-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}' +
  '.pc-old{color:#8b949e;text-decoration:line-through;font-size:.92em;margin-right:8px}' +
  '.pc-now{color:#1a7f37;font-size:1.2em;font-weight:800}' +
  '.pc-tag{padding:2px 10px;border-radius:999px;font-size:.82em;background:#42b983;color:#fff}' +
  '.pc-btn{display:inline-block;padding:8px 18px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em;font-weight:600;white-space:nowrap}' +
  '.pc-btn:hover{background:#1d47c9}' +
  '@media(max-width:520px){.pc-card{flex-direction:column}.pc-media{width:100%;height:180px;flex-basis:auto}}' +
  '@media (prefers-color-scheme: dark){.pc-card{background:#1c2128;border-color:#3d444d}.pc-media{background:#2b313a}.pc-desc{color:#9aa4b1}}' +
  '.dark .pc-card,[data-theme="dark"] .pc-card,[data-user-color-scheme="dark"] .pc-card{background:#1c2128;border-color:#3d444d}' +
  '.dark .pc-media,[data-theme="dark"] .pc-media,[data-user-color-scheme="dark"] .pc-media{background:#2b313a}' +
  '.dark .pc-desc,[data-theme="dark"] .pc-desc,[data-user-color-scheme="dark"] .pc-desc{color:#9aa4b1}';

hexo.extend.tag.register('product', function (args) {
  var o = parseArgs(args);
  var img = o.img || '';
  var title = o.title || o.name || 'Untitled';
  var badge = o.badge || o.platform || '';
  var desc = o.desc || '';
  var price = o.price || '';
  var old = o.old || '';
  var rating = o.rating || '';
  var tag = o.tag || '';
  var link = o.link || o.url || '#';
  var btn = o.btn || (o.platform && !o.btn ? 'Read Details' : 'Check Price');

  var imgHtml = img ? '<a class="pc-media" href="' + link + '" target="_blank" rel="nofollow sponsored noopener"><img src="' + img + '" alt="' + title + '" loading="lazy"></a>' : '';
  var badgeHtml = badge ? '<span class="pc-badge">' + badge + '</span>' : '';
  var ratingHtml = rating ? '<span class="pc-stars">&#9733; ' + rating + '</span>' : '';
  var descHtml = desc ? '<p class="pc-desc">' + desc + '</p>' : '';
  var oldHtml = old ? '<span class="pc-old">' + old + '</span>' : '';
  var priceHtml = price ? '<span class="pc-now">' + price + '</span>' : '';
  var tagHtml = tag ? '<span class="pc-tag">' + tag + '</span>' : '';

  return '<style>' + STYLE + '</style>' +
    '<div class="pc-card">' + imgHtml +
    '<div class="pc-main">' +
    '<div class="pc-head">' + badgeHtml + ratingHtml + '</div>' +
    '<h3 class="pc-title"><a href="' + link + '" target="_blank" rel="nofollow sponsored noopener">' + title + '</a></h3>' +
    descHtml +
    '<div class="pc-foot"><div>' + oldHtml + priceHtml + '</div>' +
    '<a class="pc-btn" href="' + link + '" target="_blank" rel="nofollow sponsored noopener">' + btn + ' &#8599;</a>' + tagHtml +
    '</div></div></div>';
}, { ends: false });
