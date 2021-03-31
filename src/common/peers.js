/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

export const isBrowser = typeof window !== 'undefined';
export const React = isBrowser ? require('react') : {};
export const ReactDOM = isBrowser ? require('react-dom') : {};
