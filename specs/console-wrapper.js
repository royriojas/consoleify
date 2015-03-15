describe( 'console-wrapper', function () {
  var proxyquire = require( 'proxyquire' ).noCallThru().noPreserveCache();
  describe( 'console enabled', function () {
    it( 'should prefix the call to console methods', function () {
      var me = this;

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

      var mockConsole = me.sandbox.createSpyObj( 'console', consoleKeys );

      var consoleWrapper = proxyquire( '../console-wrapper', {
        console: mockConsole
      } );

      var clog = consoleWrapper.create( 'dummyModule' );

      consoleKeys.forEach( function ( method ) {
        clog[ method ]( 'a message' );

        expect( mockConsole[ method ] ).to.have.been.calledWith( 'dummyModule:', 'a message' );
      } );

    } );
  } );
} );
