![logo](./docs/logo.jpg)

<div align="center">

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
[![Build Status](https://www.travis-ci.org/Houfeng/mota.svg?branch=master)](https://www.travis-ci.org/Houfeng/mota)
[![Coverage Status](https://coveralls.io/repos/github/Houfeng/mota/badge.svg?branch=dev)](https://coveralls.io/github/Houfeng/mota?branch=dev)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)

</div>

## 简述

React 是一个「视图层」的 UI 框架，以常见的 MVC 来讲 React 仅是 View，而我们在编写应用时，通常还需要关注更加重要的 model，对于 React 来讲，我们常常需要一个「状态管理」库。然而，目前大多数针对 React 的状态管理库都需要对其「强依赖」，用其编写的代码并不能轻易在其它地方重用，通过这些框架还具有「排它性」，但是「业务模型」应该是没有过多依赖，应该是无关框架的，它应该随时可以被用在任何合适的 JavaScript 环境中，使用 mota 你可以用原生的普通的 JavaScript 代码编写你的「业务模型」，并让你的「业务模型」轻易在不同框架、不同运行环境下重用。

mota 是一个主张「面向对象」的、支持「双向绑定」的 React 应用辅助库，基于 mota 你可以用纯 JavaScript 为应用编写完全面向对象的「业务模型」，还可以将现有「业务模型」关联到 React 应用中。

## 示例

[在线 TodoList 示例](http://houfeng.net/dn-template-mota/example/)
[示例源码](https://github.com/Houfeng/dn-template-mota)

## 安装

```sh
$ npm i mota --save
```

## 使用

### 1. 定义模型

```js
export default class User {
  firstName = 'jack';
  lastName = 'hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
  popup = () => {
    alert(this.fullName);
  }
}
```

在 mota 中「模型」是一个或多个「类」，按照你已有的「面向对象」的知识设计你的「业务模型」就行了。


### 2. 关联组件
```js
import { model } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

@model(User)
class App extends React.Component {
  onFilstNameChange = event=> {
    this.model.firstName= event.target.value;
  };
  render () {
    const { fullName, firstName, popup } = this.model;
    return <div>
      <p>{fullName}</p>
      <p>
        <input onChange={this.onFilstNameChange} value={firstName}/>
        <button onClick={popup}></button>
      </p>
    </div>;
  }
}
ReactDOM.render(<App/>, mountNode);
```

在「业务模型」编写完成后，可以通过 `@model` 将某个「类」或某个「类的实例」关联到指定组件，关联后便可以在组件中使用 `this.model` 访问关联的「模型」，mota 会自动「收集组件依赖」，在组件「依赖的属性」发生变化时，自动响应变化并驱动「组件渲染」，请阅读 [模型定义说明](./markdowns/model.md)


### 3. 属性映射
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

### 4. 双向绑定

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

注意一下，默认情况下，所有的「原生表单组件」，比如 `input`、`textarea`、`select` 都可以直接进行绑定，但是对于一些「组件库」中的「部分表单组件」不能直接绑定，请阅读 [绑定原生表单组件](./markdowns/binding-builtin.md) 和 [绑定自定义表单组件](./markdowns/binding-custom.md)


## 链接
- [完整文档](http://houfeng.net/mota/)
- [版本发布日志](https://github.com/Houfeng/mota/releases)
- [MIT 开源协议](https://tldrlegal.com/license/mit-license)