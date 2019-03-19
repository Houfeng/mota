---
group: guide
name: use_model
title: 使用 Hook API
index: 7
---

# 使用 Hook API

### 简单介绍
在 React 发布包含 `Hooks` 的 `alpah` 版后，Mota 也在 `next` 版本中新增支持了 Hook 风格的 API，随着 React `v16.8` 版本的发布带来了稳定版的 `Hooks` 支持。

目前，Mota 已经在稳定版中，提供了 `Hook API` 的支持，利用 React 的 `Hooks` 可以让你在不编写类的情况下使用 `state` 和 React 的其他功能。而使用 Mota 极少的 `Hook API` 将给应用带来 Hook 风格可响应的全局状态管理支持。

### 基本用法

```js
import React from 'react';
import { render } from 'react-dom';

function App(){
  //通过 useModel 拿到一个可响应的 model
  const model = useModel({ count:0 });
  //定义累加按钮事件
  const onClick = useCallback(()=>model.count++);
  //--
  return <div>
    <div>{model.count}</div>
    <button onClick={onClick}>click me</button>
  </div>;
}

render(<App/>, document.getElementId('root'));
```

仅有一个新增 API `useModel`，通过 `useModel` 可在一个 `Function Component` 中使用 `model`，如同在 `Class Component` 中的 `@model`，此时的 `model` 依然是可响应的，执行时会对组件进行「依赖收集」，当操作 `model` 的成员时（比如 `model.count=1` 的赋值操作），Mota 会自动发现组件依赖的数据发生了变化并通知组件进行更新。

### 进阶说明

在基本用法中提到了一个关键词「依赖收集」，通过 `useModel` 拿到了可响应的 `model`，默认情况下只有被组件依赖的模型数据发生了变化组件才会更新，比如下边的示例代码中，只有在 `model.a` 发生变化时，组件才会重新渲染。


```js
function Demo(){
  const model = useModel({ a:0, b:1 });
  ...
  return <div>{model.a}</div>
}
```

实际开发过程中有时「组件依赖了模型上的某个对象，但希望这个对象的子成员发生变化时，组件也要重新渲染」

```js
function Demo(){
  const { info } = useModel({ info: { name: 'test'} });
  ...
  return <Info data={info}/>
}
```

因为对于 `Demo` 来说只依赖了 `info`，而 `info` 的引用是一直没有变化的，所以在 `info.name` 发生变化时 `Demo` 并不会重新渲染。那这样 `Info` 组件会一直显示旧的数据。

如何处理这个问题？

一个方法是让 `Info` 也通过 `useModel` 有自已的 `model`，那 `Info` 的依赖会被独立解析，比如

```js
function Info(props){
  const info = useModel(props.data);
  return <div>{info.name}</div>
}
```

这个虽然 `Demo` 不会重新渲染，但 Mota 会发现 `Info` 依赖了 `info.name`，但发现数据变化时，`Info` 会自动更新。

还有一个方法是，在更新 `info.name` 时换一个写法

```js
//通常的直接给 name 赋值
model.info.name = 'test';
//如下的给 info 赋值的写法，会让 Demo 发现 info 的变化
model.info = {...model.info, name: 'test'};
```

除了上述的两个方法，还有一个方法就是通过 `useModel` 的第二个参数显示的声明额外的依赖，第二个参数可是一个数组，数组中是显式声明的依赖，格式为子成员的路径，如下

```js
function Demo(){
  const { info } = useModel({ 
    info: { name: 'test'} 
  }, ['info.name']);
  ...
  return <Info data={info}/>
}
```

但有时时模型数据是一个数组，我们无法直接指定每个子元素的路径，这时第二个参数还可以是一个函数，函数的参数是「变化的模型数据的路径」，可参函数中返回 `boolean` 值决定是否需要更新组件，如下

```js
function Demo(){
  const { info } = useModel({ 
    info: [{name: 'test1'}] 
  }, p=> p.endsWith('.name'));
  ...
  return <Info data={info}/>
}
```

示例中通过用 `endsWith` 路径是不是 `*.name` 结尾的决定要不要更新，当然也可以用更多的判断方法决定要不要更新。