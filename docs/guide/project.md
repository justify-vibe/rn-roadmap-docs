# 推荐实战项目：记账 App

完成五个阶段学习后，建议以「**个人记账 App**」作为毕业项目。

## 为什么选记账 App？

- ✅ **覆盖面广**：涵盖列表、表单、图表、用户系统等 80% 核心知识点
- ✅ **难度适中**：不会过于简单，也不会让人望而却步
- ✅ **日常实用**：你自己就是用户，需求最真实
- ✅ **可以迭代**：基础版做完后，可以持续加功能

## 功能规划（MVP 版本）

### 核心功能

| 功能 | 技术点 |
|------|--------|
| 用户注册 / 登录 | Firebase Auth / Supabase Auth |
| 账单列表展示 | FlatList + 分组 |
| 添加收入/支出 | 表单 + react-hook-form |
| 分类标签管理 | 本地状态 + AsyncStorage |
| 月度统计图表 | react-native-gifted-charts |
| 数据云端同步 | Firestore / Supabase DB |

### 进阶功能（可选）

- 📸 拍照记录小票
- 🔔 每日记账提醒通知
- 💱 多货币支持
- 📤 导出 CSV 报表
- 🎯 预算设置与超支提醒

## 推荐技术栈

```
框架      Expo (SDK 51+)
导航      React Navigation v6
后端      Supabase（推荐）或 Firebase
状态      Zustand
表单      react-hook-form + zod
图表      react-native-gifted-charts
图标      @expo/vector-icons
样式      StyleSheet + NativeWind（可选）
打包      EAS Build
```

## 项目目录结构

```
src/
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.jsx
│   │   └── RegisterScreen.jsx
│   ├── home/
│   │   ├── HomeScreen.jsx        ← 账单列表
│   │   └── AddTransactionScreen.jsx
│   ├── stats/
│   │   └── StatsScreen.jsx       ← 图表统计
│   └── settings/
│       └── SettingsScreen.jsx
├── components/
│   ├── TransactionItem.jsx
│   ├── CategoryPicker.jsx
│   └── AmountInput.jsx
├── hooks/
│   ├── useTransactions.js
│   └── useAuth.js
├── services/
│   ├── supabase.js               ← 数据库封装
│   └── notifications.js
├── store/
│   └── useStore.js               ← Zustand store
├── utils/
│   ├── formatCurrency.js
│   └── groupByDate.js
└── constants/
    ├── categories.js
    └── theme.js
```

## 开发里程碑

**第 1 周**：搭建项目结构，完成导航框架，实现登录/注册页面

**第 2 周**：账单列表页 + 添加账单表单，数据存本地

**第 3 周**：接入 Supabase，实现云端数据同步

**第 4 周**：统计图表页，按月/分类展示

**第 5 周**：UI 打磨、性能优化、Bug 修复

**第 6 周**：打包测试，发布到 TestFlight / Google Play 内测

## 完成标志

当你能把这个 App 分享给朋友安装使用，并且能独立修复他们反馈的问题时，你就真正掌握了 React Native 开发。
