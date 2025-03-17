很少有开发人员深入研究浏览器的“ DevTools”。这里有一系列复杂的功能，甚至已经到了可以使用 Chrome 作为完整开发环境的地步。虽然你不太可能会为此放弃使用 VSCode 或 Sublime，但如果你在使用别人的电脑或仅需要编辑一两行代码时，DevTools至少可以作为一种选择。

以下部分将介绍如何使用 Chrome 的编辑和调试工具（Chromium、 Edge、 Opera等浏览器也使用了相同的内核引擎和开发工具）。根据你的浏览器和操作系统，你可以从菜单中打开 DevTools: 按 F12，或者按 Ctrl | Cmd + Shift + i。 Safari 和 Firefox 会有些不同，它们可能不提供相同的编辑功能，但是它们也有自己的技巧来帮助开发。

## 在任何网站上进行快速编辑

当在本地开发或线上站点上查看页面时，**Elements**(元素) 面板允许你检查、禁用、启用、添加、编辑或删除任何 CSS 选择器和属性:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cbda7e2a4204690a0662a2bcaab2a37~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) **Source**(源代码) 面板允许你选中**Page**(网页) 窗口中的css或JavaScript文件，然后在右侧的源码面板中去编辑它们的内容。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3664999f11964e9e95f17d7a393d5cc8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

按 `Ctrl | Cmd + S` 保存文件修改，但要注意它只是保存到内存中，黄色警告图标表示更改不是永久性的。

如果你的代码开启了**Source Map**(源码映射)，你可以打开“ files”(参见上面的 src 文件夹) ，但是更改不会应用到当前页面。你也可以通过单击{}图标来美化压缩后的代码。

一旦关闭或刷新页面，你将丢失所有变更。不过**Changes**(变更) 面板可以记录当前的变更。你可以从抽屉面板左侧的“···”菜单或主菜单的更多工具中找到:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae47766bce8c4fe097598d5edd901d36~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

从**Changes**(变更)面板中保存代码是不可以的，但它允许你定位所有修改过的文件。右键单击文件夹窗口中的任何文件，可以选择“另存为”下载本地副本并将其导入到项目中。

## 覆盖任何网站上的文件

你可以替换本地开发或线上站点上的任何文件。首先，在**Source**(源代码)面板中选择**Overrides**(替换)窗口，然后单击“ + 选择放置替换项的文件夹”:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1be975ee788f401e842f9276b4396b97~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

选择你系统里的一个目录，然后单击“允许”，这样 Chrome 就可以对其进行写入操作了。

返回“**Page**”(网页)面板，然后右键单击任意一个文件并选择“保存并覆盖”:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ce5d73210d3402daba8246553037e05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

这会将文件保存到本地的文件夹中。紫色圆圈表示当前文件在本地磁盘上:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/795a8f9878c6428d8b19e738182b1cb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

你可以按{}来美化压缩后的代码并进行更改。更改会立即生效，而且因为文件是在本地保存的，所以每当 DevTools 打开时，该域名的所有页面都会重新应用这些更改(它不会影响除你之外的任何人的站点)。

**Changes**(变更)面板仍然会显示修改前后的差异，你也可以将编辑后的文件复制到源代码中。请记住，你正在编辑的是最终打包之后的文件，可能需要对打包前的源文件也应用更改。

## 编辑源代码

你可以使用 Chrome 作为本地源文件的文本编辑器，不管你使用的是什么系统。它提供了大多数编辑器的基本功能，如行号、撤销/重做、颜色编码和自动补全。首先，选择**Sources**(源代码)面板中的“文件系统”窗口，然后单击“ + 向工作区添加文件夹”:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46905e309f614a18a23046caed263bd3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

选择当前项目对应的本地开发目录，然后单击“允许”，这样 Chrome 就有权对该文件夹进行读写操作。你现在可以像在编辑器中一样打开和编辑任何文件:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f21659163489446682c247d0892233a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 使用控制台面板进行调试

| console方法 | 描述 |
| --- | --- |
| `.log(msg)` | 向控制台输出消息 |
| `.dir(obj,opt)` | 美化打印对象和属性 |
| `.table(obj)` | 以表格格式输出数组和对象 |
| `.error(msg)` | 输出错误消息 |
| `.count(label)` | 以参数为标识记录调用的次数，调用时在控制台打印标识以及调用次数。 |
| `.countReset[label]` | 重置指定标签的计数器值。 |
| `.group(label)` | 创建一个新的内联 group, 后续所有打印内容将会以子层级的形式展示。调用 `groupEnd()`来闭合组。 |
| `.groupEnd(label)` | 结束缩进组 |
| `.time(label)` | 启动计时器来计算操作的持续时间 |
| `.timeLog(label)` | 报告自计时器启动以来的运行时间 |
| `.timeEnd(label)` | 停止计时器并报告总持续时间 |
| `.trace()` | 输出堆栈跟踪(所有调用函数的列表) |
| `.clear()` | 清空控制台 |

`console.log()`也接受用逗号分割来显示多个值，例如:

```ini
let x = 321;
console.log('x:', x);
// x: 321
```

es6解构提供了类似的输出方式：

```arduino
console.log({ x });
// { x: 321 }
```

`console.dir()`可以将复杂对象输出到任意属性深度，无论是否使用颜色编码:

```php
console.dir(obj, { depth: null, color: true });
```

## 调试客户端应用

你可以从 **Source**(源代码) 面板打开一个 JavaScript 文件，然后单击任意行号来设置断点(用蓝色标记表示)。注意，你还可以在**Source Map**(源码映射)中选择文件并添加断点，这样看起来会更直观。

代码运行到断点处会暂停执行，以便你可以检查程序的状态。可以定义任意数量的断点，只需将它们设置为要开始调试的位置。

运行代码(可通过刷新页面或激活事件触发器) ，代码将在断点位置停止:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dcd4c50f8124ed4ab26cb65424008ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

右边的展板包括:

+   一个(**Watch**)监视窗口，可以通过单击 + 图标并输入特定变量的名称来监视这些变量
+   一个包含所有断点的(**Breakpoints**)断点窗口，并允许你启用或禁用任意断点
+   **Scope**(作用域)窗口显示所有局部和全局变量的状态，并且可以右键复制“属性路径”，在控制台进行输出
+   **Call Stack**(调用堆栈)窗口列出了断点位置代码执行的相关堆栈信息。

当断点位置被触发时，会有一行图标出现在“已在断点暂停”消息的上方:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9fc41889c3c4ada90bbc6e08fd1e6ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

从左到右，图标执行以下操作:

0.  恢复执行：继续处理，直到下一个断点或代码终止
1.  **step over** 单步执行，不进入函数：执行下一个命令，但保持在当前函数中，不要跳转到它调用的任何函数中
2.  **step into** 单步执行，进入函数：执行下一个命令并跳转到它调用的函数
3.  **step out** 单步执行，跳出函数：继续处理到函数结束并返回到调用语句
4.  **step** 单步执行：类似于 **step into**，只是它不会跳转到异步函数
5.  停用所有断点：如果你希望临时运行代码而不中断，但又不想丢失断点，这种方法非常有用
6.  异常暂停: 引发错误时停止处理。

DevTools 提供了多个调试选项。除了手动定义断点之外，还可以向代码中添加`debugger`语句。这将在 DevTools 打开时被激活，因此你应该将其从生产环境代码中删除。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adbc12e224324a399d5cf6b9f8429e3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**条件断点**是在停止执行前，触发一个条件语句。假设你有一个从0到999的循环，并且需要在最后一次迭代中查看状态。与添加标准断点并单击恢复执行999次不同，你可以右键单击行号，选择“添加条件断点”，然后输入一个表达式，例如`loopValue == 999`。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b02e5c1d39494d9bb9a99d1693fd7781~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**日志点**实际上是没有代码的 `console.log ()`, 右键单击任何一行，选择 "添加日志点"，然后添加表达式:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7e93a96a1bd4a869d3962ee0a3db4c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**DOM断点**：在**Elements**(元素)面板中，右键单击任意dom节点，选择”发生中断条件“中的任意选项，就会在JavaScript触发其对应逻辑时，激活该DOM断点。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17550bf36eb34ec2a37551855eb919df~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

每当 JavaScript 调用 Fetch ()或 XMLHttpRequest 从 URL 中检索数据时，Ajax 断点就会被激活。在 **Source** (源代码)面板中，打开右侧的 **XHR/提取断点**面板，单击 **+** 并输入完整或部分URL以启用断点。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/290b6847098b467497fef5b55bf9582f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

最后，你有时想要忽略正在使用但无法更改的代码，例如 jQuery、 React 、用于统计的三方JavaScript等。按 F1或单击齿轮图标打开设置，选择”忽略列表“选项卡，并添加任意数量的完整或部分 URL/文件名。之后，断点调试器将跳过这些文件中的代码，并忽略它们引发的任何异常。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6c8b372a2fd449e8e4ae54346148f33~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 调试 Node.js 和 Deno 应用程序

你还可以在 Chrome DevTools 中直接调试 Node.js 和 Deno 服务器端应用程序，因为他们使用的都是 V8 JavaScript 引擎。要启动 V8检查程序，请使用`--inspect`参数启动应用程序。例如，要从 index.js 文件启动 Node 应用程序:

```css
sh node --inspect index.js
```

Deno 和 n[oemon](https://nodemon.io/ "https://nodemon.io/") 支持相同的`--inspect`参数。你还可以使用`--inspect-brk` 在第一行停止处理，这样你就可以在应用程序启动时逐步执行它。

这个启动命令监听 localhost: 9229端口，任何本地调试客户端都可以附加到该调试器(包括 Chrome) :

```csharp
Debugger listening on ws://127.0.0.1:9229/301372bc-780a-2051-ceb2-c8d78227092e
```

如果你在其他设备或 Docker 容器中运行应用程序，请确保端口9229可访问，并指定0.0.0.0允许从本地网络的任何地方访问:

```ini
node --inspect=0.0.0.0:9229 index.js
```

应用程序运行后，打开 Chrome 并输入地址`chrome://inspect` 以查看所有可用的应用程序:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97dce641b31a46508f8196b6d4270163~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

应用程序出现在“**Remote Target**”列表中可能需要几秒钟的时间。如果没有，请确保检查了 **Discover network targets**，然后单击 **Configure** 添加应用程序正在运行的设备的 IP 地址和端口。

单击目标应用程序的**inspect**链接以启动另一个 DevTools 窗口。相比浏览器 DevTools 它的选项更少，并且你主要使用 Source 面板来添加断点。与前面一样，你可以选择“文件系统”窗口并单击“+ 向工作区添加文件夹”来编辑服务器端代码。

## 结论

+   在过去的十年中，DevTools 已经有了很大的发展，并且已经到了可以成为你唯一需要的 web 开发工具的地步。我们已经讨论了代码编辑和bug调试的技巧，但是这里还有一些我喜欢的功能:
    
    +   在 **Network**(网络) 选项卡中，右键单击任何 Fetch/XHR 请求，然后选择 复制 选项。你可以为 JavaScript、 Node.js、 cURL 等生成有效的代码。
    +   从**Source**(源代码)选项卡中打开任何图像，然后右键单击可以复制它的base64格式。
    +   在“代码段”面板中创建代码段，以便可以在任何页面上运行相同的 JavaScript。
    +   通过按暂停/恢复图标停止执行，然后按住相同的图标并选择停止，从而停止无限循环。
    +   从 `chrome://inspect` 面板调试一个运行在 Android 手机上的站点，该手机通过 USB 连接到你的电脑。你还可以定义端口转发，这样任何本地或远程站点在设备上都显示为 localhost: < port > 。
    +   **Rendering**(渲染)面板提供了评估核心网页指标、模拟CSS深色模式、模拟CSS打印模式、减少运动等功能。
    +   问题面板：当正在使用的一个 API将在未来的 Chrome 版本中发生变更时，问题面板会提供修改建议。

##### 原文链接 [blog.openreplay.com/how-to-use-…](https://blog.openreplay.com/how-to-use-chrome-as-a-code-editor-and-debugger "https://blog.openreplay.com/how-to-use-chrome-as-a-code-editor-and-debugger")