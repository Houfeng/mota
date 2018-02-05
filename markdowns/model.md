---
group: guide
name: model
title: 编写业务模型
index: 2
---

# 编写业务模型

在 mota 中「模型」可以是由一个 `class` 或普通的的 `Object`，整个「业务模型层」会由多个 `class` 和多个 `Object` 组成，而编写模型所需要的知识就是 JavaScript 固有的面向对象编程的知识。

如下示例通过编写一个名为 `User` 的 `class` 创建了一个「用户模型」

```js
export default class User {
  firstName = 'Jack';
  lastName = 'Hou';
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
}
```

也可以是一个 `Object`，通常这个模型需要是「单例」时，可采用这种方式，如下

```js
export default {
  firstName: 'Jack',
  lastName: 'Hou',
  get fullName(){
    reutrn `${this.firstName} ${this.lastName}`;
  }
};
```

在「业务模型」编写完成后，可以通过 `@model` 将某个「类」或「类的实例」关联到指定组件，关联后便可以在组件中使用 `this.model` 访问「模型的成员变量或方法」了，mota 还会自动「收集组件依赖」，在组件「依赖的模型数据」发生变化时，自动响应变化并「驱动组件重新渲染」，如下

```js
import { model,binding } from 'mota';
import React from 'react';
import ReactDOM from 'react-dom';
import User from './models/user';

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

值得注意的是，在使用 `@model` 时如果传入的是一个 `class` 最终每个组件实例都会自动创建一个 `独立的实例`，这样带来的好处是「当一个页面中有同一个组件的多个实例时，不会相互影响」。