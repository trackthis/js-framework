(function(factory) {
  var fw = factory();

  /** global: define */
  if (('function' === typeof define) && define.amd) {
    define([], function() {
      return fw;
    });
  } else if ('undefined' !== typeof module && 'exports' in module) {
    module.exports = fw;
  } else if ('undefined' !== typeof window) {
    window.fw = fw;
  }

  // ---[ module plugin/toggleClass.js ]---(fw);
  // ---[ module plugin/animate.js ]---(fw);
  // ---[ module plugin/events.js ]---(fw);
  // ---[ module plugin/style.js ]---(fw);

})(function() {
  var module = {exports : undefined};
  // ---[ file base.js ]---
  return module.exports;
});
