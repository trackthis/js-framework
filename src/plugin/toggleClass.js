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
