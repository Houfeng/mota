/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const { isComponentClass } = require('./utils');

const defaultOpts = {
  prop: ['value'],
  event: ['onChange']
};

const checkboxOpts = {
  prop: ['checked', (ctx, props) => {
    const mValue = ctx.getValue();
    if (mValue instanceof Array) {
      return mValue.indexOf(props.value) > -1;
    } else {
      return !!mValue;
    }
  }],
  event: ['onChange', (ctx, event) => {
    const { value, checked } = event.target;
    const mValue = ctx.getValue();
    if (mValue instanceof Array) {
      if (checked) {
        mValue.push(value);
      } else {
        const index = mValue.indexOf(value);
        mValue.splice(index, 1);
      }
    } else {
      ctx.setValue(checked);
    }
  }]
};

const radioOpts = {
  prop: ['checked', (ctx, props) => {
    const mValue = ctx.getValue();
    if (typeof mValue == 'boolean') {
      return !!mValue;
    } else {
      return mValue == props.value;
    }
  }],
  event: ['onChange', (ctx, event) => {
    const { value, checked } = event.target;
    const mValue = ctx.getValue();
    if (typeof mValue == 'boolean') {
      ctx.setValue(checked);
    } else if (checked) ctx.setValue(value);
  }]
};

const builtIn = {
  input: function (type, props) {
    switch (props.type) {
      case 'checkbox':
        return checkboxOpts;
      case 'radio':
        return radioOpts;
      default:
        return defaultOpts;
    }
  },
  radio: radioOpts,
  checkbox: checkboxOpts,
  select: defaultOpts,
  textarea: defaultOpts
};

function getOptions(type, props) {
  let opts = (typeof type === 'string') ? builtIn[type] : type.bindOpts;
  if (opts instanceof Function) opts = opts(type, props);
  opts = opts || defaultOpts;
  if (opts && typeof opts.event === 'string') {
    opts.event = opts.event.split(',');
  }
  if (opts && typeof opts.prop === 'string') {
    opts.prop = opts.prop.split(',');
  }
  return opts;
}

function bindable(opts, component) {
  if (isComponentClass(opts)) {
    return bindable(component, opts);
  }
  if (typeof opts === 'string') opts = builtIn[opts];
  if (!opts) opts = defaultOpts;
  if (!component) return component => bindable(opts, component);
  component.bindOpts = Object.assign({}, opts);
  return component;
}

bindable.getOptions = getOptions;
bindable.bindable = bindable;
module.exports = bindable;