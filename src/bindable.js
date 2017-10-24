const defaultOpts = {
  prop: ['value'],
  event: ['onChange']
};

const checkboxOpts = {
  prop: ['checked', (ctx, props) => {
    const value = ctx.getValue();
    if (value instanceof Array) {
      return value.indexOf(props.value) > -1;
    } else {
      return !!value;
    }
  }],
  event: ['onChange', (ctx, event) => {
    const { value, checked } = event.target;
    const oldValue = ctx.getValue();
    if (oldValue instanceof Array) {
      if (checked) {
        oldValue.push(value);
      } else {
        const index = oldValue.indexOf(value);
        oldValue.splice(index, 1);
      }
    } else {
      ctx.setValue(value);
    }
  }]
};

const radioOpts = {
  prop: ['checked', (ctx, props) => {
    return ctx.getValue() == props.value;
  }],
  event: ['onChange', (ctx, event) => {
    const { value, checked } = event.target;
    if (checked) {
      ctx.setValue(value);
    }
  }]
};

const binltIn = {
  input: function (element) {
    const { type } = element.props;
    switch (type) {
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
  textaren: defaultOpts
};

function getOptions(element) {
  const type = element.type;
  let opts = (typeof type === 'string') ? binltIn[type] : type.bindOpts;
  if (opts instanceof Function) opts = opts(element);
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
  if (opts && opts.prototype instanceof React.Component) {
    return bindable(component, opts);
  }
  if (typeof opts === 'string') opts = binltIn[opts];
  if (!opts) opts = defaultOpts;
  if (!component) return component => bindable(opts, component);
  component.bindOpts = Object.assign({}, opts);
  return component;
}

bindable.getOptions = getOptions;
module.exports = bindable;