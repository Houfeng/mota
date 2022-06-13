![logo](http://houfeng.net/mota/logo.jpg)

<div align="center">

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
[![Coverage Status](https://coveralls.io/repos/github/Houfeng/mota/badge.svg?branch=master)](https://coveralls.io/github/Houfeng/mota?branch=master)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)
<!-- [![Build Status](https://www.travis-ci.org/Houfeng/mota.svg?branch=master)](https://www.travis-ci.org/Houfeng/mota) -->

</div>

# Overview

Mota is a "lightweight and responsive" state management library, which is less than 5KB. Developers can use it to write "almost framework independent pure js/ts business models", and then use Mota to simply let react components respond to model changes.

# Install

Install through NPM as follows
```sh
$ npm install mota --save
```

# Usage

**Example 1**: Hello Mota

```jsx
import { observable, observer } from "mota";

const model = observable({ count: 0 });
const add = ()=>model.count++;

const View1 = observer(() {
  return <div>{model.count}</div>
});

const View2 = observer(() {
  return <div>
    <span>{model.count}</span>
    <button onClick={add}>click<button>
  </div>
});
```

**Example 2**: Using useObservable

```jsx
import { observer, useObservable } from "mota";

const View = observer(() {
  const model = useObservable({ count: 0 });
  return <div>
    <span>{model.count}</span>
    <button onClick={()=>model.count++}>click<button>
  </div>
});
```

**Example 3**: Using useComputed

```jsx
import { observer, observable, useComputed } from "mota";

const user = observable({ 
  firstName: 'Feng',
  lastName: 'Hou'
});

const View = observer(() {
  // The fullName will be cached and responsive
  const fullName = useComputed(()=>`${user.firstName} ${user.lastName}`);
  return <div>{fullName}</div>
});
```


**Example 4**: Using useAutoRun

```jsx
import { observer, observable, useAutoRun } from "mota";

const model = observable({ count: 0 });

const View = observer(() {
  // When the count changes, 
  // it will be automatically re executed and printed 'count: n'
  useAutoRun(()=>{
    console.log('count:', model.count);
  });
  return <div>{model.count}</div>
});
```

**Example 5**: Using useWatch

```jsx
import { observer, observable, useWatch } from "mota";

const model = observable({ count: 0 });

const View = observer(() {
  // When the result of the evaluation function changes,
  // the processing function is re executed.
  useWatch(()=>model.count%10, (oldValue, newValue)=>{
    console.log(`old: ${oldValue}, new: ${newValue}`);
  });
  return <div>{model.count}</div>
});
```

**Example 6**: Using in class components

```jsx
import { observer, observable, autorun, watch } from "mota";

const model = observable({ count: 0 });

class View extends React.Component {
  add = ()=> model.count++;

  componentDidMount(){
    this.destroyAutoRun = autorun(()=>{
      console.log('autorun count: ', model.count);
    });
    this.destroyWatch = watch(()=> model.count%10, ()=>{
      console.log('autorun count: ', model.count);
    });
  }

  componentWillUnmount(){
    this.destroyAutoRun();
    this.destroyWatch();
  }

  @computed get message(){
    return `count: ${model.count}`;
  }

  render() {
    return <div>
      <span>{this.message}</span>
      <button onClick={this.add}>click<button>
    </div>
  }
}
```

**Example 7**: Using multiple instances in class components

```jsx
import { observer, observable, autorun, watch } from "mota";

@observable
class Model {
  count = 0;
  add () {
    this.count++;
  }
  @computed get message(){
    return `count: ${model.count}`;
  }
}

class View extends React.Component {
  model = new Model();
  render() {
    return <div>
      <span>{this.model.message}</span>
      <button onClick={()=>this.model.add()}>click<button>
    </div>
  }
}
```