## 用到的工具
CDN优选工具：[https://bulianglin.com/archives/cdn.html](https://bulianglin.com/archives/cdn.html)  
节点测速工具：[https://github.com/bulianglin/demo](https://bulianglin.com/g/aHR0cHM6Ly9naXRodWIuY29tL2J1bGlhbmdsaW4vZGVtbw)  
搜索引擎：[https://fofa.info](https://bulianglin.com/g/aHR0cHM6Ly9mb2ZhLmluZm8)  
临时邮箱：[http://24mail.chacuo.net](https://bulianglin.com/g/aHR0cDovLzI0bWFpbC5jaGFjdW8ubmV0)

## 节点搭建
首先，你需要搭建一个vless+ws+tls的节点，并将域名托管到CF。节点搭建好后，我们来到CF的配置页面，找到DNS记录选项，启用DNS代理，小云朵变成橙色则表示我们正在使用CF的CDN服务，这时可以ping我们的域名，当IP地址从原始IP变更为CF 的IP时，则表示已经成功启动CF的CDN服务了。
![](https://i0.hdslb.com/bfs/article/99ec5fb8182dca03edc2214d8105bdf9ff930637.png@1192w.webp)
启用CF CDN服务
接着，我们在SSL/TLS设置页面，将加密模式改成灵活或者完全。
![](https://i0.hdslb.com/bfs/article/6be4a99dbd0b867359952a59c52c2ae06022e5d4.png@1192w.webp)
修改加密模式
最后我们在客户端试一下真连接，输入解析好的域名，端口改成443，如果配置没问题，此时是可以跑通的。
![](https://i0.hdslb.com/bfs/article/a7706617498060bb32ec8d6509e81f03b00457a9.png@1192w_1192h.webp)

测试
此时我们已经拥有了一个vless+ws+tls+cdn节点，当然，此时的速度非常感人，因为使用的是CF默认分配的IP，没有经过优选。不过对于电信用户来讲再怎么优选都很差劲，并且这么多人都盯着CF家的IP进行优选，速度也是极其不稳定。

**不存在的IP**

##  获取CF反代IP
用到的工具是fofa，网址：https://fofa.info，注册需要邮箱，免费用户有2000多个导出额度，可以使用临时邮箱多次注册来重复导出。fofa 的详细语法规则可以通过页面的查询语法获取，这里提供几条fofa的搜索语法供参考，可以按需自行修改。

国内反代IP：
```md 
server==&#34;cloudflare&#34; &amp;&amp; port==&#34;80&#34; &amp;&amp; header=&#34;Forbidden&#34; &amp;&amp; country==&#34;CN&#34; asn!=&#34;13335&#34; &amp;&amp; asn!=&#34;209242&#34; 
``` 
国内CF-IP：
```md 
server==&#34;cloudflare&#34; &amp;&amp; port==&#34;80&#34; &amp;&amp; header=&#34;Forbidden&#34; &amp;&amp; country==&#34;CN&#34; asn!=&#34;13335&#34; &amp;&amp; asn!=&#34;209242&#34; 
``` 
香港反代IP：
```md
server=="cloudflare" && port=="443" && header="Forbidden" && region=="HK" && asn!="13335" && asn!="209242" && asn!="396982" && asn!="132892" && asn!="202623"
```
阿里云：
```md
server==&#34;cloudflare&#34; &amp;&amp; asn==&#34;45102&#34; 
```
甲骨文韩国：
```md
server==&#34;cloudflare&#34; &amp;&amp; asn==&#34;31898&#34; &amp;&amp; country==&#34;KR&#34;
```
 搬瓦工：
```md
server==&#34;cloudflare&#34; &amp;&amp; asn==&#34;25820&#34;
```

以这条语法举例：

server==&[#34;cloudflare&#](https://search.bilibili.com/all?keyword=34%3Bcloudflare%26)34; &amp;&amp; port==&[#34;80&#](https://search.bilibili.com/all?keyword=34%3B80%26)34; &amp;&amp; header=&[#34;Forbidden&#](https://search.bilibili.com/all?keyword=34%3BForbidden%26)34; &amp;&amp; country==&[#34;CN&#](https://search.bilibili.com/all?keyword=34%3BCN%26)34;

这条规则的意思是搜索服务器为CF、端口为80、HTTP头部信息包含forbidden、地区为中国的IP，可以任意修改组合搜索语句来寻找需要的IP，不用整天盯着CF自家的IP区优选了。

接着使用这条语法进行搜索，可以看到有2000多个独立ip。

![](https://i0.hdslb.com/bfs/article/005bf9bb7a978d646372eba7b80dd8235664040b.png@1192w.webp)

搜索结果

随便复制一个ip在浏览器打开，若提示1003错误，则很有可能是反代了CF的ip。

![](https://i0.hdslb.com/bfs/article/006005805266190547bb5e162a0952ade93300ec.png@1192w.webp)

测试是否反代了CF

下载搜索到的ip，用excel打开，这时先到客户端复制一下节点链接，如果是ip+域名的形式，可以直接复制，否则需要做一些调整，如图所示。

![](https://i0.hdslb.com/bfs/article/b8b1256d5431a011c89aa76362cd6b5672079fe0.png@1192w_1192h.webp)

复制节点链接

![](https://i0.hdslb.com/bfs/article/d3513e72c210fefc80ef4b1937eddd72ca91dd53.png@1072w_430h.webp)

复制节点链接

接着来到excel，提取下载的fofa数据，只需要ip即可，将ip做一下去重并单独提取出来，把刚刚复制出来的节点信息粘贴到另一列，使用获取到的ip将右边我们复制的节点链接内的ip替换掉，注意只需要替换ip即可，其他任何数据都不要修改，否则节点链接会无法使用，这里可以使用excel的选择性粘贴进行批量修改，具体操作方法可自行搜索。

![](https://i0.hdslb.com/bfs/article/67caf77a91da908671791e190b73187ca1e5e6ab.png@1192w.webp)

将ip替换到节点链接内

将ip全部替换完成后，需要用到一个测速工具，注意不要下错了。

文件名：nodesCatch-V2.0.rar

下载地址：https://github.com/bulianglin/demo

下载完成后打开测速工具，将修改后的节点链接全部复制进去。

![](https://i0.hdslb.com/bfs/article/6b55bf7deefaa87a8c1f8cec5986733a7245b41f.png@1192w.webp)

测速工具

把内核修改为xray，全选节点，先测一下连接速度，去除无效节点，接着再测下载速度，将速度合适的节点复制到客户端，此时就获得了一大批可用的反代CF IP，并且这些ip并不存在于CF官方的ip列表内。

此方法可以一个节点用出1000个节点的效果，并且可以根据自己需求在全球范围内搜索到优质的节点，有些甚至是专线，至于他们为什么要反代CF，应该是有些业务必须这么操作，但却不知道这样会被别人利用，没有做好相应的限制，总之此方法的可玩性很高，只要你的脑洞够大，完全可以尽情探索。

全文完。