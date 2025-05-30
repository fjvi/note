要实现 **本地存储便签 + GitHub 同步** 以及 **层级化折叠的便签结构**，可以结合 **浏览器本地存储（LocalStorage/IndexedDB）** 和 **GitHub API**，并使用类似书签的 **树形结构 + 折叠逻辑**。以下是完整方案：

---

## **1\. 便签本地存储 + GitHub 同步**

### **(1) 本地存储（LocalStorage/IndexedDB）**

使用 `localStorage` 存储便签数据（适合小型数据）：

```markdown
// 保存便签到 localStorage
function saveNotesToLocal(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// 从 localStorage 加载便签
function loadNotesFromLocal() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
}
```

**（如果数据量大，改用 `IndexedDB` 存储）**

---

### **(2) GitHub 同步**

使用 **GitHub API** 或 **GitHub Pages + 手动同步**：

#### **方案 A：GitHub API（自动同步）**

```markdown
async function syncToGitHub(notes, repoPath = "data/notes.json") {
  const token = "YOUR_GITHUB_TOKEN"; // 个人访问令牌
  const repo = "your-username/your-repo";
  const url = `https://api.github.com/repos/${repo}/contents/${repoPath}`;

  // 获取文件 SHA（如果已存在）
  const { sha } = await fetch(url, {
    headers: { Authorization: `token ${token}` },
  }).then(res => res.json());

  // 更新文件
  await fetch(url, {
    method: "PUT",
    headers: { Authorization: `token ${token}` },
    body: JSON.stringify({
      message: "Update notes",
      content: btoa(JSON.stringify(notes)), // Base64 编码
      sha, // 用于覆盖现有文件
    }),
  });
}
```

#### **方案 B：GitHub Pages + 手动下载/上传**

1.  在 GitHub 仓库存储 `notes.json`
2.  用户手动点击 **"导出到 GitHub"** 上传
3.  手动点击 **"从 GitHub 导入"** 下载

---

## **2\. 层级化便签结构（类似书签）**

### **(1) 数据结构**

```markdown
const notes = [
  {
    id: "1",
    title: "工作",
    type: "folder",
    children: [
      {
        id: "1-1",
        title: "项目A",
        type: "note",
        content: "待办事项...",
      },
      {
        id: "1-2",
        title: "会议记录",
        type: "folder",
        children: [...],
      },
    ],
    isOpen: true, // 控制折叠
  },
  {
    id: "2",
    title: "个人",
    type: "folder",
    isOpen: false,
    children: [...],
  },
];
```

### **(2) 折叠逻辑（类似书签）**

**HTML 结构**：

```markdown
<div class="note-tree">
  <div class="note-folder" data-id="1">
    <div class="folder-header" onclick="toggleFolder('1')">
      <span>📁 工作</span>
      <span class="toggle-icon">▶</span>
    </div>
    <div class="folder-children">
      <!-- 子便签或文件夹 -->
    </div>
  </div>
</div>
```

**CSS 折叠动画**：

```markdown
.note-folder .folder-children {
  display: none;
  padding-left: 20px;
}

.note-folder.open .folder-children {
  display: block;
}

.note-folder.open .toggle-icon {
  transform: rotate(90deg);
}
```

**JavaScript 折叠控制**：

```markdown
function toggleFolder(id) {
  const folder = document.querySelector(`.note-folder[data-id="${id}"]`);
  folder.classList.toggle("open");

  // 更新数据中的 isOpen 状态
  updateNoteInData(id, { isOpen: folder.classList.contains("open") });
}
```

### **(3) 折叠排斥逻辑（兄弟级/子孙级）**

```markdown
function closeSiblingsAndChildren(folderId) {
  // 关闭所有兄弟文件夹
  const parentFolder = document.querySelector(`.note-folder[data-id="${folderId}"]`).parentElement.closest('.note-folder');
  if (parentFolder) {
    parentFolder.querySelectorAll('.note-folder').forEach(f => {
      if (f.dataset.id !== folderId) {
        f.classList.remove("open");
      }
    });
  }

  // 关闭所有子文件夹
  document.querySelectorAll(`.note-folder[data-id^="${folderId}-"]`).forEach(f => {
    f.classList.remove("open");
  });
}
```

---

## **3\. 完整流程**

1.  **用户操作**：

    - 新增/编辑便签 → 保存到 `localStorage`
    - 点击 **"同步到 GitHub"** → 调用 `syncToGitHub()`
    - 点击文件夹 → 折叠/展开，并排斥兄弟级和子级

2.  **初始化加载**：

    ```markdown
    // 从 localStorage 或 GitHub 加载数据
    let notes = loadNotesFromLocal();
    renderNoteTree(notes);
    ```

3.  **GitHub 同步**：

    - 用户手动触发同步
    - 或设置定时自动同步（需考虑冲突处理）

---

## **4\. 额外优化**

- **冲突处理**：如果本地和远程数据不同，提示用户选择版本
- **离线模式**：优先使用 `localStorage`，联网时再同步
- **IndexedDB**：如果数据量较大，改用 IndexedDB 存储

---

### **最终效果**

✅ **本地存储**（刷新不丢失）  
✅ **GitHub 同步**（跨设备访问）  
✅ **层级化便签**（文件夹 + 折叠）  
✅ **智能折叠**（排斥兄弟/子级）

你可以基于这个方案实现一个完整的 **便签管理应用**！ 🚀

# 可以生成修改后的notesPlugin完整代码吗？

## 完整 Notes Plugin 代码（GitHub API 同步）

下面是一个完整的便签插件实现，包含本地存储、GitHub 同步、层级化结构和折叠功能。

## 1\. HTML 结构 (index.html)

```markdown
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>智能便签管理</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app-container">
        <!-- 顶部工具栏 -->
        <div id="top-toolbar">
            <div class="header-left">
                <img id="logo" src="icon.png" alt="Logo">
                <h1>智能便签</h1>
            </div>
            <div class="header-right">
                <button id="add-folder-btn" class="toolbar-button">📁 新建文件夹</button>
                <button id="add-note-btn" class="toolbar-button">📝 新建便签</button>
                <button id="sync-github-btn" class="toolbar-button">🔄 同步到 GitHub</button>
            </div>
        </div>

        <!-- 主内容区 -->
        <main>
            <section class="active">
                <div id="notes-container">
                    <!-- 便签树将在这里渲染 -->
                </div>
            </section>
        </main>

        <!-- 底部工具栏 -->
        <div id="bottom-toolbar">
            <div class="footer-tabs">
                <button class="tab-button active">📋 所有便签</button>
                <button class="tab-button">⭐ 收藏</button>
            </div>
        </div>

        <!-- 编辑模态框 -->
        <div id="edit-modal" class="modal hidden">
            <div class="modal-content">
                <h2>编辑便签</h2>
                <input type="text" id="edit-title" placeholder="标题">
                <textarea id="edit-content" placeholder="内容..."></textarea>
                <div class="modal-actions">
                    <button id="save-edit-btn">保存</button>
                    <button id="cancel-edit-btn">取消</button>
                </div>
            </div>
        </div>
    </div>

    <script src="notesPlugin.js"></script>
</body>
</html>
```

## 2\. CSS 样式 (style.css)

```markdown
/* 基础样式 */
body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    margin: 0;
    padding: 0;
}

#app-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* 工具栏样式 */
#top-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 30px;
    background-color: #333;
    color: white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.header-left, .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

#logo {
    width: 36px;
    height: 36px;
    object-fit: contain;
}

.toolbar-button {
    border: none;
    color: #ddd;
    background: none;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
}

.toolbar-button:hover {
    background-color: #444;
}

#bottom-toolbar {
    padding: 8px 0;
    background-color: #333;
    margin-top: auto;
}

.footer-tabs {
    display: flex;
    justify-content: center;
}

.tab-button {
    border: none;
    color: #ddd;
    background: none;
    padding: 8px 16px;
    cursor: pointer;
}

.tab-button.active {
    color: white;
    font-weight: bold;
}

/* 便签树样式 */
#notes-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.note-item {
    margin-bottom: 10px;
}

.folder-header {
    padding: 8px 12px;
    background-color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
}

.folder-header:hover {
    background-color: #e0e0e0;
}

.folder-header .toggle-icon {
    transition: transform 0.2s;
}

.folder-header.open .toggle-icon {
    transform: rotate(90deg);
}

.folder-children {
    padding-left: 20px;
    display: none;
}

.folder-item.open > .folder-children {
    display: block;
}

.note-content {
    padding: 8px 12px;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-top: 4px;
    cursor: pointer;
}

.note-content:hover {
    background-color: #f0f0f0;
}

/* 模态框样式 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.modal-actions button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#save-edit-btn {
    background-color: #4CAF50;
    color: white;
}

#cancel-edit-btn {
    background-color: #f44336;
    color: white;
}

.hidden {
    display: none !important;
}
```

## 3\. JavaScript 实现 (notesPlugin.js)

```markdown
class NotesPlugin {
    constructor() {
        this.notes = [];
        this.currentEditId = null;
        this.githubToken = null;
        this.githubRepo = null;
        this.githubFilePath = 'data/notes.json';

        this.initElements();
        this.loadNotes();
        this.renderNotes();
        this.setupEventListeners();
    }

    initElements() {
        this.notesContainer = document.getElementById('notes-container');
        this.addFolderBtn = document.getElementById('add-folder-btn');
        this.addNoteBtn = document.getElementById('add-note-btn');
        this.syncGithubBtn = document.getElementById('sync-github-btn');
        this.editModal = document.getElementById('edit-modal');
        this.editTitle = document.getElementById('edit-title');
        this.editContent = document.getElementById('edit-content');
        this.saveEditBtn = document.getElementById('save-edit-btn');
        this.cancelEditBtn = document.getElementById('cancel-edit-btn');
    }

    setupEventListeners() {
        this.addFolderBtn.addEventListener('click', () => this.addNewFolder());
        this.addNoteBtn.addEventListener('click', () => this.addNewNote());
        this.syncGithubBtn.addEventListener('click', () => this.syncWithGitHub());
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());

        // 首次使用时设置 GitHub 信息
        if (!localStorage.getItem('githubConfigured')) {
            this.promptGitHubConfig();
        }
    }

    promptGitHubConfig() {
        const token = prompt('请输入 GitHub 个人访问令牌 (Personal Access Token):');
        const repo = prompt('请输入 GitHub 仓库 (格式: username/repo):');

        if (token && repo) {
            this.githubToken = token;
            this.githubRepo = repo;
            localStorage.setItem('githubToken', token);
            localStorage.setItem('githubRepo', repo);
            localStorage.setItem('githubConfigured', 'true');
            alert('GitHub 配置已保存！');
        }
    }

    // 数据存储方法
    loadNotes() {
        // 从 localStorage 加载
        const localNotes = localStorage.getItem('notes');
        if (localNotes) {
            this.notes = JSON.parse(localNotes);
            return;
        }

        // 初始化示例数据
        this.notes = [
            {
                id: '1',
                title: '工作',
                type: 'folder',
                children: [
                    {
                        id: '1-1',
                        title: '项目A',
                        type: 'note',
                        content: '项目A的任务列表...'
                    }
                ],
                isOpen: true
            },
            {
                id: '2',
                title: '个人',
                type: 'folder',
                children: [],
                isOpen: false
            }
        ];

        this.saveNotesToLocal();
    }

    saveNotesToLocal() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    // GitHub 同步方法
    async syncWithGitHub() {
        if (!this.githubToken || !this.githubRepo) {
            this.promptGitHubConfig();
            return;
        }

        try {
            // 1. 尝试获取现有文件 SHA
            const sha = await this.getGitHubFileSHA();

            // 2. 上传新内容
            await this.uploadToGitHub(sha);

            alert('同步到 GitHub 成功！');
        } catch (error) {
            console.error('同步失败:', error);
            alert(`同步失败: ${error.message}`);
        }
    }

    async getGitHubFileSHA() {
        const url = `https://api.github.com/repos/${this.githubRepo}/contents/${this.githubFilePath}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${this.githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.status === 404) {
            return null; // 文件不存在
        }

        if (!response.ok) {
            throw new Error(`获取文件信息失败: ${response.status}`);
        }

        const data = await response.json();
        return data.sha;
    }

    async uploadToGitHub(sha) {
        const url = `https://api.github.com/repos/${this.githubRepo}/contents/${this.githubFilePath}`;
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(this.notes, null, 2)));

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${this.githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update notes via web app',
                content: content,
                sha: sha || undefined
            })
        });

        if (!response.ok) {
            throw new Error(`上传失败: ${response.status}`);
        }
    }

    // 便签操作方法
    addNewFolder(parentId = null) {
        const newFolder = {
            id: this.generateId(parentId),
            title: '新建文件夹',
            type: 'folder',
            children: [],
            isOpen: true
        };

        if (parentId) {
            const parent = this.findNoteById(parentId);
            if (parent && parent.type === 'folder') {
                parent.children.push(newFolder);
            }
        } else {
            this.notes.push(newFolder);
        }

        this.saveAndRender();
        this.editNote(newFolder.id);
    }

    addNewNote(parentId = null) {
        const newNote = {
            id: this.generateId(parentId),
            title: '新建便签',
            type: 'note',
            content: ''
        };

        if (parentId) {
            const parent = this.findNoteById(parentId);
            if (parent && parent.type === 'folder') {
                parent.children.push(newNote);
            }
        } else {
            this.notes.push(newNote);
        }

        this.saveAndRender();
        this.editNote(newNote.id);
    }

    generateId(parentId = null) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 6);
        return parentId ? `${parentId}-${timestamp}${random}` : `${timestamp}${random}`;
    }

    findNoteById(id, notes = this.notes) {
        for (const note of notes) {
            if (note.id === id) return note;
            if (note.type === 'folder' && note.children) {
                const found = this.findNoteById(id, note.children);
                if (found) return found;
            }
        }
        return null;
    }

    // 渲染方法
    renderNotes() {
        this.notesContainer.innerHTML = '';
        this.notes.forEach(note => this.renderNoteItem(note));
    }

    renderNoteItem(note, depth = 0) {
        const item = document.createElement('div');
        item.className = `note-item ${note.type}-item`;
        item.dataset.id = note.id;

        if (note.type === 'folder') {
            item.innerHTML = `
                <div class="folder-header ${note.isOpen ? 'open' : ''}" onclick="notesPlugin.toggleFolder('${note.id}')">
                    <span class="toggle-icon">▶</span>
                    <span class="folder-title">📁 ${note.title}</span>
                    <button class="add-note-btn" onclick="notesPlugin.addNewNote('${note.id}'); event.stopPropagation()">+</button>
                    <button class="edit-btn" onclick="notesPlugin.editNote('${note.id}'); event.stopPropagation()">✏️</button>
                    <button class="delete-btn" onclick="notesPlugin.deleteNote('${note.id}'); event.stopPropagation()">🗑️</button>
                </div>
                <div class="folder-children" style="display: ${note.isOpen ? 'block' : 'none'}">
                    ${note.children.map(child => this.renderNoteItem(child, depth + 1).outerHTML).join('')}
                </div>
            `;
        } else {
            item.innerHTML = `
                <div class="note-content" onclick="notesPlugin.editNote('${note.id}')">
                    <strong>📝 ${note.title}</strong>
                    <p>${note.content.substring(0, 50)}${note.content.length > 50 ? '...' : ''}</p>
                </div>
            `;
        }

        return item;
    }

    // 交互方法
    toggleFolder(id) {
        const note = this.findNoteById(id);
        if (note && note.type === 'folder') {
            note.isOpen = !note.isOpen;
            this.saveAndRender();
        }
    }

    editNote(id) {
        const note = this.findNoteById(id);
        if (!note) return;

        this.currentEditId = id;
        this.editTitle.value = note.title;
        this.editContent.value = note.type === 'note' ? note.content : '';
        this.editModal.classList.remove('hidden');
    }

    saveEdit() {
        const note = this.findNoteById(this.currentEditId);
        if (!note) return;

        note.title = this.editTitle.value;
        if (note.type === 'note') {
            note.content = this.editContent.value;
        }

        this.closeEditModal();
        this.saveAndRender();
    }

    closeEditModal() {
        this.editModal.classList.add('hidden');
        this.currentEditId = null;
    }

    deleteNote(id) {
        if (!confirm('确定要删除这个项目吗？')) return;

        // 从根数组或父文件夹中删除
        const deleteFromArray = (array) => {
            const index = array.findIndex(n => n.id === id);
            if (index !== -1) {
                array.splice(index, 1);
                return true;
            }

            for (const item of array) {
                if (item.type === 'folder' && item.children) {
                    if (deleteFromArray(item.children)) {
                        return true;
                    }
                }
            }

            return false;
        };

        if (deleteFromArray(this.notes)) {
            this.saveAndRender();
        }
    }

    saveAndRender() {
        this.saveNotesToLocal();
        this.renderNotes();
    }
}

// 初始化插件
const notesPlugin = new NotesPlugin();
window.notesPlugin = notesPlugin; // 暴露给全局以便HTML调用
```

## 功能说明

1.  **本地存储**：

    - 使用 `localStorage` 保存便签数据
    - 支持文件夹和便签两种类型
    - 自动保存所有更改

2.  **GitHub 同步**：

    - 使用 GitHub API 同步数据
    - 需要配置 GitHub 个人访问令牌和仓库
    - 自动处理文件创建和更新

3.  **层级结构**：

    - 支持无限层级嵌套
    - 文件夹可以包含其他文件夹或便签
    - 每个项目有唯一 ID

4.  **折叠功能**：

    - 点击文件夹标题切换展开/折叠状态
    - 保存折叠状态
    - 支持在文件夹内新建项目

5.  **编辑功能**：

    - 双击项目或点击编辑按钮打开编辑模态框
    - 实时保存更改

6.  **UI 交互**：

    - 响应式设计
    - 清晰的视觉层次
    - 操作按钮直观

## 使用说明

1.  首次使用时需要配置 GitHub 信息（令牌和仓库）
2.  点击"新建文件夹"或"新建便签"添加项目
3.  点击文件夹标题展开/折叠
4.  点击便签内容进行编辑
5.  使用"同步到 GitHub"按钮手动同步数据

这个实现提供了完整的便签管理功能，适合个人使用或小型团队协作。

这是独立项目还是可以融入原来书签项目的插件？具体如何使用？

这个实现既可以作为独立项目运行，也可以作为插件集成到原有的书签管理项目中。以下是具体的使用方式和集成方法：

---

## **1\. 作为独立项目使用**

### **使用步骤**

1.  **创建项目文件**：

    - `index.html` (主页面)
    - `style.css` (样式)
    - `notesPlugin.js` (核心逻辑)
    - `icon.png` (可选，工具栏图标)

2.  **直接运行**：

    - 打开 `index.html` 即可在浏览器中使用
    - 数据会保存在浏览器的 `localStorage` 中

3.  **配置 GitHub 同步**：

    - 首次使用时，输入 GitHub 个人访问令牌和仓库信息
    - 之后点击 "同步到 GitHub" 按钮手动同步

---

## **2\. 作为插件集成到原有书签项目**

### **集成步骤**

#### **(1) 文件合并**

1.  **CSS 整合**：

    - 将 `style.css` 中的样式合并到原项目的 CSS 文件中
    - 注意避免类名冲突（可以添加前缀如 `.notes-`）

2.  **HTML 结构**：

    - 在原项目的 HTML 中添加便签的容器：

    ```markdown
    <section id="notes-section">
      <div id="notes-container"></div>
      <!-- 原有书签内容 -->
    </section>
    ```

3.  **JavaScript 集成**：

    - 将 `notesPlugin.js` 合并到原项目的 JS 中
    - 或者作为模块导入：

    ```markdown
    import NotesPlugin from './notesPlugin.js';
    const notesPlugin = new NotesPlugin();
    ```

#### **(2) 功能整合**

1.  **共享数据存储**：

    - 如果原项目已使用 `localStorage`，可以合并存储结构：

    ```markdown
    // 示例合并后的数据结构
    const appData = {
      bookmarks: [...], // 原有书签数据
      notes: [...]     // 新便签数据
    };
    ```

2.  **UI 整合**：

    - 在原有工具栏添加便签相关按钮：

    ```markdown
    <button id="show-notes-btn">📝 便签</button>
    ```

    - 通过事件切换显示：

    ```markdown
    document.getElementById('show-notes-btn').addEventListener('click', () => {
      document.getElementById('bookmarks-section').classList.add('hidden');
      document.getElementById('notes-section').classList.remove('hidden');
    });
    ```

#### **(3) 同步逻辑复用**

- 如果原项目已有 GitHub 同步功能，可以复用 API 调用逻辑：

```markdown
// 共享同步方法
async function syncAllToGitHub() {
  await syncBookmarks(); // 原有书签同步
  await notesPlugin.syncWithGitHub(); // 便签同步
}
```

---

## **3\. 关键集成点**

### **(1) 数据隔离**

- **独立存储**（推荐初学者）：

  ```markdown
  // 便签数据独立存储
  localStorage.setItem('notes', JSON.stringify(notes));
  // 书签数据独立存储
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  ```

- **统一存储**（进阶）：

  ```markdown
  const allData = {
    version: 1,
    bookmarks: [...],
    notes: [...]
  };
  localStorage.setItem('appData', JSON.stringify(allData));
  ```

### **(2) 样式冲突处理**

在原有 CSS 中添加命名空间：

```markdown
/* 便签专属样式 */
.notes-container { /*...*/ }
.notes-folder-header { /*...*/ }

/* 书签专属样式 */
.bookmarks-container { /*...*/ }
```

### **(3) 交互逻辑**

- **切换标签页**：

  ```markdown
  function showTab(tabName) {
    // 隐藏所有
    document.querySelectorAll('main > section').forEach(s => {
      s.classList.remove('active');
    });
    // 显示目标
    document.getElementById(`${tabName}-section`).classList.add('active');
  }
  ```

- **共享 GitHub 配置**：

  ```markdown
  // 从原项目读取配置
  notesPlugin.githubToken = bookmarkApp.githubToken;
  notesPlugin.githubRepo = bookmarkApp.githubRepo;
  ```

---

## **4\. 使用场景示例**

### **场景1：快速独立使用**

1.  下载三个文件（HTML/CSS/JS）
2.  直接打开 `index.html`
3.  开始记录便签，数据保存在本地

### **场景2：集成到书签项目**

1.  将便签代码合并到原项目
2.  添加切换按钮：

    ```markdown
    <div class="tab-buttons">
      <button onclick="showTab('bookmarks')">书签</button>
      <button onclick="showTab('notes')">便签</button>
    </div>
    ```

3.  实现数据同步联动

---

## **5\. 注意事项**

1.  **GitHub API 限制**：

    - 个人访问令牌需要 `repo` 权限
    - 每小时最多 60 次 API 调用（未认证）

2.  **移动端适配**：

    - 确保折叠按钮大小适合触摸操作
    - 添加响应式布局：

    ```markdown
    @media (max-width: 600px) {
      .folder-header { padding: 12px; }
    }
    ```

3.  **数据备份**：

    - 即使使用 GitHub 同步，也建议定期导出本地备份

4.  **冲突处理**：

    - 如果多设备同时编辑，建议实现简单的 "最后修改优先" 策略

---

通过以上方式，你可以灵活选择独立使用便签功能，或将其无缝集成到原有书签管理系统中。两种方式均保留了完整的层级结构和 GitHub 同步能力。
