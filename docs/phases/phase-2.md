# 阶段二：React Native 入门

**时长预估**：3～4 周 · **难度**：⭐⭐⭐

> 使用 Expo 快速搭建 RN 环境，学习移动端独有的核心概念，在手机上看到自己的第一个 App。

## 学习目标

- 在手机上运行自己的第一个 RN App
- 掌握核心 UI 组件的用法
- 能用 Flexbox 布局任意页面
- 实现多页面跳转和参数传递
- 完成一个 Todo App

---

## 1. 搭建 Expo 项目

### 5 分钟快速开始

```bash
# 创建项目
npx create-expo-app MyApp
cd MyApp

# 启动开发服务器
npx expo start
```

启动后终端会显示一个二维码：

1. iPhone：打开相机扫码，自动跳转 Expo Go
2. Android：在 Expo Go App 内扫码

> 手机需先安装 [Expo Go](https://expo.dev/client)

### 项目结构说明

```
MyApp/
├── App.js            ← 入口文件，从这里开始
├── assets/           ← 图片、字体等静态资源
├── app.json          ← App 配置（名称、图标、版本）
├── package.json
└── node_modules/
```

### 模拟器（可选）

```bash
# iOS 模拟器（需要 Mac + Xcode）
npx expo start --ios

# Android 模拟器（需要 Android Studio）
npx expo start --android
```

---

## 2. 核心 UI 组件

RN 没有 `div`、`span`、`p` 等 HTML 标签，用以下组件替代：

### View — 万能容器

```jsx
import { View } from 'react-native';

// 相当于 <div>，用于布局和包裹
<View style={{ flex: 1, padding: 16 }}>
  {/* 子元素 */}
</View>
```

### Text — 文字显示

```jsx
import { Text } from 'react-native';

// 所有文字必须放在 Text 组件里，不能直接写裸文字
<Text style={{ fontSize: 18, color: '#333' }}>
  Hello, World!
</Text>
```

### Image — 图片

```jsx
import { Image } from 'react-native';

// 本地图片
<Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />

// 网络图片（必须指定 width 和 height）
<Image source={{ uri: 'https://example.com/photo.jpg' }} style={{ width: 200, height: 200 }} />
```

### ScrollView vs FlatList

```jsx
// ScrollView：内容少时用，一次渲染所有内容
<ScrollView>
  <Text>内容1</Text>
  <Text>内容2</Text>
</ScrollView>

// FlatList：长列表用，虚拟化渲染，性能好
<FlatList
  data={items}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

::: warning ⚠️ 注意
列表超过 20 条必须用 `FlatList`，`ScrollView` 会一次渲染所有项目，数据量大时会卡顿。
:::

### TextInput — 输入框

```jsx
import { TextInput, useState } from 'react-native';

const [text, setText] = useState('');

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="请输入..."
  placeholderTextColor="#999"
  style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
  keyboardType="numeric"       // 数字键盘
  secureTextEntry={true}       // 密码输入
  autoCapitalize="none"        // 关闭自动大写
/>
```

### 可点击组件

```jsx
import { TouchableOpacity, Pressable } from 'react-native';

// TouchableOpacity：点击时降低透明度
<TouchableOpacity onPress={() => console.log('点击了')} activeOpacity={0.7}>
  <Text>点我</Text>
</TouchableOpacity>

// Pressable：更灵活，可感知按压状态
<Pressable
  onPress={handlePress}
  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
>
  <Text>按钮</Text>
</Pressable>
```

---

## 3. Flexbox 布局

RN 的布局 **100% 基于 Flexbox**，与 CSS 有以下关键差异：

| 属性 | CSS 默认值 | RN 默认值 |
|------|-----------|----------|
| `flexDirection` | `row` | **`column`** |
| `alignContent` | `stretch` | `flex-start` |
| 单位 | `px`、`%`、`rem` | **无单位** |

### 常用布局模式

**水平居中**

```jsx
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>居中内容</Text>
</View>
```

**顶部导航栏**

```jsx
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
  <Text>← 返回</Text>
  <Text>标题</Text>
  <Text>设置</Text>
</View>
```

**底部固定按钮**

```jsx
<View style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>{/* 内容区 */}</View>
  <View style={{ padding: 16 }}>{/* 底部按钮 */}</View>
</View>
```

---

## 4. StyleSheet 样式

```jsx
import { StyleSheet, View, Text } from 'react-native';

function Card({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

// 推荐用 StyleSheet.create()，性能比内联样式好
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    // iOS 阴影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android 阴影
    elevation: 3,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
```

---

## 5. React Navigation 导航

### 安装

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

### Stack Navigator（最常用）

```bash
npm install @react-navigation/stack
npx expo install react-native-gesture-handler
```

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**页面跳转和传参**

```jsx
// 跳转并传参
navigation.navigate('Detail', { id: 42, name: '商品名' });

// 接收参数
function DetailScreen({ route }) {
  const { id, name } = route.params;
  return <Text>{name}</Text>;
}
```

### Tab Navigator（底部标签栏）

```bash
npm install @react-navigation/bottom-tabs
```

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen name="首页" component={HomeScreen} />
  <Tab.Screen name="统计" component={StatsScreen} />
  <Tab.Screen name="设置" component={SettingsScreen} />
</Tab.Navigator>
```

---

## 6. 阶段练习：Todo App

用本阶段所学，独立完成一个 Todo App。

### 功能要求

- ☑ 显示任务列表（`FlatList`）
- ☑ 添加新任务（`TextInput` + 按钮）
- ☑ 点击任务标记完成（文字划线）
- ☑ 删除任务（长按或右侧删除按钮）
- ☑ 至少 2 个页面（列表页 + 关于页）

### 核心实现参考

```jsx
const [todos, setTodos] = useState([]);
const [input, setInput] = useState('');

const addTodo = () => {
  if (!input.trim()) return;
  setTodos([...todos, { id: Date.now(), text: input, done: false }]);
  setInput('');
};

const toggleTodo = (id) => {
  setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
};

const deleteTodo = (id) => {
  setTodos(todos.filter(t => t.id !== id));
};
```

---

## 阶段检验

::: tip ✅ 完成标志
Todo App 能在 iOS 和 Android 上正常运行，且你理解每一行代码。
:::

进入阶段三之前，确认你能回答：

1. `FlatList` 和 `ScrollView` 的区别？什么时候用哪个？
2. RN 的 `flexDirection` 默认是什么方向？
3. 如何在两个页面之间传递参数？
4. `StyleSheet.create()` 和内联样式有什么区别？
