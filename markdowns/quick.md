---
group: guide
name: quick
title: 快速开始
index: 1
---

# Mota

## 简述

React 是一个「视图层」的 UI 框架，以常见的 MVC 来讲 React 仅是 View，而我们在编写应用时，通常还需要关注更加重要的 model，对于 React 来讲，我们常常需要一个「状态管理」库。然而，目前大多数针对 React 的状态管理库都是「强依赖」过多的侵入本应该独立的业务模型中，导致「业务逻辑」对应的代码并不能轻易在其它地方重用，往往这些框架还具有「强排它性」，但是「业务模型」应该是没有过多依赖，应该是无关框架的，它应该随时可以被用在任何合适的 JavaScript 环境中，使用 mota 你可以用原生的普通的 JavaScript 代码编写你的「业务模型」，并让你的「业务模型」在不同框架、不同运行环境下重用更为容易。

Mota 是一个响应式的 React 应用状态管理库，基于 Mota 你可以用单纯无依赖的 JavaScript 为应用编写「业务模型」，并轻易的将「业务模型」关联到 React 应用中。

## 示例

[在线 TodoList 示例](http://houfeng.net/dn-template-mota/example/)
([示例源码](https://github.com/Houfeng/dn-template-mota))

## 安装

通过 npm 安装，如下
```sh
$ npm i mota --save 
```

或通过 `dawn` 脚手脚加创建工程，如下

```sh
$ mkdir your_path
$ cd your_path
$ dn init -t mota
$ dn dev
```

需要先安装 dawn（[Dawn 安装及使用文档](https://alibaba.github.io/dawn/docs/)）

## 结构

一个 `mota` 工程的通常结构如下

```sh
.
├── README.md
├── package.json
└── src
    ├── assets
    │   ├── common.less
    │   ├── favicon.ico
    │   └── index.html
    ├── components
    │   ├── todoApp.js
    │   └── todoItem.js
    ├── index.js
    └── models
        ├── TodoItem.js
        ├── TodoList.js
        └── index.js
```

## 文档
- [快速开始](http://houfeng.net/mota/#!/zh/guide/quick)
- [编写业务模型](http://houfeng.net/mota/#!/zh/guide/model)
- [将组件属性映射到模型](http://houfeng.net/mota/#!/zh/guide/mapping)
- [自执行函数](http://houfeng.net/mota/#!/zh/guide/autorun)
- [监听模型变化](http://houfeng.net/mota/#!/zh/guide/watch)
- [将模型数据与表单绑定](http://houfeng.net/mota/#!/zh/guide/binding)

## 链接
- [版本发布日志](https://github.com/Houfeng/mota/releases)
- [MIT 开源协议](https://tldrlegal.com/license/mit-license)