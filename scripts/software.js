// Hexo software / app promotion card tag plugin
// Usage:
// {% software icon="/images/app.png" badge="Editor's Choice" name="App Name" developer="Vendor" platforms="Windows, macOS, Android, iOS" version="2.4.1" size="38 MB" updated="Oct 2026" license="Freemium" rating="4.7" old="$14.99/mo" price="$3.39/mo" link="https://..." btn="Get the Deal" %}
// Only name and link are required.
// license: Free | Freemium | Paid | Subscription | Open Source
// platforms: Windows, macOS, Android, iOS, iPadOS, Linux, Web, Chrome
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var LICENSE_COLORS = {
  free: '#1a7f37', freemium: '#b25e00', paid: '#1d47c9',
  subscription: '#5b3aa5', opensource: '#7c3aed', 'opensource-': '#7c3aed'
};
var PLATFORM_NAMES = {
  windows: 'Windows', win: 'Windows',
  macos: 'macOS', mac: 'macOS', osx: 'macOS',
  android: 'Android', ios: 'iOS', iphone: 'iOS', ipad: 'iPadOS',
  linux: 'Linux', web: 'Web', chrome: 'Chrome', windowsarm: 'Windows ARM'
};

var STYLE =
  '.sw-card{position:relative;display:flex;gap:16px;max-width:680px;margin:1.5em auto;padding:18px;border:1px solid #d0d7de;border-radius:14px;background:linear-gradient(135deg,#fff,#f7f9fd);box-shadow:0 3px 14px rgba(0,0,0,.07)}' +
  '.sw-icon{flex:0 0 84px;width:84px;height:84px;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.18);align-self:flex-start}' +
  '.sw-icon img{width:100%;height:100%;object-fit:cover;display:block}' +
  '.sw-main{flex:1;min-width:0;display:flex;flex-direction:column}' +
  '.sw-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
  '.sw-name{font-size:1.22em;line-height:1.25;margin:0}' +
  '.sw-name a{color:inherit;text-decoration:none}' +
  '.sw-name a:hover{color:#2e5ff7}' +
  '.sw-license{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.7em;font-weight:800;letter-spacing:.5px;color:#fff;text-transform:uppercase}' +
  '.sw-rating{margin-left:auto;color:#e0a200;font-size:.92em;font-weight:800}' +
  '.sw-dev{color:#57606a;font-size:.86em;margin:3px 0 8px}' +
  '.sw-platforms{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}' +
  '.sw-plat{display:inline-block;padding:2px 10px;border:1px solid #d0d7de;border-radius:6px;background:#f3f5f9;color:#44505f;font-size:.76em;font-weight:700}' +
  '.sw-desc{margin:0 0 8px;color:#3d4654;font-size:.93em;line-height:1.6}' +
  '.sw-meta{display:flex;gap:8px;flex-wrap:wrap;font-size:.78em;color:#7a8494;margin-bottom:10px}' +
  '.sw-meta span:not(:last-child):after{content:"\\00B7";margin-left:8px;color:#b6bec9}' +
  '.sw-foot{margin-top:auto;display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
  '.sw-price{font-size:1.02em;color:#1a7f37}' +
  '.sw-price del{color:#98a2af;font-size:.85em;margin-right:8px;font-weight:400}' +
  '.sw-free-label{color:#1a7f37}' +
  '.sw-btn{margin-left:auto;display:inline-block;padding:9px 22px;border-radius:9px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.94em;font-weight:700}' +
  '.sw-btn:hover{background:#1d47c9}' +
  '.sw-badge{position:absolute;top:-10px;left:18px;background:#e0a200;color:#111;font-size:.72em;font-weight:800;padding:3px 12px;border-radius:999px;letter-spacing:.3px}' +
  '@media(max-width:520px){.sw-card{flex-direction:column;align-items:center;text-align:left}.sw-icon{flex-basis:auto;width:96px;height:96px}.sw-rating{margin-left:0}.sw-btn{margin-left:0}}' +
  '@media (prefers-color-scheme: dark){' +
  '.sw-card{background:linear-gradient(135deg,#1c2128,#19222d);border-color:#3d444d}' +
  '.sw-dev,.sw-desc{color:#b6c0cc}.sw-meta{color:#9aa4b1}' +
  '.sw-plat{background:#232a35;color:#aeb9c6;border-color:#3d444d}' +
  '.sw-price del{color:#7a8494}}' +
  '.dark .sw-card,[data-theme="dark"] .sw-card,[data-user-color-scheme="dark"] .sw-card{background:linear-gradient(135deg,#1c2128,#19222d);border-color:#3d444d}' +
  '.dark .sw-dev,[data-theme="dark"] .sw-dev,[data-user-color-scheme="dark"] .sw-dev,.dark .sw-desc,[data-theme="dark"] .sw-desc,[data-user-color-scheme="dark"] .sw-desc{color:#b6c0cc}' +
  '.dark .sw-meta,[data-theme="dark"] .sw-meta,[data-user-color-scheme="dark"] .sw-meta{color:#9aa4b1}' +
  '.dark .sw-plat,[data-theme="dark"] .sw-plat,[data-user-color-scheme="dark"] .sw-plat{background:#232a35;color:#aeb9c6;border-color:#3d444d}';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

hexo.extend.tag.register('software', function (args) {
  var o = parseArgs(args);
  var icon = o.icon || '';
  var badge = o.badge || '';
  var name = o.name || 'App Name';
  var developer = o.developer || '';
  var desc = o.desc || '';
  var platforms = o.platforms || '';
  var version = o.version || '';
  var size = o.size || '';
  var updated = o.updated || '';
  var license = o.license || '';
  var rating = o.rating || '';
  var old = o.old || '';
  var price = o.price || '';
  var link = o.link || '#';
  var btn = o.btn || 'Get It Now';

  var licenseSlug = license.toLowerCase().replace(/[^a-z]/g, '');
  var licenseBg = LICENSE_COLORS[licenseSlug] || '#57606a';

  var iconHtml = icon ? '<a class="sw-icon" href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener"><img src="' + esc(icon) + '" alt="' + esc(name) + ' app icon" loading="lazy"></a>' : '';
  var licenseHtml = license ? '<span class="sw-license" style="background:' + licenseBg + '">' + esc(license) + '</span>' : '';
  var ratingHtml = rating ? '<span class="sw-rating">&#9733; ' + esc(rating) + '</span>' : '';
  var devHtml = developer ? '<div class="sw-dev">by ' + esc(developer) + '</div>' : '';
  var badgeHtml = badge ? '<span class="sw-badge">' + esc(badge) + '</span>' : '';

  var platsHtml = '';
  if (platforms) {
    platsHtml = '<div class="sw-platforms">' + platforms.split(',').map(function (p) {
      p = p.trim();
      if (!p) return '';
      var slug = p.toLowerCase().replace(/[^a-z]/g, '');
      var label = PLATFORM_NAMES[slug] || p;
      return '<span class="sw-plat">' + esc(label) + '</span>';
    }).join('') + '</div>';
  }

  var metaParts = [];
  if (version) metaParts.push('<span>v' + esc(version) + '</span>');
  if (size) metaParts.push('<span>' + esc(size) + '</span>');
  if (updated) metaParts.push('<span>Updated ' + esc(updated) + '</span>');
  var metaHtml = metaParts.length ? '<div class="sw-meta">' + metaParts.join('') + '</div>' : '';

  var descHtml = desc ? '<p class="sw-desc">' + esc(desc) + '</p>' : '';
  var priceHtml = old ? '<del>' + esc(old) + '</del>' : '';
  priceHtml += price ? '<strong>' + esc(price) + '</strong>' : '<strong class="sw-free-label">Free</strong>';

  return '<style>' + STYLE + '</style>' +
    '<div class="sw-card">' + iconHtml +
    '<div class="sw-main">' +
    '<div class="sw-head"><h3 class="sw-name"><a href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener">' + esc(name) + '</a></h3>' +
    licenseHtml + ratingHtml + '</div>' +
    devHtml + platsHtml + descHtml + metaHtml +
    '<div class="sw-foot"><div class="sw-price">' + priceHtml + '</div>' +
    '<a class="sw-btn" href="' + esc(link) + '" target="_blank" rel="nofollow sponsored noopener">' + esc(btn) + ' &#8599;</a>' +
    '</div></div>' + badgeHtml + '</div>';
}, { ends: false });
