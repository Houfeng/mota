![logo](http://houfeng.net/mota/logo.jpg)

<div align="center">

[![npm](https://img.shields.io/npm/l/mota.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/mota.svg)](https://www.npmjs.com/package/mota)
<!-- [![Build Status](https://www.travis-ci.org/Houfeng/mota.svg?branch=master)](https://www.travis-ci.org/Houfeng/mota) -->
[![Coverage Status](https://coveralls.io/repos/github/Houfeng/mota/badge.svg?branch=master)](https://coveralls.io/github/Houfeng/mota?branch=master)
[![npm](https://img.shields.io/npm/dt/mota.svg)](https://www.npmjs.com/package/mota)

</div>

# Overview

Mota is a "lightweight and responsive" state management library, which is less than 5KB. Developers can use it to write "almost framework independent pure js/ts business models", and then use Mota to simply let react components respond to model changes.

# Install

Install through NPM as follows
```sh
$ npm install mota --save
```

# Usage

Example 1: Hello Mota

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

Example 2: Using useObservable

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

Example 3: Using useComputed

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


Example 4: Using useAutoRun

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