/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/gi;
const VARIABLE_NAME = /^[a-z\$\_]/i;
const ALLOWED_WORD = /^(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)$/; // eslint-disable-line
const EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
const EXPRESSION_CACHE = {};
const TEMPLATE_CACHE = {};

export function findVariables(expr) {
  expr = `(${expr})`;
  VARIABLE_FILTER.lastIndex = 0;
  const variables = {};
  let info;
  while ((info = VARIABLE_FILTER.exec(expr))) {
    // eslint-disable-line
    const name = info[2];
    if (VARIABLE_NAME.test(name) && !ALLOWED_WORD.test(name)) {
      variables[name] = true;
    }
  }
  return Object.keys(variables);
}

export function getValue(scope, name) {
  const value = scope[name];
  return value instanceof Function ? value.bind(scope) : value;
}

export function expression(expr) {
  const cacheItem = EXPRESSION_CACHE[expr];
  if (cacheItem) return cacheItem;
  const keys = findVariables(expr);
  // tslint:disable-next-line
  const func = new Function('$scope', ...keys, `return(${expr})`);
  const exec = (scope) => {
    const values = keys.map(name => getValue(scope, name));
    return func(scope, ...values);
  };
  EXPRESSION_CACHE[expr] = exec;
  return exec;
}

export function template(str) {
  const cacheItem = TEMPLATE_CACHE[str];
  if (cacheItem) return cacheItem;
  const blocks = str.split(EXPRESSION_BLOCK);
  for (let i = 1; i < blocks.length; i += 2) {
    blocks[i] = expression(blocks[i]);
  }
  const exec = (scope) => {
    let result = '';
    blocks.forEach(block => {
      result += block instanceof Function ? block(scope) : block;
    });
    return result;
  };
  TEMPLATE_CACHE[str] = exec;
  return exec;
}

export function compile(str, mixed) {
  return mixed ? template(str) : expression(str);
}
