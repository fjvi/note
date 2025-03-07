我平时可能经常需要**查一下当前网站的 IP 地址及归属地**，为了方便我自己写了个简短的脚本放在书签中。

> 比如有时候发现某网站慢的要死，我就会看看是不是用的 Cloudflare CDN，是的话就加到 Hosts 文件中。

平时大家如果要查当前网站的 IP 归属地还需要去专门的查询网站，二我今天闲的没事就分享下该书签，指不定有人会需要呢~

* * *

## \# 查当前网站 IP 归属地「书签」

**新建书签**，**网址**写下面这段脚本代码（书签名随意），**保存即可**。

```js
javascript:(function(){window.open("https://ip.mcr.moe/?ip=" + location.hostname,'target','');})()
```

这样你在任意网页下**点击该书签**，即可显示该网站 IP 归属地。

例如在 Github 任意网页下点击大概显示如下：

```
{
    "status": 200,
    "message": "OK",
    "addr": "52.74.223.119",        # IP
    "country": "新加坡",            # 国家
    "area": " Singapore",           # 地区
    "provider": "Amazon数据中心"   # 提供者，如果该网站用的是 Cloudflare CDN 则这里也会写 Cloudflare 的
}
```

* * *

这其实就是一个查询 IP 归属地的 API，点击这个书签就是把当前网站的域名加到 API 地址末尾并访问罢了。

* * *

## \# 查当前网站是不是 Cloudflare CDN「书签」

**新建书签**，**网址**写下面这段脚本代码（书签名随意），**保存即可**。

```js
javascript:(function(){window.open(location.origin + "/cdn-cgi/trace",'target','');})()
```

这样你在任意网页下**点击该书签**，就会打开 `域名/cdn-cgi/trace` 这个地址，如果能访问就代表用的是 Cloudflare CDN。

例如在 Cloudflare 官网任意网页下点击大概显示如下：

```
fl=100f16
h=www.cloudflare.com
ip=XXX.XXX.XXX.XXX           # 你的 IP
ts=1613267817.838
visit_scheme=https
uag=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
colo=MUC                    # 当前 CDN 节点物理地址，这是当地机场缩写，可以去搜索 "MUC 机场" 关键词获得具体位置
http=http/2
loc=CN                      # 你所处位置
tls=TLSv1.3
sni=plaintext
warp=off
gateway=off
```

* * *

这其实就是利用任何使用 Cloudflare CDN 节点的网站（包括 CDN IP 本身）都能在后面加上 `/cdn-cgi/trace` 访问获取当前节点信息。
https://github.com/XIU2/CloudflareSpeedTest/discussions/66