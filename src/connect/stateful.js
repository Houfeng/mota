/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Component } from 'react';
import { supportHook } from '../common';
import { useModel } from '../hooks';
import { connect } from './connect';
import { StatefulSymbol, ModelSymbol } from '../common/symbols';

export function stateful(fn, model, convert) {
  if (fn[StatefulSymbol]) return fn[StatefulSymbol];
  if (supportHook()) {
    fn[StatefulSymbol] = function StatefulWrapper(props, context) {
      const element = fn({ model: useModel(model), ...props }, context);
      return convert ? convert(element) : element;
    };
  } else {
    fn[StatefulSymbol] = connect(model, class StatefulWrapper extends Component {
      render() {
        const element = fn({ model: this.model, ...this.props }, this.context);
        return convert ? convert(element) : element;
      }
    });
  }
  fn[StatefulSymbol][ModelSymbol] = model;
  return fn[StatefulSymbol];
}
