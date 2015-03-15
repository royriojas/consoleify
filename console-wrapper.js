/** NO_OVERRIDE_CONSOLE **/
/**
 * Super simple module to remove logs/debugs from the app
 */
var oldConsole = require('console') || {};

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
    var consoleObj = {};
    consoleKeys.forEach( function ( method ) {
      var methodFound = oldConsole[ method ];
      if (!methodFound) {
        return;
      }
      consoleObj[ method ] = moduleName ? methodFound.bind( oldConsole, moduleName + ':' ) : methodFound.bind( oldConsole );
    } );
    return consoleObj;
  }
};

module.exports = consoleWrapper;
