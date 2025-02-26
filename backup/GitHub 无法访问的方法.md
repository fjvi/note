# 方法一：修改 Hosts 文件
Hosts路径： 
```md
C:\Windows\System32\drivers\etc\hosts
```
```md
140.82.113.3 github.com
140.82.114.4 gist.github.com
185.199.108.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.185.194 gist.githubusercontent.com
```

# 方法二：DNS 解析
使用一些公共的 DNS 服务，如 Google 的 8.8.8.8。
刷新 DNS 缓存： 执行命令刷新 DNS 缓存，确保新的 DNS 设置生效。
在 Windows 上，打开命令提示符，运行：
```md
ipconfig /flushdns
```
重新访问 GitHub： 重新尝试访问 GitHub，看看是否已经可以正常访问了。

>示例：使用 curl 命令通过指定 DNS 服务器访问 GitHub:
```md
curl --dns-servers 8.8.8.8 https://github.com
```
# 方法三：GitHub 官方镜像
GitHub 官方提供了一些镜像站点，这些站点是在全球范围内分布的，可以帮助用户更快速地访问 GitHub。你可以通过替换 GitHub 地址中的 github.com 部分来访问镜像站点，如 github.com.cnpmjs.org。

# 示例：使用 curl 命令通过 GitHub 镜像站点访问 GitHub：
```md
curl https://github.com.cnpmjs.org
```