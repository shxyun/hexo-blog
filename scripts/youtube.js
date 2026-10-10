// Hexo YouTube 嵌入标签插件
// 用法：{% youtube id="dQw4w9WgXcQ" title="标题" %}
//   或：{% youtube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}
hexo.extend.tag.register('youtube', function (args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) {
      opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  });
  var id = opts.id || '';
  var url = opts.url || '';
  if (!id && url) {
    var m = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    if (m) id = m[1];
  }
  var title = opts.title || 'YouTube Video';
  if (!id) return '<!-- youtube: missing id or url -->';
  return '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5em 0;max-width:720px;">' +
    '<iframe src="https://www.youtube.com/embed/' + id + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen title="' + title + '"></iframe>' +
    '</div>';
}, { ends: false });
