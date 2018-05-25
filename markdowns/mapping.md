---
group: guide
name:  mapping
title: 属性映射
index: 3
---

# 属性映射

在 React 中通常会将应用折分为多个组件重用它们，并在用时传递给它「属性」，mota 提供了将「组件属性」映射到「模型数据」的能力，基于 `model` 编程会让「视图层」的编写更为方例，专注于 UI 的呈现，如下

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

上边的代码，将组件 demo 的 `content` 属性映射到了 `model.value` 上，那么这个组件就可以这样使用了

```js
function App(){
  return <Demo content={'yyyy'} />;
}
```

`Demo` 组件的 `content` 属性，将自动被赋值给 `model.value`，如果没有 `mapping`，通常我们就需要在 `componentDidMount` 和 `componentWillReceiveProps` 之类的生命周函数去处理。其实，`mapping` 就像是一个语法糖，使用它将不再需要手动处理 prop->model 的更新了。