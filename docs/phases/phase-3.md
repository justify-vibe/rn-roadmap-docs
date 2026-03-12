# 阶段三：进阶功能开发

**时长预估**：4～6 周 · **难度**：⭐⭐⭐⭐

> 学习实际 App 必备的数据管理、网络请求、本地存储等功能，让你的 App 能处理真实数据。

## 学习目标

- 能用 Zustand 管理跨组件状态
- 能封装 API 请求并处理 loading/error 状态
- 能将数据持久化到本地存储
- 能用 react-hook-form 处理表单验证
- 做一个天气 App 或新闻阅读 App

---

## 1. 状态管理

### 什么时候需要状态管理？

当多个不相关的组件需要共享同一份数据时，逐层传 Props 会很麻烦，这时需要状态管理。

### 方案一：Context API（React 内置）

适合**简单场景**：主题色、用户信息、语言设置。

```jsx
// 1. 创建 Context
const UserContext = createContext(null);

// 2. 在顶层 Provider 提供数据
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. 在任意子组件消费
function Profile() {
  const { user } = useContext(UserContext);
  return <Text>{user?.name}</Text>;
}
```

::: warning Context 的性能问题
Context value 变化时，所有消费该 Context 的组件都会重渲染。频繁更新的数据（如购物车数量）不适合放 Context。
:::

### 方案二：Zustand（推荐新手）

```bash
npm install zustand
```

**极简 API，学习成本极低：**

```js
// store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // 状态
  todos: [],
  user: null,

  // 操作
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }]
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    })),

  setUser: (user) => set({ user }),
}));

export default useStore;
```

```jsx
// 在任意组件中使用
function TodoList() {
  const { todos, addTodo } = useStore();
  // ...
}
```

**Zustand 持久化（数据重启后不丢失）：**

```bash
npm install zustand
npx expo install @react-native-async-storage/async-storage
```

```js
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
  persist(
    (set) => ({ todos: [], addTodo: () => {} }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 2. 网络请求

### 封装 API 层

养成好习惯：把所有请求封装在独立文件，不要在组件里直接写 `fetch`。

```js
// services/api.js
const BASE_URL = 'https://api.example.com';

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const api = {
  getUser: (id) => request(`/users/${id}`),
  createPost: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) }),
};
```

### 在组件中使用

```jsx
function UserScreen({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>加载失败：{error.message}</Text>;
  return <Text>{user.name}</Text>;
}
```

### 用 axios（推荐，功能更强）

```bash
npm install axios
```

```js
// services/axios.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 请求拦截器（自动附加 token）
http.interceptors.request.use((config) => {
  const token = getToken(); // 从存储中读取
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截器（统一错误处理）
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) logout();
    return Promise.reject(err);
  }
);

export default http;
```

---

## 3. 本地存储

### AsyncStorage（最简单）

```bash
npx expo install @react-native-async-storage/async-storage
```

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储（只能存字符串，对象需要 JSON.stringify）
await AsyncStorage.setItem('user', JSON.stringify({ name: 'Alice' }));

// 读取
const raw = await AsyncStorage.getItem('user');
const user = raw ? JSON.parse(raw) : null;

// 删除
await AsyncStorage.removeItem('user');
```

### MMKV（高性能，推荐）

比 AsyncStorage 快约 10 倍，支持同步读写。

```bash
npm install react-native-mmkv
```

```js
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

// 同步读写，无需 await
storage.set('user.name', 'Alice');
storage.set('user.age', 25);

const name = storage.getString('user.name'); // 'Alice'
const age = storage.getNumber('user.age');   // 25

storage.delete('user.name');
```

### 选择建议

| 方案 | 适合场景 | 性能 |
|------|----------|------|
| AsyncStorage | 简单 key-value，存 token/设置 | 一般 |
| MMKV | 频繁读写，对性能有要求 | 极快 |
| expo-sqlite | 复杂结构化数据，需要 SQL 查询 | 好 |

---

## 4. 表单处理

### react-hook-form

```bash
npm install react-hook-form
```

```jsx
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data) => {
    console.log(data); // { email: '...', password: '...' }
    // 调用登录 API
  };

  return (
    <View>
      {/* 邮箱输入 */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: '邮箱不能为空',
          pattern: { value: /\S+@\S+\.\S+/, message: '邮箱格式不正确' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            placeholder="邮箱"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

      {/* 密码输入 */}
      <Controller
        control={control}
        name="password"
        rules={{ required: '密码不能为空', minLength: { value: 6, message: '密码至少 6 位' } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            placeholder="密码"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>登录</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## 5. 动画基础

### Animated API（RN 内置）

```jsx
import { Animated, useRef } from 'react-native';

function FadeIn({ children }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true, // 必须加！在原生线程运行，性能更好
    }).start();
  }, []);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
```

### React Native Reanimated（进阶）

```bash
npm install react-native-reanimated
```

```jsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function SpringButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.95); }}
        onPressOut={() => { scale.value = withSpring(1); }}
      >
        <Text>弹簧按钮</Text>
      </Pressable>
    </Animated.View>
  );
}
```

---

## 6. 推送通知

```bash
npx expo install expo-notifications
```

```js
import * as Notifications from 'expo-notifications';

// 配置通知显示方式
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 请求权限
const { status } = await Notifications.requestPermissionsAsync();
if (status !== 'granted') return;

// 发送本地通知（定时）
await Notifications.scheduleNotificationAsync({
  content: {
    title: '记得记账！',
    body: '今天还没有添加支出记录',
  },
  trigger: {
    hour: 21,
    minute: 0,
    repeats: true,
  },
});
```

---

## 阶段练习：天气 App

用免费的 [OpenWeatherMap API](https://openweathermap.org/api) 做一个天气 App，串联本阶段所学。

**功能要求：**

- 搜索城市名查看天气（网络请求 + 加载状态）
- 显示当前温度、天气描述、湿度（数据渲染）
- 最近搜索历史（本地存储）
- 搜索框表单验证（react-hook-form）

---

## 阶段检验

::: tip ✅ 完成标志
天气 App 功能完整，能正确处理网络错误和加载状态。
:::
