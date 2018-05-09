module.exports = function (f) {
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
