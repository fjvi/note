# Markdown语法总览
[original](https://mgt.xx.kg/post/Markdown-yu-fa-zong-lan.html)

## markdown测试页面

这是一个markdown格式的测试页面，也是个人经常会使用的格式记录。

## Static Badge

```
![](https://img.shields.io/badge/参考页面-orange)
```

[![](https://images.weserv.nl/?url=https%3A%2F%2Fcamo.githubusercontent.com%2Fd807703912e2569aebe8076458386a85b94e6d197e973b1326b2084f4d51c249%2F68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2545352538462538322545382538302538332545392541312542352545392539442541322d6f72616e6765)](https://camo.githubusercontent.com/d807703912e2569aebe8076458386a85b94e6d197e973b1326b2084f4d51c249/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2545352538462538322545382538302538332545392541312542352545392539442541322d6f72616e6765)

## 标题

```
# H1
## H2
### H3
#### H4
```

## 强调

```
今天的天气真好啊，可以吃**冰激凌**吗？
```

今天的天气真好啊，可以吃 **冰激凌** 吗？

## 删除横线

```
今天的天气真好啊，可以吃~~冰激凌~~吗？
```

今天的天气真好啊，可以吃 冰激凌 吗？

## 列表

```
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

-   乒乓球
-   篮球
-   羽毛球

## 代码高亮

\`\`\`python  
import request  
import time

time.sleep\_ms(1000)  
print("Hello World")  
\`\`\`

```
import request
import time

time.sleep_ms(1000)
print("Hello World")
```

## 链接

```
[我的博客](https://meekdai.github.io)
```

[我的博客](https://meekdai.github.io/)

## 图片

```
![这是我的头像PNG](https://fjvi.github.io/note/favicon.ico)
![这是我的头像SVG](https://fjvi.github.io/note/favicon.ico)
```

[![这是我的头像SVG](https://camo.githubusercontent.com/4b47cbd8727290be3af77a90b8a4f214763173cf6e26d9736150a33dc295e257/68747470733a2f2f666a76692e6769746875622e696f2f6e6f74652f66617669636f6e2e69636f)](https://fjvi.github.io/note/favicon.ico)

## 表格

```
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

## 水平线

```
---
我在2个水平线中间
***
```

---

我在2个水平线中间

---

## 引用

```
> 落霞与孤鹜齐飞，秋水共长天一色。《滕王阁序》--王勃
```

> 落霞与孤鹜齐飞，秋水共长天一色。《滕王阁序》--王勃

## 对比

```
+ this text is highlighted in green
- this text is highlighted in red
```

```
\`\`\`diff
+ this text is highlighted in green
- this text is highlighted in red
\`\`\`
```

## 字体颜色

```
Some text in green! 123
```

```
\`\`\`CSS
Some text in green! 123
\`\`\`
```

```
Some text in blue! 123
```

```
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

```
Some text highlighted in red! 123
```

```
\`\`\`JSON
Some text highlighted in red! 123
\`\`\`
```

## HTML tricks

Monospaced text

```
<samp>Monospaced text</samp>
```

---

Underlined text

```
<ins>Underlined text</ins>
```

---

Boxed text

```
<table><tr><td>Boxed text</td></tr></table>
```

---

Item summary with dropdown

Dropdown content (supports **markdown** yay!)

```
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

---

**_Italic-bold_**

```
__*Italic-bold*__
```

---

SuperscriptTM

```
Superscript<sup>TM</sup>
```

---

Superscript-italic\_tm\_

```
Superscript-italic<sup>*tm*</sup>
```

---

Subscriptx

```
Subscript<sub>x</sub>
```

---

Subscript-bold **min**

```
Subscript-bold<sub>**min**</sub>
```

---

**_Italic-bold-strikethrough_**

```
~~__*Italic-bold-strikethrough*__~~
```

## 参考

更多GitHub Markdown 语法参考：

❤️ 转载文章请注明出处，谢谢！❤️