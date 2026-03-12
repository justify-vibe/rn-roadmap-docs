# 阶段四：完整项目开发

**时长预估**：4～8 周 · **难度**：⭐⭐⭐⭐⭐

> 选择一个你感兴趣的 App 方向，从头到尾独立开发。这是最重要的阶段，学到的东西最多。

## 学习目标

- 能从 0 到 1 独立规划并开发一个 App
- 掌握用户认证（登录/注册/保持登录）
- 能接入 Firebase 或 Supabase 作为后端
- 能处理常见性能问题
- App 能给真实用户使用

---

## 1. 项目规划

### Step 1：明确 MVP 功能

先列出所有想要的功能，然后**砍掉 70%**，只保留核心。

| 想要的功能 | 是否 MVP |
|-----------|----------|
| 添加/删除账单 | ✅ 是 |
| 账单列表 | ✅ 是 |
| 月度统计图表 | ✅ 是 |
| 用户登录 | ✅ 是 |
| 多货币支持 | ❌ 以后加 |
| 拍照记录小票 | ❌ 以后加 |
| 数据导出 CSV | ❌ 以后加 |

> **范围蔓延（Scope Creep）是新手最大的敌人。** 先做能用的，再做好用的。

### Step 2：画线框图

用 [Figma](https://figma.com)（免费）或纸笔画出每个页面的布局：

```
登录页 → 首页（账单列表）→ 添加账单页
                       ↓
                   统计页（图表）
                       ↓
                   设置页（退出登录）
```

### Step 3：规范目录结构

```
src/
├── screens/          # 页面（每个页面一个文件）
│   ├── auth/
│   │   ├── LoginScreen.jsx
│   │   └── RegisterScreen.jsx
│   ├── home/
│   │   ├── HomeScreen.jsx
│   │   └── AddTransactionScreen.jsx
│   ├── stats/
│   │   └── StatsScreen.jsx
│   └── settings/
│       └── SettingsScreen.jsx
├── components/       # 可复用组件
│   ├── TransactionItem.jsx
│   ├── CategoryPicker.jsx
│   └── Button.jsx
├── hooks/            # 自定义 Hook
│   ├── useTransactions.js
│   └── useAuth.js
├── services/         # API 和外部服务封装
│   ├── supabase.js
│   └── notifications.js
├── store/            # 全局状态（Zustand）
│   └── useStore.js
├── utils/            # 工具函数
│   ├── formatCurrency.js
│   └── groupByDate.js
└── constants/        # 常量
    ├── categories.js
    └── theme.js
```

---

## 2. 后端接入

### 方案对比

| | Supabase | Firebase |
|--|----------|----------|
| 数据库 | PostgreSQL（关系型） | Firestore（NoSQL） |
| 适合背景 | 熟悉 SQL | 熟悉 NoSQL |
| 实时功能 | ✅ 支持 | ✅ 支持 |
| 免费额度 | 慷慨 | 慷慨 |
| 文档友好度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 推荐新手 | ✅ 推荐 | 可选 |

### Supabase 快速接入

```bash
npm install @supabase/supabase-js
npx expo install expo-secure-store
```

```js
// services/supabase.js
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);
```

**CRUD 操作示例：**

```js
// 查询
const { data, error } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// 插入
const { error } = await supabase
  .from('transactions')
  .insert({ amount: 100, category: '餐饮', user_id: userId });

// 删除
const { error } = await supabase
  .from('transactions')
  .delete()
  .eq('id', transactionId);
```

---

## 3. 用户认证系统

### 注册 / 登录

```js
// 注册
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// 登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// 退出
await supabase.auth.signOut();
```

### 保持登录状态

```jsx
// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 监听登录状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
```

### 权限路由控制

```jsx
// App.js
function App() {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
```

---

## 4. 性能优化

### FlatList 优化

```jsx
<FlatList
  data={transactions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TransactionItem item={item} />}
  // 优化配置
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  })}
  windowSize={10}              // 渲染窗口大小
  removeClippedSubviews        // 裁剪不可见视图
  maxToRenderPerBatch={10}     // 每次渲染批量
  initialNumToRender={15}      // 初次渲染数量
/>
```

### 避免不必要的重渲染

```jsx
// React.memo：Props 不变时跳过渲染
const TransactionItem = React.memo(({ item, onDelete }) => {
  return (
    <View>
      <Text>{item.amount}</Text>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text>删除</Text>
      </TouchableOpacity>
    </View>
  );
});

// useCallback：缓存函数引用
const handleDelete = useCallback((id) => {
  deleteTransaction(id);
}, [deleteTransaction]);

// useMemo：缓存计算结果
const totalAmount = useMemo(
  () => transactions.reduce((sum, t) => sum + t.amount, 0),
  [transactions]
);
```

### 图片优化

```bash
npm install react-native-fast-image
```

```jsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: 'https://example.com/avatar.jpg',
    priority: FastImage.priority.normal,
    cache: FastImage.cacheControl.immutable,
  }}
  style={{ width: 40, height: 40, borderRadius: 20 }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

---

## 5. UI 组件库

### 选项对比

| 库 | 风格 | 上手难度 | 推荐指数 |
|----|------|---------|---------|
| React Native Paper | Material Design | ⭐⭐ | ⭐⭐⭐⭐ |
| NativeWind | Tailwind CSS | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| NativeBase | 自定义 | ⭐⭐⭐ | ⭐⭐⭐ |

### NativeWind（推荐）

```bash
npm install nativewind tailwindcss
```

用 Tailwind 类名写 RN 样式，效率极高：

```jsx
import { View, Text, TouchableOpacity } from 'react-native';

function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      className="bg-indigo-500 px-6 py-3 rounded-xl active:opacity-80"
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-base text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

---

## 阶段检验

::: tip ✅ 完成标志
App 能让真实用户安装并使用，且你能独立修复用户反馈的 Bug。
:::
