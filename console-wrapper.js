/** NO_OVERRIDE_CONSOLE **/
/**
 * Super simple module to remove logs/debugs from the app
 */

// make sure a console object exists
require( './shim' ).init();

//var win.console = require( './console' ) || {};
var win = require( './window' );

var originalApply = Function.prototype.apply;

var consoleKeys = [
  'log',
  'debug',
  'info',
  'dir',
  'warn',
  'error',
  'trace',
  'group',
  'groupCollapsed',
  'groupEnd',
  'profile',
  'profileEnd',
  'time',
  'timeEnd'
];

var consoleWrapper = {
  create: function ( moduleName ) {
    if ( !Function.prototype.bind ) {
      return win.console;
    }
    var consoleObj = { };
    consoleKeys.forEach( function ( method ) {
      var methodFound = win.console[ method ];
      if ( !methodFound ) {
        return;
      }
      if ( methodFound.bind ) {
        consoleObj[ method ] = moduleName ? methodFound.bind( win.console, moduleName + ':' ) : methodFound.bind( win.console );
      } else {
        consoleObj[ method ] = function () {
          var args = [ moduleName ].concat( arguments );

          try {
            originalApply.apply( methodFound, [
              win.console, // the object this
              args // the arguments
            ] );
          } catch (ex) {};
        };
      }

    } );
    return consoleObj;
  }
};

module.exports = consoleWrapper;
