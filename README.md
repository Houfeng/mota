# mota

mota 是一个「面向对象」的、支持「双向绑定」的 react 状态管理库。

## 安装

```sh
npm i mota --save
```

## 示例

定义模型
```js
export default class User {
  firstName = 'jack';
  lastName = 'hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
}
```

关联到组件
```js
import { model } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

@model(User, true)
class App extends React.Component {
  render(){
    return <div>
      <p>{this.model.fullName}</p>
      <p>
        <input data-bind="firstName"/>
        <br/>
        <input data-bind="lastName"/>
      </p>
    </div>;
  }
}
```

## 文档

绝大多数情况下，仅需 `model` 一个 api 就够了，通过 model 可用为组件注入 model。
同时，第二个参数为 `true` 可以启用双向绑定，在 jsx 中可以通过 `data-bind` 进行绑定。