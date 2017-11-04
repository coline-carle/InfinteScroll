'use strict';

export default class InfinteScroll {
  constructor(loadMoreFunc, heightFactor = 0.1, minThrottleMsec = 100) {
    this.minThrottleMsec = minThrottleMsec;
    this.heightFactor = heightFactor;

    this.loadMoreFunc = loadMoreFunc;
    this.boundHandler = this._handler.bind(this);
  }

  subscribe() {
    window.addEventListener('scroll', this.boundHandler);
  }

  unsubscribe() {
    window.removeEventListener('scroll', this.boundHandler);
  }
  _scrollTop() {
    return window.pageYOffset;
  }

  _windowHeight() {
    return document.documentElement.clientHeight;
  }

  _bodyHeight() {
    return document.documentElement.scrollHeight;
  }

  _distFromBottom() {
    return Math.max(this._bodyHeight() - (this._scrollTop() + this._windowHeight()));
  }

  _defaultHandler() {
    if (this._distFromBottom() < this._windowHeight() * this.heightFactor) {
      this.unsubscribe();
      this.loadMoreFunc.call();
    }
  }

  _throttle(func, wait) {
    let timeout = null;
    let previous = 0;

    function later() {
      previous = new Date().getTime();
      clearTimeout(timeout);
      timeout = null;
      return func.call();
    }

    function throttled() {
      const now = new Date().getTime();
      const remaining = wait - (now - previous);
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        func.call();
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
    }

    return throttled();
  }

  _handler() {
    return this._throttle(this._defaultHandler.bind(this), this.minThrottleMsec);
  }
}
