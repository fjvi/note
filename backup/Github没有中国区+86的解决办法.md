#### Github没有中国区+86的解决办法

方法1.  在验证网页按F12进入开发者模式，选择控制台(Consol)选项，填入如下代码，按回车。

```
var option = new Option("China +86","+86");
option.selected = true;
document.getElementById('countrycode').options.add(option, 0);
```

方法2 .修改网页的元素

在验证网页按F12进入开发者模式，选择控制台(Consol)选项，填入如下代码，按回车

```
<option value="+1">United States +1</option>
<option value="+86">China +86</option>
```
