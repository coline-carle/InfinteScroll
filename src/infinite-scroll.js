import _ from 'lodash';

export default class InfinteScroll {
  constructor(loadMoreFunc, heightFactor = 0.1, minThrottleMsec = 100) {
    this.minThrottleMsec = minThrottleMsec;
    this.heightFactor = heightFactor;

    this.loadMoreFunc = loadMoreFunc;
    window.addEventListener('scroll', e => this.handler(e));
  }

  scrollTop() {
    return window.pageYOffset;
  }

  windowHeight() {
    return document.documentElement.clientHeight;
  }

  bodyHeight() {
    return document.body.scrollHeight;
  }

  distFromBottom() {
    return Math.max(this.bodyHeight() - (this.scrollTop() + this.windowHeight()));
  }

  defaultHandler() {
    if (this.distFromBottom() < this.windowHeight() * this.heightFactor) {
      this.loadMoreFunc.call();
    }
  }

  handler() {
    return _.throttle(this.defaultHandler, this.min_throttle_msec);
  }
}
