(function(factory) {
  /** global: define */
  if (('function' === typeof define) && define.amd) {
    define([], factory);
  } else if ('undefined' !== typeof window) {
    window.fw = factory();
  }
})(function() {
  var module = {exports : undefined};
  // ---[ file base.js ]---
  return module.exports;
});
