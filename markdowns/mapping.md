---
group: guide
name:  mapping
title: 属性映射
index: 3
---

# 属性映射

在 React 中通常会将应用折分为多个组件重用它们，并在用时传递给它「属性」，mota 提供了将「组件属性」映射到「模型数据」的能力，基于 `model` 编程会让「视图层」更单一，专注于 UI 的呈现，，如下

```js
@model({ value: 'demo' })
@mapping(['value'])
class Demo extends React.Component {
  render () {
    return <div>{this.model.value}</div>;
  }
}
```

上边的代码通过 `mapping` 将 `Demo` 这个组件的 `value` 属性映射到了 `model.value` 上，在组件的属性 `value` 发生变化时，会自动同步到 `model.value` 中。

通过一个 map 进行映射，还可以让「组件属性」和「模型的成员」使用不同名称，如下:

```js
@model({ value: 'demo' })
@mapping({ content: 'value' })
class Demo extends React.Component {
  render () {
    return <div>{this.model.value}</div>;
  }
}
```

上边的代码，将组件 demo 的 `content` 属性映射到了 `model.value` 上。