// Hexo local video / audio tag plugin
// Usage:
//   {% video src="/media/demo.mp4" poster="/media/demo.jpg" %}
//   Audio (mp3/wav/ogg/m4a/aac/flac) renders an <audio> player automatically:
//   {% video src="/media/demo.mp3" %}
// Note: the NexT theme ships a positional {% video %} tag. Hexo loads theme and
// site scripts concurrently, so we re-register on before_generate to make sure
// this key/value version always wins.
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

var AUDIO_EXTS = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'];

function videoTag(args) {
  var o = parseArgs(args);
  var src = o.src || '';
  var poster = o.poster || '';
  var ext = (src.split('.').pop() || '').toLowerCase().split(/[?#]/)[0];
  if (!src) return '<!-- video: missing src -->';
  if (AUDIO_EXTS.indexOf(ext) !== -1) {
    return '<audio controls preload="metadata" src="' + src + '" style="width:100%;max-width:680px;display:block;margin:1.5em auto"></audio>';
  }
  var posterAttr = poster ? ' poster="' + poster + '"' : '';
  return '<video controls preload="metadata"' + posterAttr + ' src="' + src + '" ' +
    'style="width:100%;max-width:680px;display:block;margin:1.5em auto;border-radius:12px;overflow:hidden"></video>';
}

function registerVideoTag() {
  hexo.extend.tag.register('video', videoTag, { ends: false, override: true });
}

registerVideoTag();
hexo.extend.filter.register('before_generate', registerVideoTag, 1);
