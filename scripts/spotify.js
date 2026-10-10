// Hexo Spotify embed tag plugin
// Usage: {% spotify type="track" id="3n3Ppam7vgaVa1iaRUc9Lp" height="152" %}
// type: track | album | playlist | episode | show
function parseArgs(args) {
  var opts = {};
  args.forEach(function (a) {
    var m = a.match(/^([^=]+)=(.*)$/);
    if (m) opts[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
  return opts;
}

hexo.extend.tag.register('spotify', function (args) {
  var o = parseArgs(args);
  var type = o.type || 'track';
  var id = o.id || '';
  var height = o.height || (type === 'track' ? '152' : '232');
  if (!id) return '<!-- spotify: missing id -->';
  return '<div class="spotify-embed" style="margin:1.5em 0;max-width:680px;">' +
    '<iframe style="border-radius:12px;border:0" ' +
    'src="https://open.spotify.com/embed/' + type + '/' + id + '?utm_source=generator" ' +
    'width="100%" height="' + height + '" frameborder="0" allowfullscreen ' +
    'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
    'loading="lazy" title="Spotify ' + type + ' player"></iframe></div>';
}, { ends: false });
