blog.onetwoone.eu.org 

Cloudflare的workers和pages搭建的免费vpn节点简单好用，但要保证速度我们必须优化CF的IP和反代CF的IP。现把内容总结如下：

1.寻找优选IP的方法：

网站直接获取法：简单、方便，但使用的人太多，可能质量较一般。
https://stock.hostmonit.com/CloudFlareYes

https://monitor.gacjie.cn/page/cloudflare/ipv4.html

http://ip.flares.cloud/

https://github.com/ymyuuu/IPDB（这个可不但有CF的IP，还有反代CF的IP）

从白嫖哥获得：https://zip.baipiao.eu.org

电报群组获得： https://t.me/cf_push

从某项目获得：https://github.com/ymyuuu/IPDB

以上两种方法是从其它大佬直接获取得到，方法简单、直接，非常适合小白朋友。

3.fofa寻找个性化的CF的IP或反代IP：
https://fofa.info/

这是一种非常好用的方法，利用它能够寻找自己想要的任何IP，方便准确。对小白也不算难。完全可以根据自己的要求，设置筛选条件，比如服务器、端口、国家、地区、城市、IP段等。

3.1筛选CF的IP或CDN例子：
~~~md
server="cloudflare" && port="443" && country="SG" && (asn="13335" || asn="209242")
~~~
> server=="cloudflare" && # 查找使用 Cloudflare 作为服务器的 IP 地址 port=="443" && # 查找开放端口 443（HTTPS）的服务器 country=="SG" && # 查找位于新加坡（SG）的服务器 (asn=="13335" || # ASN 编号为 13335 或 asn=="209242") # ASN 编号为 209242

3.2筛选反向代理CF的IP例子：
~~~md
server=="cloudflare" && port=="80" && header="Forbidden" && country=="SG" && asn!="13335" && asn!="209242" 
~~~
> 上方语法的详细说明： 
> server=="cloudflare" && # 使用 Cloudflare 作为服务器 port=="80" && # 端口号为 80（HTTP）header="Forbidden" && # 返回 HTTP 头信息中包含 "Forbidden" country=="SG" && # 位于新加坡（SG） asn!="13335" && # 排除 ASN 编号为 13335 的 IP 地址（Cloudflare 官方 IP） asn!="209242" # 排除 ASN 编号为 209242 的 IP 地址（Cloudflare 官方 IP）关于经常使用的ASN号： Cloudflare常用到的ASN号：AS13335 AS209242 Cloudflare其它ASN号：AS394536 AS14789 AS139242 AS133877	AS132892 AS395747 AS203898 AS202623 阿里云常用的：ASN45102 甲骨文主要的：ASN31898 搬瓦工常用的：ASN25820

> 注意：以上语法不是固定不变的，如country可换成city或region，相应的对象也要改变。如region=”California”，region=”Tokyo”，但不能region=”JP”。

server=="cloudflare" && port=="80" && header="Forbidden" && country=="SG" && asn=="31898" 比如添加上asn="31898",可以筛选新加坡甲骨文反代CF的服务器。

4.本地优选和测速工具

Github：https://github.com/XIU2/CloudflareSpeedTest
 这个工具自带Cloudflare官方IP库，大约有5955个CF的ip,只要一运行就会自动扫出前10个优选IP。但它没有反代IP库哈，另外它还是一个好用的测速工具。

其它可能用到的工具

IP批量查询：https://reallyfreegeoip.org/bulk
IP归属地查询：https://ipdata.co/
临时邮箱：https://temp-mail.org/；https://tempmail.plus

