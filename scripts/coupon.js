// Hexo coupon code card tag plugin
// Usage: {% coupon code="SAVE20" title="20% off your first order" note="Enter this code at checkout." btn="Copy Code" %}
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var STYLE =
  '.cup-card{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;max-width:680px;margin:1.5em auto;padding:16px 20px;border:2px dashed #2e5ff7;border-radius:12px;background:#f6f9ff}' +
  '.cup-tag{display:inline-block;padding:2px 10px;border-radius:6px;background:#2e5ff7;color:#fff;font-size:.72em;font-weight:800;letter-spacing:1px;margin-bottom:6px}' +
  '.cup-title{display:block;font-size:1.05em}' +
  '.cup-note{display:block;color:#57606a;font-size:.88em;margin-top:2px}' +
  '.cup-act{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
  '.cup-code{padding:8px 14px;border:1px solid #d0d7de;border-radius:8px;background:#fff;font-size:1.05em;font-weight:800;letter-spacing:1.5px;color:#c0392b;user-select:all}' +
  '.cup-btn{padding:8px 16px;border:0;border-radius:8px;background:#1a7f37;color:#fff;font-weight:600;cursor:pointer;font-size:.92em}' +
  '.cup-btn:hover{background:#14662c}' +
  '@media (prefers-color-scheme: dark){.cup-card{background:#16233a;border-color:#5a8aff}.cup-note{color:#9aa4b1}.cup-code{background:#0d1117;border-color:#3d444d;color:#ff8a76}}' +
  '.dark .cup-card,[data-theme="dark"] .cup-card,[data-user-color-scheme="dark"] .cup-card{background:#16233a;border-color:#5a8aff}' +
  '.dark .cup-note,[data-theme="dark"] .cup-note,[data-user-color-scheme="dark"] .cup-note{color:#9aa4b1}' +
  '.dark .cup-code,[data-theme="dark"] .cup-code,[data-user-color-scheme="dark"] .cup-code{background:#0d1117;border-color:#3d444d;color:#ff8a76}';

var SCRIPT =
  '(function(){if(window.__cupBound)return;window.__cupBound=true;' +
  "document.addEventListener('click',function(e){" +
  "var btn=e.target.closest('.cup-btn');if(!btn)return;" +
  "var text=btn.getAttribute('data-cup')||'';if(!text)return;" +
  "function ok(){var o=btn.textContent;btn.textContent='Copied \\u2713';setTimeout(function(){btn.textContent=o;},1600);}" +
  'if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(ok,function(){fallback();});}else{fallback();}' +
  "function fallback(){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok();}catch(err){}ta.remove();}});})();";

hexo.extend.tag.register('coupon', function (args) {
  var o = parseArgs(args);
  var code = o.code || '';
  var title = o.title || '';
  var note = o.note || '';
  var btn = o.btn || 'Copy Code';
  var titleHtml = title ? '<strong class="cup-title">' + title + '</strong>' : '';
  var noteHtml = note ? '<span class="cup-note">' + note + '</span>' : '';
  return '<style>' + STYLE + '</style>' +
    '<div class="cup-card"><div class="cup-info">' +
    '<span class="cup-tag">COUPON</span>' + titleHtml + noteHtml +
    '</div><div class="cup-act">' +
    '<code class="cup-code">' + code + '</code>' +
    '<button class="cup-btn" type="button" data-cup="' + code + '">' + btn + '</button>' +
    '</div></div>' +
    '<scr' + 'ipt>' + SCRIPT + '</scr' + 'ipt>';
}, { ends: false });
