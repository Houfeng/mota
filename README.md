![logo](https://raw.githubusercontent.com/Houfeng/mota/master/docs/logo.jpg)

<div align="center">

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
[![Build Status](https://www.travis-ci.org/Houfeng/mota.svg?branch=master)](https://www.travis-ci.org/Houfeng/mota)
[![Coverage Status](https://coveralls.io/repos/github/Houfeng/mota/badge.svg?branch=master)](https://coveralls.io/github/Houfeng/mota?branch=master)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)

</div>

# Overview

Mota 是一个面向 React 应用的状态管理库，希望用纯粹的、普通的 JavaScript 为应用编写不强依赖于框架的「业务模型」，然后，仅由 Mota 将「业务模型」关联到 React 应用。

此外，Mota 同时支持 Class 和 Hook 的两种编程风格。

# Install

通过 npm 安装，如下
```sh
$ npm i mota --save
```

# API

## model

DemoModel.js
```js
export class DemoModel {
  count = 0;
  add = ()=>{
    this.count += 1;
  }
}
```

Demol.js
```js
import { model } from "mota";
import { DemoModel } from "./DemoModel"

@model(DemoModel)
export class Demo extends Component{
  render() {
    const {count, add} = this.model
    return <div>
      {count} <button onClick={add}>Add</button>
    </div>
  }
}
```

## useModel

DemoModel.js
```js
export const state = {
  count: 0,
}

export function add(){
  state.count += 1;
}
```

Demo.js
```js
import { useModel } from "mota";
import { state, add } from "./DemoModel";

export function Demo{
  const { count } = useModel(state);
  return <div>
    {count} <button onClick={add}>Add</button>
  </div>
}
```

## binding

For class
```js
export class DemoModel {
  message = "hello";
  print = ()=> {
    console.log(this.message);
  }
}

@model(DemoModel)
export class Demo extends Component{
  render() {
    const { print } = this.model
    return <div>
      <input data-bind="message"/>
      <button onClick={print}>Print</button>
    </div>
  }
}
```

For hook
```js
const state = {
  message = "hello";
}

export function print(){
 console.log(state.message);
}

export function Demo(){
  const model = useModel(state);
  return binding(<div>
    <input data-bind="message"/>
    <button onClick={print}>Print</button>
  </div>, model);
}
```

# Examples

[在线 TodoList 示例](http://houfeng.net/dn-template-mota/example/)
([示例源码](https://github.com/Houfeng/dn-template-mota))

# Docs
- [快速开始](http://houfeng.net/mota/#!/zh/guide/quick)
- [编写业务模型](http://houfeng.net/mota/#!/zh/guide/model)
- [将组件属性映射到模型](http://houfeng.net/mota/#!/zh/guide/mapping)
- [自执行函数](http://houfeng.net/mota/#!/zh/guide/autorun)
- [监听模型变化](http://houfeng.net/mota/#!/zh/guide/watch)
- [将模型数据与表单绑定](http://houfeng.net/mota/#!/zh/guide/binding)

# Links
- [版本发布日志](https://github.com/Houfeng/mota/releases)
- [MIT 开源协议](https://tldrlegal.com/license/mit-license)