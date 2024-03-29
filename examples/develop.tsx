import React, { Fragment, memo, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { computed, observable, observer, takeDependencies, useObservable, useWatch } from "../src";

import { createRoot } from 'react-dom/client';

const model = observable({
  __displayName: 'model',
  error: null,
  name: 'test',
  num: 1,
  add() {
    this.num += 1;
  }
})

@observable
class User {
  firstName = "Feng";
  lastName = "Hou";
  age = 1;
  @computed
  get fullName() {
    return `${this.firstName} ${this.lastName}: ${this.age}`;
  }
}

const UserView = observer(function UserView() {
  const user = useObservable(() => new User());
  return (
    <div>
      <strong>{user.fullName}</strong>
      <div><button onClick={() => user.age++}>click</button></div>
    </div>
  )
});

export const Demo1 = observer(function Demo1() {
  takeDependencies("Demo1 依赖");
  useWatch(() => model.num > 100, () => {
    console.log("num:", model.num);
  });
  console.log('demo1 model.name', model.name);
  return (
    <div>
      <h1>Demo1</h1>
      <div>
        <input
          value={model.name}
          onChange={event => model.name = event.target.value}
        />
        <div>{model.num}</div>
        <div>{model.error?.message || 'NONE'}</div>
      </div>
    </div>
  )
});

export const Demo2 = observer(function Demo2() {
  //@ts-ignore
  //const name = useDeferredValue(model.name, { timeoutMs: 1000 });
  console.log('demo2 model.num', model.num);
  return (
    <div>
      <h1>Demo2</h1>
      <div>name: {model.name}</div>
      <div onClick={() => model.add()}>num: {model.num}</div>
    </div>
  )
});

export const Demo4 = observer(function Demo4() {
  console.log('Render');
  const store = useMemo(() => {
    console.log('useMemo callback');
    return { value: 0 };
  }, [])
  useSyncExternalStore(() => {
    console.log('useSyncExternalStore subscribe callback');
    return () => {
      console.log('useSyncExternalStore unsubscribe callback');
    }
  }, () => {
    console.log('useSyncExternalStore snapshot callback');
    return store;
  })
  if (store.value === 0) {
    console.log('useSyncExternalStore first');
    store.value = 1;
  }
  useEffect(() => {
    console.log('useEffect mount callback');
    return () => {
      console.log('useEffect unmount callback');
    }
  }, [])
  const ref = useRef(0);
  if (ref.current === 0) {
    console.log('ref first');
    ref.current = 1;
  }
  console.log('ref', ref.current);
  return (
    <div>
      <h1>Demo4</h1>
      <div onClick={() => model.num++}>count: {model.num}</div>
    </div>
  )
});

@observer
export class Demo3 extends React.Component {
  state = { name: 'Demo3' };
  render(): React.ReactNode {
    console.log('demo3 model.num', model.num);
    return (
      <div>
        <h1>Demo3</h1>
        <div>name: {model.name}</div>
        <div onClick={() => model.add()}>num: {model.num}</div>
        <Demo3_1 />
      </div>
    )
  }
}

export const Demo3_1 = memo(observer(function Demo3_1() {
  return <div>
    <h3>Demo3_1</h3>
    {model.num}
  </div>
}));

const App = () => {
  return (
    <Fragment>
      <UserView />
      <Demo1 />
      <Demo2 />
      <Demo3 />
      <Demo4 />
    </Fragment>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />);

//@ts-ignore
window.model = model; 