/** NO_OVERRIDE_CONSOLE **/
module.exports = {
  /**
   * init this module and shims the console if the console object does not exist.
   * @method init
   * @static
   */
  init: function () {
    var win = global || window;

    if ( win.console ) {
      return;
    }

    var noop = Function.prototype;

    win.console = { };

    var methods = [
      'assert',
      'count',
      'debug',
      'dir',
      'dirxml',
      'error',
      'group',
      'groupEnd',
      'info',
      'log',
      'profile',
      'profileEnd',
      'profiles',
      'time',
      'timeEnd',
      'trace',
      'warn'
    ];

    for (var i = 0, len = methods.length; i < len; i++) {
      var method = methods[ i ];
      win.console[ method ] = noop;
    }
  }
};
