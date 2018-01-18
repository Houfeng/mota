const {
  registerReceivePropsHandler, registerMountHandler
 } = require('./utils');
const { isObject, each, isString } = require('ntils');

function mapping(map) {
  if (!isObject(map)) {
    throw new Error('Mapping needs to specify a object or array');
  }
  function assign(model, props) {
    each(map, (propName, modelField) => {
      if (!isString(propName)) propName = modelField;
      if (model[modelField] === props[propName]) return;
      model[modelField] = props[propName];
    });
  }
  return function (component) {
    if (!component) return mapping;
    const proto = component.prototype;
    if (proto._contented_) {
      throw new Error('`mapping` must be enabled before `model`');
    }
    registerMountHandler(proto, function () {
      assign(this.model, this.props);
    });
    registerReceivePropsHandler(proto, function (nextProps) {
      assign(this.model, nextProps);
    });
  };
}

module.exports = mapping;