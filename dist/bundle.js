/**
 * Author   : Robin Bron <robin@finwo.nl>
 * Build on : Fri May 25 2018 11:59:45 GMT+0200 (CEST)
 * Version  : 0.2.0
 */
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
(function() {
var module = {exports : undefined};
module.exports = function (f) {
  /**
   * $( selector ).toggleClass( className [ , newState ] )
   *
   * By default, toggles the class `className` on each of the objects in the list
   * If the `newState` parameter is given, that defines whether the class should be added (true-ish)
   *   or removed (false-ish)
   *
   * @param  {string}  className
   * @param  {boolean} newState [optional]
   *
   * @return {array}   objectList
   */
  f.fn.toggleClass = function (className, newState) {
    this.each(function () {
      if (typeof newState !== 'undefined') {
        this.className += ' ' + className;
        f(this).toggleClass(className);
        if (!newState) {
          return;
        }
      }
      if (this.className.indexOf(className) < 0) {
        this.className += ' ' + className;
      } else {
        this.className = this
          .className
          .split(' ')
          .filter(function (currentClassName) {
            return !((!currentClassName.length) || (currentClassName === className));
          })
          .join(' ');
      }
    });
    return this;
  };
};
return module.exports;
})()
(fw);
(function() {
var module = {exports : undefined};
module.exports = function(f) {
  /**
   * f( selector ).animate( parameter, target, duration )
   *
   * Animate css values. Duration is in milliseconds and has a default of 400
   *
   * @param {string} parameter
   * @param {string} target
   * @param {number} duration
   *
   * @return this
   */
  f.fn.animate = function (parameter, target, duration) {
    var object              = this;
    var supportedParameters = [
          'height', 'width',
          'marginTop',
          'marginRight',
          'marginBottom',
          'marginLeft',
          'paddingTop',
          'paddingRight',
          'paddingBottom',
          'paddingLeft'
        ],
        parameters          = parameter.forEach ? parameter : [parameter];
    parameters.forEach(function (param) {
      if (supportedParameters.indexOf(param) < 0) { return; }
      duration = duration || 400;
      object.each(function () {
        var element       = this,
            elementTarget = target,
            elementOrigin = getComputedStyle(element)[parameter];
        if (elementTarget === 'auto') {
          element.style[parameter] = 'auto';
          elementTarget            = getComputedStyle(element)[parameter];
          element.addEventListener('transitioned', function transitionEnd(event) {
            if (event.propertyName === parameter) {
              element.style.transition = '';
              element.style[parameter] = 'auto';
              element.removeEventListener('transitioned', transitionEnd, false);
            }
          });
        } else {
          element.addEventListener('transitioned', function transitionEnd(event) {
            if (event.propertyName === parameter) {
              element.style.transition = '';
              element.removeEventListener('transitioned', transitionEnd, false);
            }
          });
        }
        element.style[parameter] = elementOrigin;
        var x                    = element.offsetWidth; // force repaint
        element.style.transition = [parameter, duration + 'ms', 'ease-in-out'].join(' ');
        element.style[parameter] = elementTarget;
      });
    });
    return object;
  };
};
return module.exports;
})()
(fw);
})(function() {
  var module = {exports : undefined};
/**
 * Miniature 'framework' by Ratus B.V.
 *
 * Reason:
 *    jQuery is useful but rather large, has breaking changes & may already be loaded in an incompatible version. This
 *    framework is supposed to be minimal & stay that way. Only bugfixes may be applied & the API may not differ from
 *    the one described below. Extra functionality can be added through setting $.fn.functionName
 */
(function () {
  // IE fix
  if ( !NodeList.prototype.forEach ) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  var ready          = false,
      readyListeners = [];
  // failsafe $(function)
  setTimeout(function onDomReady() {
    if ( /loaded|complete/.test(document.readyState) ) {
      ready = true;
      var callback;
      while ( typeof (callback = readyListeners.shift()) !== 'undefined' ) { callback(); }
    } else {
      setTimeout(onDomReady,5);
    }
  },0);
  /**
   * $( selector )
   *
   * string:
   *   Use `selector` as you would with `querySelectorAll`.
   *   Returns an array of elements matching the selector
   *
   * object:
   *   Convert an object into something usable with the $ functions
   *
   * function:
   *   Run the function once the document has finished loading (or instantly if it already has)
   *
   * @param  {string|array|object|function} selector
   *
   * @return {array}                        objectList
   */
  var f = function ( selector ) {
    if ( typeof selector === 'string' ) {
      return f.convert(document.querySelectorAll(selector));
    }
    if ( typeof selector === 'object' ) {
      return f.convert(selector);
    }
    if ( typeof selector === 'function' ) {
      if ( ready ) {
        selector();
      } else {
        readyListeners.push(selector);
      }
    }
  };
  f.fn = {};
  /**
   * $( selector ).each( callback )
   *
   * Call the callback for each element in the array, mapped to the `this` variable
   * Returns the original object list
   *
   * @param  {function} callback
   *
   * @return {array}    objectList
   */
  f.fn.each = function ( callback ) {
    var object = this;
    Object.keys(object).forEach(function ( key ) {
      if ( Object.keys(f.fn).indexOf(key) >= 0 ) { return; }
      callback.call(object[ key ], object[ key ]);
    });
    return object;
  };
  /**
   * $( selector ).filter( callback )
   *
   * Call the callback for each elements & retains the element in the list if a true-like value is returned.
   * Returns an fw object with the retained elements.
   *
   * @param  {function} callback
   *
   * @return {array}    objectList
   */
  f.fn.filter = function( callback ) {
    var self = this,
        out  = [];
    Object.keys(self).forEach(function ( key ) {
      if ( Object.keys(f.fn).indexOf(key) >= 0 ) { return; }
      if ( callback.call(self[ key ],self[ key ]) ) {
        out.push(self[ key ]);
      }
    });
    return f.convert(out);
  };
  /**
   * $( selector ).find( selector )
   *
   * Essentially the same as `$( selector )` with a string parameter, but uses the objects in the list
   *   as top-most parents instead of the whole document.
   *
   * @param  {string} selector
   *
   * @return {array}  objectList
   */
  f.fn.find = function ( selector ) {
    var newList = [];
    if ( typeof selector === 'string' ) {
      this.each(function () {
        this.querySelectorAll(selector).forEach(function ( element ) {
          newList.push(element);
        });
      });
    }
    return f(newList);
  };
  /**
   * $( selector ).remove()
   *
   * Remove the items in the object list from the view.
   * Calls this.parentNode.removeChild(this) on each of the objects
   */
  f.fn.remove = function () {
    this.each(function () {
      this.parentNode.removeChild(this);
    });
  };
  /**
   * $.convert( object )
   *
   * Convert an object into something usable with $ functions
   *
   * @param  {array|object} object
   *
   * @return {array}        objectList
   */
  f.convert = function ( object ) {
    if ( !object.forEach ) {
      object = [ object ];
    }
    Object.keys(f.fn).forEach(function ( key ) {
      object[ key ] = f.fn[ key ].bind(object);
    });
    return object;
  };
  module.exports = f;
})();
  return module.exports;
});
