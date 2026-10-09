// Hexo 网盘分享卡片标签插件
// 用法：{% netdisk type="百度" name="资源名" url="https://..." code="abcd" %}
// type 支持：百度 / 夸克 / 迅雷 / UC / 阿里 / 天翼 / 123
hexo.extend.tag.register('netdisk', function (args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) {
      var key = m[1].trim();
      var val = m[2].trim().replace(/^["']|["']$/g, '');
      opts[key] = val;
    }
  });
  var type = opts.type || '网盘';
  var name = opts.name || '资源分享';
  var url = opts.url || '#';
  var code = opts.code || '';
  var style = '.netdisk-card{max-width:640px;margin:1.2em auto;padding:14px 18px;border:1px solid #d0d7de;border-radius:10px;background:linear-gradient(135deg,#f8fbff,#eef4fb);box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
    '.netdisk-card .nd-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
    '.netdisk-card .nd-badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:.85em;color:#fff}' +
    '.nd-百度{background:#2e5ff7}.nd-夸克{background:#3f6bff}.nd-阿里{background:#ff6a00}.nd-迅雷{background:#1e9fff}.nd-天翼{background:#e60012}.nd-123{background:#0aa864}.nd-UC{background:#ff7a45}' +
    '.netdisk-card .nd-title{font-size:1.05em}' +
    '.netdisk-card .nd-actions{margin-top:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
    '.netdisk-card .nd-link{display:inline-block;padding:6px 16px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em}' +
    '.netdisk-card .nd-link:hover{background:#1d47c9}' +
    '.netdisk-card .nd-code{font-size:.92em;color:#555}' +
    '.netdisk-card .nd-codeval{padding:2px 8px;border-radius:6px;background:#fff;border:1px dashed #98a6b8;font-weight:bold;color:#c0392b;user-select:all}' +
    '.netdisk-card .nd-copy{margin-left:6px;padding:3px 12px;border:none;border-radius:6px;background:#42b983;color:#fff;cursor:pointer;font-size:.88em}' +
    '.netdisk-card .nd-copy:hover{background:#339a6c}' +
    '.dark .netdisk-card{background:#2b313a;border-color:#3d4654}' +
    '@media (prefers-color-scheme: dark){.netdisk-card{background:#2b313a;border-color:#3d4654}.netdisk-card .nd-codeval{background:#1e232b;color:#ff9a76}}';
  var script = '(function(){if(window.__ndCopyBound)return;window.__ndCopyBound=true;' +
    "document.addEventListener('click',function(e){var btn=e.target.closest('.nd-copy');if(!btn)return;" +
    "var box=btn.closest('.netdisk-card');var el=box&&box.querySelector('.nd-codeval');if(!el)return;" +
    'var code=el.textContent.trim();' +
    "function ok(){btn.textContent='已复制 ✓';setTimeout(function(){btn.textContent='复制';},1500);}" +
    'if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(ok,function(){fallback();});}else{fallback();}' +
    "function fallback(){var ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok();}catch(err){}ta.remove();}});})();";
  var codeHtml = code ? '<span class="nd-code">提取码 <code class="nd-codeval">' + code + '</code><button class="nd-copy" type="button">复制</button></span>' : '';
  return '<style>' + style + '</style>' +
    '<script>' + script + '</scr' + 'ipt>' +
    '<div class="netdisk-card"><div class="nd-top"><span class="nd-badge nd-' + type + '">' + type + '网盘</span><strong class="nd-title">' + name + '</strong></div>' +
    '<div class="nd-actions"><a class="nd-link" href="' + url + '" target="_blank" rel="noopener">前往下载 ↗</a>' + codeHtml + '</div></div>';
}, { ends: false });