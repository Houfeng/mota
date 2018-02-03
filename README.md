# mota

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
[![Build Status](https://www.travis-ci.org/houfeng/mota.svg?branch=master)](https://www.travis-ci.org/houfeng/mota)
[![Coverage Status](https://coveralls.io/repos/github/houfeng/mota/badge.svg?branch=dev)](https://coveralls.io/github/houfeng/mota?branch=dev)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)

mota 是一个主张「面向对象」的、支持「双向绑定」的 React 状态管理库，它不同于 Redux/flux，
和 MobX 稍像，但也并不相同且更易用。

## 安装

```sh
npm i mota --save
```

## 示例

### 第一步，定义模型

```js
export default class User {
  firstName = 'jack';
  lastName = 'hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
  popup=()=>{
    alert(this.fullName);
  }
}
```

在 mota 中「模型」是一个或多个「类」，按照你已有的「面向对象」的知识设计你的「业务模型」就行了。


### 第二步，关联到组件
```js
import { model } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

@model(User)
class App extends React.Component {
  onFilstNameChange = event=>{
    this.model.firstName= event.target.value;
  };
  render(){
    return <div>
      <p>{this.model.fullName}</p>
      <p>
        <input onChange={this.onFilstNameChange}/>
      </p>
      <p>
        <button onClick={this.model.popup}></button>
      </p>
    </div>;
  }
}
ReactDOM.render(<App/>, mountNode);
```

在「模型」编写完成后，可以通过 `@model` 将某个「类」或某个「类的实例」关联到指定组件，关联后便可以在组件中使用 `this.model` 访问关联的「模型」，mota 会自动「收集组件依赖」，在组件「依赖的属性」发生变化时，自动响应变化并驱动「组件渲染」，请阅读 [模型定义说明](./markdowns/model.md)


> 到这里，已经介绍了的 mota 主要用法，你的应用已经基本上有类似使用 mobx 的响应用能力了，但这还不够。


### 第三步，双向绑定

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
    return <div>
      <p>{this.model.fullName}</p>
      <p>
        <input data-bind="name"/>
      </p>
      <p>
        <button onClick={this.model.popup}></button>
      </p>
    </div>;
  }
}
ReactDOM.render(<App/>, mountNode);
```

其中的「关键」就是 `@binding`，使用 `@binding` 后，组件便具备了「双向绑定」的能力，在 `jsx` 中便可以通过名为 `data-bind` 的 `attribute` 进行「绑定表达式」的声明，绑定表达式的 `scope` 是 `model` 而不是 `this`，也就是只能与 `model` 进行绑定。

注意一下，默认情况下，所有的「原生表单组件」，比如 `input`、`textarea`、`select` 都可以直接进行绑定，但是对于一些「组件库」中的「部分表单组件」不能直接绑定，请阅读 [绑定原生表单组件](./markdowns/binding-builtin.md) 和 [绑定自定义表单组件](./markdowns/binding-custom.md)

## 文档
- [模型定义说明](./markdowns/model.md)
- [双向绑定说明](./markdowns/binding.md)

## 其它
- [版本发布日志](https://github.com/Houfeng/mota/releases)
- [mota 基于 MIT 协议开源](https://tldrlegal.com/license/mit-license)