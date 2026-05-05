[来源：知乎](https://zhuanlan.zhihu.com/p/22244797092#circle=on)
首先安装Aria2 Explorer（仅适用于Edge、Chrome等Chromium内核浏览器），然后去下载作者打包的Aria2 Manager。

![](https://pic3.zhimg.com/v2-8baab8569ba69632367cc6e28e5a345a_1440w.jpg)

image-20241222172033528

Github中讲的比较复杂，其实我们直接下载**Release**中的**Aria2Manager-Full**压缩包即可。（微软商店的增强版并没有增加太多新功能，但是要37块钱……）

下载后把文件解压到固定位置，如**D:\\Aria2Manager**，共4个文件。

![](https://pic1.zhimg.com/v2-1abd7ba9a0ed869147dd459a77428128_1440w.jpg)

image-20241222172407434

其中**aria2c**是下载器本体，**Aria2Manager**是辅助软件，增加了一键注册、开机静默启动等功能。**aria2.session**是下载器进度保存文件，**aria2.conf**是配置文件，**Aria2**启动后会从这里读取下载参数和配置。

我们首先双击启动**Aria2Manager**，此时图标会显示在任务栏托盘。右键**Aria2Manager**图标，点击注册，注册成功后再次右键打开开机启动。

进入浏览器打开**Aria2Manager**的扩展选项，在这里可以配置下载参数、下载位置等。建议打开**自动下载前询问参数设置**和**AriaNG打开方式——新标签页**，可以获得完美下载体验。

![](https://pica.zhimg.com/v2-701b7062fdfe8359200091549d836340_1440w.jpg)

image-20241222174934088

点击保存，然后打开**Aria2Manager**扩展，此时会弹出**Aria2已连接**的提示，说明可以开始下载。

![](https://pic4.zhimg.com/v2-0b6878145ac02fbe4bbe876fd5411e53_1440w.jpg)

image-20241222175157056

随便点击下载一个文件，点击后首先会在新标签页弹出链接。

![](https://pic4.zhimg.com/v2-c74aeb85adef136862c70a68bcfad5a1_1440w.jpg)

image-20241222175421855

链接会被识别成文件，并给出一系列文件下载配置（仅限此文件）。

![](https://pic1.zhimg.com/v2-11c6e935a2491e18d99dcb3c4f963d14_1440w.jpg)

image-20241222175521217

点击**立即下载**即可跳转到下载界面，此时已经跑满带宽。

![](https://pica.zhimg.com/v2-4a6bad72cfd8f13e7aecc1917dc8a40c_1440w.jpg)

image-20241222175629505

实际上，下载线程、BT支持、删除下载信息文件、断点续传等参数都需要**CONF**文件配置。

我们用记事本打开**aria2.conf**文件，开发者已经预置了部分参数，理论上不需要更改。

![](https://pic2.zhimg.com/v2-e1f0f97a4513d179f89850fd8f1c6373_1440w.jpg)

image-20241222173324460

然而这些参数其中部分没有解释，还有一部分已经不太符合当下的电脑配置（更大的内存、固态硬盘、较高的CPU性能等），如**文件预分配方式**，这是一项为了减少机械硬盘碎片的技术，但如今固态硬盘已经普及，无需文件预分配，这份**CONF**文件中的**trunc**会导致双倍写入，浪费性能且磨损硬盘。

笔者结合p3terx大佬的**Aria2完美配置**，对两份文件进行了整合，删去了多余选项，对某些已经过时的参数进行了修改，最终整理出一份更加适合**Aria2 Explorer**的配置文件。使用时可以直接用来替换解压出来的**CONF**文件（记得打开文件把下载位置修改一下）。

此外，虽然**Aria2**会读取配置，但有一部分配置是属于扩展的，建议打开**常规设置——[RPC](https://zhida.zhihu.com/search?content_id=253471201&content_type=Article&match_order=1&q=RPC&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NzgxODU5MjQsInEiOiJSUEMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNTM0NzEyMDEsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.pXeRt5Wkx38nghLhxtE4aTtzM0eHEELX8HwkM9PXLnQ&zhida_source=entity)**进行如下修改：

![](https://pic3.zhimg.com/v2-294adf06b1a5788be553fd2e613e2130_1440w.jpg)

image-20241222181244359

**优化配置文件如下所示：**

```text
##================Aria2 Explorer 优化配置================##

# 作者：Alex Hua
# 主页：https://www.aria2e.com

# 作者：P3TERX
# 主页：https://p3terx.com

# 整合：太极
# 主页：https://www.zhihu.com/people/Drivind

# MIT License

##================文件保存设置================##

# 下载目录【默认: 当前启动位置】
# 可使用绝对路径或相对路径
dir=F:\

# 磁盘缓存【默认：16M】
# 将文件临时下载到内存，集中写入硬盘，减少硬盘I/O，延长寿命
# 内存足够时可适当增加，0为禁用缓存
disk-cache=256M

# 文件预分配方式【默认：prealloc】
# 可选：none, prealloc, trunc, falloc
# 预分配对于机械硬盘可有效降低磁盘碎片、提升磁盘读写性能、延长磁盘寿命
# 固态硬盘不需要预分配，请设置为none，否则可能导致双倍数据写入
# 机械硬盘建议 falloc，但需要Aria2以管理员身份运行
# 若提示fallocate failed.cause：Operation not supported说明不支持，请设置为none
# prealloc遇到大文件时会导致性能问题，Aria2在下载大文件时会假死一段时间
# trunc不能减少磁盘碎片产生
file-allocation=none

# 文件预分配大小限制【默认：5M】
# 小于此选项值大小的文件不预分配空间
no-file-allocation-limit=64M

# 断点续传
# 目前只支持HTTP(S)/FTP下载的文件
continue=true

# 始终尝试断点续传，无法断点续传则终止下载【默认：true】
always-resume=false

# 不支持断点续传的 URI 数值，当 always-resume=false 时生效
# 达到这个数值从将头开始下载，值为 0 时所有 URI 不支持断点续传时才从头开始下载
max-resume-failure-tries=0

# 获取服务器文件时间【默认：false】
remote-time=true


##================进度保存设置================##

# 从会话文件中读取下载任务
input-file=aria2.session

# 会话文件保存路径
# Aria2 退出时或指定的时间间隔会保存`错误/未完成`的下载任务到会话文件
save-session=aria2.session

# 任务状态改变后保存会话的间隔时间（秒）【默认：0】
# 0 为仅在进程正常退出时保存
# 为了及时保存任务状态、防止任务丢失，此项值只建议设置为 1
save-session-interval=1

# 自动保存任务进度到控制文件(*.aria2)的间隔时间（秒）【默认：60】
# 0 为仅在进程正常退出时保存
# 此项值也会间接影响从内存中把缓存的数据写入磁盘的频率
# 想降低磁盘 IOPS (每秒读写次数)则提高间隔时间
# 想在意外非正常退出时尽量保存更多的下载进度则降低间隔时间
# 非正常退出：进程崩溃、系统崩溃、SIGKILL 信号、设备断电等
auto-save-interval=20

# 强制保存，即使任务已完成也保存信息到会话文件【默认：false】
# 开启后会在任务完成后保留 .aria2 文件，文件被移除且任务存在的情况下重启后会重新下载
# 关闭后已完成的任务列表会在重启后清空
# force-save=false

##================下载连接设置================##

# 文件未找到重试次数【默认：0】
# 重试时同时会记录重试次数，所以也需要设置 max-tries 这个选项
max-file-not-found=4

# 最大尝试次数【默认：5】
# 0 表示无限
max-tries=16

# 重试等待时间（秒）【默认：0】
# 0 为禁用
retry-wait=8

# 连接超时时间（秒）【默认：60】
connect-timeout=16

# 超时时间（秒）【默认：60】
timeout=16

# 最大同时下载任务数【默认:5】
max-concurrent-downloads=16

# 单服务器最大连接线程数【默认：1】
# 最大值为 16 ,且受限于单任务最大连接线程数(split)所设定的值。
max-connection-per-server=16

# 单任务最大连接线程数【默认：5】
split=16

# 文件最小分段大小【默认：20M】
# 取值范围 1M-1024M
# 比如此项值为 10M, 当文件为 20MB 会分成两段并使用两个来源下载, 文件为 15MB 则只使用一个来源下载
# 理论上值越小使用下载分段就越多，所能获得的实际线程数就越大，下载速度就越快，但受限于所下载文件服务器的策略
min-split-size=4M

# HTTP/FTP 下载分片大小【默认：1M】
# 所有分割都必须是此项值的倍数，最小值为 1M
# piece-length=1M

# 允许分片大小变化【默认：false】
# false：当分片大小与控制文件中的不同时将会中止下载
# true：丢失部分下载进度继续下载
allow-piece-length-change=true

# 最低下载速度限制【默认：0】
# 0 为不限制
# 当下载速度低于或等于此选项的值时关闭连接
# 此选项与 BT 下载无关
# lowest-speed-limit=0

# 全局最大下载速度限制【默认：0】
# 0 为不限制
# max-overall-download-limit=0

# 单任务下载速度限制【默认：0】
# 0 为不限制
# max-download-limit=0

# 禁用 IPv6【默认：false】
# disable-ipv6=false

# GZip 支持【默认：false】
http-accept-gzip=true

# URI 复用【默认：true】
reuse-uri=false

# 禁用 netrc 支持【默认：false】
no-netrc=true

# 允许覆盖【默认：false】
# 当相关控制文件(.aria2)不存在时从头开始重新下载
# allow-overwrite=false

# 文件自动重命名【默认：true】
# 仅 HTTP(S)/FTP 下载中有效
# 新文件名在名称之后扩展名之前加上一个点和一个数字（1..9999）
# auto-file-renaming=true

# 使用 UTF-8 处理 Content-Disposition【默认：false】
content-disposition-default-utf8=true

# 最低 TLS 版本【默认:TLSv1.2】
# 可选：TLSv1.1、TLSv1.2、TLSv1.3 
# min-tls-version=TLSv1.2

##================BT/PT下载设置================##

# BT 监听端口(TCP)【默认：6881-6999】
# 直通外网的设备，比如 VPS ，务必配置防火墙和安全组策略允许此端口入站
# 内网环境的设备，比如 NAS ，除了防火墙设置，还需在路由器设置外网端口转发到此端口
# listen-port=51413

# DHT 网络与 UDP tracker 监听端口(UDP)【默认：6881-6999】
# 因协议不同，可以与 BT 监听端口使用相同的端口，方便配置防火墙和端口转发策略
# dht-listen-port=51413

# 启用 IPv4 DHT 功能【默认：true】
# PT 下载(私有种子)会自动禁用
# enable-dht=true

# 启用 IPv6 DHT 功能【默认：false】
# PT 下载(私有种子)会自动禁用
# 在没有 IPv6 支持的环境开启可能会导致 DHT 功能异常
enable-dht6=true

# 指定 BT 和 DHT 网络中的 IP 地址
# bt-external-ip=

# IPv4 DHT 文件路径【默认：$HOME/.aria2/dht.dat】
dht-file-path=dht.dat

# IPv6 DHT 文件路径【默认：$HOME/.aria2/dht6.dat】
dht-file-path6=dht6.dat

# IPv4 DHT 网络引导节点
# dht-entry-point=dht.transmissionbt.com:6881

# IPv6 DHT 网络引导节点
# dht-entry-point6=dht.transmissionbt.com:6881

# 本地节点发现【默认：false】
# PT 下载(私有种子)会自动禁用
bt-enable-lpd=true

# 指定用于本地节点发现的接口
# 可能的值：接口，IP地址
# 如果未指定此选项，则选择默认接口
# bt-lpd-interface=

# 启用节点交换【默认：true】
# PT 下载(私有种子)会自动禁用
# enable-peer-exchange=true

# 单任务 BT 下载最大连接数【默认：55】
# 0 为不限制
# 理想情况下连接数越多下载越快，但在实际情况是只有少部分连接到的做种者上传速度快，其余的上传慢或者不上传
# 如果不限制，当下载非常热门的种子或任务数非常多时可能会因连接数过多导致进程崩溃或网络阻塞
bt-max-peers=128

# 单任务 BT 下载期望速度值【默认：50K】
# BT 下载速度低于此选项值时会临时提高连接数来获得更快的下载速度，不过前提是有更多的做种者可供连接。
# 实测临时提高连接数没有上限，但不会像不做限制一样无限增加，会根据算法进行合理的动态调节。
bt-request-peer-speed-limit=16M

# 全局最大上传速度限制【默认：0】
# 0 为不限制
# 设置过低可能影响 BT 下载速度
# max-overall-upload-limit=0

# 单任务上传速度限制【默认：0】
# 0 为不限制
# max-upload-limit=0

# 最小分享率【默认：1.0】
# 当种子的分享率达到此选项设置的值时停止做种
seed-ratio=4.0

# 最小做种时间（分钟）
# 设置为 0 时将在 BT 任务下载完成后停止做种
seed-time=60

# 做种前检查文件哈希【默认：true】
# bt-hash-check-seed=true

# 继续BT任务时无需再次校验【默认：false】
# bt-seed-unverified=false

# BT tracker 服务器连接超时时间（秒）【默认：60】
# 建立连接后，此选项无效，将使用 bt-tracker-timeout 选项的值
bt-tracker-connect-timeout=16

# BT tracker 服务器超时时间（秒）【默认：60】
bt-tracker-timeout=16

# BT 服务器连接间隔时间（秒）【默认：0 (自动)】
# bt-tracker-interval=0

# BT 下载优先下载文件开头或结尾
bt-prioritize-piece=head=32M,tail=32M

# 保存通过 WebUI(RPC) 上传的种子文件(.torrent)【默认：true】
# 所有涉及种子文件保存的选项都建议开启，不保存种子文件有任务丢失的风险
# 通过 RPC 自定义临时下载目录可能不会保存种子文件
# rpc-save-upload-metadata=true

# 下载种子文件(.torrent)自动开始下载【默认:true】
# true：保存种子文件
# false：仅下载种子文件
# mem：将种子保存在内存中
# follow-torrent=true

# 种子文件下载完后暂停任务【默认：false】
# 在开启 follow-torrent 选项后下载种子文件或磁力会自动开始下载任务进行下载，而同时开启当此选项后会建立相关任务并暂停
# pause-metadata=false

# 保存磁力链接元数据为种子文件(.torrent)【默认：false】
bt-save-metadata=true

# 加载已保存的元数据文件(.torrent)【默认：false】
bt-load-saved-metadata=true

# 删除 BT 下载任务中未选择文件【默认：false】
bt-remove-unselected-file=true

# BT强制加密【默认：false】
# 启用后将拒绝旧的 BT 握手协议并仅使用混淆握手及加密, 可以解决部分运营商对 BT 下载的封锁, 且有一定的防版权投诉与迅雷吸血效果
# 此选项相当于后面两个选项,  但不会修改这两个选项的值
bt-force-encryption=true

# BT加密需求【默认：false】
# 启用后拒绝与旧的 BitTorrent 握手协议(\19BitTorrent protocol)建立连接，始终使用混淆处理握手
# bt-require-crypto=true

# BT最低加密等级【默认：plain】
# 可选：plain（明文）/arc4（加密）
# bt-min-crypto-level=arc4

# 分离仅做种任务【默认：false】
# 从正在下载的任务中排除已经下载完成且正在做种的任务，并开始等待列表中的下一个任务
bt-detach-seed-only=true

##================客户端伪装================##

# 自定义 UA
# user-agent=

# BT 客户端伪装
# PT 下载需要保持 user-agent 和 peer-agent 两个参数一致
# 部分 PT 站对 Aria2 有特殊封禁机制，客户端伪装不一定有效，且有封禁账号的风险
#user-agent=Deluge 1.3.15
peer-agent=Deluge 1.3.15
peer-id-prefix=-DE13F0-

##================RPC设置================##

# 启用 JSON-RPC/XML-RPC 服务器【默认：false】
enable-rpc=true

# 接受所有远程请求【默认：false】
rpc-allow-origin-all=true

# 允许外部访问【默认：false】
rpc-listen-all=true

# RPC 监听端口【默认：6800】
# rpc-listen-port=6800

# RPC 密钥
# rpc-secret=

# RPC 最大请求大小
rpc-max-request-size=10M

# RPC 服务 SSL/TLS 加密, 默认：false
# 启用加密后必须使用 https 或者 wss 协议连接
# 不推荐开启，建议使用 web server 反向代理，比如 Nginx、Caddy ，灵活性更强
# rpc-secure=false

# 在 RPC 服务中启用 SSL/TLS 加密时的证书文件(.pem/.crt)
# rpc-certificate=/root/.aria2/xxx.pem

# 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件(.key)
# rpc-private-key=/root/.aria2/xxx.key

# 事件轮询方式【不同系统默认值不同】
# 可选：epoll, kqueue, port, poll, select
# event-poll=select

##================高级选项================##

# 启用异步 DNS 功能【默认：true】
# async-dns=true

# 指定异步 DNS 服务器列表
# 未指定则从 /etc/resolv.conf 中读取
# async-dns-server=119.29.29.29,223.5.5.5,8.8.8.8,1.1.1.1

# 指定单个网络接口，可能的值：接口，IP地址，主机名
# 如果接口具有多个 IP 地址，则建议指定 IP 地址。
# 已知指定网络接口会影响依赖本地 RPC 的连接的功能场景，即通过 localhost 和 127.0.0.1 无法与 Aria2 服务端进行讯通
# interface=

# 指定多个网络接口
# 多个值之间使用逗号(,)分隔
# 使用 interface 选项时会忽略此项
# multiple-interface=

##================日志设置================##

# 日志文件保存路径【默认：不保存】
# log=

# 日志级别【默认：debug】
# 可选 debug, info, notice, warn, error
# log-level=debug

# 控制台日志级别【默认：notice】
# 可选 debug, info, notice, warn, error
# console-log-level=notice

# 安静模式【默认：false】
# 禁止在控制台输出日志
# quiet=false

# 下载进度摘要输出间隔时间（秒）【默认：60】
# 0 为禁止输出
summary-interval=0

# 关闭控制台进度条输出，避免日志里面打印大量空行
show-console-readout=false

##================BitTorrent trackers================##

bt-tracker=udp://tracker.opentrackr.org:1337/announce,udp://open.tracker.cl:1337/announce,udp://9.rarbg.com:2810/announce,udp://opentracker.i2p.rocks:6969/announce,https://opentracker.i2p.rocks:443/announce,udp://tracker.openbittorrent.com:6969/announce,http://tracker.openbittorrent.com:80/announce,udp://www.torrent.eu.org:451/announce,udp://tracker.torrent.eu.org:451/announce,udp://open.stealth.si:80/announce,udp://ipv4.tracker.harry.lu:80/announce,udp://exodus.desync.com:6969/announce,udp://tracker.tiny-vps.com:6969/announce,udp://tracker.moeking.me:6969/announce,udp://tracker.dler.org:6969/announce,udp://explodie.org:6969/announce,udp://bt.oiyo.tk:6969/announce,https://tracker.nanoha.org:443/announce,https://tracker.lilithraws.org:443/announce,https://tracker.baka.ink:443/announce
```

## 相关网站
[Aria2 Explorer - Microsoft Edge Addons](https://apps.microsoft.com/detail/9p5wq68q20wv?hl=zh-CN)

[Aria2Manager](https://github.com/alexhua/Aria2-Manager/)

[Aria2 完美配置](https://p3terx.github.io/aria2.conf/)
