// Hexo Buttondown 订阅标签插件
// 用法：{% subscribe %}
//   或：{% subscribe title="订阅更新" desc="新文章直接发到你的邮箱。" ph="你的邮箱地址" btn="订阅" %}
hexo.extend.tag.register('subscribe', function (args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) {
      opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  });
  var title = opts.title || 'Subscribe to the newsletter';
  var desc = opts.desc || 'New posts, delivered to your inbox. No spam, unsubscribe anytime.';
  var ph = opts.ph || 'Your email address';
  var btn = opts.btn || 'Subscribe';
  var css = '.bd-sub{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;margin:1.5em 0;padding:18px 20px;border-radius:10px;border:1px solid #d0d7de;background:#f6f8fa}' +
    '.bd-sub-body{flex:1;min-width:200px}' +
    '.bd-sub-title{display:block;font-size:1.05em;margin-bottom:4px}' +
    '.bd-sub-desc{font-size:.9em;color:#57606a}' +
    '.bd-sub-form{display:flex;gap:8px;flex-wrap:wrap}' +
    '.bd-sub-input{padding:8px 12px;border:1px solid #d0d7de;border-radius:6px;font-size:.95em;min-width:220px;background:#fff;color:#1f2328}' +
    '.bd-sub-btn{padding:8px 18px;border:0;border-radius:6px;background:#1f6feb;color:#fff;font-size:.95em;cursor:pointer;white-space:nowrap}' +
    '.bd-sub-btn:hover{background:#1a5cd7}' +
    '@media (prefers-color-scheme: dark){.bd-sub{background:#1c2128;border-color:#3d444d}.bd-sub-desc{color:#8b949e}.bd-sub-input{background:#0d1117;color:#e6edf3;border-color:#3d444d}}' +
    '.dark .bd-sub,[data-theme="dark"] .bd-sub{background:#1c2128;border-color:#3d444d}' +
    '.dark .bd-sub-desc,[data-theme="dark"] .bd-sub-desc{color:#8b949e}' +
    '.dark .bd-sub-input,[data-theme="dark"] .bd-sub-input{background:#0d1117;color:#e6edf3;border-color:#3d444d}';
  return '<div class="bd-sub">' +
    '<div class="bd-sub-body">' +
    '<strong class="bd-sub-title">' + title + '</strong>' +
    '<span class="bd-sub-desc">' + desc + '</span>' +
    '</div>' +
    '<form class="bd-sub-form" action="https://buttondown.com/api/emails/embed-subscribe/shenlijun" method="post" target="popupwindow" onsubmit="window.open(\'https://buttondown.com/shenlijun\',\'popupwindow\')">' +
    '<input class="bd-sub-input" type="email" name="email" placeholder="' + ph + '" required />' +
    '<button class="bd-sub-btn" type="submit">' + btn + '</button>' +
    '</form>' +
    '</div>' +
    '<style>' + css + '</style>';
}, { ends: false });
