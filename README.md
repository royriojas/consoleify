[![NPM Version](http://img.shields.io/npm/v/consoleify.svg?style=flat)](https://npmjs.org/package/consoleify)
[![Build Status](http://img.shields.io/travis/royriojas/consoleify.svg?style=flat)](https://travis-ci.org/royriojas/consoleify)

# consoleify
> browserify transform to inject a custom console object that prefix the calls to it with the name of the module itself 

## Overview
This transform will turn this: 

```javascript
//my-module.js
var someFunc = function () {
  console.log('hello');
};
module.exports = someFunc;
```

Into this:

```javascript
/*wrapping console start!*/
var console = require('consoleify/console-wrapper').create("dummy2");
/*wrapping console end!*/

var someFunc = function () {
};
module.exports = someFunc;
```
So console methods calls are prefixed by the module where the call was done, for easy tracking/filtering of logs 

the `consoleify/console-wrapper` module is also part of this module

## Install

```bash
npm i --save-dev consoleify
```

## Usage

```
var consoleify = require( 'consoleify' );

var b = browserify();
b.add('./my-module');
b.transform( consoleify );
b.bundle().pipe(process.stdout);
```

## License

MIT

## Changelog

[Changelog](./changelog.md)