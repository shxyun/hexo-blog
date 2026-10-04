---
title: 网盘分享卡片演示
date: 2026-10-04 21:00:00
tags:
  - 资源
  - 功能演示
---
本站已支持**网盘分享卡片**，带提取码一键复制。效果如下：

<style>
.netdisk-card{max-width:640px;margin:1.2em auto;padding:14px 18px;border:1px solid #d0d7de;border-radius:10px;background:linear-gradient(135deg,#f8fbff,#eef4fb);box-shadow:0 2px 8px rgba(0,0,0,.06)}
.netdisk-card .nd-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.netdisk-card .nd-badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:.85em;color:#fff}
.nd-百度{background:#2e5ff7}.nd-夸克{background:#3f6bff}.nd-阿里{background:#ff6a00}.nd-迅雷{background:#1e9fff}.nd-天翼{background:#e60012}.nd-123{background:#0aa864}.nd-UC{background:#ff7a45}
.netdisk-card .nd-title{font-size:1.05em}
.netdisk-card .nd-actions{margin-top:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.netdisk-card .nd-link{display:inline-block;padding:6px 16px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em}
.netdisk-card .nd-link:hover{background:#1d47c9}
.netdisk-card .nd-code{font-size:.92em;color:#555}
.netdisk-card .nd-codeval{padding:2px 8px;border-radius:6px;background:#fff;border:1px dashed #98a6b8;font-weight:bold;color:#c0392b;user-select:all}
.netdisk-card .nd-copy{margin-left:6px;padding:3px 12px;border:none;border-radius:6px;background:#42b983;color:#fff;cursor:pointer;font-size:.88em}
.netdisk-card .nd-copy:hover{background:#339a6c}
.dark .netdisk-card,.netdisk-card:has(+ .nd-dark){background:#2b313a;border-color:#3d4654}
@media (prefers-color-scheme: dark){.netdisk-card{background:#2b313a;border-color:#3d4654}.netdisk-card .nd-codeval{background:#1e232b;color:#ff9a76}}
</style>
<script>
(function(){
if(window.__ndCopyBound)return;window.__ndCopyBound=true;
document.addEventListener('click',function(e){
var btn=e.target.closest('.nd-copy');if(!btn)return;
var box=btn.closest('.netdisk-card');var el=box&&box.querySelector('.nd-codeval');if(!el)return;
var code=el.textContent.trim();
function ok(){btn.textContent='已复制 ✓';setTimeout(function(){btn.textContent='复制';},1500);}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(ok,function(){fallback();});}else{fallback();}
function fallback(){var ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok();}catch(err){}ta.remove();}
});
})();
</script>
<div class="netdisk-card"><div class="nd-top"><span class="nd-badge nd-百度">百度网盘</span><strong class="nd-title">示例资源合集（演示）</strong></div><div class="nd-actions"><a class="nd-link" href="https://pan.baidu.com/s/1demo" target="_blank" rel="noopener">前往下载 ↗</a><span class="nd-code">提取码 <code class="nd-codeval">abcd</code><button class="nd-copy" type="button">复制</button></span></div></div>


<style>
.netdisk-card{max-width:640px;margin:1.2em auto;padding:14px 18px;border:1px solid #d0d7de;border-radius:10px;background:linear-gradient(135deg,#f8fbff,#eef4fb);box-shadow:0 2px 8px rgba(0,0,0,.06)}
.netdisk-card .nd-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.netdisk-card .nd-badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:.85em;color:#fff}
.nd-百度{background:#2e5ff7}.nd-夸克{background:#3f6bff}.nd-阿里{background:#ff6a00}.nd-迅雷{background:#1e9fff}.nd-天翼{background:#e60012}.nd-123{background:#0aa864}.nd-UC{background:#ff7a45}
.netdisk-card .nd-title{font-size:1.05em}
.netdisk-card .nd-actions{margin-top:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.netdisk-card .nd-link{display:inline-block;padding:6px 16px;border-radius:8px;background:#2e5ff7;color:#fff!important;text-decoration:none;font-size:.92em}
.netdisk-card .nd-link:hover{background:#1d47c9}
.netdisk-card .nd-code{font-size:.92em;color:#555}
.netdisk-card .nd-codeval{padding:2px 8px;border-radius:6px;background:#fff;border:1px dashed #98a6b8;font-weight:bold;color:#c0392b;user-select:all}
.netdisk-card .nd-copy{margin-left:6px;padding:3px 12px;border:none;border-radius:6px;background:#42b983;color:#fff;cursor:pointer;font-size:.88em}
.netdisk-card .nd-copy:hover{background:#339a6c}
.dark .netdisk-card,.netdisk-card:has(+ .nd-dark){background:#2b313a;border-color:#3d4654}
@media (prefers-color-scheme: dark){.netdisk-card{background:#2b313a;border-color:#3d4654}.netdisk-card .nd-codeval{background:#1e232b;color:#ff9a76}}
</style>
<script>
(function(){
if(window.__ndCopyBound)return;window.__ndCopyBound=true;
document.addEventListener('click',function(e){
var btn=e.target.closest('.nd-copy');if(!btn)return;
var box=btn.closest('.netdisk-card');var el=box&&box.querySelector('.nd-codeval');if(!el)return;
var code=el.textContent.trim();
function ok(){btn.textContent='已复制 ✓';setTimeout(function(){btn.textContent='复制';},1500);}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(ok,function(){fallback();});}else{fallback();}
function fallback(){var ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok();}catch(err){}ta.remove();}
});
})();
</script>
<div class="netdisk-card"><div class="nd-top"><span class="nd-badge nd-夸克">夸克网盘</span><strong class="nd-title">示例工具包（演示）</strong></div><div class="nd-actions"><a class="nd-link" href="https://pan.quark.cn/s/demo123" target="_blank" rel="noopener">前往下载 ↗</a><span class="nd-code">提取码 <code class="nd-codeval">8xk9</code><button class="nd-copy" type="button">复制</button></span></div></div>
> 以上链接为演示占位，实际使用时替换为真实分享链接即可。
