var sFormat = require( 'stringformat' );
var transformTools = require( 'browserify-transform-tools' );
var path = require( 'path' );

var options = {
  includeExtensions: [
    '.js',
    '.jsx',
    '.es6'
  ]
};
var customConsole = '\n/*wrapping console start!*/\n var console = require(\'{1}\').create("{0}");\n/*wrapping console end!*/\n\n';

module.exports = transformTools.makeStringTransform( 'consoleify', options, function ( content, transformOptions, done ) {
  var file = transformOptions.file;

  var usesConsole = content.indexOf( 'console' ) > -1;
  if ( usesConsole && content.indexOf( '/** NO_OVERRIDE_CONSOLE **/' ) === -1 ) {
    var pathToFile = path.relative( path.dirname( file ), path.resolve( __dirname, './console-wrapper' ) );
    content = sFormat( customConsole, path.basename( file ).replace( /\.js(x)*$/, '' ), pathToFile ) + content;
  }

  done( null, content );
} );
