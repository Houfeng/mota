const { isObject, each, isString, getByPath, setByPath } = require('ntils');
const {
  registerDidUpdateHandler, registerMountHandler
} = require('./utils');

function mapping(map) {
  if (!isObject(map)) {
    throw new Error('Mapping needs to specify a object or array');
  }
  function assign(model, props) {
    each(map, (propName, modelField) => {
      if (!isString(propName)) propName = modelField;
      const propValue = getByPath(props, propName);
      const modelValue = getByPath(model, modelField);
      if (modelValue === propValue) return;
      setByPath(model, modelField, propValue);
    });
  }
  return function (component) {
    if (!component) throw new Error('Invaild Component');
    const proto = component.prototype;
    if (proto._contented_) {
      throw new Error('`mapping` must be enabled before `model`');
    }
    registerMountHandler(proto, function () {
      assign(this.model, this.props);
    });
    registerDidUpdateHandler(proto, function () {
      assign(this.model, this.props);
    });
  };
}

module.exports = mapping;