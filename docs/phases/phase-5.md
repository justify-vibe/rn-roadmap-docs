# 阶段五：打包 & 发布上架

**时长预估**：1～2 周 · **难度**：⭐⭐⭐

> 让你的 App 真正出现在应用商店里，完成从开发者到发布者的蜕变。

## 学习目标

- 用 EAS Build 打包 iOS 和 Android
- 成功将 App 提交到 App Store 和 Google Play
- 能独立解决上架过程中的常见问题

---

## 1. 发布前准备清单

在打包之前，确认以下事项：

- [ ] App 在 iOS 和 Android 真机上测试通过
- [ ] 所有 API Key 使用环境变量（不能硬编码）
- [ ] 有隐私政策页面（苹果要求）
- [ ] App 图标已准备好（1024×1024 PNG）
- [ ] 启动屏（Splash Screen）已配置
- [ ] App 名称、Bundle ID 已确定
- [ ] 版本号已设置（app.json 中的 `version`）

---

## 2. 配置 app.json

```json
{
  "expo": {
    "name": "记账本",
    "slug": "my-budget-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6c63ff"
    },
    "ios": {
      "bundleIdentifier": "com.yourname.budgetapp",
      "buildNumber": "1",
      "supportsTablet": false
    },
    "android": {
      "package": "com.yourname.budgetapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6c63ff"
      }
    }
  }
}
```

---

## 3. EAS Build 打包

EAS（Expo Application Services）是最简单的 RN 打包方案，无需本地配置 Xcode 或 Android Studio。

### 安装和初始化

```bash
npm install -g eas-cli
eas login
eas build:configure   # 生成 eas.json
```

### eas.json 配置

```json
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 执行打包

```bash
# 打包 Android（生成 .aab 文件）
eas build --platform android

# 打包 iOS（生成 .ipa 文件）
eas build --platform ios

# 同时打包两端
eas build --platform all
```

打包在 Expo 云端进行，通常需要 10～20 分钟。完成后可以从 Expo 控制台下载文件。

::: info 打包 iOS 不需要 Mac！
EAS Build 在云端完成构建，Windows 和 Linux 用户也可以打包 iOS App。
:::

---

## 4. 发布到 Google Play

### 准备工作

1. 注册 [Google Play 开发者账号](https://play.google.com/console)（$25 一次性费用）
2. 完成账号身份验证

### 上架步骤

**Step 1**：Google Play Console → 「创建应用」

**Step 2**：填写应用信息
- 应用名称（不超过 50 字符）
- 简短描述（不超过 80 字符）
- 完整描述（不超过 4000 字符）

**Step 3**：上传截图（必须）

| 设备 | 最小数量 | 尺寸要求 |
|------|---------|---------|
| 手机 | 2 张 | 16:9 或 9:16 |
| 平板（可选） | 1 张 | — |

**Step 4**：设置内容分级（填写问卷，自动生成分级）

**Step 5**：隐私政策 URL（必须）

**Step 6**：上传 .aab 文件 → 选择「正式版」轨道

**Step 7**：提交审核（通常数小时到 1 天）

---

## 5. 发布到 App Store

### 准备工作

1. 注册 [Apple Developer 账号](https://developer.apple.com)（$99/年）
2. 在 App Store Connect 创建 App 记录

### 上架步骤

**Step 1**：[App Store Connect](https://appstoreconnect.apple.com) → 「我的 App」→「+」

**Step 2**：填写基本信息
- 名称（不超过 30 字符）
- 副标题（不超过 30 字符，影响搜索）
- 关键词（不超过 100 字符，用逗号分隔，影响搜索排名）

**Step 3**：截图（必须）

| 设备 | 尺寸 | 数量 |
|------|------|------|
| iPhone 6.5 寸 | 1284×2778 | 最少 1 张，最多 10 张 |
| iPhone 5.5 寸 | 1242×2208 | 最少 1 张 |
| iPad（可选） | — | — |

**Step 4**：上传 .ipa 文件

```bash
# 通过 EAS 直接提交（推荐）
eas submit --platform ios

# 或手动：下载 Transporter App → 上传 .ipa
```

**Step 5**：填写隐私政策、支持 URL

**Step 6**：选择刚上传的构建版本 → 「提交以供审核」

**Step 7**：等待审核（通常 24～72 小时）

### 常见拒审原因

| 原因 | 解决方法 |
|------|---------|
| 没有隐私政策 | 创建一个，可用免费的隐私政策生成器 |
| App 崩溃 | 在真机上彻底测试，特别是登录和权限请求流程 |
| 截图与实际不符 | 使用真实截图，不要 PS 修改 |
| 描述过于宽泛 | 准确描述 App 的核心功能 |
| 仅是网页套壳 | 确保使用原生组件，有独特 App 体验 |

---

## 6. 图标和启动屏设计

### App 图标规范

```
iOS 图标
├── 尺寸：1024×1024 PNG
├── 不能有圆角（系统自动裁切）
├── 不能有透明通道
└── 不能有状态栏/按钮区域

Android 自适应图标
├── 前景图：108×108dp，安全区域 72×72dp
├── 背景图：纯色或渐变
└── 主体内容放在 72×72dp 安全区内
```

### 设计工具

- **[Figma](https://figma.com)**：设计原稿，导出 PNG
- **[Icon Kitchen](https://icon.kitchen)**：粘贴图片自动生成所有尺寸
- **[Canva](https://canva.com)**：模板快速设计

### 在 Expo 中配置

```json
// app.json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6c63ff"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6c63ff"
      }
    }
  }
}
```

---

## 7. 持续更新

### OTA 热更新（Expo Updates）

对于 JS 层的修改，可以绕过应用商店审核，直接推送更新：

```bash
eas update --branch production --message "修复登录 Bug"
```

> **注意**：原生层的修改（新增原生模块、修改权限等）必须重新提交应用商店审核。

---

## 🎉 恭喜！你已经完成全部五个阶段

### 接下来可以学习

| 方向 | 技术 |
|------|------|
| 代码质量 | TypeScript 类型安全 |
| 自动化测试 | Jest + React Native Testing Library |
| CI/CD | GitHub Actions + EAS |
| 数据分析 | Firebase Analytics / Mixpanel |
| 错误监控 | Sentry |
| 国际化 | i18next |

### 持续成长建议

1. **把你的 App 给真实用户用** — 真实反馈比任何教程都有价值
2. **参与开源项目** — 读别人的代码是快速提升的捷径
3. **加入社区** — React Native 官方 Discord、GitHub Discussions
4. **保持更新** — 关注 React Native 的 [博客](https://reactnative.dev/blog)
