# A Day English

每日社交英语：先听，再读，最后说。保留听力、精听、阅读、词汇与短语、语法、口语与快速回应、复习七个模块。

网站：https://xiaozhangzzza-afk.github.io/a-day-english/

## 更新课程

每天北京时间 08:00 的云端学习任务生成新课程，将完整 JSON 保存到 `lessons/YYYY-MM-DD.json`。GitHub Actions 在提交后自动构建并部署网页，保留所有历史日期。

课程格式：`date,title,subtitle,minutes,level,audio{url,title,source,note},sections[{id,title,body,questions?,translation?,answers?}]`。七个 id 依次为 `listen,sound,read,words,grammar,speak,review`。题目为字符串数组，正文、译文和答案为字符串。不要将个人笔记、凭证或私人信息写入课程。

## 本地构建

安装 Node.js 后运行 `node scripts/build.mjs`，生成 `_site/`。

课程公开；勾选与个人笔记仅保存在访问者自己的浏览器。音频入口链接到原始教学来源，不复制第三方完整转录。
