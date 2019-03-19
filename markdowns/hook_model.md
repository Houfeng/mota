---
group: guide
name: hook_model
title: 面向 Hook 的模型
index: 8
---

# 面向 Hook 的模型

### 一些说明

针对 Mota 的 `useModel` 的模型本质上和针对 `@model` 的模型并无本质区别，用以往的风格编写的「模型类」或「单例的普通 Object」，除了能用于 `@model` 也是能用于 `useModel` 的。

既然用了 `Hook API`，是不是可在编写模型也避免再写「类」或「单例的 Object」？为此 `useModel` 还提供了用 `ES Module` 作为模型的支持，如用其他风格的模型一样，`ES Module` 风格的模型也不需要引用额外的依赖，仅用 `ES` 原生语法即可。

### 用 ES Module 编写模型

通过 `ES Module` 直接作为 `model` 的优点时「简单、直接」，同时由于为了保证「可响应」不被破坏，需要一点点约束，就是「必须导出一个 state 对象」，如下

```js
export const state = {
  name: 'test'
}

export function setName(name){
  state.name = name
}
```

上边的代码是一个最简单的可当作 `model` 的 `ES Module`，一个包含「state 和一组件函数」的 `ES Module` 就是一个可被 `useModel` 使用的 `model`，参考如下代码

```js
import * as demo from './models/demo';

function App(){
  const { name } = useModel(demo);
  return <div>{name}</div>;
}
```

注意：必须 export 一个 state 的约束只针对于 `ES Module`，用 `class` 或 `object` 的风格编写的 `model` 无任何约束。