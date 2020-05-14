/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

import { Defer } from './Defer';


export const tickOwner = {
  handlers: [],
  pending: false
};

export function execHandlers() {
  tickOwner.pending = false;
  const copies = tickOwner.handlers.slice(0);
  tickOwner.handlers.length = 0;
  copies.forEach(handler => handler());
}

export function createTimer() {
  if (typeof Promise !== 'undefined') {
    const promise = Promise.resolve();
    return () => {
      promise.then(execHandlers).catch(err => console.error(err));
    };
  } else if (
    typeof MutationObserver !== 'undefined' ||
    // PhantomJS and iOS 7.x
    window.MutationObserver.toString() ===
    '[object MutationObserverConstructor]'
  ) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    let counter = 1;
    const observer = new MutationObserver(execHandlers);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, { characterData: true });
    return () => {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    return () => {
      setTimeout(execHandlers, 0);
    };
  }
}

export const tickTimer = createTimer();

export function nextTick(callback, ctx, unique) {
  if (unique === true) {
    const exists = tickOwner.handlers.find(
      handler => handler.callback === callback
    );
    if (exists) return exists.promise;
  }
  const defer = new Defer();
  const handler = () => {
    try {
      const result = callback ? callback.call(ctx) : null;
      if (defer.resolve) defer.resolve(result);
    } catch (err) {
      if (defer.reject) defer.reject(err);
    }
  };
  handler.callback = callback;
  handler.promise = defer.promise;
  tickOwner.handlers.push(handler);
  if (!tickOwner.pending) {
    tickOwner.pending = true;
    tickTimer();
  }
  return defer.promise;
}
