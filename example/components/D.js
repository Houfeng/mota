import React from 'react';
import { useModel } from '../../src';
import { C } from "./C";
import { Info } from '../model/info';

export function D() {
  const model = useModel({ current: new Info() });
  window.mmm = model;
  function setCurrent() {
    // const info = new Info();
    // info.name = Date.now();
    // model.current = info;
    model.current.name = Date.now();
  }
  return <div>D:
     <div>
      <button onClick={setCurrent}>设置 model.current</button>
      <C model={model.current} />
    </div>
  </div>
}