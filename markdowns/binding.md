---
group: guide
name: binding
title: 数据绑定
index: 6
---

# 数据绑定

不要惊诧，就是「双向绑定」。`mota` 主张「面向对象」，同样也不排斥「双向绑定」，使用 mota 能够实现类似 `ng` 或 `vue` 的绑定效果。还是刚刚的模型，我们来稍微改动一下组件的代码

```js
import { model,binding } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

@model(User)
@binding
class App extends React.Component {
  render(){
    const { fullName, firstName, popup } = this.model;
    return <div>
      <p>{fullName}</p>
      <p>
        <input data-bind="firstName"/>
        <button onClick={popup}> click me </button>
      </p>
    </div>;
  }
}
ReactDOM.render(<App/>, mountNode);
```

其中的「关键」就是 `@binding`，使用 `@binding` 后，组件便具备了「双向绑定」的能力，在 `jsx` 中便可以通过名为 `data-bind` 的 `attribute` 进行「绑定表达式」的声明，绑定表达式的 `scope` 是 `model` 而不是 `this`，也就是只能与 `model` 进行绑定。


注意一下，默认情况下，所有的「原生表单组件」，比如 `input`、`textarea`、`select` 都可以直接进行绑定，但是对于一些「组件库」中的「部分表单组件」不能直接绑定。