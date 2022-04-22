![logo](http://houfeng.net/mota/logo.jpg)

<div align="center">

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
[![Build Status](https://www.travis-ci.org/Houfeng/mota.svg?branch=master)](https://www.travis-ci.org/Houfeng/mota)
[![Coverage Status](https://coveralls.io/repos/github/Houfeng/mota/badge.svg?branch=master)](https://coveralls.io/github/Houfeng/mota?branch=master)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)

</div>

# Overview

Mota 是一个「极其轻量的可响应用状态管理库」，开发人员可利用它「编写几乎框架无关的业务模型」，然后由 Mota 可简便的使 React 组件响应模型的变化。

# Install

通过 npm 安装，如下
```sh
$ npm install mota --save
```

# Usage

```js
import { observable, observer, useWatch, watch } from "mota";

// 编写一个模型类
@observable
class DemoModel {
  count = 0;
  add = ()=>{
    this.count += 1;
  }
}

// 创建一个模型实例
const demo = DemoModel();

// 直接声明一个对象
const info = observable({
  title: 'test',
});

// 在类组件中使用一
@observer
class DemoView1 extends Component{
  // 创建一个组件实例对应和模型实例
  model = new DemoModel();
  render() {
    const {count, add} = this.model
    return (
      <div>
        <div>{info.title}</div>
        <div>{count}</div>
        <button onClick={add}>Add</button>
      </div>
    );
  }
}

// 在类组件中使用二
@observer
class DemoView2 extends Component{
  render() {
    return (
      <div>
        <div>{info.title}</div>
        <div>{demo.count}</div>
      </div>
    );
  }
}

// 在函数组件中使用
const DemoView3 = observer(()=>{
  return (
    <div>{model.count}</div>
  )
});

// 监听数据变化
const DemoView4 = ()=>{
  // useWatch 的第一个参数是计算函数，
  // 计处函数的返回结果发生变化时, 将执行第二个处理函数
  useWatch(()=>model.count,()=>{
    console.log('');
  });
  return (
    <div>{model.count}</div>
  )
};

// 在任意地方使用 watch 
const destroy = watch(()=>model.count,()=>{
  console.log('');
});

// 取消观察
destroy();

// 在类组件中使用 watch
class DemoView5 extends React.Component {
  componentDidMount(){
    this.destroyWatch = watch(()=>model.count,()=>{
      console.log('');
    });
  }
  componentWillUnmount(){
    if(this.destroyWatch) this.destroyWatch();
  }
}

```