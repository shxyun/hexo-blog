// Hexo collapsible details block tag plugin
// Usage:
//   {% collapse title="Click to expand" %}
//   Hidden content (Markdown supported).
//   {% endcollapse %}
// Add open="true" to expand by default.
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var STYLE =
  '.collapse-box{margin:1.2em 0;border:1px solid #d0d7de;border-radius:8px;overflow:hidden}' +
  '.collapse-box summary{padding:10px 16px;cursor:pointer;font-weight:bold;background:#f0f4fa;list-style:none}' +
  '.collapse-box summary::-webkit-details-marker{display:none}' +
  '.collapse-box summary::before{content:"\\25B6 ";font-size:.8em;color:#666}' +
  '.collapse-box[open] summary::before{content:"\\25BC "}' +
  '.collapse-box .collapse-body{padding:12px 16px}' +
  '@media (prefers-color-scheme: dark){.collapse-box{border-color:#3d4654}.collapse-box summary{background:#2b313a}.collapse-box summary::before{color:#aaa}}' +
  '.dark .collapse-box,[data-theme="dark"] .collapse-box,[data-user-color-scheme="dark"] .collapse-box{border-color:#3d4654}' +
  '.dark .collapse-box summary,[data-theme="dark"] .collapse-box summary,[data-user-color-scheme="dark"] .collapse-box summary{background:#2b313a}';

hexo.extend.tag.register('collapse', function (args, content) {
  var o = parseArgs(args);
  var title = o.title || 'Click to expand';
  var openAttr = (o.open === 'true' || o.open === '1' || o.open === 'yes') ? ' open' : '';
  var body = hexo.render.renderSync({ text: content, engine: 'markdown' });
  return '<style>' + STYLE + '</style>' +
    '<details' + openAttr + ' class="collapse-box">' +
    '<summary>' + title + '</summary>' +
    '<div class="collapse-body">' + body + '</div></details>';
}, { ends: true });
