/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { ModelSymbol, StatefulSymbol } from '../common/symbols';

import { React } from '../common/peers';
import { connect } from './connect';
import { supportHook } from '../common';
import { useModel } from '../hooks';

export function stateful(fn, model, convert) {
  if (fn[StatefulSymbol]) return fn[StatefulSymbol];
  if (supportHook()) {
    fn[StatefulSymbol] = function StatefulWrapper(props, context) {
      const element = fn({ model: useModel(model), ...props }, context);
      return convert ? convert(element) : element;
    };
  } else {
    fn[StatefulSymbol] = connect(model, class StatefulWrapper extends React.Component {
      render() {
        const element = fn({ model: this.model, ...this.props }, this.context);
        return convert ? convert(element) : element;
      }
    });
  }
  fn[StatefulSymbol][ModelSymbol] = model;
  return fn[StatefulSymbol];
}
