# 茶安 · 红茶气象指数保险 沉浸式科普展示网站

## 项目简介

这是一个面向英德红茶种植户的气象指数保险科普推广网站，采用沉浸式单页应用设计，通过丰富的动画效果和可视化内容，向农户介绍红茶气象指数保险的产品保障、理赔触发条件、赔付计算方式、投保流程和参保条件。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **路由**: React Router v7 (BrowserRouter)
- **样式**: Tailwind CSS v4 + @tailwindcss/vite
- **动画**: GSAP 3.14 (ScrollTrigger 插件)
- **图标**: Lucide React + 自定义 SVG 图标
- **字体**: Noto Serif SC (标题) / Noto Sans SC (正文) / JetBrains Mono (数据)

## 环境要求

- **Node.js**: >= 18.0.0 (推荐 20.x LTS)
- **npm**: >= 9.0.0 (或使用 pnpm / yarn)
- **操作系统**: Windows / macOS / Linux 均可

## 快速开始

### 1. 安装依赖

```bash
npm install
```

如果安装速度较慢，可以使用国内镜像源：

```bash
npm install --registry=https://registry.npmmirror.com
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动后浏览器会自动打开 `http://localhost:3000`

### 3. 构建生产版本

```bash
npm run build
```

构建产物会输出到 `dist/` 目录

### 4. 本地预览生产构建

```bash
npm run preview
```

### 5. 类型检查

```bash
npm run typecheck
```

## 项目结构

```
tea-insurance-website/
├── public/
│   ├── images/                    # 所有图片资源（本地存储）
│   │   ├── hero-bg.jpg           # Hero 背景
│   │   ├── protection-bg.jpg     # 产品保障背景
│   │   ├── eligibility-bg.jpg    # 参保条件背景
│   │   ├── gallery-*.jpg         # 画廊图片（6张）
│   │   └── trigger-*.jpg         # 气象因子图片（3张）
│   └── favicon.svg               # 网站图标
├── src/
│   ├── components/
│   │   ├── icons/                 # 自定义 SVG 图标组件
│   │   │   ├── TeaLogo.tsx       # 品牌 Logo（茶叶+盾形）
│   │   │   ├── WeatherIcon.tsx   # 气象因子图标（冷/热/旱）
│   │   │   ├── ProtectionIcon.tsx # 保障要素图标
│   │   │   ├── ProcessIcon.tsx   # 投保流程图标
│   │   │   └── EntityIcon.tsx    # 参保主体图标
│   │   ├── sections/              # 页面区块组件
│   │   │   ├── Hero.tsx                  # 首屏
│   │   │   ├── ProtectionOverview.tsx    # 产品保障总览
│   │   │   ├── DevelopmentTimeline.tsx   # 发展历程
│   │   │   ├── MediaCoverage.tsx         # 媒体关注
│   │   │   ├── ClaimTriggers.tsx         # 理赔触发条件
│   │   │   ├── PayoutCalculator.tsx      # 赔付计算可视化
│   │   │   ├── ProcessTimeline.tsx       # 投保流程
│   │   │   ├── Eligibility.tsx           # 参保对象与条件
│   │   │   ├── TeaGallery.tsx            # 茶园印象画廊
│   │   │   └── ContactForm.tsx           # 投保咨询表单
│   │   ├── ui/
│   │   │   └── image.tsx         # 图片组件
│   │   ├── Layout.tsx            # 布局组件
│   │   ├── Navbar.tsx            # 导航栏
│   │   ├── Footer.tsx            # 页脚
│   │   └── TeaGrain.tsx          # 茶渍颗粒+茶叶粒子效果
│   ├── data/                      # 数据文件（可修改内容）
│   │   ├── insurance.ts          # 保障要素数据
│   │   ├── triggers.ts           # 气象因子数据
│   │   ├── formula.ts            # 赔付公式数据
│   │   ├── process.ts            # 投保流程数据
│   │   ├── eligibility.ts        # 参保条件数据
│   │   ├── gallery.ts            # 画廊数据
│   │   ├── footer.ts             # 页脚数据
│   │   ├── timeline.ts           # 发展历程数据
│   │   └── articles.ts           # 媒体报道数据
│   ├── hooks/
│   │   └── use-mobile.ts         # 移动端检测 Hook
│   ├── lib/
│   │   └── utils.ts              # 工具函数（cn 类名合并）
│   ├── pages/
│   │   ├── Home/
│   │   │   └── HomePage.tsx      # 首页
│   │   └── NotFoundPage/
│   │       └── NotFoundPage.tsx  # 404 页面
│   ├── app.tsx                   # 路由配置
│   ├── index.tsx                 # 应用入口
│   ├── index.css                 # 全局样式
│   ├── tailwind-theme.css        # Tailwind 主题变量
│   └── typography.css            # 排版样式
├── index.html                     # HTML 入口
├── package.json                   # 项目依赖和脚本
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── tsconfig.node.json             # Node 环境 TypeScript 配置
└── README.md                      # 本文件
```

## 页面区块说明

1. **Hero 首屏** - 茶园航拍背景 + 标题动画 + 数据滚动计数
2. **产品保障总览** - "一叶一险一障"视差文字 + 三张保障要素卡片
3. **发展历程** - 2022-2026 时间线，展示保险产品发展节点
4. **媒体关注** - 4篇权威报道卡片，点击跳转原文
5. **理赔触发条件** - 低温冷害/热害/干旱 三种因子卡片（大图+说明）
6. **赔付计算可视化** - 公式拆解 + 可点击变量说明 + 实时计算器
7. **投保流程** - 6步流程时间轴，悬停查看详情
8. **参保对象与条件** - 投保条件清单 + 4类参保主体
9. **茶园印象** - 横版轮播画廊，6张茶园主题图片
10. **投保咨询** - 浮动标签表单，提交模拟成功

## 自定义内容

### 修改文字内容

所有文案内容都在 `src/data/` 目录下的对应文件中，修改后保存即可热更新：

- 保障金额/保费：`src/data/insurance.ts`
- 气象因子：`src/data/triggers.ts`
- 赔付公式：`src/data/formula.ts`
- 投保流程：`src/data/process.ts`
- 参保条件：`src/data/eligibility.ts`
- 画廊图片：`src/data/gallery.ts`
- 页脚信息：`src/data/footer.ts`
- 发展历程：`src/data/timeline.ts`
- 媒体报道：`src/data/articles.ts`

### 替换图片

将你的图片放入 `public/images/` 目录，然后在对应的数据文件中修改 `imageUrl` 字段为 `/images/你的图片文件名.jpg`

建议图片规格：
- Hero 背景：1920×1080 (16:9)
- 区块背景：1920×1200 (16:10)
- 画廊图片：1920×1080 (16:9)
- 气象因子卡片：800×600 (4:3)

### 修改配色

配色变量在 `src/tailwind-theme.css` 中定义，主要颜色：

```css
--primary: #6B1D14;    /* 茶汤红 - 品牌主色 */
--accent: #C99A3B;     /* 焦糖金 - 强调色 */
--secondary: #2F4F3E;  /* 墨茶绿 - 次级背景 */
--background: #F5EFE0; /* 宣纸米白 - 浅色背景 */
--foreground: #1A120B; /* 深棕黑 - 深色背景 */
```

## 部署说明

### 静态托管

构建后的 `dist/` 目录可以直接部署到任何静态托管服务：

- **Vercel / Netlify**: 连接 Git 仓库，自动部署
- **Nginx**: 将 `dist/` 内容放到 Nginx 的 html 目录
- **GitHub Pages**: 使用 `gh-pages` 包部署
- **国内服务器**: 上传到阿里云 OSS / 腾讯云 COS 等

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/tea-insurance/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## 常见问题

### Q: 开发服务器启动后页面空白？
A: 检查浏览器控制台是否有报错，确认 `npm install` 已成功完成所有依赖安装。

### Q: 图片不显示？
A: 确认图片文件在 `public/images/` 目录下，且数据文件中的路径正确（以 `/images/` 开头）。

### Q: 动画不流畅？
A: GSAP 动画已做性能优化，如遇卡顿可减少 `TeaGrain.tsx` 中的粒子数量（默认15个）。

### Q: 如何修改导航菜单？
A: 编辑 `src/components/Navbar.tsx` 中的 `NAV_ITEMS` 数组。

### Q: 表单提交后数据发到哪里？
A: 当前为纯前端演示，表单提交仅显示成功提示，不发送到后端。如需对接后端，在 `ContactForm.tsx` 的 `handleSubmit` 函数中添加 API 调用。

## 浏览器兼容性

- Chrome / Edge: 最新两个版本
- Firefox: 最新两个版本
- Safari: 14+
- 移动端: iOS Safari / Android Chrome 最新版本

## 许可证

本项目仅供学习和演示使用。
