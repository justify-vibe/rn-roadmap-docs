# 新手注意事项

在正式开始之前，这些坑前人都踩过，提前了解可以少走很多弯路。

## 📦 先用 Expo，不要上来就搞原生配置

**原生开发环境（React Native CLI）配置非常繁琐**，需要安装 Xcode、Android Studio、配置环境变量等，一不小心就卡半天。

Expo 帮你封装了这一切，5 分钟内就能在手机上看到第一个 App：

```bash
npx create-expo-app MyApp
cd MyApp
npx expo start
```

::: tip 什么时候才需要"裸露"（Eject）？
当你需要用到 Expo 不支持的原生模块时才考虑 eject。对于 90% 的 App 需求，Expo 完全够用。
:::

## ⚛️ 先学 React，再学 RN

React Native **不是独立框架**，它是 React 在移动端的实现。如果你不懂：

- JSX 语法
- 组件和 Props
- `useState` / `useEffect`

直接上 RN 会非常痛苦。建议先完成 [React 官方教程](https://react.dev/learn)（井字棋游戏），再开始 RN。

## 📱 尽早用真机测试

模拟器有以下局限：

- 无法准确测试触摸手势和压力感应
- 性能表现与真机有差距
- 部分原生功能（相机、推送）行为不一致

**解决方法**：手机安装 [Expo Go](https://expo.dev/client)，扫码即可在真机上实时预览，改代码自动热更新。

## 🚫 避免一开始就引入大量第三方库

新手容易犯的错误：遇到问题就找库。

建议先用 RN 内置能力实现，理解原理后再引入库提效。例如：

- 先用 `Animated` API，再学 `react-native-reanimated`
- 先用 `fetch`，再引入 `axios`
- 先用 `useState` + `useContext`，再学 `Zustand`

## 🔄 版本兼容是老大难问题

RN 生态更新快，版本兼容经常出问题。

**建议做法**：
- 新项目用 Expo 管理的 SDK 版本，配套库版本已经过验证
- 升级前先看官方 [CHANGELOG](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)
- 不要随意升级，稳定比最新重要

## 📐 RN 样式与 CSS 有差异

| CSS | React Native |
|-----|-------------|
| `div` | `View` |
| `span` / `p` | `Text` |
| `<img>` | `<Image>` |
| `px` 单位 | 无单位（density-independent pixels）|
| 样式继承 | ❌ 不支持，每个组件独立 |
| CSS 选择器 | ❌ 不支持 |
| `flexDirection` 默认 `row` | 默认 `column` |

## 📲 Android 和 iOS 渲染有差异

同一套代码在两端可能显示不同，常见差异：

- 阴影：iOS 用 `shadow*` 属性，Android 用 `elevation`
- 字体：两端默认字体不同
- 状态栏高度：需要用 `SafeAreaView` 处理刘海屏

**原则**：开发时两端都要测，不能只看一端。

## ⌨️ 键盘遮挡输入框

在包含 `TextInput` 的页面，键盘弹出会遮住输入框，需要主动处理：

```jsx
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  {/* 表单内容 */}
</KeyboardAvoidingView>
```
