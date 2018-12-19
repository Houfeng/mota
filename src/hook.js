const { useState, useEffect } = require('React');
const Observer = require('ober');

const owner = { buffer: [], state: null, total: 0 };

function getter(info) {
  if (owner.buffer.indexOf(info.path) > -1) return;
  owner.buffer.push(info.path);
}

function collect(nextState) {
  if (owner.state) owner.state[2] = owner.buffer.slice(0);
  owner.buffer.length = 0;
  owner.state = nextState;
  return nextState;
}

function createModel(factory) {
  const [state, dispatch] = useState([]);
  if (state.length > 0) return collect(state);
  const isNew = factory instanceof Function;
  const model = isNew ? new factory() : factory;
  const observer = new Observer(model);
  let attachedState;
  const setter = (info) => {
    if (attachedState[3] === owner.total) collect();
    const dependencies = attachedState[2];
    if (dependencies.indexOf(info.path) < 0) return;
    dispatch([...attachedState]);
  };
  const distory = () => {
    observer.off('change', setter);
    if (isNew) observer.clearReference();
  };
  attachedState = [model, distory, [], ++owner.total];
  observer.off('get', getter);
  observer.on('get', getter);
  observer.on('change', setter);
  return collect(attachedState);
}

function useModel(factory) {
  const [model, distory] = createModel(factory);
  useEffect(() => distory, []);
  return model;
}

module.exports = { useModel };