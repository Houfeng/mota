declare namespace mota {
  const name: string;
  const version: string;
  function autorun(target: any, method: any): any;
  function bindable(opts: any, component?: any): any;
  function binding(component: any): any;
  function connect(model: any, component: any): any;
  function deep(target: any, method: any): any;
  function mapping(map: Array<string> | Object | any): any;
  function model(model: any): any;
  function nextTick(callback: Function, ctx?: any): any;
  function watch(calculator: Function, immed?: boolean): any;
}
