// Hexo callout / alert box tag plugin
// Usage:
//   {% alert type="info" title="Note" %}
//   Body text (Markdown supported).
//   {% endalert %}
// type: info | success | warning | error
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var ICONS = { info: 'i', success: '&#10003;', warning: '&#9888;', error: '&#10005;' };

var STYLE =
  '.alert-box{display:flex;gap:10px;margin:1.2em 0;padding:12px 16px;border-radius:8px;border:1px solid;font-size:.95em}' +
  '.alert-ic{font-weight:bold;font-size:1.1em;line-height:1.4}' +
  '.alert-body{flex:1}' +
  '.alert-title{display:block;margin-bottom:2px}' +
  '.alert-info{background:#eef6ff;border-color:#a6d0ff;color:#1c4e9a}.alert-info .alert-ic{color:#2e5ff7}' +
  '.alert-warning{background:#fff8e8;border-color:#ffd96a;color:#8a6300}.alert-warning .alert-ic{color:#e0a200}' +
  '.alert-error{background:#fdeeee;border-color:#ffb0b0;color:#a02020}.alert-error .alert-ic{color:#e03333}' +
  '.alert-success{background:#eefbe8;border-color:#9ee090;color:#2d6a20}.alert-success .alert-ic{color:#42b983}' +
  '@media (prefers-color-scheme: dark){' +
  '.alert-info{background:#1a2a3d;border-color:#2a4a6a;color:#7ab0ff}' +
  '.alert-warning{background:#2d2a18;border-color:#5a4e10;color:#ffd96a}' +
  '.alert-error{background:#2d1a1a;border-color:#5a2a2a;color:#ff9090}' +
  '.alert-success{background:#1a2d18;border-color:#2a5a20;color:#7ad06a}}' +
  '.dark .alert-info,[data-theme="dark"] .alert-info,[data-user-color-scheme="dark"] .alert-info{background:#1a2a3d;border-color:#2a4a6a;color:#7ab0ff}' +
  '.dark .alert-warning,[data-theme="dark"] .alert-warning,[data-user-color-scheme="dark"] .alert-warning{background:#2d2a18;border-color:#5a4e10;color:#ffd96a}' +
  '.dark .alert-error,[data-theme="dark"] .alert-error,[data-user-color-scheme="dark"] .alert-error{background:#2d1a1a;border-color:#5a2a2a;color:#ff9090}' +
  '.dark .alert-success,[data-theme="dark"] .alert-success,[data-user-color-scheme="dark"] .alert-success{background:#1a2d18;border-color:#2a5a20;color:#7ad06a}';

hexo.extend.tag.register('alert', function (args, content) {
  var o = parseArgs(args);
  var type = o.type || 'info';
  var title = o.title || '';
  var icon = ICONS[type] || ICONS.info;
  var body = hexo.render.renderSync({ text: content, engine: 'markdown' });
  var titleHtml = title ? '<strong class="alert-title">' + title + '</strong>' : '';
  return '<style>' + STYLE + '</style>' +
    '<div class="alert-box alert-' + type + '">' +
    '<span class="alert-ic">' + icon + '</span>' +
    '<div class="alert-body">' + titleHtml + '<div class="alert-text">' + body + '</div></div></div>';
}, { ends: true });
