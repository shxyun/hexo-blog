// Hexo download / cloud drive card tag plugin (English)
// Usage: {% drive platform="Google Drive" name="Resource Pack (PDF, 42 MB)" url="https://..." code="AB12" btn="Download" %}
// Platform colors: Google Drive, Dropbox, OneDrive, MEGA, Gumroad, GitHub, iCloud, Notion,
// WeTransfer, MediaFire, TeraBox, Amazon S3, Direct Link
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var COLORS = {
  googledrive: '#0F9D58', drive: '#0F9D58', dropbox: '#0061FF',
  onedrive: '#0078D4', mega: '#D9272E', gumroad: '#FF90E8',
  github: '#181717', icloud: '#3693F3', notion: '#111111',
  wetransfer: '#4D5468', mediafire: '#12B7E4', terabox: '#2BA7E6',
  amazon: '#FF9900', direct: '#6E7781'
};
var DARK_TEXT = { gumroad: true, amazon: true };

var STYLE =
  '.drv-card{max-width:680px;margin:1.5em auto;padding:14px 18px;border:1px solid #d0d7de;border-radius:12px;background:linear-gradient(135deg,#f8fbff,#eef4fb);box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
  '.drv-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
  '.drv-badge{display:inline-block;padding:3px 12px;border-radius:999px;font-size:.8em;font-weight:700}' +
  '.drv-name{font-size:1.05em;font-weight:700}' +
  '.drv-actions{margin-top:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
  '.drv-link{display:inline-block;padding:6px 16px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em;font-weight:600}' +
  '.drv-link:hover{background:#1d47c9}' +
  '.drv-code{font-size:.92em;color:#57606a}' +
  '.drv-codeval{padding:2px 8px;border-radius:6px;background:#fff;border:1px dashed #98a6b8;font-weight:800;color:#c0392b;user-select:all}' +
  '.drv-copy{margin-left:6px;padding:3px 12px;border:0;border-radius:6px;background:#42b983;color:#fff;cursor:pointer;font-size:.88em}' +
  '.drv-copy:hover{background:#339a6c}' +
  '@media (prefers-color-scheme: dark){.drv-card{background:#222a35;border-color:#3d4654}.drv-code{color:#9aa4b1}.drv-codeval{background:#1e232b;color:#ff9a76}}' +
  '.dark .drv-card,[data-theme="dark"] .drv-card,[data-user-color-scheme="dark"] .drv-card{background:#222a35;border-color:#3d4654}' +
  '.dark .drv-code,[data-theme="dark"] .drv-code,[data-user-color-scheme="dark"] .drv-code{color:#9aa4b1}' +
  '.dark .drv-codeval,[data-theme="dark"] .drv-codeval,[data-user-color-scheme="dark"] .drv-codeval{background:#1e232b;color:#ff9a76}';

var SCRIPT =
  '(function(){if(window.__drvBound)return;window.__drvBound=true;' +
  "document.addEventListener('click',function(e){" +
  "var btn=e.target.closest('.drv-copy');if(!btn)return;" +
  "var box=btn.closest('.drv-card');var el=box&&box.querySelector('.drv-codeval');if(!el)return;" +
  'var code=el.textContent.trim();' +
  "function ok(){btn.textContent='Copied \\u2713';setTimeout(function(){btn.textContent='Copy';},1600);}" +
  'if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(ok,function(){fallback();});}else{fallback();}' +
  "function fallback(){var ta=document.createElement('textarea');ta.value=code;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok();}catch(err){}ta.remove();}});})();";

hexo.extend.tag.register('drive', function (args) {
  var o = parseArgs(args);
  var platform = o.platform || 'Direct Link';
  var name = o.name || 'Shared Resource';
  var url = o.url || '#';
  var code = o.code || '';
  var btn = o.btn || 'Download';
  var slug = platform.toLowerCase().replace(/[^a-z0-9]/g, '');
  var bg = COLORS[slug] || '#2e5ff7';
  var txt = DARK_TEXT[slug] ? '#111111' : '#ffffff';
  var codeHtml = code ? '<span class="drv-code">Access code <code class="drv-codeval">' + code + '</code><button class="drv-copy" type="button">Copy</button></span>' : '';
  return '<style>' + STYLE + '</style>' +
    '<div class="drv-card"><div class="drv-top">' +
    '<span class="drv-badge" style="background:' + bg + ';color:' + txt + '">' + platform + '</span>' +
    '<strong class="drv-name">' + name + '</strong></div>' +
    '<div class="drv-actions"><a class="drv-link" href="' + url + '" target="_blank" rel="noopener">' + btn + ' &#8599;</a>' +
    codeHtml + '</div></div>' +
    '<scr' + 'ipt>' + SCRIPT + '</scr' + 'ipt>';
}, { ends: false });
