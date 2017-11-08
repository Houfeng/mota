(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("mota", ["react"], factory);
	else if(typeof exports === 'object')
		exports["mota"] = factory(require("react"));
	else
		root["mota"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof2 = __webpack_require__(14);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = __webpack_require__(8);
var Component = React.Component;

var _require = __webpack_require__(7),
    final = _require.final;

var info = __webpack_require__(40);

function registerMountHandler(proto, handler) {
  if (!proto._mountHandlers_) final(proto, '_mountHandlers_', []);
  proto._mountHandlers_.push(handler);
}

function registerUnMountHandler(proto, handler) {
  if (!proto._unmountHandlers_) final(proto, '_unmountHandlers_', []);
  proto._unmountHandlers_.push(handler);
}

function registerElementHandler(proto, handler) {
  if (!proto._elementHandlers_) final(proto, '_elementHandlers_', []);
  proto._elementHandlers_.push(handler);
}

function childrenToArray(children) {
  var result = [];
  React.Children.forEach(children, function (child) {
    result.push(child);
  });
  return result;
}

function convertElement(element, model, key, handlers) {
  if (!element || (typeof element === 'undefined' ? 'undefined' : (0, _typeof3.default)(element)) !== 'object' || !handlers || handlers.length < 1) {
    return element;
  }
  var props = element.props || {};
  key = element.key || key;
  var initailChildren = childrenToArray(props.children);
  var children = initailChildren.length > 0 ? initailChildren.map(function (child, index) {
    return convertElement(child, model, index, handlers);
  }) : undefined;
  if (handlers) {
    handlers.forEach(function (handler) {
      element = handler(element, model, key, children);
    });
  }
  return element;
}

function isComponentInstance(instance) {
  return instance && instance instanceof Component;
}

function isComponentClass(com) {
  return isComponentInstance(com.prototype);
}

function markAsDeep(target, name) {
  if (!target._deep_) final(target, '_deep_', {});
  if (name) target._deep_[name] = true;
}

function markAsWatch(target, name) {
  if (!target._watch_) final(target, '_watch_', {});
  if (name) target._watch_[name] = true;
}

function markAsAutorun(target, name) {
  if (!target._autorun_) final(target, '_autorun_', {});
  if (name) target._autorun_[name] = true;
}

module.exports = {
  convertElement: convertElement,
  isComponentClass: isComponentClass,
  isComponentInstance: isComponentInstance,
  markAsDeep: markAsDeep,
  markAsAutorun: markAsAutorun,
  markAsWatch: markAsWatch,
  registerElementHandler: registerElementHandler,
  registerMountHandler: registerMountHandler,
  registerUnMountHandler: registerUnMountHandler
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(9)
  , core      = __webpack_require__(3)
  , ctx       = __webpack_require__(23)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(25)
  , defined = __webpack_require__(12);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store  = __webpack_require__(34)('wks')
  , uid    = __webpack_require__(35)
  , Symbol = __webpack_require__(9).Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 空函数
 */
function noop() { }

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

function getType(obj) {
  var str = toString(obj);
  return (/^\[object (.+)\]$/i.exec(str))[1];
}

/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNull(obj) {
  var type = getType(obj);
  return type === 'Undefined' || type === 'Null';
}

/**
 * 除去字符串两端的空格
 * @method trim
 * @param  {String} str 源字符串
 * @return {String}     结果字符串
 * @static
 */
function trim(str) {
  if (isNull(str)) return str;
  if (str.trim) {
    return str.trim();
  } else {
    return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
  }
}

/**
 * 替换所有
 * @method replace
 * @param {String} str 源字符串
 * @param {String} str1 要替换的字符串
 * @param {String} str2 替换为的字符串
 * @static
 */
function replace(str, str1, str2) {
  if (isNull(str)) return str;
  return str.replace(new RegExp(str1, 'g'), str2);
}

/**
 * 从字符串开头匹配
 * @method startWith
 * @param {String} str1 源字符串
 * @param {String} str2 要匹配的字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function startWith(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) === 0;
}

/**
 * 是否包含
 * @method contains
 * @param {String} str1 源字符串
 * @param {String} str2 检查包括字符串
 * @return {Boolean} 结果
 * @static
 */
function contains(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) > -1;
}

/**
 * 从字符串结束匹配
 * @method endWidth
 * @param {String} str1 源字符串
 * @param {String} str2 匹配字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function endWith(str1, str2) {
  if (isNull(str1) || isNull(str2)) return false;
  return str1.indexOf(str2) === (str1.length - str2.length);
}

/**
 * 是否包含属性
 * @method hasProperty
 * @param  {Object}  obj  对象
 * @param  {String}  name 属性名
 * @return {Boolean}      结果
 * @static
 */
function has(obj, name) {
  if (isNull(obj) || isNull(name)) return false;
  return (name in obj) || (obj.hasOwnProperty(name));
}
var hasProperty = has;

/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isFunction(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === "Function";
}

/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isString(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'String';
}

/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNumber(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'Number';
}

/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isBoolean(obj) {
  if (isNull(obj)) return false;
  return getType(obj) === 'Boolean';
}

/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isElement(obj) {
  if (isNull(obj)) return false;
  if (win.Element) {
    return obj instanceof Element;
  } else {
    return (obj.tagName && obj.nodeType &&
      obj.nodeName && obj.attributes &&
      obj.ownerDocument);
  }
}

/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isText(obj) {
  if (isNull(obj)) return false;
  return obj instanceof Text;
}

/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isObject(obj) {
  if (isNull(obj)) return false;
  var type = getType(obj);
  return type === 'Object' || type === 'Array';
}

/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isArray(obj) {
  if (isNull(obj)) return false;
  var v1 = getType(obj) === 'Array';
  var v2 = obj instanceof Array;
  var v3 = !isString(obj) && isNumber(obj.length) && isFunction(obj.splice);
  var v4 = !isString(obj) && isNumber(obj.length) && obj[0];
  return v1 || v2 || v3 || v4;
}

/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isDate(val) {
  if (isNull(val)) return false;
  return val instanceof Date;
}

/**
 * 验证是不是一个正则对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isRegexp(val) {
  return val instanceof RegExp;
}

/**
 * 转换为数组
 * @method toArray
 * @param {Array|Object} array 伪数组
 * @return {Array} 转换结果数组
 * @static
 */
function toArray(array) {
  if (isNull(array)) return [];
  return Array.prototype.slice.call(array);
}

/**
 * 转为日期格式
 * @method toDate
 * @param {Number|String} val 日期字符串或整型数值
 * @return {Date} 日期对象
 * @static
 */
function toDate(val) {
  if (isNumber(val))
    return new Date(val);
  else if (isString(val))
    return new Date(replace(replace(val, '-', '/'), 'T', ' '));
  else if (isDate(val))
    return val;
  else
    return null;
}

/**
 * 遍历一个对像或数组
 * @method each
 * @param  {Object or Array}   obj  要遍历的数组或对象
 * @param  {Function} fn            处理函数
 * @return {void}                   无返回值
 * @static
 */
function each(list, handler, scope) {
  if (isNull(list) || isNull(handler)) return;
  if (isArray(list)) {
    var listLength = list.length;
    for (var i = 0; i < listLength; i++) {
      var rs = handler.call(scope || list[i], i, list[i]);
      if (!isNull(rs)) return rs;
    }
  } else {
    for (var key in list) {
      var rs = handler.call(scope || list[key], key, list[key]);
      if (!isNull(rs)) return rs;
    }
  }
}

/**
 * 格式化日期
 * @method formatDate
 * @param {Date|String|Number} date 日期
 * @param {String} format 格式化字符串
 * @param {object} dict 反译字典
 * @return {String} 格式化结果
 * @static
 */
function formatDate(date, format, dict) {
  if (isNull(format) || isNull(date)) return date;
  date = toDate(date);
  dict = dict || {};
  var placeholder = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "w+": date.getDay(), //week
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var key in placeholder) {
    if (new RegExp("(" + key + ")").test(format)) {
      var value = placeholder[key];
      value = dict[value] || value;
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? value : ("00" + value).substr(("" + value).length));
    }
  }
  return format;
}

/**
 * 拷贝对象
 * @method copy
 * @param {Object} src 源对象
 * @param {Object} dst 目标对象
 * @static
 */
function copy(src, dst, igonres) {
  dst = dst || (isArray(src) ? [] : {});
  each(src, function (key) {
    if (igonres && igonres.indexOf(key) > -1) return;
    delete dst[key];
    if (Object.getOwnPropertyDescriptor) {
      try {
        Object.defineProperty(dst, key,
          Object.getOwnPropertyDescriptor(src, key));
      } catch (ex) {
        dst[key] = src[key];
      }
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}

/**
 * 深度克隆对象
 * @method clone
 * @param {Object} src 源对象
 * @return {Object} 新对象
 * @static
 */
function clone(src, igonres) {
  if (isNull(src) ||
    isString(src) ||
    isNumber(src) ||
    isBoolean(src) ||
    isDate(src)) {
    return src;
  }
  var objClone = src;
  try {
    objClone = new src.constructor();
  } catch (ex) { }
  each(src, function (key, value) {
    if (objClone[key] != value && !contains(igonres, key)) {
      if (isObject(value)) {
        objClone[key] = clone(value, igonres);
      } else {
        objClone[key] = value;
      }
    }
  });
  ['toString', 'valueOf'].forEach(function (key) {
    if (contains(igonres, key)) return;
    final(objClone, key, src[key]);
  });
  return objClone;
}

/**
 * 合并对象
 * @method mix
 * @return 合并后的对象
 * @param {Object} dst 目标对象
 * @param {Object} src 源对象
 * @param {Array} igonres 忽略的属性名,
 * @param {Number} mode 模式
 */
function mix(dst, src, igonres, mode, igonreNull) {
  //根据模式来判断，默认是Obj to Obj的  
  if (mode) {
    switch (mode) {
      case 1: // proto to proto  
        return mix(dst.prototype, src.prototype, igonres, 0);
      case 2: // object to object and proto to proto  
        mix(dst.prototype, src.prototype, igonres, 0);
        break; // pass through  
      case 3: // proto to static  
        return mix(dst, src.prototype, igonres, 0);
      case 4: // static to proto  
        return mix(dst.prototype, src, igonres, 0);
      default: // object to object is what happens below  
    }
  }
  //---
  src = src || {};
  dst = dst || (isArray(src) ? [] : {});
  keys(src).forEach(function (key) {
    if (contains(igonres, key)) return;
    if (igonreNull && isNull(src[key])) return;
    if (isObject(src[key]) &&
      (src[key].constructor == Object ||
        src[key].constructor == Array ||
        src[key].constructor == null)) {
      dst[key] = mix(dst[key], src[key], igonres, 0, igonreNull);
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}

/**
 * 定义不可遍历的属性
 **/
function final(obj, name, value) {
  if (arguments.length < 1) throw new Error('Parameter missing');
  if (arguments.length < 2) {
    return each(obj, function (name, value) {
      final(obj, name, value);
    });
  }
  if (arguments.length < 3) return final(obj, name, obj[name]);
  try {
    Object.defineProperty(obj, name, {
      get: function () {
        return value;
      },
      set: function () {
        throw new Error('Cannot assign to final property:' + name);
      },
      enumerable: false, //不能枚举
      configurable: false, //不能重写定义
    });
  } catch (err) {
    obj[name] = value;
  }
}

/**
 * 获取所有 key 
 */
function keys(obj) {
  if (Object.keys) return Object.keys(obj);
  var keys = [];
  each(obj, function (key) {
    keys.push(key);
  });
  return keys;
}

/**
 * 创建一个对象
 */
function create(proto, props) {
  if (Object.create) return Object.create(proto, props);
  function Cotr() { }
  Cotr.prototype = proto;
  var obj = new Cotr();
  if (props) copy(props, obj);
  return obj;
}

/**
 * 设置 proto
 * 在不支持 setPrototypeOf 也不支持 __proto__ 的浏览器
 * 中，会采用 copy 方式
 */
function setPrototypeOf(obj, proto) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, proto || create(null));
  } else {
    if (!('__proto__' in Object)) copy(proto, obj);
    obj.__proto__ = proto;
  }
}

/**
 * 获取 proto
 */
function getPrototypeOf(obj) {
  if (obj.__proto__) return obj.__proto__;
  if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
  if (obj.constructor) return obj.constructor.prototype;
}

/**
 * 是否深度相等
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  var aKeys = keys(a);
  var bKeys = keys(b);
  if (aKeys.length !== bKeys.length) return false;
  var allKeys = aKeys.concat(bKeys);
  var checkedMap = create(null);
  var result = true;
  each(allKeys, function (i, key) {
    if (checkedMap[key]) return;
    if (!deepEqual(a[key], b[key])) result = false;
    checkedMap[key] = true;
  });
  return result;
}

/**
 * 从一个数值循环到别一个数
 * @param {number} fromNum 开始数值
 * @param {Number} toNum 结束数值
 * @param {Number} step 步长值
 * @param {function} handler 执行函数
 * @returns {void} 无返回
 */
function fromTo(fromNum, toNum, step, handler) {
  if (!handler) handler = [step, step = handler][0];
  step = Math.abs(step || 1);
  if (fromNum < toNum) {
    for (var i = fromNum; i <= toNum; i += step) handler(i);
  } else {
    for (var i = fromNum; i >= toNum; i -= step) handler(i);
  }
}

/**
 * 生成一个Guid
 * @method newGuid
 * @return {String} GUID字符串
 * @static
 */
function newGuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" +
    s4() + "-" + s4() + s4() + s4());
}

/**
 * 对象变换
 **/
function map(list, fn) {
  var buffer = isArray(list) ? [] : {};
  each(list, function (name, value) {
    buffer[name] = fn(name, value);
  });
  return buffer;
}

/**
 * 通过路径设置属性值
 */
function setByPath(obj, path, value) {
  if (isNull(obj) || isNull(path) || path === '') {
    return;
  }
  if (!isArray(path)) {
    path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
  }
  each(path, function (index, name) {
    if (isNull(name) || name.length < 1) return;
    if (index === path.length - 1) {
      obj[name] = value;
    } else {
      obj[name] = obj[name] || {};
      obj = obj[name];
    }
  });
}

/**
 * 通过路径获取属性值
 */
function getByPath(obj, path) {
  if (isNull(obj) || isNull(path) || path === '') {
    return obj;
  }
  if (!isArray(path)) {
    path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
  }
  each(path, function (index, name) {
    if (isNull(name) || name.length < 1) return;
    if (!isNull(obj)) obj = obj[name];
  });
  return obj;
}

/**
 * 数组去重
 **/
function unique(array) {
  if (isNull(array)) return array;
  var newArray = [];
  each(array, function (i, value) {
    if (newArray.indexOf(value) > -1) return;
    newArray.push(value);
  });
  return newArray;
}

/**
 * 解析 function 的参数列表
 **/
function getFunctionArgumentNames(fn) {
  if (!fn) return [];
  var src = fn.toString();
  var parts = src.split(')')[0].split('=>')[0].split('(');
  return (parts[1] || parts[0]).split(',').map(function (name) {
    return trim(name);
  }).filter(function (name) {
    return name != 'function';
  });
}

/**
 * 缩短字符串
 */
function short(str, maxLength) {
  if (!str) return str;
  maxLength = maxLength || 40;
  var strLength = str.length;
  var trimLength = maxLength / 2;
  return strLength > maxLength ?
    str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) :
    str;
}

/**
 * 首字母大写
 */
function firstUpper(str) {
  if (isNull(str)) return;
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 编码正则字符串
 */
function escapeRegExp(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */
function toCamelCase(str, mode) {
  if (str) {
    str = str.replace(/\-[a-z0-9]/g, function ($1) {
      return $1.slice(1).toUpperCase()
    });
    str = str.replace(/^[a-z]/i, function ($1) {
      return mode ? $1.toUpperCase() : $1.toLowerCase();
    });
  }
  return str;
}

/**
 * 将字符串转成分隔形式
 * @param {string} str 原始字符串
 * @return {string} 转换后的字符串
 */
function toSplitCase(str) {
  if (str) {
    str = str.replace(/([A-Z])/g, '-$1');
    if (str[0] == '-') str = str.slice(1);
  }
  return str;
}

function htmlPrefilter(html) {
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  return html.replace(rxhtmlTag, "<$1></$2>");
}

/**
 * 解析字符串为 dom 
 * @param {string} str 字符串
 * @returns {HTMLNode} 解析后的 DOM 
 */
function parseHTML(str) {
  str = str || ' ';
  var parent = document.createElement('div');
  parent.innerHTML = htmlPrefilter(trim(str));
  var childNodes = toArray(parent.childNodes);
  //先 clone 一份再通过 innerHTML 清空
  //否则 IE9 下，清空时会导不通过返回的 DOM 没有子结点
  // if (firstNode) firstNode = firstNode.cloneNode(true);
  // win._NPH_.innerHTML = '';
  each(childNodes, function (index, childNode) {
    parent.removeChild(childNode);
  });
  return childNodes;
}

exports.noop = noop;
exports.toString = toString;
exports.getType = getType;
exports.isNull = isNull;
exports.trim = trim;
exports.replace = replace;
exports.startWith = startWith;
exports.contains = contains;
exports.endWith = endWith;
exports.has = has;
exports.hasProperty = hasProperty;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isElement = isElement;
exports.isText = isText;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isRegexp = isRegexp;
exports.toArray = toArray;
exports.toDate = toDate;
exports.each = each;
exports.formatDate = formatDate;
exports.copy = copy;
exports.clone = clone;
exports.mix = mix;
exports.final = final;
exports.keys = keys;
exports.create = create;
exports.setPrototypeOf = setPrototypeOf;
exports.getPrototypeOf = getPrototypeOf;
exports.deepEqual = deepEqual;
exports.fromTo = fromTo;
exports.newGuid = newGuid;
exports.map = map;
exports.setByPath = setByPath;
exports.getByPath = getByPath;
exports.unique = unique;
exports.getFunctionArgumentNames = getFunctionArgumentNames;
exports.short = short;
exports.firstUpper = firstUpper;
exports.escapeRegExp = escapeRegExp;
exports.toCamelCase = toCamelCase;
exports.toSplitCase = toSplitCase;
exports.htmlPrefilter = htmlPrefilter;
exports.parseHTML = parseHTML;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(22);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(14);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(58);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(68);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $          = __webpack_require__(0)
  , createDesc = __webpack_require__(16);
module.exports = __webpack_require__(33) ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(0).setDesc
  , has = __webpack_require__(17)
  , TAG = __webpack_require__(6)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(76);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(38);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(14);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(13);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(20);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InternalError = (_temp = _class = function (_Error) {
  (0, _inherits3.default)(InternalError, _Error);

  function InternalError(message) {
    (0, _classCallCheck3.default)(this, InternalError);

    var prefix = InternalError.prefix;

    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return (0, _possibleConstructorReturn3.default)(this, _Error.call.apply(_Error, [this, prefix ? "[" + prefix + "] " + message : message].concat(other)));
  }

  return InternalError;
}(Error), _class.prefix = null, _temp);


module.exports = InternalError;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Observer = __webpack_require__(50);
var React = __webpack_require__(8);

var _require = __webpack_require__(7),
    final = _require.final;

var _require2 = __webpack_require__(2),
    isComponentClass = _require2.isComponentClass,
    convertElement = _require2.convertElement,
    registerElementHandler = _require2.registerElementHandler;

var stateful = __webpack_require__(41);

function trigger() {
  this.setState({ _model_: this.model });
}

function createRender(proto) {
  var initailRender = proto.render;
  var convertRender = function convertRender() {
    var element = initailRender.call(this);
    return convertElement(element, this.model, null, this._elementHandlers_);
  };
  return function () {
    if (!this._run_) {
      final(this, '_observer_', new Observer(this.model));
      var context = this;
      final(this, '_run_', this._observer_.run(convertRender, { trigger: trigger, context: context }));
    }
    return this._run_.run();
  };
}

function createUnmount(proto) {
  var initailUnmount = proto.componentWillUnmount;
  return function () {
    var _this = this;

    var result = null;
    if (initailUnmount) {
      result = initailUnmount.call(this);
    }
    if (this._unmountHanlders_) {
      this._unmountHanlders_.forEach(function (handler) {
        return handler.call(_this);
      });
    }
    if (this._run_) {
      this._observer_.stop(this._run_);
    }
    if (this._isNewModelInstance_) {
      this._observer_.clearReference();
    }
    return result;
  };
}

function createMount(proto) {
  var initailMount = proto.componentDidMount;
  return function () {
    var _this2 = this;

    if (this._mountHandlers_) {
      this._mountHandlers_.forEach(function (handler) {
        return handler.call(_this2);
      });
    }
    if (initailMount) initailMount.call(this);
  };
}

function createModelGetter(model) {
  return function () {
    if (this._model_) return this._model_;
    model = this.props.model || model;
    var isNewModelInstance = false;
    if (!model) throw new Error('Invalid Model');
    if (model instanceof Function) {
      model = new model();
      isNewModelInstance = true;
    }
    final(this, '_model_', model);
    final(this, '_isNewModelInstance_', isNewModelInstance);
    return this._model_;
  };
}

function deepConnect(element, model, key, children) {
  var InitailCom = element.type;
  if (typeof InitailCom == 'string') return element;
  if (InitailCom.prototype._contented_) return element;
  var WrapedCom = connect(model, InitailCom);
  var props = element.props || {};
  var ref = element.ref;
  return React.createElement(
    WrapedCom,
    (0, _extends3.default)({}, props, { key: key, ref: ref }),
    children
  );
}

function connect(model, component) {
  if (!component) return function (component) {
    return connect(model, component);
  };
  if (!isComponentClass(component)) component = stateful(component);
  var proto = component.prototype;
  if (proto._contented_) return component;
  registerElementHandler(proto, deepConnect);
  Object.defineProperty(proto, 'model', {
    enumerable: false,
    get: createModelGetter(model)
  });
  proto.render = createRender(proto);
  proto.componentDidMount = createMount(proto);
  proto.componentWillUnmount = createUnmount(proto);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4)
  , core    = __webpack_require__(3)
  , fails   = __webpack_require__(10);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(31)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(32)
  , hide           = __webpack_require__(15)
  , has            = __webpack_require__(17)
  , Iterators      = __webpack_require__(18)
  , $iterCreate    = __webpack_require__(63)
  , setToStringTag = __webpack_require__(19)
  , getProto       = __webpack_require__(0).getProto
  , ITERATOR       = __webpack_require__(6)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(9)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(37);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  function AutoRun(handler, context, trigger, deep) {
    var _this = this;

    (0, _classCallCheck3.default)(this, AutoRun);

    this.onGet = function (event) {
      if (!_this.runing || !event || !_this.dependencies) return;
      _this.dependencies[event.path] = true;
    };

    this.isDependent = function (path) {
      if (!path) return false;
      if (!_this.dependencies || _this.dependencies[path]) return true;
      if (!_this.deep) return false;
      var paths = path.split('.');
      paths.pop();
      return _this.isDependent(paths.join('.'));
    };

    this.onChange = function (event) {
      if (_this.runing || !event || !_this.isDependent(event.path)) return;
      if (_this.isSync()) {
        return _this.trigger.call(_this.context);
      }
      if (_this.timer) {
        clearTimeout(_this.timer);
        _this.timer = null;
      }
      _this.timer = setTimeout(function () {
        if (!_this.timer) return;
        _this.trigger.call(_this.context);
      }, 0);
    };

    this.run = function () {
      var _handler;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.dependencies = {};
      _this.runing = true;
      var result = (_handler = _this.handler).call.apply(_handler, [_this.context].concat(args));
      _this.runing = false;
      return result;
    };

    this.handler = handler;
    this.context = context || this;
    this.trigger = trigger || this.run;
    this.deep = deep || false;
  }

  AutoRun.prototype.isSync = function isSync() {
    return false;
  };

  return AutoRun;
}();

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {"name":"mota","version":"0.2.4"}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(13);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(20);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(8),
    Component = _require.Component;

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    var Stateful = function (_Component) {
      (0, _inherits3.default)(Stateful, _Component);

      function Stateful() {
        (0, _classCallCheck3.default)(this, Stateful);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
      }

      Stateful.prototype.render = function render() {
        return stateless(this.props);
      };

      return Stateful;
    }(Component);

    stateless._stateful_ = Stateful;
  }
  return stateless._stateful_;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var _assign = __webpack_require__(22);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(2),
    isComponentClass = _require.isComponentClass;

var defaultOpts = {
  prop: ['value'],
  event: ['onChange']
};

var checkboxOpts = {
  prop: ['checked', function (ctx, props) {
    var mValue = ctx.getValue();
    if (mValue instanceof Array) {
      return mValue.indexOf(props.value) > -1;
    } else {
      return !!mValue;
    }
  }],
  event: ['onChange', function (ctx, event) {
    var _event$target = event.target,
        value = _event$target.value,
        checked = _event$target.checked;

    var mValue = ctx.getValue();
    if (mValue instanceof Array) {
      if (checked) {
        mValue.push(value);
      } else {
        var index = mValue.indexOf(value);
        mValue.splice(index, 1);
      }
    } else {
      ctx.setValue(checked);
    }
  }]
};

var radioOpts = {
  prop: ['checked', function (ctx, props) {
    var mValue = ctx.getValue();
    if (typeof mValue == 'boolean') {
      return !!mValue;
    } else {
      return mValue == props.value;
    }
  }],
  event: ['onChange', function (ctx, event) {
    var _event$target2 = event.target,
        value = _event$target2.value,
        checked = _event$target2.checked;

    var mValue = ctx.getValue();
    if (typeof mValue == 'boolean') {
      ctx.setValue(checked);
    } else if (checked) ctx.setValue(value);
  }]
};

var binltIn = {
  input: function input(element) {
    var type = element.props.type;

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
  textarea: defaultOpts
};

function getOptions(element) {
  var type = element.type;
  var opts = typeof type === 'string' ? binltIn[type] : type.bindOpts;
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
  if (isComponentClass(opts)) {
    return bindable(component, opts);
  }
  if (typeof opts === 'string') opts = binltIn[opts];
  if (!opts) opts = defaultOpts;
  if (!component) return function (component) {
    return bindable(opts, component);
  };
  component.bindOpts = (0, _assign2.default)({}, opts);
  return component;
}

bindable.getOptions = getOptions;
module.exports = bindable;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    registerMountHandler = _require.registerMountHandler,
    registerUnMountHandler = _require.registerUnMountHandler,
    markAsAutorun = _require.markAsAutorun;

function autorun(target, method) {
  if (!target) return autorun;
  var autoRef = void 0;
  registerMountHandler(target, function () {
    var context = this;
    var deep = target._deep_ && target._deep_[method];
    autoRef = this._observer_.run(target[method], { context: context, deep: deep });
    autoRef.run();
  });
  registerUnMountHandler(target, function () {
    this._observer_.stop(autoRef);
  });
  markAsAutorun(target, method);
}

module.exports = autorun;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = __webpack_require__(27);
var model = __webpack_require__(83);
var binding = __webpack_require__(84);
var bindable = __webpack_require__(42);
var autorun = __webpack_require__(43);
var watch = __webpack_require__(86);
var deep = __webpack_require__(87);
var utils = __webpack_require__(2);
var stateful = __webpack_require__(41);
var composition = __webpack_require__(88);
var info = __webpack_require__(40);

module.exports = (0, _extends3.default)({
  connect: connect, model: model, binding: binding, bindable: bindable, watch: watch, autorun: autorun, deep: deep, stateful: stateful,
  utils: utils }, info);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = __webpack_require__(3).Object.assign;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(49)});

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.1 Object.assign(target, source, ...)
var $        = __webpack_require__(0)
  , toObject = __webpack_require__(24)
  , IObject  = __webpack_require__(25);

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = __webpack_require__(10)(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var _keys = __webpack_require__(28);

var _keys2 = _interopRequireDefault(_keys);

var _getOwnPropertyDescriptor = __webpack_require__(53);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = __webpack_require__(56);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(13);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(20);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(7),
    isArray = _require.isArray,
    isFunction = _require.isFunction,
    isNull = _require.isNull,
    isObject = _require.isObject,
    copy = _require.copy,
    final = _require.final,
    each = _require.each;

var EventEmitter = __webpack_require__(81);
var Error = __webpack_require__(21);
var AutoRun = __webpack_require__(39);
var Watcher = __webpack_require__(82);

var OBSERVER_PROP_NAME = '_observer_';
var CHANGE_EVENT_NAME = 'change';
var GET_EVENT_NAME = 'get';
var EVENT_MAX_DISPATCH_LAYER = 10;
var IGNORE_REGEXPS = [/^\_(.*)\_$/, /^\_\_/, /^\$/];

/**
 * 对象观察类，可以监控对象变化
 * 目前方案问题:
 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
 * 其它方法一:
 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
 * 其它方案二: 
 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
 * 其它方案三: 
 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
 *   但是因为要检查的对象会少很多，效率会更高一点。
 */

var Observer = function (_EventEmitter) {
  (0, _inherits3.default)(Observer, _EventEmitter);

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  function Observer(target, options) {
    (0, _classCallCheck3.default)(this, Observer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));

    if (isNull(target)) {
      throw new Error('Invalid target');
    }
    options = options || {};
    var observer = target[OBSERVER_PROP_NAME];
    if (observer) {
      var _ret;

      copy(options, observer.options);
      //当时一个组件 A 的为组件 B 的 prop 时，A 更新不会触发 B 更新
      //所在暂注释这里，另一种方法是更新 prop 指令，重写 excute 方法，而不是现在的 update 方法
      // if (observer.options.root) {
      //   observer.parents.length = 0;
      // }
      observer.apply();
      return _ret = observer, (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    final(_this, 'options', options);
    final(_this, 'shadow', {});
    final(_this, 'target', target);
    final(_this, 'parents', []);
    final(target, OBSERVER_PROP_NAME, _this);
    _this.apply();
    return _this;
  }

  /**
   * 添加一个属性，动态添中的属性，无法被观察，
   * 但是通过 set 方法添加的属性可能被观察。
   * @param {string} name 名称
   * @param {Object} value 值
   * @returns {void} 无返回
   */


  Observer.prototype.set = function set(name, value) {
    if (isFunction(value) || Observer.isIgnore(name)) {
      return;
    }
    (0, _defineProperty2.default)(this.target, name, {
      get: function get() {
        var observer = this[OBSERVER_PROP_NAME];
        observer.emitGet({ name: name, value: value });
        return observer.shadow[name];
      },
      set: function set(value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if (isObject(value)) {
          var childObserver = new Observer(value);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer.emitChange({ name: name, value: value });
      },

      configurable: true,
      enumerable: true
    });
    this.target[name] = value;
  };

  /**
   * 自动应用所有动态添加的属性
   * @returns {void} 无返回
   */


  Observer.prototype.apply = function apply() {
    if (isArray(this.target)) {
      this._wrapArray(this.target);
    }
    var names = this._getPropertyNames(this.target);
    names.forEach(function (name) {
      var desc = (0, _getOwnPropertyDescriptor2.default)(this.target, name);
      if (!('value' in desc)) return;
      this.set(name, this.target[name]);
    }, this);
  };

  /**
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */


  Observer.prototype.addChild = function addChild(child, name) {
    if (isNull(child) || isNull(name)) {
      throw new Error('Invalid paramaters');
    }
    if (child.options.root) return;
    child.parents.push({ parent: this, name: name });
  };

  /**
   * 移除子对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */


  Observer.prototype.removeChild = function removeChild(child, name) {
    if (isNull(child)) {
      throw new Error('Invalid paramaters');
    }
    var foundIndex = -1;
    child.parents.forEach(function (item, index) {
      if (item.parent === this && item.name === name) {
        foundIndex = index;
      }
    }, this);
    if (foundIndex > -1) {
      child.parents.splice(foundIndex, 1);
    }
  };

  /**
   * 清除所有父子引用
   * @returns {void} 无返回
   */


  Observer.prototype.clearReference = function clearReference() {
    each(this.target, function (name, value) {
      if (isNull(value)) return;
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  };

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitChange = function emitChange(event) {
    event.path = event.name;
    this.dispatch(CHANGE_EVENT_NAME, event);
  };

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.emitGet = function emitGet(event) {
    event.path = event.name;
    this.dispatch(GET_EVENT_NAME, event);
  };

  /**
   * 派发一个事件，事件会向父级对象冒泡
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */


  Observer.prototype.dispatch = function dispatch(eventName, event) {
    if (event._src_ === this) return;
    event._src_ = event._src_ || this;
    event._layer_ = event._layer_ || 0;
    if (event._layer_++ >= EVENT_MAX_DISPATCH_LAYER) return;
    this.emit(eventName, event);
    if (!this.parents || this.parents.length < 1) return;
    this.parents.forEach(function (item) {
      if (!(item.name in item.parent.target)) {
        return item.parent.removeChild(this);
      }
      var parentEvent = copy(event);
      parentEvent.path = isNull(event.path) ? item.name : item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  };

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */


  Observer.prototype._getPropertyNames = function _getPropertyNames() {
    var names = isArray(this.target) ? this.target.map(function (item, index) {
      return index;
    }) : (0, _keys2.default)(this.target);
    return names.filter(function (name) {
      return name !== OBSERVER_PROP_NAME;
    });
  };

  /**
   * 包裹数组
   * @param {array} array 源数组
   * @returns {array} 处理后的数组
   */


  Observer.prototype._wrapArray = function _wrapArray(array) {
    if (array._wrapped_) return;
    final(array, '_wrapped_', true);
    final(array, 'push', function () {
      var items = [].slice.call(arguments);
      var observer = this[OBSERVER_PROP_NAME];
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        observer.set(array.length, item);
      }, this);
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
    });
    final(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      var observer = this[OBSERVER_PROP_NAME];
      observer.emitChange({ name: this.length, value: item });
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return item;
    });
    final(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      var observer = this[OBSERVER_PROP_NAME];
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        observer.set(0, item);
      }, this);
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
    });
    final(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      var observer = this[OBSERVER_PROP_NAME];
      observer.emitChange({ name: 0, value: item });
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return item;
    });
    final(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = isNull(arguments[1]) ? startIndex + arguments[1] : this.length - 1;
      var observer = this[OBSERVER_PROP_NAME];
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        observer.emitChange({ name: i, value: items[i - startIndex] });
      }
      observer.emitChange({ name: 'length', value: this.length });
      observer.emitChange({ value: this.length });
      return items;
    });
    final(array, 'set', function (index, value) {
      var observer = this[OBSERVER_PROP_NAME];
      if (index >= this.length) {
        observer.emitChange({ name: 'length', value: this.length });
        observer.emitChange({ value: this.length });
      }
      observer.set(index, value);
    });
  };

  Observer.prototype.run = function run(handler, options) {
    options = options || {};
    var _options = options,
        context = _options.context,
        trigger = _options.trigger,
        immed = _options.immed,
        deep = _options.deep;

    context = context || this.target;
    var auto = new AutoRun(handler, context, trigger, deep);
    this.on('get', auto.onGet);
    this.on('change', auto.onChange);
    if (immed) auto.run();
    return auto;
  };

  Observer.prototype.stop = function stop(autoRef) {
    if (!autoRef) return;
    this.off('get', autoRef.onGet);
    this.off('change', autoRef.onChange);
  };

  Observer.prototype.watch = function watch(calculator, handler, options) {
    options = options || {};
    var _options2 = options,
        context = _options2.context;

    context = context || this.target;
    var watcher = new Watcher(calculator, handler, context);
    watcher.autoRef = this.run(watcher.calc, options);
    return watcher;
  };

  Observer.prototype.unWatch = function unWatch(watcher) {
    if (!watcher) return;
    this.stop(watcher.autoRef);
  };

  return Observer;
}(EventEmitter);

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */


Observer.observe = function (target) {
  return new Observer(target);
};

/**
 * 检查是不是忽略的属性名
 * @param {string} word 待检查的字符串
 * @returns {void} 无返回
 */
Observer.isIgnore = function (word) {
  return IGNORE_REGEXPS.some(function (re) {
    return re.test(word);
  });
};

module.exports = Observer;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(3).Object.keys;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(24);

__webpack_require__(29)('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
__webpack_require__(55);
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(5);

__webpack_require__(29)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(64);
module.exports = __webpack_require__(6)('iterator');

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(61)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(30)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(62)
  , defined   = __webpack_require__(12);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $              = __webpack_require__(0)
  , descriptor     = __webpack_require__(16)
  , setToStringTag = __webpack_require__(19)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(6)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
var Iterators = __webpack_require__(18);
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(66)
  , step             = __webpack_require__(67)
  , Iterators        = __webpack_require__(18)
  , toIObject        = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(30)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
__webpack_require__(75);
module.exports = __webpack_require__(3).Symbol;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var $              = __webpack_require__(0)
  , global         = __webpack_require__(9)
  , has            = __webpack_require__(17)
  , DESCRIPTORS    = __webpack_require__(33)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(32)
  , $fails         = __webpack_require__(10)
  , shared         = __webpack_require__(34)
  , setToStringTag = __webpack_require__(19)
  , uid            = __webpack_require__(35)
  , wks            = __webpack_require__(6)
  , keyOf          = __webpack_require__(71)
  , $names         = __webpack_require__(72)
  , enumKeys       = __webpack_require__(73)
  , isArray        = __webpack_require__(74)
  , anObject       = __webpack_require__(36)
  , toIObject      = __webpack_require__(5)
  , createDesc     = __webpack_require__(16)
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(31)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var $         = __webpack_require__(0)
  , toIObject = __webpack_require__(5);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5)
  , getNames  = __webpack_require__(0).getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var $ = __webpack_require__(0);
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(26);
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {



/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
module.exports = __webpack_require__(3).Object.setPrototypeOf;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(79).set});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = __webpack_require__(0).getDesc
  , isObject = __webpack_require__(37)
  , anObject = __webpack_require__(36);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(23)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
module.exports = function create(P, D){
  return $.create(P, D);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(7),
    final = _require.final,
    isArray = _require.isArray,
    copy = _require.copy,
    each = _require.each;

var Error = __webpack_require__(21);

/**
 * 事件触发器基类
 */

var EventEmitter = function () {

  /**
   * 构建一个一个事修的触发器对象
   * @param {object} target 将代理的目标对象可以省略
   * @returns {void} 无返回
   */
  function EventEmitter(target) {
    (0, _classCallCheck3.default)(this, EventEmitter);

    target = target || this;
    var emitter = target._emitter_;
    if (emitter) return emitter;
    final(this, '_target_', target);
    final(target, '_emitter_', this);
    this._isNative_ = this._isNativeObject(this._target_);
    this._listeners_ = this._listeners_ || {};
    this.on = this.$on = this.$addListener = this.addListener;
    this.off = this.$off = this.$removeListener = this.removeListener;
    this.$emit = this.emit;
  }

  /**
   * 检查是否原生支持事件
   * @param {object} obj 对象
   * @returns {void} 检查结果
   */


  EventEmitter.prototype._isNativeObject = function _isNativeObject(obj) {
    return obj.addEventListener && obj.removeEventListener && obj.dispatchEvent;
  };

  /**
   * 添加一个事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.addListener = function addListener(name, listener, capture) {
    if (this._isNative_) {
      this._addNativeEventListener(name, listener, capture);
    }
    this._listeners_[name] = this._listeners_[name] || [];
    this._listeners_[name].push(listener);
    var maxListeners = EventEmitter._maxListeners;
    if (this._listeners_[name].length > maxListeners) {
      throw new Error('The \'' + name + '\' event listener is not more than ' + maxListeners);
    }
  };

  /**
   * 移除「一个/一组/所有」事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.removeListener = function removeListener(name, listener, capture) {
    if (name && listener) {
      if (this._isNative_) {
        this._removeNativeEventListener(name, listener, capture);
      }
      if (!this._listeners_[name]) return;
      var index = this._listeners_[name].indexOf(listener);
      this._listeners_[name].splice(index, 1);
    } else if (name) {
      if (this._isNative_ && this._listeners_[name]) {
        this._listeners_[name].forEach(function (_listener) {
          this.removeListener(name, _listener, capture);
        }, this);
      }
      delete this._listeners_[name];
    } else {
      each(this._listeners_, function (name) {
        this.removeListener(name, null, capture);
      }, this);
      this._listeners_ = {};
    }
  };

  /**
   * 触发自身的一个事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡(只在代理 dom 对象时有效)
   * @param {object} cancelAble 能否取消(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */


  EventEmitter.prototype.emit = function emit(name, data, canBubble, cancelAble) {
    if (this._isNative_) {
      return this._emitNativeEvent(name, data, canBubble, cancelAble);
    }
    if (!this._listeners_[name]) return;
    var stopPropagation = false;
    this._listeners_[name].forEach(function (handler) {
      var rs = handler.call(this._target_, data);
      if (rs === false) stopPropagation = true;
    }, this);
    return stopPropagation;
  };

  /**
   * 添加 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */


  EventEmitter.prototype._addNativeEventListener = function _addNativeEventListener(name, listener, capture) {
    this._target_.addEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.addListener = descriptor.addListener || descriptor.on;
      descriptor.addListener(this, name, listener, capture);
    }
  };

  /**
   * 移除 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */


  EventEmitter.prototype._removeNativeEventListener = function _removeNativeEventListener(name, listener, capture) {
    this._target_.removeEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.removeListener = descriptor.removeListener || descriptor.off;
      descriptor.removeListener(this, name, listener, capture);
    }
  };

  /**
   * 触发 DOM 元素事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡
   * @param {object} cancelAble 能否取消
   * @returns {void} 无返回
   */


  EventEmitter.prototype._emitNativeEvent = function _emitNativeEvent(name, data, canBubble, cancelAble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(name, canBubble, cancelAble);
    copy(data, event, ['data']);
    event.data = data;
    return this._target_.dispatchEvent(event);
  };

  return EventEmitter;
}();

//最多添加多少个 listener


EventEmitter._maxListeners = 1024;

//所有自定义事件
EventEmitter._events = [];

/**
 * 注册自定义事件(只在代理 dom 对象时有效)
 * @param {object} descriptor 事件定义
 * @returns {void} 无返回
 */
EventEmitter.register = function (descriptor) {
  var names = descriptor.name;
  if (!names) return;
  if (!isArray(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

module.exports = EventEmitter;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(7),
    isFunction = _require.isFunction,
    isBoolean = _require.isBoolean,
    getByPath = _require.getByPath,
    deepEqual = _require.deepEqual,
    clone = _require.clone;

var Error = __webpack_require__(21);

var Watcher = function Watcher(calculator, handler, context) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Watcher);

  this.calc = function (force) {
    var newValue = _this.calculator.call(_this.context);
    var willExecute = isBoolean(force) ? force : !deepEqual(newValue, _this.value);
    if (willExecute) {
      _this.handler.call(_this.context, newValue, _this.value);
    }
    _this.value = clone(newValue);
  };

  if (!isFunction(calculator) || !isFunction(handler)) {
    throw new Error('Invalid parameters');
  }
  this.context = context || this;
  this.calculator = isFunction(calculator) ? calculator : function () {
    return getByPath(_this.context, calculator);
  };
  this.handler = handler;
};

module.exports = Watcher;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var connect = __webpack_require__(27);
var React = __webpack_require__(8);

module.exports = function model(model) {
  if (model && model.prototype instanceof React.Component) {
    return connect(null, model);
  } else {
    return function (component) {
      return connect(model, component);
    };
  }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var _create = __webpack_require__(38);

var _create2 = _interopRequireDefault(_create);

var _extends3 = __webpack_require__(11);

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = __webpack_require__(8);
var bindable = __webpack_require__(42);

var _require = __webpack_require__(85),
    expression = _require.expression;

var _require2 = __webpack_require__(2),
    registerElementHandler = _require2.registerElementHandler;

function compileExpr(expr) {
  return {
    get: expression(expr),
    set: expression('$scope.' + expr + '=$value')
  };
}

function elementHandler(element, model, key, children) {
  var _extends2;

  var props = element.props || {};
  var dataBind = props['data-bind'];
  var bindOpts = dataBind && bindable.getOptions(element);
  if (!dataBind || !bindOpts) {
    return React.cloneElement(element, (0, _extends4.default)({ key: key }, props, { children: children }));
  }
  var initailChange = props[bindOpts.change];
  var bindExpr = compileExpr(dataBind);
  var setValue = function setValue(value) {
    return bindExpr.set((0, _create2.default)(model, {
      $value: { value: value }
    }));
  };
  var getValue = function getValue() {
    return bindExpr.get(model);
  };
  var context = { getValue: getValue, setValue: setValue };
  var bindEvent = bindOpts.event[0];
  var bindEventHandler = function bindEventHandler(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var handler = bindOpts.event[1];
    if (handler instanceof Function) {
      handler.apply(undefined, [context, event].concat(args));
    } else if (!handler) {
      var value = 'target' in event ? event.target.value : event;
      setValue(value);
    } else {
      setValue(expression(String(handler))(event));
    }
    if (initailChange) return initailChange(event);
  };
  var bindProp = bindOpts.prop[0];
  var bindPropHandler = bindOpts.prop[1] || function (ctx) {
    return ctx.getValue();
  };
  return React.cloneElement(element, (0, _extends4.default)({
    key: key
  }, props, (_extends2 = {
    'data-bind': undefined,
    children: children
  }, _extends2[bindProp] = bindPropHandler(context, props), _extends2[bindEvent] = bindEventHandler, _extends2)));
}

function binding(component) {
  if (!component) return binding;
  var proto = component.prototype;
  if (proto._contented_) {
    throw new Error('`binding` must be enabled before `model`');
  }
  registerElementHandler(proto, elementHandler);
  return component;
}

module.exports = binding;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var _keys = __webpack_require__(28);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/ig;
var VARIABLE_NAME = /^[a-z\$\_]/i;
var ALLOWED_WORD = /(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)/; //eslint-disable-line
var EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
var EXPRESSION_CACHE = {};
var TEMPLATE_CACHE = {};

function findVariables(expr) {
  expr = '(' + expr + ')';
  VARIABLE_FILTER.lastIndex = 0;
  var variables = {};
  var info = void 0;
  while (info = VARIABLE_FILTER.exec(expr)) {
    //eslint-disable-line
    var name = info[2];
    if (VARIABLE_NAME.test(name) && !ALLOWED_WORD.test(name)) {
      variables[name] = true;
    }
  }
  return (0, _keys2.default)(variables);
}

function getValue(scope, name) {
  var value = scope[name];
  return value instanceof Function ? value.bind(scope) : value;
}

function expression(expr) {
  var cacheItem = EXPRESSION_CACHE[expr];
  if (cacheItem) return cacheItem;
  var keys = findVariables(expr);
  var func = new (Function.prototype.bind.apply(Function, [null].concat(['$scope'], keys, ['return(' + expr + ')'])))();
  function exec(scope) {
    var values = keys.map(function (name) {
      return getValue(scope, name);
    });
    return func.apply(undefined, [scope].concat(values));
  }
  EXPRESSION_CACHE[expr] = exec;
  return exec;
}

function template(str) {
  var cacheItem = TEMPLATE_CACHE[str];
  if (cacheItem) return cacheItem;
  var blocks = str.split(EXPRESSION_BLOCK);
  for (var i = 1; i < blocks.length; i += 2) {
    blocks[i] = expression(blocks[i]);
  }
  function exec(scope) {
    var result = '';
    blocks.forEach(function (block) {
      result += block instanceof Function ? block(scope) : block;
    });
    return result;
  }
  TEMPLATE_CACHE[str] = exec;
  return exec;
}

function compile(str, mixed) {
  return mixed ? template(str) : expression(str);
}

compile.expression = expression;
compile.template = template;

module.exports = compile;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    isComponentInstance = _require.isComponentInstance,
    registerMountHandler = _require.registerMountHandler,
    registerUnMountHandler = _require.registerUnMountHandler,
    markAsWatch = _require.markAsWatch;

var autorun = __webpack_require__(43);

function watch(calculator) {
  if (!calculator) return autorun;
  if (isComponentInstance(calculator)) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return autorun.apply(undefined, [calculator].concat(args));
  }
  return function (target, method) {
    if (!target) return autorun;
    var watcher = void 0;
    registerMountHandler(target, function () {
      var context = this;
      var deep = target._deep_ && target._deep_[method];
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, target[method], { context: context, deep: deep });
      watcher.autoRef.run(false);
    });
    registerUnMountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
    markAsWatch(target, method);
  };
}

module.exports = watch;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    markAsDeep = _require.markAsDeep;

function deep(target, method) {
  if (!target) return deep;
  var invalid = false;
  if (method) {
    invalid = target._autorun_ && target._autorun_[method] || target._watch_ && target._watch_[method];
  } else {
    invalid = target && target.prototype && target.prototype._contented_;
  }
  if (invalid) {
    throw new Error('`deep` must be enabled before `model/autorun/watch`');
  }
  markAsDeep(target, method);
}

module.exports = deep;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoRun = __webpack_require__(39);

var Composition = function Composition() {
  var _this = this;

  (0, _classCallCheck3.default)(this, Composition);

  this.updating = false;
  document.addEventListener('compositionupdate', function () {
    _this.updating = true;
  }, true);
};

var composition = new Composition();

AutoRun.prototype.isSync = function () {
  return composition.updating;
};

module.exports = composition;

/***/ })
/******/ ]);
});
//# sourceMappingURL=mota.js.map