import matchMediaPolyfill from 'mq-polyfill';

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
})