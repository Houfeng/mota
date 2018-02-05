---
group: guide
name: binding
title: 数据绑定
index: 6
---

# 数据绑定


### 基本用法

不要惊诧，就是「双向绑定」。`mota` 主张「面向对象」，同样也不排斥「双向绑定」，使用 mota 能够实现类似 `ng` 或 `vue` 的绑定效果。还是前边小节中的模型，我们来稍微改动一下组件的代码

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

其中的「关键」就是 `@binding`，使用 `@binding` 后，组件便具备了「双向绑定」的能力，在 `jsx` 中便可以通过名为 `data-bind` 的自定义 `attribute` 进行绑定了，`data-bind` 的值是一个「绑定表达式字符串」，绑定表达式执行的 `scope` 是 `model` 而不是 `this`，也就是只能与 `模型的成员` 进行绑定。

会有一种情况是当要绑定的数据是一个循环变量时，「绑定表达式」写起会较麻烦也稍显长，比如

```js
@model(userModel)
@binding
class App extends React.Component {
  render(){
    const { userList } = this.model;
    return <ul>
     {userList.map((user,index)=>(
       <li key={user.id}>
         <input type="checkobx" data-bind={`userList[${index}].selected`}>
         {user.name}
       </li>
     ))}
    </ul>;
  }
}
```

因为「绑定表达式」的执行 `scope` 默认是 `this.model`，以及「表达式是个字符串」，看一下 `userList[${index}].selected` 这并不友好，为此 mota 还提供了一个名为 `data-scope` 的 `attribute`，通过它能改变要绑定的 `scope`，参考如下示例

```js
@model(userModel)
@binding
class App extends React.Component {
  render(){
    const { userList } = this.model;
    return <ul>
     {userList.map(user=>(
       <li key={user.id}>
         <input type="checkobx" data-scope={user} data-bind="selected">
         {user.name}
       </li>
     ))}
    </ul>;
  }
}
```

通过 `data-scope` 将 `input` 的绑定上下文对象声明为当前循环变量 `user`，这样就可以用 `data-bind` 直接绑定到对应 `user` 的属性上了。

### 原生表单控件

所有的原生表单控件，比如「普通 input、checkbox、radio、textarea、select」都可以直接进行绑定。其中，「普通 input 和 textrea」比较简单，将一个字符类型的模型数据与控件绑定就行了，而对于「checkbox 和 radio」 有多种不同的绑定形式。

将「checkbox 或 radio」绑定到一个 `boolean` 值，此时会将 checkbox 或 radio 的 checked 属性和模型数据建立绑定，checked 反应了 `boolean` 变量的值，参考如下示例

```js
@model({ selected:false })
@binding
class App extends React.Component {
  render(){
    return <div>
      <input type="checkbox" data-bind="selected"/>
      <input type="radio" data-bind="selected"/>
    </div>;
  }
}
```

如上示例通过 `this.model.selected` 就能拿到当前 checkbox 或 radio 的选中状态。


将 checkbox 绑定到一个「数组」，通常是多个 checkbox 绑定同一个数组变量上，此时和数据建立绑定的是 checkbox 的 value，数据中会包含当前选中的 checkbox 的 value，如下

```js
@model({ selected:[] })
@binding
class App extends React.Component {
  render(){
    return <div>
      <input type="checkbox" data-bind="selected" value="1"/>
      <input type="checkbox" data-bind="selected" value="2"/>
    </div>;
  }
}
```

如上示例，通过 `this.selected` 就能知道当前有哪些 checkbox 被选中了，并拿到所有选中的 value


将多个 radio 绑定我到一个「字符类型的变量」，此时和数据建立绑定的是 raido 的 value，因为 radio 是单选的，所以对应的数据是当前选中的 radio 的 value，如下

```js
@model({ selected:'' })
@binding
class App extends React.Component {
  render(){
    return <div>
      <input type="radio" data-bind="selected" value="1"/>
      <input type="radio" data-bind="selected" value="2"/>
    </div>;
  }
}
```
通过 `this.model.selected` 就能拿到当前选中的 radio 的 value


### 自定义组件

但是对于一些「组件库」中的「部分表单组件」不能直接绑定。