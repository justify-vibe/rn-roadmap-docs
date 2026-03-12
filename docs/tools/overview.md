# 核心工具总览

开发 React Native App 涉及到的工具链全景。

## 开发框架

### Expo（推荐新手）

[expo.dev](https://expo.dev) · 新手首选

Expo 是 RN 官方推荐的开发框架，封装了原生配置，让你专注在业务逻辑上。

```bash
npx create-expo-app MyApp
cd MyApp
npx expo start
```

**选 Expo 的理由：**
- 零配置启动，5 分钟跑起第一个 App
- 手机安装 Expo Go 扫码即可真机调试
- 内置大量常用 API（相机、位置、传感器）
- EAS Build 云端打包，不需要 Mac 也能打包 iOS

**什么时候考虑迁移到 RN CLI？**
- 需要自定义原生代码（Java/Swift/Kotlin）
- 使用不兼容 Expo 的原生模块
- 对 App 大小有极致要求

---

## 导航

### React Navigation

[reactnavigation.org](https://reactnavigation.org) · 业界标准

```bash
npm install @react-navigation/native
npm install @react-navigation/stack        # 堆叠导航
npm install @react-navigation/bottom-tabs  # 底部标签栏
npm install @react-navigation/drawer       # 侧边抽屉
```

| 导航类型 | 使用场景 | 示例 App |
|---------|---------|---------|
| Stack | 页面前进/后退 | 几乎所有 App |
| Tab | 平级页面切换 | 微信、Instagram |
| Drawer | 侧边菜单 | Gmail、Notion |
| Modal | 弹出覆盖层 | 分享面板、筛选器 |

---

## 状态管理

### Zustand（推荐新手）

[zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs)

- API 极简，学习成本约 30 分钟
- 支持持久化、中间件
- 性能好，按需订阅

### Redux Toolkit（大型项目）

[redux-toolkit.js.org](https://redux-toolkit.js.org)

- 功能完整，生态丰富
- 中大型团队项目标配
- 学习曲线较陡，新手不推荐

---

## 后端服务

### Supabase（推荐新手）

[supabase.com](https://supabase.com)

| 功能 | 说明 |
|------|------|
| 数据库 | PostgreSQL，支持 SQL 查询 |
| Auth | 邮箱、手机号、OAuth 登录 |
| Storage | 文件上传和管理 |
| Realtime | 数据实时订阅 |
| Edge Functions | 服务端逻辑 |

**免费额度**：500MB 数据库，1GB 存储，50000 月活用户

### Firebase（Google）

[firebase.google.com](https://firebase.google.com)

| 功能 | 说明 |
|------|------|
| Firestore | NoSQL 实时数据库 |
| Auth | 多种登录方式 |
| Storage | 文件存储 |
| FCM | 推送通知 |
| Analytics | 用户行为分析 |

---

## 样式方案

### StyleSheet（内置）

RN 原生样式方案，性能最好。

### NativeWind

[nativewind.dev](https://www.nativewind.dev) · 在 RN 中使用 Tailwind CSS 类名。

```bash
npm install nativewind tailwindcss
```

### React Native Paper

[callstack.github.io/react-native-paper](https://callstack.github.io/react-native-paper) · Material Design 组件库。

---

## 动画

### React Native Reanimated

[docs.swmansion.com/react-native-reanimated](https://docs.swmansion.com/react-native-reanimated)

- 动画运行在 UI 线程，60fps 流畅
- 支持手势驱动动画
- 现代 API 设计

### Moti

[moti.fyi](https://moti.fyi) · 基于 Reanimated 的高级封装，声明式动画 API。

---

## 存储方案

| 方案 | 特点 | 适用场景 |
|------|------|---------|
| AsyncStorage | 简单，异步 | Token、设置 |
| MMKV | 极快，同步 | 频繁读写 |
| expo-sqlite | 关系型数据库 | 复杂数据 |
| expo-secure-store | 加密存储 | 敏感信息 |

---

## 打包 & 发布

### EAS Build

[docs.expo.dev/build](https://docs.expo.dev/build/introduction) · Expo 官方云端打包服务。

```bash
npm install -g eas-cli
eas build --platform all
eas submit --platform all
```

---

## 调试工具

### Flipper

[fbflipper.com](https://fbflipper.com) · RN 官方推荐调试工具。

- 查看网络请求
- 布局检查器
- 日志查看
- 插件生态

### React Native Debugger

[github.com/jhen0409/react-native-debugger](https://github.com/jhen0409/react-native-debugger)

- 集成 Redux DevTools
- 网络请求监控
- React DevTools

---

## 图标库

### @expo/vector-icons

内置于 Expo，包含 5000+ 图标：

```jsx
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="home" size={24} color="#333" />
```

支持的图标集：Ionicons、MaterialIcons、FontAwesome、Feather 等。

浏览所有图标：[icons.expo.fyi](https://icons.expo.fyi)
