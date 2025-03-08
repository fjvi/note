**Awfice** 是一款世界上最小的办公套件工具，包括文本编辑、表格、绘图、幻灯片、代码编辑器、计算器，每款工具均不到 1KB，实际上都只是一行代码，纯 HTML 网页，即开即用，无任何附加功能，包括保存。@[Appinn](https://www.appinn.com/awfice/)

+   文本编辑器 
+   电子表格 
+   绘图
+   幻灯片
+   代码编辑器
+   计算器 


**在使用 Awfice 输入了内容之后，可以将其保存为本地的 HTML 文件，然后带走就行了。一个 .html 文件就是一个文本、电子表格、幻灯片。**



### 文本编辑器

一个简单的富文本编辑器。键入你想要的任何内容，它不会保存在任何地方，但它可能方便快速一次性笔记。Ctrl+B 和 Ctrl+I 将文本选择标记为**粗体或斜体**。撤消/重做也应该有效。还可以从其他来源复制/粘贴文本和图像。

复制并添加到书签或在 URL 栏中打开：

```md
data:text/html,&lt;body contenteditable style=line-height:1.5;font-size:20px
```

把上面这行放到地址栏里，回车，就能用这款文本编辑器了。

另外，在线版本：[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/edit.html)

### 电子表格

一个带有数学公式的非常基本的电子表格。它有 100 行和 26 列 （A~Z）。如果单元格中的值以“=”开头，则将其计算为公式，可以引用其他单元格值，如“=(A10+A11)/A12”。在内部下它使用了 eval() 来执行公式，所以要小心。因为它可以执行任何 JavaScript 代码，包括恶意代码。

复制并添加到书签或在 URL 栏中打开：

```md
data:text/html,&lt;table id=t&gt;&lt;script&gt;z=Object.defineProperty,p=parseFloat;for(I=[],D={},C={},q=_=&gt;I.forEach(e=&gt;{try{e.value=D[e.id]}catch(e){}}),i=0;i&lt;101;i++)for(r=t.insertRow(-1),j=0;j&lt;27;j++)c=String.fromCharCode(65+j-1),d=r.insertCell(-1),d.innerHTML=i?j?"":i:c,i*j&amp;&amp;I.push(d.appendChild((f=&gt;(f.id=c+i,f.onfocus=e=&gt;f.value=C[f.id]||"",f.onblur=e=&gt;{C[f.id]=f.value,q()},get=_=&gt;{v=C[f.id]||"";if("="!=v.charAt(0))return isNaN(p(v))?v:p(v);with(D)return eval(v.slice(1))},a={get},z(D,f.id,a),z(D,f.id.toLowerCase(),a),f))(document.createElement`input`)))&lt;/script&gt;&lt;style&gt;#t{border-collapse:collapse}td{border:1px solid gray;text-align:right}input{border:none;width:4rem;text-align:center}
```

[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/calc.html)

### 绘图应用程序

没有什么比用鼠标在空白画布上绘图更简单的了。也适用于触摸屏。要保存结果…好吧，做一个截图也许…

复制并添加到书签或在 URL 栏中打开：
```md
data:text/html,<canvas id=v><script>d=document,d.body.style.margin=0,P="onpointer",c=v.getContext`2d`,v.width=innerWidth,v.height=innerHeight,c.lineWidth=2,f=0,d[P+"down"]=e=>{f=e.pointerId+1;e.preventDefault();c.beginPath();c.moveTo(e.x,e.y)};d[P+"move"]=e=>{f==e.pointerId+1&&c.lineTo(e.x,e.y);c.stroke()},d[P+"up"]=_=>f=0</script></canvas>
```

[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/draw.html)

### 演示文稿制作器

只是带有一些快捷键的富文本编辑器的变体。有 50 张空白幻灯片供您使用（我希望你不需要用更多幻灯片让观众感到厌烦）。每张幻灯片都是一个富文本编辑器，但有一些快捷键：

+   Ctrl+Alt+1：标题
+   Ctrl+Alt+2：普通样式
+   Ctrl+Alt+3：左对齐
+   Ctrl+Alt+4：居中对齐
+   Ctrl+Alt+5：右对齐
+   Ctrl+Alt+6：缩进
+   Ctrl+Alt+7：缩进
+   Ctrl+Alt+8：制作列表

复制并添加到书签或在 URL 栏中打开：

```md
data:text/html,&lt;body&gt;&lt;script&gt;d=document;for(i=0;i&lt;50;i++)d.body.innerHTML+='&lt;div style="position:relative;width:90%;padding-top:60%;margin:5%;border:1px solid silver;page-break-after:always"&gt;&lt;div contenteditable style=outline:none;position:absolute;right:10%;bottom:10%;left:10%;top:10%;font-size:5vmin&gt;';d.querySelectorAll("div&gt;div").forEach(e=&gt;e.onkeydown=e=&gt;{n=e.ctrlKey&amp;&amp;e.altKey&amp;&amp;e.keyCode-49,f="formatBlock",j="justify",x=[f,f,j+"Left",j+"Center",j+"Right","outdent","indent","insertUnorderedList"][n],y=["&lt;h1&gt;","&lt;div&gt;"][n],x&amp;&amp;d.execCommand(x,!1,y)})&lt;/script&gt;&lt;style&gt;@page{size:6in 8in landscape}@media print{*{border:0 !important}}
```

[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/beam.html)

### 代码编辑器

一个简单的代码编辑器。你可以输入 HTML，CSS 和 Javascript。

复制并添加到书签或在 URL 栏中打开：

```md
<html>
<body>
<!--StartFragment-->
data:text/html,<body oninput="i.srcdoc=h.value+'<style>'+c.value+'</style><script>'+j.value+'</script>'"><style>textarea,iframe{width:100%;height:50%;}body{margin:0;}textarea{width: 33.33%;font-size:18px;padding:0.5em}</style><textarea placeholder="HTML" id="h"></textarea><textarea placeholder="CSS" id="c"></textarea><textarea placeholder="JS" id="j"></textarea><iframe id="i"></iframe><script>document.querySelectorAll("textarea").forEach((t)=>t.addEventListener("keydown",function(t){var e,s;"Tab"==t.key&&(t.preventDefault(),e=this.selectionStart,s=this.selectionEnd,this.value=this.value.substring(0,e)+"  "+this.value.substring(s),this.selectionStart=this.selectionEnd=e+1)}))</script></body>
```
[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/code.html)

### 计算器

一个简单的计算器，支持基本操作符号进行计算。

复制并添加到书签或在 URL 栏中打开：

```md
data:text/html,<table style="text-align: center;width:80vw;margin: 0 auto;"><tbody><tr><td colspan="4"><textarea></textarea></td></tr></tbody><script>let d=document;let tbl=d.querySelector('tbody');let z=d.querySelector('textarea');let oc=(x)=>z.value+=x;let cl=()=>z.value='';let re=()=>{try{z.value=eval(z.value);}catch(error){cl();}};[[1,2,3,'+'],[4,5,6,'-'],[7,8,9,'*'],['C',0,'=','/']].forEach((a)=>{let r=d.createElement('tr');r.style.lineHeight='64px';tbl.appendChild(r);a.forEach((b)=>{let tb=d.createElement('tb');tb.innerText=b;tb.style.padding='16px';tb.style.border='1px solid';r.appendChild(tb);tb.onclick=b==='='?re:b==='C'?cl:()=>oc(b);})})</script></table>
```

[试试吧！](https://htmlpreview.github.io/?https://github.com/zserge/awfice/blob/main/calculator.html)

## 视频

青小蛙也录了一段视频：

大概就是这样了，#[竟然还可以这样](https://www.appinn.com/tag/%E7%AB%9F%E7%84%B6%E8%BF%98%E5%8F%AF%E4%BB%A5%E8%BF%99%E6%A0%B7/)。至于用途，我也#[不知道怎么用](https://www.appinn.com/tag/%E4%B8%8D%E7%9F%A5%E9%81%93%E6%80%8E%E4%B9%88%E7%94%A8/)呀 😂

## 获取

+   [GitHub](https://github.com/zserge/awfice)

最后，提醒一下：

+   无存储，无论键入什么内容，都会在页面刷新时丢失
+   开发者说「这是一个半开玩笑的项目」，但在 GitHub 已经有 2.5k 个星星了。
+   保存的唯一方法是保存 HTML 或将其发送到打印机/打印为 PDF。[](https://github.com/zserge/awfice#text-editor---59-bytes)

* * *

原文：https://www.appinn.com/awfice/