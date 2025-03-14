# CloudPaste - 在线剪贴板 📋
一个基于 Cloudflare Workers 的在线剪贴板和文件分享服务。支持 Markdown、密码保护、文件上传等功能。
><a href="https://github.com/ling-drag0n/CloudPaste" target="_blank">来源</a>
><a href="https://note.692.cloudns.be/share/paste/CloudPaste" target="_blank">DEMO</a>
<tr><img src="https://github.com/user-attachments/assets/bff7cdf4-a8df-4c4c-89e0-c16bd211fc81" width="auto"> </tr>


## ✨ 功能特点

### 📝 文本分享

- 支持普通文本和 Markdown 样式
- Markdown 实时预览和同步滚动
- 编辑器支持双向拉伸调整大小
- 支持密码保护
- 可选过期时间
- 支持自定义链接后缀（仅单文件上传时可用）
- 支持设置访问次数限制
- 文本分享支持 pdf、word 文档、png 图片导出
- 支持自动保存草稿
  - 浏览器关闭前自动保存
  - 下次访问时可恢复
  - 提交成功后自动清除

### 📁 文件分享

- 支持拖拽上传
- 多文件上传
- 可设置单次上传文件大小限制和总存储限制
- 支持密码保护
- 可选过期时间
- 实时上传进度显示
- 文件预览功能
- 上传速度显示
- 支持取消上传
- 支持自定义链接后缀（仅单文件上传时可用）
- 支持二维码分享和直链分享
- 支持设置下载次数限制

### 🔐 访问控制

- 监控存储空间使用情况
- 密码保护
  - 支持文本和文件分享设置密码
  - 管理员可随时修改或移除密码
  - 密码加密存储
- 文本内容控制
  - 仅管理员可编辑已分享的文本内容
  - 普通用户只能查看
  - 支持修改过期时间
  - 支持修改访问次数限制
- 上传控制
  - 管理员可开启/关闭文本上传功能
  - 管理员可开启/关闭文件上传功能
  - 防止恶意上传占用资源

### 🛡️ 安全特性

- 密码加密存储
- 访问权限控制
- CORS 安全配置
- 上传限制保护
- 自动过期清理
  - 定时检查过期内容
  - 自动删除过期分享
  - 释放存储空间
  - 访问触发清理检查

### 🎨 界面优化

- 全分辨率自适应布局
- 优化的移动端适配
- 美化的滚动条样式
- 平滑的动画过渡效果
- 文件上传进度动画
- 复制成功提示动画
- 错误提示动画效果
- 拖放上传视觉反馈
- 暗色主题支持（有点瑕疵）

## 🚀 部署（自动）

### 1. GitHub Actions 部署(可选)

1. **Fork 本仓库**

   - 点击右上角的 Fork 按钮
   - 等待仓库克隆完成

2. **设置 GitHub Secrets**
   在你的 GitHub 仓库中，转到 Settings -> Secrets and variables -> Actions -> New Repository secrets ，添加以下 secrets：

   - `CF_API_TOKEN`: Cloudflare API 令牌

     - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
     - 创建新的 API 令牌 -选择"编辑 Cloudflare Workers"

   - `CF_ACCOUNT_ID`: Cloudflare 账户 ID

     - 在 Cloudflare 仪表板右侧可以找到

   - `ADMIN_USERNAME`: 管理员用户名

     - 设置你的管理员账号

   - `ADMIN_PASSWORD`: 管理员密码
     - 设置你的管理员密码

3. **运行工作流**

### 2. 一键部署

部署后默认无密码,需在 cloudflare 的对应 worker 下的变量和机密中设置：

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ling-drag0n/CloudPaste)

## 🚀 部署（手动）

### 1. 准备工作

1. 注册 [Cloudflare](https://dash.cloudflare.com) 账号
2. 进入 Cloudflare 控制台

### 2. 创建存储资源

1. 创建 KV 命名空间

   - 名称：`PASTE_STORE`
   - 用于存储文本内容

2. 创建 KV 命名空间

   - 名称：`UPLOAD_STATUS`
   - 用于存储上传功能的开关状态

3. 创建 R2 存储桶
   - 名称：`cloudpaste-files`
   - 用于存储上传的文件

### 3. 创建 Worker

1. 创建新的 Worker 脚本

2. 配置环境变量：

   ```env
   ADMIN_USERNAME=你的管理员用户名
   ADMIN_PASSWORD=你的管理员密码
   ```

3. 绑定存储：

   - KV 绑定：

     ```toml
     # 文本存储
     变量名：PASTE_STORE
     选择创建的 KV 命名空间

     # 上传状态控制
     变量名：UPLOAD_STATUS
     选择创建的 KV 命名空间
     ```

   - R2 绑定：
     ```toml
     变量名：FILE_STORE
     选择创建的 R2 存储桶
     ```

4. KV 命名空间说明：

   - `PASTE_STORE`: 用于存储文本分享内容和元数据
   - `UPLOAD_STATUS`: 用于存储和控制上传功能的开关状态
     - `textUpload`: 控制文本上传功能
     - `fileUpload`: 控制文件上传功能
   - `FILE_STORE`: 用于存储上传的文件

5. 配置示例代码 (wrangler.toml):

   ```toml
   [[kv_namespaces]]
   binding = "PASTE_STORE"
   id = "你的KV命名空间ID"

   [[kv_namespaces]]
   binding = "UPLOAD_STATUS"
   id = "你的KV命名空间ID"

   [[r2_buckets]]
   bucket_name = "cloudpaste-files"
   binding = "FILE_STORE"
   ```

### 4. 部署代码

1. 复制 `worker.js` 的完整代码
2. 粘贴到 Worker 的编辑器中
3. 保存并部署

## 🔧 代码结构说明

### 主要组件

1. `worker.js`

   - 主要的 Worker 代码
   - 包含路由处理和 API 实现

2. 工具函数

   - `generateId`: 生成随机 ID
   - `hashPassword`: 密码加密
   - `verifyPassword`: 密码验证
   - `calculateExpiryTime`: 计算过期时间
   - `isExpired`: 检查是否过期

3. 前端组件
   - Vue 3 应用
   - Markdown 渲染
   - 代码高亮
   - 文件上传界面

### 📡 API 端点

1. 文本相关

   ```http
   POST /api/paste     # 创建文本分享
   GET  /api/paste/:id # 获取文本内容
   ```

2. 文件相关

   ```http
   POST /api/file      # 上传文件
   GET  /api/file/:id  # 获取文件信息
   GET  /api/file/:id?download=true # 下载文件
   GET  /download/:id  # 直接下载文件
   ```

3. 管理相关
   ```http
   POST   /api/admin/login                    # 管理员登录
   GET    /api/admin/shares                   # 获取分享列表
   GET    /api/admin/storage                  # 获取存储空间使用情况
   DELETE /api/admin/paste/:id                # 删除文本分享
   DELETE /api/admin/file/:id                 # 删除文件分享
   PUT    /api/admin/paste/:id/content        # 更新文本内容
   PUT    /api/admin/paste/:id/password       # 修改文本分享密码
   PUT    /api/admin/file/:id/password        # 修改文件分享密码
   GET    /api/admin/upload-status            # 获取上传状态
   PUT    /api/admin/upload-status            # 更新上传状态
   PUT    /api/admin/file/:id/settings        # 修改文件分享设置
   ```

## 🔄 自动化功能

### 过期内容清理

- 自动检测过期内容
- 定时清理过期文件和文本
- 释放存储空间
- 每整点自动触发清理

## ⚠️ 使用限制

- 文件大小上限：98MB（可修改）
- 支持的过期时间：1 小时、1 天、7 天、30 天，永不过期
- 并发请求受 Worker 限制
- R2 免费总存储空间：10GB（可修改）
- 分享次数访问限制：
  - 文本分享可设置最大访问次数
  - 文件分享可设置最大下载次数
  - 自定义设置次数，0 表示无限制
  - 达到限制次数后自动删除
- 自定义链接限制：
  - 仅支持字母、数字、横线和下划线
  - 仅单文件上传时可用
- 存储空间预警：
  - 70%使用率时显示警告
  - 90%使用率时显示危险提示
  - 存储空间满时无法继续上传

## 📝 注意事项

1. 确保正确配置环境变量

2. 定期检查存储使用量

   - 通过管理面板监控存储空间
   - 注意存储空间使用率预警
   - 及时清理不需要的内容

3. 监控错误日志

4. 注意 Worker 使用配额

5. 直链下载若要在服务器传输文件

   ```bash
   # 直接下载
   curl -O https://your-domain/download/fileId

   # 带密码下载
   curl -H "X-Password: your-password" -O https://your-domain/download/fileId
   ```

## 🛠️ 使用

- Cloudflare Workers
- Cloudflare KV
- Cloudflare R2
- Vue 3
- Marked (Markdown 渲染)
- Highlight.js (代码高亮)

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 📄 许可证

MIT License

## 🔗 相关链接

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Vue 3 文档](https://v3.vuejs.org/)
- [Marked 文档](https://marked.js.org/)
