---
group: guide
name: watch
title: 监听模型变化
index: 5
---

# 监听模型变化


mota 中提供了一个 `watch` 函数，可用于装饰 React 组件的成员方法，`watch` 可以指定要要监听的「模型数据」，在模型数据发变化时，就会自动执行「被装饰的函数」，`watch` 还可以像 `autorun` 一样，声明自动执行一次，但不 `autorun` 还是不尽相同，主要有如下区别

- `autorun` 会自动收集依赖，而 `watch` 不会关心组件方法中有何依赖，需要手动指定依赖的模型数据
- `watch` 默认不会「自动执行」，需显式的指定立即执行参数，才会自动执行首次。
- `autorun` 依赖的是「模型数据」本身，而 `watch` 依赖的是每次的「计算结果」
 
示例

```js
import { Component } from 'react';
import { model, autorun } from 'mota';
import DemoModel from './models/demo';

@model(DemoModel)
export default Demo extends Component {

  @watch(model=>model.name)
  test() {
    console.log('name 发生变化');
  }

}
```

上边的代码，通过 watch 装饰了 `test` 方法，并指定了监听的模型数据 `model.name`，那么每当 `model.name` 发生变化，都会打印 `name 发生变化`.

`watch` 是取重新执行，取决于 `watch` 的首个参数（通常是一个匿名函数）的计算结果，每当依赖的模型数据发生变化，`watch` 都会重新计算，当计算结果有变化时，才会执行被装饰的「组件方法」，示例

```js
export default Demo extends Component {

  @watch(model=>model.name+model.age)
  test() {
    console.log('name 发生变化');
  }

}
```

有时，我们希望 `watch` 也能自动执行首次，那么可通过向第二个参数传一个 `true` 声明其自动执行

```js
export default Demo extends Component {

  @watch(model=>model.name,true)
  test() {
    console.log('name 发生变化');
  }

}
```

上边的 `test` 方法，将会在「组件挂载之后自动执行」，之后在 `model.name` 发生变化时也将自动执行。