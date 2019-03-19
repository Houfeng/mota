---
group: guide
name: typescript
title: 在 TS 中使用
index: 8
---

# 在 TS 中使用 Mota

Mota 的 `Package` 中自带了「类型定义文件」，无论使用 `Class + Decorator` 风格的 API 或使用 `Hooks` 风格的 API，都能愉快的使用 TypeScript，下边有两个小提示。

### 提示一：使用 @model 

在通过 `@model` 为组件关联了一个 `model` 后，需要声明 `this.model` 的类型，参考如下代码

```js
import * as React from "react";
import { model, watch, mapping } from "mota";
import { DemoModel } from "./DemoModel";

@model(DemoModel)
export class Demo extends React.Component {

  //需要声明 model 的类型
  model: DemoModel;

  render() {
    //便能让 this.model 具备完整的类型提示了
    const { name } = this.model;
    return <div className="demo">  
      {name}  
    </div>;
  }
}
```

### 提示一：使用 useModel

完整的 `useModel` 的定义为 `useModel<T>(model:T)=>T`，但使用 `useModel` 时一般不需做特别的声明，默认情况下 `TS` 就能完成类型推导

```js
import * as React from "react";
import { useModel } from "mota";
import { DemoModel } from "./DemoModel";

export function Demo {
  const { name } = useModel(DemoModel);
  return <div className="demo">  
    {name}  
  </div>;
}
```