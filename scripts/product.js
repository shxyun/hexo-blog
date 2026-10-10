// Hexo 小说/产品推荐卡片标签插件
// 用法：{% product name="书名" platform="Novellia" url="https://..." desc="简介" rating="9.5" tag="推荐" %}
hexo.extend.tag.register('product', function (args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) {
      opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  });
  var name = opts.name || 'Untitled';
  var platform = opts.platform || '';
  var url = opts.url || '#';
  var desc = opts.desc || '';
  var rating = opts.rating || '';
  var tag = opts.tag || '';

  var style = '.product-card{max-width:640px;margin:1.2em auto;padding:16px 20px;border:1px solid #d0d7de;border-radius:10px;background:linear-gradient(135deg,#f8fbff,#eef4fb);box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
    '.product-card .pc-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
    '.product-card .pc-platform{display:inline-block;padding:2px 10px;border-radius:12px;font-size:.85em;color:#fff;background:#2e5ff7}' +
    '.product-card .pc-name{font-size:1.1em;font-weight:bold}' +
    '.product-card .pc-rating{margin-left:auto;color:#e0a200;font-weight:bold;font-size:.95em}' +
    '.product-card .pc-desc{margin-top:8px;color:#555;font-size:.92em;line-height:1.6}' +
    '.product-card .pc-actions{margin-top:12px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
    '.product-card .pc-link{display:inline-block;padding:6px 16px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em}' +
    '.product-card .pc-link:hover{background:#1d47c9}' +
    '.product-card .pc-tag{padding:2px 10px;border-radius:12px;font-size:.82em;background:#42b983;color:#fff}' +
    '@media (prefers-color-scheme: dark){.product-card{background:#2b313a;border-color:#3d4654}.product-card .pc-desc{color:#bbb}.product-card .pc-platform{background:#5a8aff}}';

  var ratingHtml = rating ? '<span class="pc-rating">\u2605 ' + rating + '</span>' : '';
  var tagHtml = tag ? '<span class="pc-tag">' + tag + '</span>' : '';
  var descHtml = desc ? '<div class="pc-desc">' + desc + '</div>' : '';
  var platformHtml = platform ? '<span class="pc-platform">' + platform + '</span>' : '';

  return '<style>' + style + '</style>' +
    '<div class="product-card">' +
    '<div class="pc-top">' + platformHtml + '<strong class="pc-name">' + name + '</strong>' + ratingHtml + '</div>' +
    descHtml +
    '<div class="pc-actions"><a class="pc-link" href="' + url + '" target="_blank" rel="noopener">阅读详情 \u2197</a>' + tagHtml + '</div>' +
    '</div>';
}, { ends: false });
