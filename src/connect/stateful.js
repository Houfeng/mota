/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Component } from 'react';
import { suppertHook } from '../common';
import { useModel } from '../hooks';
import { connect } from './connect';

export function stateful(fn, model, convert) {
  if (fn._stateful_) return fn._stateful_;
  if (suppertHook()) {
    fn._stateful_ = function StatefulWrapper(props, context) {
      const element = fn({ model: useModel(model), ...props }, context);
      return convert ? convert(element) : element;
    };
  } else {
    fn._stateful_ = connect(model, class StatefulWrapper extends Component {
      render() {
        const element = fn({ model: this.model, ...this.props }, this.context);
        return convert ? convert(element) : element;
      }
    });
  }
  fn._stateful_._model_ = model;
  return fn._stateful_;
}
