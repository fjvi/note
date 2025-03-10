通过替换Google文档共享链接URL中的 *edit* ，您可以做一些非常巧妙的技巧。您可以将可共享链接转换为**预览**、**复制**、**模板**或**导出PDF**链接。

方法是将 `/edit` 替换为 `preview、copy、templatepreview、export?format=pdf 或 export/pdf`。

```md
preview
``` 
```md
copy
```
```md
template/preview
```
```md
export?format=/pdf
```
```md
mdexport/pdf
```
## 预览链接

***共享文档的整洁视图***  
→ 将*/edit*替换 为*/preview*

将 Google文档、表格、幻灯片或绘图中创建的内容发布为预览链接，可呈现没有菜单栏和按钮的文档。

示例：[优雅的图形宣言](https://docs.google.com/drawings/d/1sVZYYazblxw5lhO8ZlblHSe42y0ZhJpb1kTK-vYT9eM/preview)

+   与标准共享版本相比，预览文档在移动浏览器中的加载速度更快，效果也更好。对于没有移动应用的 Google Drawings 来说尤其如此。
    
+   预览文档中不会显示注释和幻灯片或画布之外的任何内容。此外，幻灯片演示文稿没有幻灯片分类器 — 演示文稿显示在演示文稿视图中。
    
+   预览链接的受众无法实时看到编辑内容。但是，每次加载页面时都会显示文档的最新版本。无需重新发布或重新共享文档即可更新预览版本。请注意，预览可能需要几分钟才能更新。
    
+   您从 Google 文档中获取的可共享链接可能在 /edit 后有一些额外的字符。不必担心。只需将 /edit 替换为 /preview。您可以保留或删除 /edit 后的内容，您的链接应该可以正常工作。
    
+   在 Google Slides中将*/edit*更改为*/preview?rm=minimal*可呈现底部没有导航栏的幻灯片。当您不希望观众跳过幻灯片时，这非常方便。（感谢 Shaun Creighton 在评论中提供此提示！）
    
+   由于预览链接会删除菜单，因此文档查看者将无法选择文件 → 制作副本以将副本添加到自己的 Google Drive。但是，如果您遇到文档的预览版本并希望制作副本，请尝试以下操作：将 URL 中的 /preview 替换为 /edit。然后您将看到带有菜单的版本，然后可以访问文件菜单来制作副本。
    
+   Google Doc 的预览链接不显示文档大纲（左侧的标题列表）。但是，您可以将 URL 修改为预览链接*并*显示文档大纲。只需将 /edit 替换为 /preview?rm=demo 即可。感谢[Wanda Terral](https://ignitionedu.com/2024/06/google-doc-demo-mode)提供的此提示。
    
+   将文档的预览 URL 添加到 Google 课堂帖子最终会恢复为原始版本，而不是预览版本。如果您想添加预览链接，请先将预览链接粘贴到[Bitly](http://bitly.com/)等 URL 缩短器中。复制 Bitly 提供的新链接。将缩短的链接添加到 Google 课堂中的帖子最终会打开预览版本。或者，您可以将预览链接粘贴到帖子正文中（而不是使用链接按钮添加链接）。
    

![制作复制图标](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1502982823815-SMLPS8IQZAMUVXG3S0K4/image-asset.png)

## 制作复制链接

***强制其他人在查看您的文档之前进行复制***  
→ 将*/edit*替换 为*/copy*

您可能点击了 Google 文档、幻灯片、表格或绘图文件的链接，并且必须点击“制作副本”按钮才能继续。这种共享方法迫使用户复制原始文件，副本现在完全归用户所有并放置在她的 Google Drive 中。

如果您在 Google Workspace 中创建了文档，并希望学生拥有自己的副本，那么“制作副本”链接就非常适合。学生可以在自己的文档中填写空白、完成幻灯片、标记绘图、注释文本或完成某些任务（然后可能将其分享给老师）。这种共享方式还可用于与其他老师共享模板。他们只需点击即可制作自己的副本并对其进行自定义，而不会影响您的原件。

示例：[鼓励便条（打印在 1.5 x 2 英寸便签上）](https://docs.google.com/presentation/d/1qf_TVpBxkVgBdp-X22x99u8_WYM3x8axrzX1Hi1ewbM/copy?usp=sharing)

+   当教师发布包含 Google 文档的作业时，Google Classroom 会自动执行此过程。Classroom 提供了为每个学生制作副本的选项。
    
+   您从 Google 文档中获取的可共享链接可能在 /edit 后有一些额外的字符。不必担心。只需将 /edit 替换为 /copy。您可以保留或删除 /edit 后的内容，您的链接应该可以正常工作。
    
+   当您将 /edit 更改为 /copy 时，评论不会被复制。如果您想包含评论，请参阅下面的*使用评论链接制作副本***。**
    
+   当学生和教师制作副本时，他们拥有副本的全部所有权，原始文档所有者不再与副本相关联。如果第一个文档所有者对原始文档进行了更改，则这些更改将反映在未来的副本中，但不会更改已制作的文档副本。
    

![复制评论图标](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1523975766724-6PTJ7TBUAY02YRTFED1E/Copy+with+Comments.png)

## 使用评论链接进行复制

***强制其他人在查看您的文档之前复制一份包含原始文档注释的副本***  
→ 将*/edit*替换 为*/copy?copyComments=true*

*此链接的作用与常规的“制作副本”*链接相同 ，但它还会将原始文档中的任何评论复制到副本中。如果您希望查看者看到并可能回复评论，这会很方便。评论可能包括附加信息、说明、清单和超链接。

示例：[Eric Curts 的《对称线》](https://docs.google.com/document/d/18ox23HzI4g0C0aJgi6ITLwpWD46Rd5ofvkWH2DJLzCA/copy?copyComments=true)

+   从原始文档复制的评论包含以下注释：“以上评论从原始文档复制”。
    
+   有关此类链接的更多信息，请阅读 Eric Curt 的文章《[如何强制复制带有预加载评论的文档来帮助您的学生》。](http://www.controlaltachieve.com/2017/11/force-copy-comments.html)
    
+   如果您在单击“评论”按钮之前突出显示文本或选择图像，则评论将与该选择相关联。
    
+   将文档的“制作带评论的副本”URL 添加到 Google 课堂帖子中最终会恢复为原始版本，而不是“复制带评论”版本。如果您想添加“复制带评论”链接，请先将链接粘贴到[Bitly](http://bitly.com/)等 URL 缩短器中。复制 Bitly 提供的新链接。将缩短的链接添加到 Google 课堂中的帖子最终会打开“制作带评论的副本”版本。或者，您可以将“制作带评论的副本”链接粘贴到帖子正文中（而不是使用链接按钮添加链接）。
    

![制作带有评论的副本](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1561729650175-X21L5WIV33MBLF0K25NS/Make+a+Copy+with+Comments.png)

![模板图标](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1502982857432-LWHNLOR2IIULLV4N0T0A/image-asset.png)

## 模板链接

***共享易于复制的文档预览***  
→将*/edit*替换 为*/template/preview*

使用模板链接共享文档内容并可选择复制 - 它是预览链接和复制链接的组合。

模板链接会显示文档的简洁版本。它还会显示“*使用模板”*按钮。单击此按钮会复制原始文档，副本现在完全归用户所有，并放置在她的 Google Drive 中。

模板链接非常适合让其他人在将文档复制到 Google Drive 之前查看文档。在网站和社交媒体上发布时，这些链接通常比“制作副本”链接更受欢迎，因为它们允许在盲目复制之前查看文档。

示例：[磁性诗歌](https://docs.google.com/drawings/d/1VceC_EgHOvzJ-mxMCJW1e7d9ipEFB3qF9sAvuoGTJJg/template/preview)

+   与单击*“制作副本”*按钮不同，单击*“使用模板”*不会在新复制的文档的文件名中添加“副本”。
    
+   模板链接的受众无法实时看到编辑内容。但是，每次加载页面时都会显示文档的最新版本。无需重新发布或重新共享文档即可更新模板版本。请注意，文档的预览可能需要几分钟才能更新。
    
+   您从 Google 文档中获取的可共享链接可能在 /edit 后有一些额外的字符。不必担心。只需将 /edit 替换为 /copy。您可以保留或删除 /edit 后的内容，您的链接应该可以正常工作。
    
+   iPhone 和 iPad 在模板链接方面有点奇怪。单击*“使用模板”*后，新复制的文档不会自动在文档、表格或幻灯片应用中打开。但是，当打开应用时，新文档就在那里。按*上次修改时间*排序可以更轻松地找到文档。
    
+   将文档的模板 URL 添加到 Google 课堂帖子最终会恢复为原始版本，而不是模板版本。如果您想添加模板链接，请先将模板链接粘贴到[Bitly](http://bitly.com/)等 URL 缩短器中。复制 Bitly 提供的新链接。将缩短的链接添加到 Google 课堂中的帖子最终会打开模板版本。或者，您可以将模板链接粘贴到帖子正文中（而不是使用链接按钮添加链接）。
    

![PDF 图标](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1502982880518-UUSE0BQBGTWVY9FST2C9/image-asset.png)

## PDF 链接

***共享文档 PDF 版本的直接下载***  
→ Google 文档和表格：将*/edit*替换 为*/export?format=pdf*  
→ Google 幻灯片和绘图：将*/edit*替换 为*/export/pdf*

让网络浏览器通过 PDF 链接下载文档的 PDF 版本。点击链接后，会自动下载 PDF 版本，而不是在 Google 查看器或应用中显示文档。

当您想让其他人打印或保存您的文档时，PDF 链接非常有用。它们对于共享海报、信息图表和备忘单非常有用。

示例：[Google 课堂帖子选项](https://docs.google.com/drawings/d/1fvtnOG9iJRjtyKHxKeD2alssU635mhGHYqwzYITszys/export/pdf) 

+   由于 PDF 是一种通用格式，因此不需要 Google 帐户即可下载，也不需要打开该文件。
    
+   PDF 文件可以在任意应用程序中打开：Adobe Reader、Preview、Google Drive、Foxit Reader、Explain Everything 等。
    
+   自动下载不会出现在电脑的浏览器窗口中。点击后，人们很容易忘记文件已被下载。请务必标记您的 PDF 链接，以便其他人知道将下载文件。
    
+   下载文件存放的位置取决于浏览器、计算机和设置。收件人可能会被提示重命名文件并选择位置。或者，下载的文件可能会自动放置在“下载”文件夹或桌面上。
    
+   超链接在 PDF 中有效。文档中已超链接的任何文本、图像或形状都将在 PDF 版本中保持链接状态。
    
+   直接下载不仅限于 PDF。其他文件类型也适用。不要在 URL 中使用*pdf*，请尝试使用*png、jpg、pptx、xlsx、docx、html*或*txt*。
    
+   您从 Google 文档中获取的可共享链接可能在 /edit 后有一些额外的字符。不必担心。只需将 /edit 替换为 /copy。您可以保留或删除 /edit 后的内容，您的链接应该可以正常工作。
    
+   如果您希望 PDF 显示在浏览器中，您可以使用 Google 的在线文档查看器。在 PDF 链接开头添加*https://docs.google.com/viewer?url= 。*[单击查看示例。](https://docs.google.com/viewer?url=https://docs.google.com/drawings/d/1fvtnOG9iJRjtyKHxKeD2alssU635mhGHYqwzYITszys/export/pdf)
    

![撤销](https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1502983319038-8O4BO5EBY4XT64MTISIT/image-asset.png)

### **额外提示**

遇到别人伪造的链接？您可以对预览、制作副本、模板或 PDF 链接进行逆向工程，以常规方式查看文档，方法是将*/preview、/copy、/template/preview、/export?format=pdf 或 /export/pdf*替换为*/edit*。

[chrome相关插件](https://chrome.google.com/webstore/detail/sir-links-a-lot/cggpkbnlnicoanmphgkkcmidbpdacepn/related?hl=en-US)