---
group: guide
name: model
title: 编写业务模型
index: 2
---

# 编写业务模型

在 mota 中「模型」如同其它 OOP 语言中的已有的「面向对象」的知识几首一模一样，是由一个或多个 `class` 或普通的的 `Object` 组成的。

如下示例通过编写一个名为 `User` 的 `class`，创建了一个「用户模型」
```js
export default class User {
  firstName = 'Jack';
  lastName = 'Hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
}
```

也可以是一个 `Object`，通过这个模型需要是「单例」时，可采用这种方式，如下

```js
export default {
  firstName: 'Jack',
  lastName: 'Hou',
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
};
```

在「业务模型」编写完成后，可以通过 `@model` 将某个「类」或某个「类的实例」关联到指定组件，关联后便可以在组件中使用 `this.model` 访问关联的「模型」，mota 会自动「收集组件依赖」，在组件「依赖的属性」发生变化时，自动响应变化并驱动「组件渲染」，如下

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

值得注意的是，在使用 `@model` 时如果传入的是一个 `class` 最终每个组件实例都会自动创建一个 `新实例`。