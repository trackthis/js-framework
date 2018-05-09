module.exports = function(f) {
  /**
   * f( selector ).animate( parameter, target, duration )
   *     @param {string} parameter
   *     @param {string} target
   *     @param {number} duration
   *
   *     @return this
   *
   *     Animate css values. Duration is in milliseconds and has a default of 400
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
      if (supportedParameters.indexOf(param) < 0) return;
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
