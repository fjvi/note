Pigmarks 是一个轻量级的书签与便签管理工具。为增强功能扩展性和维护性，我们采用了**插件机制**。本文将简要介绍插件机制的工作原理、使用方式以及优缺点。

---

## 为什么使用插件？

插件机制的最大好处是“**可插拔、易扩展**”。这意味着你可以像插 USB 一样，为 Pigmarks 动态添加新功能，比如：

- 搜索功能
- GitHub 同步
- 便签管理
- RSS 生成功能
- 自定义 UI 或样式

**好处包括：**

- 按需启用，减小主程序体积
- 各功能互不干扰，便于维护
- 添加新功能不必改动主程序

---

## 插件机制的工作原理

插件机制的核心流程如下：

1. **配置文件（`config.json`）**中列出启用的插件名称
2. **主程序（`main.js`）**读取配置并动态加载插件脚本
3. 每个插件通过暴露一个 `init(context)` 方法注册功能

---

## 插件目录结构示例

```
pigmarks/
├── index.html
├── config.json
├── main.js
├── style.css
└── plugin/
    ├── search.js
    ├── sync.js
    └── notes.js
```

---

## 插件格式示例

每个插件是一个独立的模块，暴露 `init()` 方法：

```js
// plugin/search.js
export default {
  name: "search",
  init(context) {
    const input = document.createElement("input");
    input.placeholder = "搜索书签";
    input.className = "search-input";
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase();
      // 基于 context.bookmarks 执行搜索
      console.log("搜索关键词：", value);
    });
    context.container.prepend(input);
  }
};
```

---

## 配置文件示例：`config.json`

```json
{
  "plugins": ["search", "sync", "notes"]
}
```

---

## 主程序动态加载插件示例：`main.js`

```js
async function initApp() {
  const config = await fetch('./config.json').then(res => res.json());
  const context = {
    bookmarks: [],  // 可共享的全局数据
    container: document.getElementById("bookmark-container")
  };

  for (const name of config.plugins) {
    try {
      const plugin = await import(`./plugin/${name}.js`);
      plugin.default.init(context);
    } catch (err) {
      console.error(`插件加载失败: ${name}`, err);
    }
  }
}

initApp();
```

---

## 优点与缺点对比

| 项目         | 插件机制                                      | 传统嵌入式代码              |
|--------------|-----------------------------------------------|-----------------------------|
| 扩展性       | 极强，插件可动态添加                          | 差，新增功能需修改主程序    |
| 可维护性     | 好，模块清晰、低耦合                         | 难，所有逻辑混在一起        |
| 启动性能     | 首次加载略慢（需动态 import）                | 启动快（但随功能增加变慢）  |
| 加载控制     | 支持配置文件控制，按需加载                    | 无法按需关闭某个功能        |
| 状态共享     | 依赖统一 context 对象                        | 可全局共享（但不易管理）    |

---

## 总结

通过插件机制，Pigmarks 实现了高度灵活的功能扩展方式，支持用户**自定义插件**，轻松打造属于自己的书签/便签系统。你只需要：

1. 写一个符合规范的插件 JS 文件
2. 将其放入 `plugin/` 目录
3. 在 `config.json` 中添加插件名称即可启用

欢迎大家为 Pigmarks 开发插件，和我们一起构建一个自由、开放、可组合的知识管理系统！

---
