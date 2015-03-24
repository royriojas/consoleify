describe( 'consoleify', function () {
  var transformTools = require( 'browserify-transform-tools' );
  var transform = require( '../' );
  var path = require( 'path' );

  it( 'should inject the console object only if the module has calls to console.*', function ( done ) {

    var dummyJsFile = path.resolve( __dirname, '../testFixtures/testWithConfig/dummy1.js' );

    var content = 'var fn = function () {};\nmodule.exports = fn;';

    transformTools.runTransform( transform.configure(), dummyJsFile, {
      content: content
    }, function ( err, transformed ) {

      if ( !err ) {
        expect( transformed ).to.be.equal( 'var fn = function () {};\nmodule.exports = fn;' );
        done();
      }
      throw err;
    }
    );
  } );

  it( 'should skip injecting if the module has the comment no inject console', function ( done ) {

    var dummyJsFile = path.resolve( __dirname, '../testFixtures/testWithConfig/dummy1.js' );

    var content = '/** NO_OVERRIDE_CONSOLE **/\nvar fn = function () { console.log("hi"); };\nmodule.exports = fn;';

    transformTools.runTransform( transform.configure(), dummyJsFile, {
      content: content
    }, function ( err, transformed ) {

      if ( !err ) {
        expect( transformed ).to.be.equal( '/** NO_OVERRIDE_CONSOLE **/\nvar fn = function () { console.log("hi"); };\nmodule.exports = fn;' );
        done();
      }
      throw err;
    }
    );
  } );


  it( 'should add it if the module has calls to console.*', function ( done ) {

    var dummyJsFile = path.resolve( __dirname, '../testFixtures/testWithConfig/dummy2.js' );

    var content = '"use strict";\nvar fn = function () { console.log("hello world"); };\nmodule.exports = fn;';

    transformTools.runTransform( transform.configure(), dummyJsFile, {
      content: content
    }, function ( err, transformed ) {

      if ( !err ) {
        expect( transformed ).to.be.equal( '\n/*wrapping console start!*/\n var console = require(\'' + path.resolve( __dirname, '../console-wrapper' ) +
            '\').create("dummy2");\n/*wrapping console end!*/\n\n"use strict";\nvar fn = function () { console.log("hello world"); };\nmodule.exports = fn;' );
        done();
      }
      throw err;
    }
    );
  } );
} );
