module.exports = function(f) {

  /**
   * f( selector ).on( eventName, callback )
   *     @param  {string}   eventName
   *     @param  {function} callback
   *     @return {array}    objectList
   *
   *     Attach an event listener to all objects in the list where the event identifies with the event name.
   */
  f.fn.on = function ( eventName, callback ) {
    this.each(function () {
      var entry = this;
      if ( entry.addEventListener ) {
        entry.addEventListener(eventName, callback, false);
      } else if ( entry.attachEvent ) {
        entry.attachEvent("on" + eventName, function () {
          return callback.call(entry, window.event);
        });
      }
    });
    return this;
  };

  /**
   * f( selector ).trigger( eventName )
   *     @param  {string} eventName
   *     @return {array}  objectList
   *
   *     Trigger an event by name on all objects in the list with optional data
   */
  f.fn.trigger = function ( eventName ) {
    this.each(function () {
      var e = null;
      if ( document.createEventObject ) {
        e = document.createEventObject();
        this.fireEvent('on' + eventName, e);
      } else {
        e = document.createEvent('HTMLEvents');
        e.initEvent(eventName, true, true);
        this.dispatchEvent(e);
      }
    });
    return this;
  };

};
