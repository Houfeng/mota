(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("mota", ["react"], factory);
	else if(typeof exports === 'object')
		exports["mota"] = factory(require("react"));
	else
		root["mota"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
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

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = __webpack_require__(3);
var Component = React.Component;

var _require = __webpack_require__(2),
    final = _require.final;

function registerMountHandler(proto, handler) {
  if (!proto._mountHandlers_) final(proto, '_mountHandlers_', []);
  proto._mountHandlers_.push(handler);
}

function registerUnmountHandler(proto, handler) {
  if (!proto._unmountHandlers_) final(proto, '_unmountHandlers_', []);
  proto._unmountHandlers_.push(handler);
}

function registerReceivePropsHandler(proto, handler) {
  if (!proto._receivePropsHandlers_) final(proto, '_receivePropsHandlers_', []);
  proto._receivePropsHandlers_.push(handler);
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
  var covertedChildren = initailChildren.length > 0 ? initailChildren.map(function (child, index) {
    return convertElement(child, model, index, handlers);
  }) : undefined;
  var children = covertedChildren && covertedChildren.length == 1 ? covertedChildren[0] : covertedChildren;
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
  registerUnmountHandler: registerUnmountHandler,
  registerReceivePropsHandler: registerReceivePropsHandler
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 空函数
 */
function noop() { }
exports.noop = noop;
function toString(obj) {
    return Object.prototype.toString.call(obj);
}
exports.toString = toString;
function getType(obj) {
    var str = toString(obj);
    return (/^\[object (.+)\]$/i.exec(str))[1];
}
exports.getType = getType;
/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNull(obj) {
    return obj === undefined || obj === null;
}
exports.isNull = isNull;
/**
 * 除去字符串两端的空格
 * @method trim
 * @param  {String} str 源字符串
 * @return {String}     结果字符串
 * @static
 */
function trim(str) {
    if (isNull(str))
        return str;
    if (str.trim) {
        return str.trim();
    }
    else {
        return str.replace(/(^[\\s]*)|([\\s]*$)/g, '');
    }
}
exports.trim = trim;
/**
 * 替换所有
 * @method replace
 * @param {String} str 源字符串
 * @param {String} str1 要替换的字符串
 * @param {String} str2 替换为的字符串
 * @static
 */
function replace(str, str1, str2) {
    if (isNull(str))
        return str;
    return str.replace(new RegExp(str1, 'g'), str2);
}
exports.replace = replace;
/**
 * 从字符串开头匹配
 * @method startWith
 * @param {String} str1 源字符串
 * @param {String} str2 要匹配的字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function startWith(str1, str2) {
    if (isNull(str1) || isNull(str2))
        return false;
    return str1.indexOf(str2) === 0;
}
exports.startWith = startWith;
/**
 * 是否包含
 * @method contains
 * @param {String} str1 源字符串
 * @param {String} str2 检查包括字符串
 * @return {Boolean} 结果
 * @static
 */
function contains(str1, str2) {
    if (isNull(str1) || isNull(str2))
        return false;
    return str1.indexOf(str2) > -1;
}
exports.contains = contains;
/**
 * 从字符串结束匹配
 * @method endWidth
 * @param {String} str1 源字符串
 * @param {String} str2 匹配字符串
 * @return {Boolean} 匹配结果
 * @static
 */
function endWith(str1, str2) {
    if (isNull(str1) || isNull(str2))
        return false;
    return str1.indexOf(str2) === (str1.length - str2.length);
}
exports.endWith = endWith;
/**
 * 是否包含属性
 * @method hasProperty
 * @param  {Object}  obj  对象
 * @param  {String}  name 属性名
 * @return {Boolean}      结果
 * @static
 */
function has(obj, name) {
    if (isNull(obj) || isNull(name))
        return false;
    return (name in obj) || (obj.hasOwnProperty(name));
}
exports.has = has;
exports.hasProperty = has;
/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isFunction(obj) {
    if (isNull(obj))
        return false;
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
/**
 * 验证一个对象是否为 AsyncFunction
 * @method isAsyncFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isAsyncFunction(obj) {
    if (isNull(obj))
        return false;
    return getType(obj) === 'AsyncFunction';
}
exports.isAsyncFunction = isAsyncFunction;
/**
 * 验证一个对象是否为 GeneratorFunction
 * @method isGeneratorFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isGeneratorFunction(obj) {
    if (isNull(obj))
        return false;
    return getType(obj) === 'GeneratorFunction';
}
exports.isGeneratorFunction = isGeneratorFunction;
/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isString(obj) {
    if (isNull(obj))
        return false;
    return getType(obj) === 'String';
}
exports.isString = isString;
/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isNumber(obj) {
    if (isNull(obj))
        return false;
    return getType(obj) === 'Number';
}
exports.isNumber = isNumber;
/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isBoolean(obj) {
    if (isNull(obj))
        return false;
    return getType(obj) === 'Boolean';
}
exports.isBoolean = isBoolean;
/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isElement(obj) {
    if (isNull(obj))
        return false;
    if (window.Element) {
        return obj instanceof Element;
    }
    else {
        return (obj.tagName && obj.nodeType &&
            obj.nodeName && obj.attributes &&
            obj.ownerDocument);
    }
}
exports.isElement = isElement;
/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isText(obj) {
    if (isNull(obj))
        return false;
    return obj instanceof Text;
}
exports.isText = isText;
/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isObject(obj) {
    if (isNull(obj))
        return false;
    var type = getType(obj);
    return type === 'Object' || type === 'Array';
}
exports.isObject = isObject;
/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
function isArray(obj) {
    if (isNull(obj))
        return false;
    var v1 = getType(obj) === 'Array';
    var v2 = obj instanceof Array;
    var v3 = !isString(obj) && isNumber(obj.length) && isFunction(obj.splice);
    var v4 = !isString(obj) && isNumber(obj.length) && obj[0];
    return v1 || v2 || v3 || v4;
}
exports.isArray = isArray;
/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
function isDate(val) {
    if (isNull(val))
        return false;
    return val instanceof Date;
}
exports.isDate = isDate;
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
exports.isRegexp = isRegexp;
/**
 * 转换为数组
 * @method toArray
 * @param {Array|Object} array 伪数组
 * @return {Array} 转换结果数组
 * @static
 */
function toArray(array) {
    if (isNull(array))
        return [];
    return Array.prototype.slice.call(array);
}
exports.toArray = toArray;
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
exports.toDate = toDate;
/**
 * 遍历一个对像或数组
 * @method each
 * @param  {Object or Array}   obj  要遍历的数组或对象
 * @param  {Function} fn            处理函数
 * @return {void}                   无返回值
 * @static
 */
function each(list, handler, scope) {
    if (isNull(list) || isNull(handler))
        return;
    if (isArray(list)) {
        var listLength = list.length;
        for (var i = 0; i < listLength; i++) {
            var rs = handler.call(scope || list[i], i, list[i]);
            if (!isNull(rs))
                return rs;
        }
    }
    else {
        for (var key in list) {
            var rs = handler.call(scope || list[key], key, list[key]);
            if (!isNull(rs))
                return rs;
        }
    }
}
exports.each = each;
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
    if (isNull(format) || isNull(date))
        return date;
    date = toDate(date);
    dict = dict || {};
    var placeholder = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'w+': date.getDay(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var key in placeholder) {
        if (new RegExp('(' + key + ')').test(format)) {
            var value = placeholder[key];
            value = dict[value] || value;
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? value : ('00' + value).substr(('' + value).length));
        }
    }
    return format;
}
exports.formatDate = formatDate;
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
        if (igonres && igonres.indexOf(key) > -1)
            return;
        delete dst[key];
        if (Object.getOwnPropertyDescriptor) {
            try {
                Object.defineProperty(dst, key, Object.getOwnPropertyDescriptor(src, key));
            }
            catch (ex) {
                dst[key] = src[key];
            }
        }
        else {
            dst[key] = src[key];
        }
    });
    return dst;
}
exports.copy = copy;
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
    }
    catch (ex) { }
    each(src, function (key, value) {
        if (objClone[key] != value && !contains(igonres, key)) {
            if (isObject(value)) {
                objClone[key] = clone(value, igonres);
            }
            else {
                objClone[key] = value;
            }
        }
    });
    ['toString', 'valueOf'].forEach(function (key) {
        if (contains(igonres, key))
            return;
        final(objClone, key, src[key]);
    });
    return objClone;
}
exports.clone = clone;
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
            case 1:// proto to proto  
                return mix(dst.prototype, src.prototype, igonres, 0);
            case 2:// object to object and proto to proto  
                mix(dst.prototype, src.prototype, igonres, 0);
                break; // pass through  
            case 3:// proto to static  
                return mix(dst, src.prototype, igonres, 0);
            case 4:// static to proto  
                return mix(dst.prototype, src, igonres, 0);
            default: // object to object is what happens below  
        }
    }
    //---
    src = src || {};
    dst = dst || (isArray(src) ? [] : {});
    keys(src).forEach(function (key) {
        if (contains(igonres, key))
            return;
        if (igonreNull && isNull(src[key]))
            return;
        if (isObject(src[key]) &&
            (src[key].constructor == Object ||
                src[key].constructor == Array ||
                src[key].constructor == null)) {
            dst[key] = mix(dst[key], src[key], igonres, 0, igonreNull);
        }
        else {
            dst[key] = src[key];
        }
    });
    return dst;
}
exports.mix = mix;
/**
 * 定义不可遍历的属性
 **/
function final(obj, name, value) {
    if (arguments.length < 1)
        throw new Error('Parameter missing');
    if (arguments.length < 2) {
        return each(obj, function (name, value) {
            final(obj, name, value);
        });
    }
    if (arguments.length < 3)
        return final(obj, name, obj[name]);
    try {
        Object.defineProperty(obj, name, {
            get: function () {
                return value;
            },
            set: function () {
                throw new Error('Cannot assign to final property:' + name);
            },
            enumerable: false,
            configurable: false //不能重写定义
        });
    }
    catch (err) {
        obj[name] = value;
    }
}
exports.final = final;
/**
 * 获取所有 key
 */
function keys(obj) {
    if (Object.keys)
        return Object.keys(obj);
    var keys = [];
    each(obj, function (key) {
        keys.push(key);
    });
    return keys;
}
exports.keys = keys;
/**
 * 创建一个对象
 */
function create(proto, props) {
    if (Object.create)
        return Object.create(proto, props);
    function Cotr() { }
    Cotr.prototype = proto;
    var obj = new Cotr();
    if (props)
        copy(props, obj);
    return obj;
}
exports.create = create;
/**
 * 设置 proto
 * 在不支持 setPrototypeOf 也不支持 __proto__ 的浏览器
 * 中，会采用 copy 方式
 */
function setPrototypeOf(obj, proto) {
    if (Object.setPrototypeOf) {
        return Object.setPrototypeOf(obj, proto || create(null));
    }
    else {
        if (!('__proto__' in Object))
            copy(proto, obj);
        obj.__proto__ = proto;
    }
}
exports.setPrototypeOf = setPrototypeOf;
/**
 * 获取 proto
 */
function getPrototypeOf(obj) {
    if (obj.__proto__)
        return obj.__proto__;
    if (Object.getPrototypeOf)
        return Object.getPrototypeOf(obj);
    if (obj.constructor)
        return obj.constructor.prototype;
}
exports.getPrototypeOf = getPrototypeOf;
/**
 * 是否深度相等
 */
function deepEqual(a, b) {
    if (a === b)
        return true;
    if (!isObject(a) || !isObject(b))
        return false;
    var aKeys = keys(a);
    var bKeys = keys(b);
    if (aKeys.length !== bKeys.length)
        return false;
    var allKeys = aKeys.concat(bKeys);
    var checkedMap = create(null);
    var result = true;
    each(allKeys, function (i, key) {
        if (checkedMap[key])
            return;
        if (!deepEqual(a[key], b[key]))
            result = false;
        checkedMap[key] = true;
    });
    return result;
}
exports.deepEqual = deepEqual;
/**
 * 从一个数值循环到别一个数
 * @param {number} fromNum 开始数值
 * @param {Number} toNum 结束数值
 * @param {Number} step 步长值
 * @param {function} handler 执行函数
 * @returns {void} 无返回
 */
function fromTo(fromNum, toNum, step, handler) {
    if (!handler)
        handler = [step, step = handler][0];
    step = Math.abs(step || 1);
    if (fromNum < toNum) {
        for (var i = fromNum; i <= toNum; i += step)
            handler(i);
    }
    else {
        for (var i = fromNum; i >= toNum; i -= step)
            handler(i);
    }
}
exports.fromTo = fromTo;
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
    return (s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4());
}
exports.newGuid = newGuid;
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
exports.map = map;
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
        if (isNull(name) || name.length < 1)
            return;
        if (index === path.length - 1) {
            obj[name] = value;
        }
        else {
            obj[name] = obj[name] || {};
            obj = obj[name];
        }
    });
}
exports.setByPath = setByPath;
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
        if (isNull(name) || name.length < 1)
            return;
        if (!isNull(obj))
            obj = obj[name];
    });
    return obj;
}
exports.getByPath = getByPath;
/**
 * 数组去重
 **/
function unique(array) {
    if (isNull(array))
        return array;
    var newArray = [];
    each(array, function (i, value) {
        if (newArray.indexOf(value) > -1)
            return;
        newArray.push(value);
    });
    return newArray;
}
exports.unique = unique;
/**
 * 解析 function 的参数列表
 **/
function getFunctionArgumentNames(fn) {
    if (!fn)
        return [];
    var src = fn.toString();
    var parts = src.split(')')[0].split('=>')[0].split('(');
    return (parts[1] || parts[0]).split(',').map(function (name) {
        return trim(name);
    }).filter(function (name) {
        return name != 'function';
    });
}
exports.getFunctionArgumentNames = getFunctionArgumentNames;
/**
 * 缩短字符串
 */
function short(str, maxLength) {
    if (!str)
        return str;
    maxLength = maxLength || 40;
    var strLength = str.length;
    var trimLength = maxLength / 2;
    return strLength > maxLength ?
        str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) :
        str;
}
exports.short = short;
/**
 * 首字母大写
 */
function firstUpper(str) {
    if (!isString(str))
        return '';
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}
exports.firstUpper = firstUpper;
/**
 * 编码正则字符串
 */
function escapeRegExp(str) {
    if (!isString(str))
        return '';
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;
/**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */
function toCamelCase(str, mode) {
    if (!isString(str))
        return '';
    if (str) {
        str = str.replace(/\-[a-z0-9]/g, function ($1) {
            return $1.slice(1).toUpperCase();
        });
        str = str.replace(/^[a-z]/i, function ($1) {
            return mode ? $1.toUpperCase() : $1.toLowerCase();
        });
    }
    return str;
}
exports.toCamelCase = toCamelCase;
/**
 * 将字符串转成分隔形式
 * @param {string} str 原始字符串
 * @return {string} 转换后的字符串
 */
function toSplitCase(str) {
    if (!isString(str))
        return '';
    if (str) {
        str = str.replace(/([A-Z])/g, '-$1');
        if (str[0] == '-')
            str = str.slice(1);
    }
    return str.toLowerCase();
}
exports.toSplitCase = toSplitCase;
function htmlPrefilter(html) {
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
    return html.replace(rxhtmlTag, '<$1></$2>');
}
exports.htmlPrefilter = htmlPrefilter;
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
    // window._NPH_.innerHTML = '';
    each(childNodes, function (index, childNode) {
        parent.removeChild(childNode);
    });
    return childNodes;
}
exports.parseHTML = parseHTML;
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store  = __webpack_require__(31)('wks')
  , uid    = __webpack_require__(32)
  , Symbol = __webpack_require__(6).Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(6)
  , core      = __webpack_require__(7)
  , ctx       = __webpack_require__(20)
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
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Observer = __webpack_require__(46);
var AutoRun = __webpack_require__(24);
var Watcher = __webpack_require__(26);
var expression = __webpack_require__(48);
var nextTick = __webpack_require__(25);
Observer.AutoRun = AutoRun;
Observer.Watcher = Watcher;
Observer.expression = expression;
Observer.nextTick = nextTick;
Observer.Observer = Observer;
module.exports = Observer;
//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(21)
  , defined = __webpack_require__(11);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(19);

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
/* 11 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(49);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(59);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $          = __webpack_require__(0)
  , createDesc = __webpack_require__(15);
module.exports = __webpack_require__(30) ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(0).setDesc
  , has = __webpack_require__(16)
  , TAG = __webpack_require__(4)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(43);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(10);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Observer = __webpack_require__(8);
var React = __webpack_require__(3);

var _require = __webpack_require__(2),
    final = _require.final,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

var _require2 = __webpack_require__(1),
    isComponentClass = _require2.isComponentClass,
    convertElement = _require2.convertElement,
    registerElementHandler = _require2.registerElementHandler;

var stateful = __webpack_require__(35);

function createRender(proto) {
  var initailRender = proto.render;
  var convertRender = function convertRender() {
    var element = initailRender.call(this);
    return convertElement(element, this.model, null, this._elementHandlers_);
  };
  return function () {
    if (!this._run_) {
      final(this, '_observer_', new Observer(this.model));
      final(this, '_trigger_', function () {
        if (!this._mounted_) return;
        this.forceUpdate();
      });
      final(this, '_run_', this._observer_.run(convertRender, {
        context: this,
        trigger: this._trigger_,
        deep: !!this.constructor._deep_
      }));
    }
    return this._run_.run();
  };
}

function createUnmount(proto) {
  var initailUnmount = proto.componentWillUnmount;
  return function () {
    var _this = this;

    this._mounted_ = false;
    var result = null;
    if (initailUnmount) {
      result = initailUnmount.call(this);
    }
    if (this._unmountHandlers_) {
      this._unmountHandlers_.forEach(function (handler) {
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

    this._mounted_ = true;
    if (this._mountHandlers_) {
      this._mountHandlers_.forEach(function (handler) {
        return handler.call(_this2);
      });
    }
    if (initailMount) initailMount.call(this);
  };
}

function createReceiveProps(proto) {
  var initailReceiveProps = proto.componentWillReceiveProps;
  return function () {
    var _this3 = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (this._receivePropsHandlers_) {
      this._receivePropsHandlers_.forEach(function (handler) {
        return handler.call.apply(handler, [_this3].concat(args));
      });
    }
    if (initailReceiveProps) initailReceiveProps.call.apply(initailReceiveProps, [this].concat(args));
  };
}

function createModelGetter(model) {
  return function () {
    if (this._model_) return this._model_;
    var componentModel = this.props.model || model || {};
    var isNewModelInstance = false;
    if (!isObject(componentModel) && !isFunction(componentModel)) {
      throw new Error('Invalid Model');
    }
    if (componentModel instanceof Function) {
      componentModel = new componentModel();
      isNewModelInstance = true;
    }
    final(this, '_model_', componentModel);
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
  proto.componentWillReceiveProps = createReceiveProps(proto);
  final(proto, '_contented_', true);
  return component;
}

module.exports = connect;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var nextTick = __webpack_require__(25);
module.exports = /** @class */ (function () {
    function AutoRun(handler, context, trigger, deep) {
        var _this = this;
        this.onGet = function (event) {
            if (!_this.runing || !event || !_this.dependencies)
                return;
            _this.dependencies[event.path] = true;
        };
        this.isDependent = function (path) {
            if (!path)
                return false;
            if (!_this.dependencies || _this.dependencies[path])
                return true;
            if (!_this.deep)
                return false;
            var paths = path.split('.');
            paths.pop();
            return _this.isDependent(paths.join('.'));
        };
        this.onChange = function (event) {
            if (_this.runing || !event || !_this.isDependent(event.path))
                return;
            if (_this.isSync()) {
                return _this.trigger.call(_this.context);
            }
            var pending = nextTick(_this.trigger, _this.context, true);
            if (pending)
                pending.catch(function (err) {
                    throw err;
                });
        };
        this.run = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.dependencies = {};
            _this.runing = true;
            var result = (_a = _this.handler).call.apply(_a, [_this.context].concat(args));
            _this.runing = false;
            return result;
            var _a;
        };
        this.handler = handler;
        this.context = context || this;
        this.trigger = trigger || this.run;
        this.deep = deep || false;
    }
    AutoRun.prototype.isSync = function () {
        return false;
    };
    return AutoRun;
}());
//# sourceMappingURL=autorun.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var handlers = [];
var pending = false;
function execHandlers() {
    pending = false;
    var copies = handlers.slice(0);
    handlers.length = 0;
    copies.forEach(function (callback) { return callback(); });
}
function createTimer() {
    if (typeof Promise !== 'undefined') {
        var promise_1 = Promise.resolve();
        return function () {
            promise_1.then(execHandlers).catch(function (err) { return console.error(err); });
        };
    }
    else if (typeof MutationObserver !== 'undefined' ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]') {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        var counter_1 = 1;
        var observer = new MutationObserver(execHandlers);
        var textNode_1 = document.createTextNode(String(counter_1));
        observer.observe(textNode_1, { characterData: true });
        return function () {
            counter_1 = (counter_1 + 1) % 2;
            textNode_1.data = String(counter_1);
        };
    }
    else {
        // fallback to setTimeout
        /* istanbul ignore next */
        return function () {
            setTimeout(execHandlers, 0);
        };
    }
}
var timer = createTimer();
function nextTick(callback, ctx, unique) {
    if (unique === true) {
        var exists = handlers.find(function (h) { return h.callback === callback; });
        if (exists)
            return exists.promise;
    }
    var resolve, reject;
    var handler = function () {
        try {
            var result = callback ? callback.call(ctx) : null;
            if (resolve)
                resolve(result);
        }
        catch (err) {
            if (reject)
                reject(err);
        }
    };
    handler.callback = callback;
    handler.promise = typeof Promise !== 'undefined' ?
        new Promise(function (_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
        }) : null;
    handlers.push(handler);
    if (!pending) {
        pending = true;
        timer();
    }
    return handler.promise;
}
module.exports = nextTick;
//# sourceMappingURL=next-tick.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _a = __webpack_require__(2), isFunction = _a.isFunction, isBoolean = _a.isBoolean, getByPath = _a.getByPath, deepEqual = _a.deepEqual, clone = _a.clone;
var Watcher = /** @class */ (function () {
    function Watcher(calculator, handler, context) {
        var _this = this;
        //force: true 强制执行，false 强制不执行，无参数根据计算结果决定
        this.calc = function (force) {
            var newValue = _this.calculator.call(_this.context);
            var willExecute = isBoolean(force) ? force :
                !deepEqual(newValue, _this.value);
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
    }
    return Watcher;
}());
module.exports = Watcher;
//# sourceMappingURL=watcher.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(28)
  , $export        = __webpack_require__(5)
  , redefine       = __webpack_require__(29)
  , hide           = __webpack_require__(14)
  , has            = __webpack_require__(16)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(54)
  , setToStringTag = __webpack_require__(18)
  , getProto       = __webpack_require__(0).getProto
  , ITERATOR       = __webpack_require__(4)('iterator')
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
/* 28 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(34);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(36);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(67);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(68);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(3),
    Component = _require.Component;

module.exports = function (stateless) {
  if (!stateless._stateful_) {
    var StatelessWrapper = function (_Component) {
      (0, _inherits3.default)(StatelessWrapper, _Component);

      function StatelessWrapper() {
        (0, _classCallCheck3.default)(this, StatelessWrapper);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
      }

      StatelessWrapper.prototype.render = function render() {
        return stateless(this.props);
      };

      return StatelessWrapper;
    }(Component);

    stateless._stateful_ = StatelessWrapper;
  }
  return stateless._stateful_;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var _assign = __webpack_require__(19);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(1),
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

var builtIn = {
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
  var opts = typeof type === 'string' ? builtIn[type] : type.bindOpts;
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
  if (typeof opts === 'string') opts = builtIn[opts];
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var _extends2 = __webpack_require__(10);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = __webpack_require__(23);
var model = __webpack_require__(74);
var binding = __webpack_require__(75);
var bindable = __webpack_require__(38);
var autorun = __webpack_require__(76);
var watch = __webpack_require__(77);
var deep = __webpack_require__(78);
var mapping = __webpack_require__(79);
var utils = __webpack_require__(1);
var stateful = __webpack_require__(35);
var composition = __webpack_require__(80);

var _require = __webpack_require__(8),
    Observer = _require.Observer,
    expression = _require.expression,
    nextTick = _require.nextTick;

var info = __webpack_require__(81);

module.exports = (0, _extends3.default)({
  connect: connect, model: model, binding: binding, bindable: bindable, watch: watch, mapping: mapping, autorun: autorun, deep: deep, stateful: stateful,
  composition: composition, Observer: Observer, expression: expression, nextTick: nextTick, utils: utils }, info);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
module.exports = __webpack_require__(7).Object.assign;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(44)});

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.1 Object.assign(target, source, ...)
var $        = __webpack_require__(0)
  , toObject = __webpack_require__(45)
  , IObject  = __webpack_require__(21);

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = __webpack_require__(12)(function(){
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(11);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a = __webpack_require__(2), isArray = _a.isArray, isFunction = _a.isFunction, isNull = _a.isNull, isObject = _a.isObject, copy = _a.copy, final = _a.final, each = _a.each;
var EventEmitter = __webpack_require__(47);
var AutoRun = __webpack_require__(24);
var Watcher = __webpack_require__(26);
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
var Observer = /** @class */ (function (_super) {
    __extends(Observer, _super);
    /**
     * 通过目标对象构造一个观察对象
     * @param {Object} target 目标对象
     * @param {Object} options 选项
     * @returns {void} 无返回
     */
    function Observer(target, options) {
        var _this = _super.call(this) || this;
        if (isNull(target)) {
            throw new Error('Invalid target');
        }
        options = options || {};
        var observer = target[OBSERVER_PROP_NAME];
        if (observer) {
            copy(options, observer.options);
            //当时一个组件 A 的为组件 B 的 prop 时，A 更新不会触发 B 更新
            //所在暂注释这里，另一种方法是更新 prop 指令，重写 excute 方法，而不是现在的 update 方法
            // if (observer.options.root) {
            //   observer.parents.length = 0;
            // }
            observer.apply();
            return observer;
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
    Observer.prototype.set = function (name, value) {
        if (isFunction(value) || Observer.isIgnore(name)) {
            return;
        }
        Object.defineProperty(this.target, name, {
            get: function () {
                var observer = this[OBSERVER_PROP_NAME];
                observer.emitGet({ name: name, value: value });
                return observer.shadow[name];
            },
            set: function (value) {
                var observer = this[OBSERVER_PROP_NAME];
                var oldValue = observer.shadow[name];
                if (oldValue === value)
                    return;
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
    Observer.prototype.apply = function () {
        if (isArray(this.target)) {
            this._wrapArray(this.target);
        }
        var names = this._getPropertyNames(this.target);
        names.forEach(function (name) {
            var desc = Object.getOwnPropertyDescriptor(this.target, name);
            if (!('value' in desc))
                return;
            this.set(name, this.target[name]);
        }, this);
    };
    /**
     * 添子观察者对象
     * @param {Object} child 父对象
     * @param {String} name 属性名
     * @returns {void} 无返回
     */
    Observer.prototype.addChild = function (child, name) {
        if (isNull(child) || isNull(name)) {
            throw new Error('Invalid paramaters');
        }
        if (child.options.root)
            return;
        child.parents.push({ parent: this, name: name });
    };
    /**
     * 移除子对象
     * @param {Object} child 父对象
     * @param {String} name 属性名
     * @returns {void} 无返回
     */
    Observer.prototype.removeChild = function (child, name) {
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
    Observer.prototype.clearReference = function () {
        each(this.target, function (name, value) {
            if (isNull(value))
                return;
            var child = value[OBSERVER_PROP_NAME];
            if (child)
                this.removeChild(child);
        }, this);
    };
    /**
     * 触发 change 事件
     * @param {Object} event 事件对象
     * @returns {void} 无返回
     */
    Observer.prototype.emitChange = function (event) {
        event.path = event.name;
        this.dispatch(CHANGE_EVENT_NAME, event);
    };
    /**
     * 触发 change 事件
     * @param {Object} event 事件对象
     * @returns {void} 无返回
     */
    Observer.prototype.emitGet = function (event) {
        event.path = event.name;
        this.dispatch(GET_EVENT_NAME, event);
    };
    /**
     * 派发一个事件，事件会向父级对象冒泡
     * @param {string} eventName 事件名称
     * @param {Object} event 事件对象
     * @returns {void} 无返回
     */
    Observer.prototype.dispatch = function (eventName, event) {
        if (event._src_ === this)
            return;
        event._src_ = event._src_ || this;
        event._layer_ = event._layer_ || 0;
        if ((event._layer_++) >= EVENT_MAX_DISPATCH_LAYER)
            return;
        this.emit(eventName, event);
        if (!this.parents || this.parents.length < 1)
            return;
        this.parents.forEach(function (item) {
            if (!(item.name in item.parent.target)) {
                return item.parent.removeChild(this);
            }
            var parentEvent = copy(event);
            parentEvent.path = isNull(event.path) ? item.name :
                item.name + '.' + event.path;
            item.parent.dispatch(eventName, parentEvent);
        }, this);
    };
    /**
     * 获取所有成员名称列表
     * @returns {Array} 所有成员名称列表
     */
    Observer.prototype._getPropertyNames = function () {
        var names = isArray(this.target) ?
            this.target.map(function (item, index) {
                return index;
            }) : Object.keys(this.target);
        return names.filter(function (name) {
            return name !== OBSERVER_PROP_NAME;
        });
    };
    /**
     * 包裹数组
     * @param {array} array 源数组
     * @returns {array} 处理后的数组
     */
    Observer.prototype._wrapArray = function (array) {
        if (array._wrapped_)
            return;
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
            var endIndex = isNull(arguments[1])
                ? startIndex + arguments[1]
                : this.length - 1;
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
    Observer.prototype.run = function (handler, options) {
        options = options || {};
        var context = options.context, trigger = options.trigger, immed = options.immed, deep = options.deep;
        context = context || this.target;
        var auto = new AutoRun(handler, context, trigger, deep);
        this.on('get', auto.onGet);
        this.on('change', auto.onChange);
        if (immed)
            auto.run();
        return auto;
    };
    Observer.prototype.stop = function (autoRef) {
        if (!autoRef)
            return;
        this.off('get', autoRef.onGet);
        this.off('change', autoRef.onChange);
    };
    Observer.prototype.watch = function (calculator, handler, options) {
        options = options || {};
        var context = options.context;
        context = context || this.target;
        var watcher = new Watcher(calculator, handler, context);
        watcher.autoRef = this.run(watcher.calc, options);
        return watcher;
    };
    Observer.prototype.unWatch = function (watcher) {
        if (!watcher)
            return;
        this.stop(watcher.autoRef);
    };
    return Observer;
}(EventEmitter));
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
    return IGNORE_REGEXPS.some(function (re) { return re.test(word); });
};
module.exports = Observer;
//# sourceMappingURL=observer.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var _a = __webpack_require__(2), final = _a.final, isArray = _a.isArray, copy = _a.copy, each = _a.each;
/**
 * 事件触发器基类
 */
var EventEmitter = /** @class */ (function () {
    /**
     * 构建一个一个事修的触发器对象
     * @param {object} target 将代理的目标对象可以省略
     * @returns {void} 无返回
     */
    function EventEmitter(target) {
        target = target || this;
        var emitter = target._emitter_;
        if (emitter)
            return emitter;
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
    EventEmitter.prototype._isNativeObject = function (obj) {
        return obj.addEventListener && obj.removeEventListener && obj.dispatchEvent;
    };
    /**
     * 添加一个事件监听函数
     * @param {string} name 事件名称
     * @param {function} listener 事件处理函数
     * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
     * @returns {void} 无返回
     */
    EventEmitter.prototype.addListener = function (name, listener, capture) {
        if (this._isNative_) {
            this._addNativeEventListener(name, listener, capture);
        }
        this._listeners_[name] = this._listeners_[name] || [];
        this._listeners_[name].push(listener);
        var maxListeners = EventEmitter._maxListeners;
        if (this._listeners_[name].length > maxListeners) {
            throw new Error("The '" + name + "' event listener is not more than " + maxListeners);
        }
    };
    /**
     * 移除「一个/一组/所有」事件监听函数
     * @param {string} name 事件名称
     * @param {function} listener 事件处理函数
     * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
     * @returns {void} 无返回
     */
    EventEmitter.prototype.removeListener = function (name, listener, capture) {
        if (name && listener) {
            if (this._isNative_) {
                this._removeNativeEventListener(name, listener, capture);
            }
            if (!this._listeners_[name])
                return;
            var index = this._listeners_[name].indexOf(listener);
            this._listeners_[name].splice(index, 1);
        }
        else if (name) {
            if (this._isNative_ && this._listeners_[name]) {
                this._listeners_[name].forEach(function (_listener) {
                    this.removeListener(name, _listener, capture);
                }, this);
            }
            delete this._listeners_[name];
        }
        else {
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
    EventEmitter.prototype.emit = function (name, data, canBubble, cancelAble) {
        if (this._isNative_) {
            return this._emitNativeEvent(name, data, canBubble, cancelAble);
        }
        if (!this._listeners_[name])
            return;
        var stopPropagation = false;
        this._listeners_[name].forEach(function (handler) {
            var rs = handler.call(this._target_, data);
            if (rs === false)
                stopPropagation = true;
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
    EventEmitter.prototype._addNativeEventListener = function (name, listener, capture) {
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
    EventEmitter.prototype._removeNativeEventListener = function (name, listener, capture) {
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
    EventEmitter.prototype._emitNativeEvent = function (name, data, canBubble, cancelAble) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(name, canBubble, cancelAble);
        copy(data, event, ['data']);
        event.data = data;
        return this._target_.dispatchEvent(event);
    };
    return EventEmitter;
}());
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
    if (!names)
        return;
    if (!isArray(names))
        names = names.split(',');
    names.forEach(function (name) {
        this._events[name] = descriptor;
    }, this);
};
module.exports = EventEmitter;
//# sourceMappingURL=index.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports) {

var VARIABLE_FILTER = /(\(|\[|\{|\+|\-|\*|\/|\>|\<|\=|\!|\,|\;|\?|\:|\&|\|)\s*([a-z\_0-9\$]+)/ig;
var VARIABLE_NAME = /^[a-z\$\_]/i;
var ALLOWED_WORD = /^(\$scope|true|false|null|undefined|Date|Number|String|Object|Boolean|Array|RegExp|Math|JSON|parseInt|parseFloat|isNaN|isFinite)$/; //eslint-disable-line
var EXPRESSION_BLOCK = /\{\{([\s\S]+?)\}\}/;
var EXPRESSION_CACHE = {};
var TEMPLATE_CACHE = {};
function findVariables(expr) {
    expr = "(" + expr + ")";
    VARIABLE_FILTER.lastIndex = 0;
    var variables = {};
    var info;
    while (info = VARIABLE_FILTER.exec(expr)) {
        var name_1 = info[2];
        if (VARIABLE_NAME.test(name_1) && !ALLOWED_WORD.test(name_1)) {
            variables[name_1] = true;
        }
    }
    return Object.keys(variables);
}
function getValue(scope, name) {
    var value = scope[name];
    return (value instanceof Function) ? value.bind(scope) : value;
}
function expression(expr) {
    var cacheItem = EXPRESSION_CACHE[expr];
    if (cacheItem)
        return cacheItem;
    var keys = findVariables(expr);
    var func = new (Function.bind.apply(Function, [void 0, '$scope'].concat(keys, ["return(" + expr + ")"])))();
    function exec(scope) {
        var values = keys.map(function (name) { return getValue(scope, name); });
        return func.apply(void 0, [scope].concat(values));
    }
    EXPRESSION_CACHE[expr] = exec;
    return exec;
}
function template(str) {
    var cacheItem = TEMPLATE_CACHE[str];
    if (cacheItem)
        return cacheItem;
    var blocks = str.split(EXPRESSION_BLOCK);
    for (var i = 1; i < blocks.length; i += 2) {
        blocks[i] = expression(blocks[i]);
    }
    function exec(scope) {
        var result = '';
        blocks.forEach(function (block) {
            result += (block instanceof Function) ? block(scope) : block;
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
//# sourceMappingURL=expression.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(55);
module.exports = __webpack_require__(4)('iterator');

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(52)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(27)(String, 'String', function(iterated){
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(53)
  , defined   = __webpack_require__(11);
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
/* 53 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $              = __webpack_require__(0)
  , descriptor     = __webpack_require__(15)
  , setToStringTag = __webpack_require__(18)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
var Iterators = __webpack_require__(17);
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(57)
  , step             = __webpack_require__(58)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(9);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(27)(Array, 'Array', function(iterated, kind){
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
/* 57 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
__webpack_require__(66);
module.exports = __webpack_require__(7).Symbol;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var $              = __webpack_require__(0)
  , global         = __webpack_require__(6)
  , has            = __webpack_require__(16)
  , DESCRIPTORS    = __webpack_require__(30)
  , $export        = __webpack_require__(5)
  , redefine       = __webpack_require__(29)
  , $fails         = __webpack_require__(12)
  , shared         = __webpack_require__(31)
  , setToStringTag = __webpack_require__(18)
  , uid            = __webpack_require__(32)
  , wks            = __webpack_require__(4)
  , keyOf          = __webpack_require__(62)
  , $names         = __webpack_require__(63)
  , enumKeys       = __webpack_require__(64)
  , isArray        = __webpack_require__(65)
  , anObject       = __webpack_require__(33)
  , toIObject      = __webpack_require__(9)
  , createDesc     = __webpack_require__(15)
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

  if(DESCRIPTORS && !__webpack_require__(28)){
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var $         = __webpack_require__(0)
  , toIObject = __webpack_require__(9);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(9)
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
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(22);
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {



/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(69);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(37);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(13);

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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(72).set});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = __webpack_require__(0).getDesc
  , isObject = __webpack_require__(34)
  , anObject = __webpack_require__(33);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(20)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
module.exports = function create(P, D){
  return $.create(P, D);
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var connect = __webpack_require__(23);
var React = __webpack_require__(3);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var _create = __webpack_require__(37);

var _create2 = _interopRequireDefault(_create);

var _extends3 = __webpack_require__(10);

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = __webpack_require__(3);
var bindable = __webpack_require__(38);

var _require = __webpack_require__(8),
    expression = _require.expression;

var _require2 = __webpack_require__(1),
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
  var dataScope = props['data-scope'] || model;
  var initailChange = props[bindOpts.change];
  var bindExpr = compileExpr(dataBind);
  var setValue = function setValue(value) {
    return bindExpr.set((0, _create2.default)(dataScope, {
      $value: { value: value }
    }));
  };
  var getValue = function getValue() {
    return bindExpr.get(dataScope);
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
    'data-scope': undefined,
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    registerMountHandler = _require.registerMountHandler,
    registerUnmountHandler = _require.registerUnmountHandler,
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
  registerUnmountHandler(target, function () {
    this._observer_.stop(autoRef);
  });
  markAsAutorun(target, method);
}

module.exports = autorun;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    isFunction = _require.isFunction;

var _require2 = __webpack_require__(1),
    registerMountHandler = _require2.registerMountHandler,
    registerUnmountHandler = _require2.registerUnmountHandler,
    markAsWatch = _require2.markAsWatch;

function watch(calculator, immed) {
  if (!isFunction(calculator)) {
    throw new Error('Watch needs to specify a calculation function');
  }
  return function (target, method) {
    var watcher = void 0;
    registerMountHandler(target, function () {
      var context = this;
      var deep = target._deep_ && target._deep_[method];
      watcher = this._observer_.watch(function () {
        return calculator.call(this, this.model);
      }, target[method], { context: context, deep: deep });
      watcher.autoRef.run(immed || false);
    });
    registerUnmountHandler(target, function () {
      this._observer_.unWatch(watcher);
    });
    markAsWatch(target, method);
  };
}

module.exports = watch;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(1),
    registerReceivePropsHandler = _require.registerReceivePropsHandler,
    registerMountHandler = _require.registerMountHandler;

var _require2 = __webpack_require__(2),
    isObject = _require2.isObject,
    each = _require2.each,
    isString = _require2.isString;

function mapping(map) {
  if (!isObject(map)) {
    throw new Error('Mapping needs to specify a object or array');
  }
  function assign(model, props) {
    each(map, function (propName, modelField) {
      if (!isString(propName)) propName = modelField;
      if (model[modelField] === props[propName]) return;
      model[modelField] = props[propName];
    });
  }
  return function (component) {
    if (!component) return mapping;
    var proto = component.prototype;
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

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck2 = __webpack_require__(36);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(8),
    AutoRun = _require.AutoRun;

var UPDATE_EVENT = 'compositionupdate';
var END_EVENT = 'compositionend';
var INPUT_EVENT = 'input';

var Composition = function () {
  Composition.prototype.on = function on(event, handler) {
    document.addEventListener(event, handler, true);
  };

  Composition.prototype.off = function off(event, handler) {
    document.removeEventListener(event, handler, true);
  };

  Composition.prototype.enable = function enable() {
    this.on(UPDATE_EVENT, this.onUpdate);
    this.on(END_EVENT, this.onEnd);
    this.on(INPUT_EVENT, this.onInput);
  };

  Composition.prototype.disable = function disable() {
    this.off(UPDATE_EVENT, this.onUpdate);
    this.off(END_EVENT, this.onEnd);
  };

  function Composition() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Composition);
    this.composing = false;
    this.inputting = false;

    this.onUpdate = function () {
      _this.composing = true;
    };

    this.onEnd = function () {
      _this.composing = false;
    };

    this.onInput = function () {
      _this.inputting = true;
      if (_this.inputTimer) clearTimeout(_this.inputTimer);
      _this.inputTimer = setTimeout(function () {
        _this.inputting = false;
        _this.inputTimer = null;
      }, 0);
    };

    this.enable();
  }

  return Composition;
}();

var composition = new Composition();

AutoRun.prototype.isSync = function () {
  return composition.composing || composition.inputting;
};

module.exports = composition;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {"name":"mota","version":"0.4.3"}

/***/ })
/******/ ]);
});
//# sourceMappingURL=mota.js.map