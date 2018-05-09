(function(factory) {
  var fw = factory();

  /** global: define */
  if (('function' === typeof define) && define.amd) {
    define([], function() {
      return fw;
    });
  } else if ('undefined' !== typeof window) {
    window.fw = factory();
  }

  // ---[ module plugin/toggleClass.js ]---(fw);
  // ---[ module plugin/animate.js ]---(fw);

})(function() {
  var module = {exports : undefined};
  // ---[ file base.js ]---
  return module.exports;
});
