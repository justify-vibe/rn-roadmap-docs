# 阶段一：基础知识储备

**时长预估**：2～4 周 · **难度**：⭐⭐

> 在学 RN 之前，先夯实 JavaScript 和 React 基础。这一步不能跳过，否则后面会寸步难行。

## 学习目标

完成本阶段后，你应该能够：

- 熟练使用 ES6+ 语法编写 JavaScript
- 理解 React 组件、Props、State 的概念
- 能独立完成 React 官方的井字棋教程
- 用 Git 管理自己的代码

---

## 1. JavaScript 核心（ES6+）

### 必学语法清单

**变量声明**

```js
// 用 const 声明不变的值，let 声明会变的值，不用 var
const name = 'Alice';
let count = 0;
```

**箭头函数**

```js
// 传统写法
function add(a, b) { return a + b; }

// 箭头函数
const add = (a, b) => a + b;
```

**解构赋值**

```js
// 对象解构
const { name, age } = user;

// 数组解构
const [first, second] = list;
```

**展开运算符**

```js
// 合并数组
const merged = [...arr1, ...arr2];

// 复制对象并修改某个字段
const updated = { ...user, age: 25 };
```

**Promise 和 async/await**

```js
// 异步请求
const fetchUser = async (id) => {
  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('请求失败', err);
  }
};
```

**模块系统**

```js
// 导出
export const PI = 3.14;
export default function App() {}

// 导入
import App, { PI } from './App';
```

**常用数组方法**

```js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);          // [2, 4, 6, 8, 10]  变换
nums.filter(n => n > 2);       // [3, 4, 5]          过滤
nums.reduce((sum, n) => sum + n, 0); // 15           累加
nums.find(n => n > 3);         // 4                  查找第一个
nums.some(n => n > 4);         // true               是否存在
nums.every(n => n > 0);        // true               是否全部满足
```

### 学习资源

- [javascript.info](https://javascript.info) — 最好的 JS 教程，有中文版
- [freeCodeCamp JavaScript 课程](https://freecodecamp.org) — 免费系统练习

---

## 2. React 核心概念

### JSX 语法

```jsx
// JSX 是 JavaScript + HTML 的混合语法
function Greeting({ name }) {
  return <h1>你好，{name}！</h1>;
}
```

### useState — 状态管理

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数：{count}
    </button>
  );
}
```

### useEffect — 副作用

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 组件挂载后执行（类似 componentDidMount）
    fetchUser(userId).then(setUser);
  }, [userId]); // 依赖数组：userId 变化时重新执行

  if (!user) return <p>加载中...</p>;
  return <p>{user.name}</p>;
}
```

### 列表渲染

```jsx
const items = ['苹果', '香蕉', '橙子'];

function FruitList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>  // key 是必须的！
      ))}
    </ul>
  );
}
```

### 条件渲染

```jsx
function Status({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>已登录</p> : <p>请登录</p>}
      {isLoggedIn && <button>退出</button>}
    </div>
  );
}
```

### 学习资源

- [react.dev](https://react.dev/learn) — React 官方文档，内含互动练习
- 完成[井字棋教程](https://react.dev/learn/tutorial-tic-tac-toe)作为结业检验

---

## 3. 开发工具配置

### 安装清单

```bash
# 1. 安装 Node.js（从 nodejs.org 下载 LTS 版本）
node --version   # v18+ 即可

# 2. 检查 npm
npm --version
```

### VS Code 必装插件

| 插件名 | 用途 |
|--------|------|
| ES7+ React/Redux/RN Snippets | 代码片段，`rafce` 快速生成组件 |
| Prettier | 自动格式化代码 |
| ESLint | 代码规范检查 |
| GitLens | Git 历史可视化 |

---

## 4. Git 基础

### 常用命令

```bash
git init                    # 初始化仓库
git add .                   # 暂存所有更改
git commit -m "feat: 添加登录页" # 提交（写有意义的信息）
git push origin main        # 推送到 GitHub

git pull                    # 拉取最新代码
git branch feature/login    # 创建分支
git checkout feature/login  # 切换分支
```

### Commit 信息规范

```
feat: 新功能
fix:  修复 Bug
docs: 文档更新
style: 样式调整
refactor: 重构
```

---

## 阶段检验

::: tip ✅ 完成标志
能独立完成 React 官方井字棋教程，并且理解其中每一行代码的含义，就可以进入阶段二。
:::

**进入阶段二之前，确认你能回答：**

1. `const` 和 `let` 的区别是什么？
2. `async/await` 解决了什么问题？
3. React 中为什么列表渲染需要 `key`？
4. `useEffect` 的依赖数组是什么意思？
