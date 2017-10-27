---
group: model
name: model
title: '@model'
---

# 定义模型

在 mota 中模 model 通常是一个 `class`，如下

```js
export default class User {
  firstName = 'Jack';
  lastName = 'Hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
}
```

也可以是一个 `Object`，如下

```js
export default {
  firstName: 'Jack',
  lastName: 'Hou',
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
};
```

无论哪种形式的 `model` 都能通过 `@model` 关联到组件，使组件具备 `this.model` 这个「可响应」成员，如下
```js
import { model,binding } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

@model(User)
class App extends React.Component {

  onChange(field,event){
    this.model[field] = event.target.value;
  }

  render(){
    return <div>
      <p>{this.model.fullName}</p>
      <p>
        <input onChange={this.onChange.bind(this,'firstName')}/>
        <br/>
        <input onChange={this.onChange.bind(this,'lastName')}/>
      </p>
    </div>;
  }
}

ReactDOM.render(<App/>, mountNode);
```


值得注意的是，在使用 `@model` 时如果传入的是一个 `class` 最终每个组件实例都会自动创建一个 `新实例`，
如果需要「单例」，那么需要已经创建好的实例，比如

```js
class User{
  ...
}

export default new User();
```


同样，我们关联到组件
```js
import user from './user';

@model(user);
class App extends React.Component{
  ...
}
```

或者直接使用 `object` 风格的「模型」
