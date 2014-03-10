# Synopsis

**renameify** is a [browserify](https://github.com/substack/node-browserify) transform for replacing variable, function and property names.

This library uses [browserify-transform-tools](https://github.com/benbria/browserify-transform-tools), so you can also supply the configuration by adding a `renameify` field to your project's `package.json` file.

[![stability 3 - stable](http://b.repl.ca/v1/stability-3_--_stable-yellowgreen.png)](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/renameify)

[![Build Status](https://travis-ci.org/pluma/renameify.png?branch=master)](https://travis-ci.org/pluma/renameify) [![Coverage Status](https://coveralls.io/repos/pluma/renameify/badge.png?branch=master)](https://coveralls.io/r/pluma/renameify?branch=master) [![Dependencies](https://david-dm.org/pluma/renameify.png?theme=shields.io)](https://david-dm.org/pluma/renameify)

[![NPM status](https://nodei.co/npm/renameify.png?compact=true)](https://npmjs.org/package/renameify)

# Install

## Node.js

### With NPM

```sh
npm install renameify
```

### From source

```sh
git clone https://github.com/pluma/renameify.git
cd renameify
npm install
make test
```

# Basic usage example

## Source

```javascript
var someVariableName = 20;
console.log(someVariableName);
```

## Result

```javascript
var newVariableName = 20;
console.log(newVariableName);
```

## Usage

```javascript
var browserify = require('browserify'),
    renameify = require('renameify'),
    b = browserify();

b.transform(renameify.configure({
    variables: {'someVariableName': 'newVariableName'}
}));
b.add('./app.js');
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

# Usage example with package.json

## package.json

```json
{
    "name": "my-awesome-project",
    "devDependencies": {
        "browserify": "*",
        "renameify": "*"
    },
    "renameify": {
        "variables": {"someVariableName": "newVariableName"}
    }
}
```

### Usage (API)

```javascript
var browserify = require('browserify'),
    renameify = require('renameify'),
    b = browserify();

b.transform(renameify);
b.add('./app.js');
b.bundle().pipe(require('fs').createWriteStream('bundle.js'));
```

### Usage (Shell)

```sh
browserify -t renameify ./app.js > bundle.js
```

# API

## renameify.configure(rules):transform

Creates a browserify transform that will replace the given names.

### rules.variables

Replaces all matching variable names. This includes local (`var`, `let`, etc) and global variables, as well as argument names in function declarations and function expressions.

### rules.properties

Replaces all matching property names. This includes names used in object literals (`foo` in `{foo: 2}`, `{'foo': 2}` and `{"foo": 2}`) as well as in property references (`foo` in `bar.foo`, `bar['foo']` and `bar["foo"]`).

### rules.functions

Replaces all matching function names. This includes function declarations as well as named function expressions.

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/renameify/blob/master/UNLICENSE) file.