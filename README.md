# MGTnote :link: https://692.cloudns.be 
### :page_facing_up: [23](https://692.cloudns.be/tag.html) 
### :speech_balloon: 1 
### :hibiscus: 97855 
### :alarm_clock: 2025-04-29 00:49:47 
---
## Gmeek

一个博客框架，超轻量级个人博客模板。完全基于`Github Pages` 、 `Github Issues` 和 `Github Actions`。不需要本地部署，从搭建到写作，只需要18秒，2步搭建好博客，第3步就是写作。

- [Demo页面](https://692.cloudns.be)
- [Gmeek快速上手](https://692.cloudns.be/post/Gmeek-kuai-su-shang-shou.html)

### 安装

1. 【创建仓库】点击[通过模板创建仓库](https://github.com/new?template_name=Gmeek-template&template_owner=fjvi)，建议仓库名称为`XXX.github.io`，其中`XXX`为你的github用户名。

2. 【启用Pages】在仓库的`Settings`中`Pages->Build and deployment->Source`下面选择`Github Actions`。

3. 【开始写作】打开一篇issue，开始写作，并且**必须**添加一个`标签Label`（至少添加一个），再保存issue后会自动创建博客内容，片刻后可通过https://XXX.github.io 访问（可进入Actions页面查看构建进度）。

4. 【手动全局生成】这个步骤只有在修改`config.json`文件或者出现奇怪问题的时候需要执行。```通过Actions->build Gmeek->Run workflow->里面的按钮全局重新生成一次```
