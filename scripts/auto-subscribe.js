// Hexo 自动在文章末尾注入 Buttondown 订阅块
// 通过 front matter 的 disable_subscribe: true 可关闭单篇
hexo.extend.filter.register('before_post_render', function (data) {
  // 只处理文章(post),跳过页面(about 等)
  if (data.layout !== 'post') return data;
  // 用户在 front matter 设置 disable_subscribe: true 则跳过
  if (data.disable_subscribe) return data;
  // 已手动写过 subscribe 标签则不重复追加
  if (data.content && data.content.indexOf('{% subscribe') !== -1) return data;
  // 根据文章语言选文案(zh-cn 用中文,其余用英文)
  var tag;
  if (data.lang === 'zh-cn' || data.lang === 'zh-CN' || data.lang === 'zh') {
    tag = '\n\n{% subscribe title="订阅更新" desc="新文章直接发到你的邮箱。无垃圾邮件,随时可退订。" ph="你的邮箱地址" btn="订阅" %}\n';
  } else {
    tag = '\n\n{% subscribe %}\n';
  }
  data.content = (data.content || '') + tag;
  return data;
});
