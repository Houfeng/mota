import connect from './connect';
import binding from './binding';

export default function model(model, isBinding) {
  return function (component) {
    if (isBinding) binding(component);
    connect(model, component);
  };
}