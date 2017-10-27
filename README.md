# mota

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

> 到这里，你已经了解了 mota 主要的用法，此时，你的应用已基于上具备和 mobx 类似的响应用能力，但这还不够。


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

在「模型」编写完成后，可以通过 `@model` 将某个「类」或某个「类的实例」关联到指定组件，关联后便可以在组件中使用 `this.model` 访问关联的「模型」，meta 会自动「收集组件依赖」，在组件「依赖的属性」发生变化时，自动响应变化并驱动「组件渲染」。

### 第三步，双向绑定

不要惊诧，就是「双向绑定」，mata 主张「面向对象」，同样也不排斥「双向绑定」，使用 meta 能够达到类似 `ng` 或 `vue` 的绑定效果，还是刚刚的模型，我们来稍改动一个组件代码

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

其中的「关键」就是 `@binding`，使用 `@binding` 后，组件便具备了「双向绑定」的能力，在 `jsx` 中便可以通过名为 `data-bind` 的 `attribute` 进行'「绑定表达式」的声明，绑定表达式的 `scope` 是 `model` 而不是 `this`，也就只能与 `model` 进行绑定。

注意一下，默认情况下，所有的「原生表单组件」，比如 `input`、`textarea`、`select` 都可以直接进行绑定，但是对于部分「组件库」中的「表单组件」不能直接绑定，详细请阅读 [双向绑定说明]

## 文档
- [模型定义说明](./markdowns/model.md)
- [双向绑定说明](./markdowns/binding.md)

## 其它
- [版本发布日志](https://github.com/Houfeng/mota/releases)
- [mota 基于 MIT 协议开源](https://tldrlegal.com/license/mit-license)