---
group: guide
name: watch
title: 监听模型变化
index: 5
---

# 监听模型变化


mota 中提供了一个 `watch` 函数，可用于装饰 React 组件的成员方法，`watch` 可以指定要观察的「模型数据」，在模型数据发变化时，就会自动执行「被装饰的组件方法」，`watch` 还可以像 `autorun` 一样自动执行一次，但它和 `autorun` 还是不尽相同，主要有如下区别

- `autorun` 会自动收集依赖，而 `watch` 不会关心组件方法中有何依赖，需要手动指定依赖的模型数据
- `watch` 默认不会「自动执行」，需显式的指定「立即执行参数为 true」，才会自动执行首次。
- `autorun` 依赖的是「模型数据」本身，而 `watch` 依赖的是「计算函数」每次的「计算结果」
 
示例

```js
import { Component } from 'react';
import { model, autorun } from 'mota';
import DemoModel from './models/demo';

@model(DemoModel)
export default Demo extends Component {

  @watch(model=>model.name)
  test() {
    console.log('name 发生了变化');
  }

}
```

上边的代码，通过 `watch` 装饰了 `test` 方法，并指定了观察的模型数据 `model.name`，那么每当 `model.name` 发生变化时，都会打印 `name 发生了变化`.

`watch` 是否重新执行，取决于 `watch` 的作为第一个参数传给它的「计算函数」的计算结果，每当依赖的模型数据发生变化时 `watch` 都会重执行计算函数，当计算结果有变化时，才会执行被装饰的「组件方法」，示例

```js
export default Demo extends Component {

  @watch(model=>model.name+model.age)
  test() {
    console.log('name 发生变化');
  }

}
```

有时，我们希望 `watch` 能首先自动执行一次，那么可通过向第二个参数传一个 `true` 声明这个 `watch` 要自动执行一次。

```js
export default Demo extends Component {

  @watch(model=>model.name,true)
  test() {
    console.log('name 发生变化');
  }

}
```

上边的 `test` 方法，将会在「组件挂载之后自动执行」，之后在 `model.name` 发生变化时也将自动重新执行。