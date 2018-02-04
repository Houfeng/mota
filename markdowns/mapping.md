---
group: guide
name:  mapping
title: 属性映射
index: 3
---

# 属性映射

当你基于 `model` 编程时，你的「视图层」就会更干净，只关注「显示」相关的问题，在 React 中通常会将应用折分为多个组件重用它们，并在用时传递给它「属性」，mota 提供了将组件属性「映射到 model」的能力，如下

```js
@model({ value: 'demo' })
@mapping(['value'])
class Demo extends React.Component {
  render () {
    return <div>{this.model.value}</div>;
  }
}
```

上边的代码通过 `mapping` 将，`Demo` 这个组件的 `value` 这个属性映射到了 `model.value`，在属性 `value` 发生变化时，会自动同步到 `model.value` 中。

组件属性的模型中的成员变量，还可以不同名，通过一个 map 即可完成，如下:

```js
@model({ value: 'demo' })
@mapping({ content: 'value' })
class Demo extends React.Component {
  render () {
    return <div>{this.model.value}</div>;
  }
}
```

如上边的代码，即可将组件 demo 的 `content` 属性映射到了 `model.value` 上了。