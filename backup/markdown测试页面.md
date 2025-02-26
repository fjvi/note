markdown测试页面
============

[](https://blog.meekdai.com/ "首页")[](https://github.com/Meekdai/meekdai.github.io/issues/4 "Issue")[](https://blog.meekdai.com/post/markdown-ce-shi-ye-mian.html "切换主题")

这是一个markdown格式的测试页面，也是个人经常会使用的格式记录。

Static Badge
------------

```md
![](https://img.shields.io/badge/参考页面-orange)
```

[![](https://camo.githubusercontent.com/d807703912e2569aebe8076458386a85b94e6d197e973b1326b2084f4d51c249/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2545352538462538322545382538302538332545392541312542352545392539442541322d6f72616e6765)](https://camo.githubusercontent.com/d807703912e2569aebe8076458386a85b94e6d197e973b1326b2084f4d51c249/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2545352538462538322545382538302538332545392541312542352545392539442541322d6f72616e6765)

标题
--

```md
# H1
## H2
### H3
#### H4
```

强调
--

```md
今天的天气真好啊，可以吃**冰激凌**吗？
```

今天的天气真好啊，可以吃**冰激凌**吗？

删除横线
----

```md
今天的天气真好啊，可以吃~~冰激凌~~吗？
```

今天的天气真好啊，可以吃~冰激凌~吗？

列表
--

```md
1. 看电视
2. 吃饭
3. 睡觉

- 乒乓球
- 篮球
- 羽毛球
```

1.  看电视
2.  吃饭
3.  睡觉

*   乒乓球
*   篮球
*   羽毛球

代码高亮
----

\`\`\`python  
import request  
import time

time.sleep\_ms(1000)  
print("Hello World")  
\`\`\`

```python
import request
import time

time.sleep_ms(1000)
print("Hello World")
```

链接
--

```md
[我的博客](https://meekdai.github.io)
```

[我的博客](https://meekdai.github.io/)

图片
--

```md
![这是我的头像PNG](https://github.com/692.png)
![这是我的头像SVG](https://note.mgta.us.kg/avatar.svg)
```

[![这是我的头像PNG](https://github.com/Meekdai/meekdai.github.io/assets/11755104/e4da3470-d4b1-4cc7-9d84-f7da69f90a76)](https://github.com/Meekdai/meekdai.github.io/assets/11755104/e4da3470-d4b1-4cc7-9d84-f7da69f90a76)

[![这是我的头像SVG](https://camo.githubusercontent.com/18745789fceeb9c56af5f0a23bc9b6f81b4c882f7964ef8b0b01f8b2dc9ea815/68747470733a2f2f626c6f672e6d65656b6461692e636f6d2f6176617461722e737667)](https://camo.githubusercontent.com/18745789fceeb9c56af5f0a23bc9b6f81b4c882f7964ef8b0b01f8b2dc9ea815/68747470733a2f2f626c6f672e6d65656b6461692e636f6d2f6176617461722e737667)

表格
--

```md
| Table Heading 1 | Table Heading 2 | Center align    | Right align     | Table Heading 5 |
| :-------------- | :-------------- | :-------------: | --------------: | :-------------- |
| Item 1          | Item 2          | Item 3          | Item 4          | Item 5          |
| Item 1          | Item 2          | Item 3          | Item 4          | Item 5          |
| Item 1          | Item 2          | Item 3          | Item 4          | Item 5          |
```

| Table Heading 1 | Table Heading 2 | Center align | Right align | Table Heading 5 |
| :-- | :-- | :-: | --: | :-- |
| Item 1 | Item 2 | Item 3 | Item 4 | Item 5 |
| Item 1 | Item 2 | Item 3 | Item 4 | Item 5 |
| Item 1 | Item 2 | Item 3 | Item 4 | Item 5 |

水平线
---

```md
---
我在2个水平线中间
***
```

* * *

我在2个水平线中间

* * *

引用
--

```md
> 落霞与孤鹜齐飞，秋水共长天一色。《滕王阁序》--王勃 
```

> 落霞与孤鹜齐飞，秋水共长天一色。《滕王阁序》--王勃

对比
--

```diff
+ this text is highlighted in green
- this text is highlighted in red
```

```
\`\`\`diff
+ this text is highlighted in green
- this text is highlighted in red
\`\`\`

```

字体颜色
----

```css
Some text in green! 123
```

```
\`\`\`CSS
Some text in green! 123
\`\`\`

```

```p4
Some text in blue! 123
```

```mint
Some text in blue with additional keyword highlighting! 123
```

```
\`\`\`P4
Some text in blue! 123
\`\`\`

\`\`\`Mint
Some text in blue with additional keyword highlighting! 123
\`\`\`

```

```json
Some text highlighted in red! 123
```

```
\`\`\`JSON
Some text highlighted in red! 123
\`\`\`

```

HTML tricks
-----------

Monospaced text

```html
<samp>Monospaced text</samp>
```

* * *

Underlined text

```html
<ins>Underlined text</ins>
```

* * *

<table role="table"><tbody><tr><td>Boxed text</td></tr></tbody></table>

```html
<table><tr><td>Boxed text</td></tr></table>
```

* * *

Item summary with dropdown

Dropdown content (supports **markdown** ~yay!~)

```json
{
  awesome: "true"
}
```

```
<details>
<summary>Item summary with dropdown</summary>

Dropdown content (supports \*\*markdown\*\* ~~yay!~~)

\`\`\`json
{
  awesome: "true"
}
\`\`\`
</details>

```

* * *

**_Italic-bold_**

```
__*Italic-bold*__

```

* * *

SuperscriptTM

```
Superscript<sup>TM</sup>

```

* * *

Superscript-italic_tm_

```
Superscript-italic<sup>*tm*</sup>

```

* * *

Subscriptx

```
Subscript<sub>x</sub>

```

* * *

Subscript-bold**min**

```
Subscript-bold<sub>**min**</sub>

```

* * *

~**_Italic-bold-strikethrough_**~

```
~~__*Italic-bold-strikethrough*__~~

```

参考
--

更多GitHub Markdown 语法参考：

1.  [https://github.com/Olwiba/Kickass-markdown/](https://github.com/Olwiba/Kickass-markdown/)
2.  [https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

❤️ 转载文章请注明出处，谢谢！❤️