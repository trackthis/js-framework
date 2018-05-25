module.exports = function(f) {

  /**
   * f( selector ).style( parameter, target, duration )
   *     @param {object} parameters
   *     @param {string} [target]
   *
   *     @return {object} this
   *
   *     Set styling properties
   */
  f.fn.style = function ( parameters ) {
    var args = Array.prototype.slice.call(arguments),
        obj  = this;

    if ( ('object' !== typeof parameters) && args.length === 2 ) {
      var opts = {};
      opts[args[0]] = args[1];
      return f.fn.style.call(this,opts);
    }

    obj.each(function(el) {
      Object.keys(parameters).forEach(function(param) {
        el.style[param] = parameters[param];
      });
    });

    return obj;
  };

};
