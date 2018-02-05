---
group: guide
name: autorun
title: 自执行函数
index: 4
---

# 自执行函数

mota 中提供了一个 `autorun` 函数，可用于装饰 React 组件的成员方法，被装饰的「成员方法」将会在组件挂载后自动执行一次，mota 将「收集方法中依赖的模型数据」，在依赖的模型数据发生变化时会「自动重新执行」对应的组件方法。

示例

```js
import { Component } from 'react';
import { model, autorun } from 'mota';
import DemoModel from './models/demo';

@model(DemoModel)
export default Demo extends Component {

  @autorun
  test() {
    console.log(this.model.name);
  }

}
```

上边的示例代码中，组件在被挂载后将会自动执行 `test` 方法，同时 mota 会发现方法中依赖了 `model.name`，那么，在 `model.name` 发生变化时，就会重新执行 `test` 方法。