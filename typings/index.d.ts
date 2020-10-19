import { ObserveData, ObserveHandler, AnyFunction } from "ober";

declare namespace mota {

  /**
   * mota 的当前版本
   **/
  const version: string;

  /**
   * 将一个数据模型和组件关联到一起
   * @param model 业务模型，可以是类型，Object
   * @param component 组件
   */
  function connect<M = any, C = any>(model?: M, component?: C): C;

  /**
   * 模型装饰器，通过 @model 可将模型关联到一个 Component
   * @param model 参数 model 可是以模型类或实例，如果是一个类将自动创建一个实例
   */
  function model<T = any>(model?: T): any;

  /**
   * 用于函数式组件的模型 hook
   * @param model 参数 model 可是以模型类或实例，如果是一个类将自动创建一个实例
   * @param debug 用于开发时的 debug 函数，参数包括相关信息
   */
  function useModel<T = any>(model?: T | (() => T) | ({ new(): T }), debug?: Function): T;

  /**
   * 自动执行方法装饰器，通过 @autorun 可声明一个组件方法，在依赖的模型数据方法发生变化时，
   * 自动生新执行，依赖的模型数据将从方法自动收集
   * @param target 组件 
   * @param method 组件的方法
   */
  function autorun(target?: any, method?: any): any;

  /**
   * 数据变化观察装饰器，通过 watch 能够在观察的数据发生变化时，自动执行组件方法
   * @param calc Watcher 的计算函数，其计算结果发生变化时，才会执行被装饰的方法
   * @param immed 是否立即执行，默认为 false，当为 true 时，Watcher 将自动立即执行一次
   */
  function watch(calc: Function, immed?: boolean): any;

  /**
   * 将组 Component 的属性（prop）自动映射到 model 的成员上
   * @param map 组件属性到模型成员的映射规则，可以是为 Map 或 Array
   */
  function mapping(map: Array<string> | Object | any): any;

  /**
   * 处理包含双向绑定声明的 React 元素或组件
   * @param {any} target 组件类或元素或返回元素的函数
   * @param {any} model ViewModel
   * @param {any} deep 是否深度处理子元素(当 target 为 element 时有效)
   * @returns {any} 处理后的 React 元素或组件
   */
  function binding(target: any, model?: any, deep?: boolean): any;

  /**
   * 用于将一个普通组件包装为「可绑定组件」的高阶函数
   * @param opts 绑定选项
   * @param component 原始组件
   */
  function bindable<C = any>(opts: any, component?: C): C;

  /**
   * 通过 nextTick 在下一个事件循环的 `tick` 中执行回调方法
   * 在改变模型数据后，在 nextTick 的回调中能确保 UI 已经进行了渲染（执行了 render）
   * @param callback 事件循环的 tick 处理函数
   * @param ctx 这是一个可选参数，用于指定 Tick 函数执行上下文
   */
  function nextTick(callback: Function, ctx?: any): any;

  /**
   * 创建一个装配器
   * @param handler 装配器处理函数
   */
  function createFitter(
    handler: (type: any, props: any, model?: any, component?: any) => void
  ): ((target: any, model?: any, deep?: boolean) => any);

  /**
   * 生命周期 hook 工具
   */
  const lifecycles: any;

  /**
    * 定义可观察对象
    * @param target 原对象或类
    */
  function observable<T extends object>(target: T): T;
  function untrack<T extends AnyFunction>(func: T, ...args: any[]): ReturnType<T>;
  function untrackable<T extends AnyFunction>(func: T): T;
  const ObservePerf: {
    onPublish?: (info: {
      name: string;
      data: ObserveData;
      matchOnly: boolean;
      matchedHandlers: Set<ObserveHandler>;
    }) => void;
    onSubscribe?: (info: {
      name: string;
      handler: ObserveHandler;
    }) => void;
    onUnsubscribe?: (info: {
      name: string;
      handler: ObserveHandler;
    }) => void;
  };

  enum ObserveMode {
    proxy = "proxy",
    property = "property",
    auto = "auto"
  }

  const ObserveConfig: {
    mode: ObserveMode;
    strict: boolean;
    maxDependencies: number;
    maxHandlers: number;
  };

  enum ObserveEvent {
    get = "get",
    set = "set"
  }

}

export = mota;