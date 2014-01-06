# Synopsis

**renameify** is a [browserify](https://github.com/substack/node-browserify) transform for replacing variable, function and property names.

This library uses [browserify-transform-tools](https://github.com/benbria/browserify-transform-tools), so you can also supply the configuration by adding a `renameify` field to your project's `package.json` file.

[![Build Status](https://travis-ci.org/pluma/renameify.png?branch=master)](https://travis-ci.org/pluma/renameify) [![NPM version](https://badge.fury.io/js/renameify.png)](http://badge.fury.io/js/renameify) [![Dependencies](https://david-dm.org/pluma/renameify.png)](https://david-dm.org/pluma/renameify)

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
    names: {'someVariableName': 'newVariableName'},
    replace: ['variables']
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
        "names": {"someVariableName": "newVariableName"},
        "replace": ["variables"]
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

### rules.names

An object mapping input names to their replacements.

### rules.replace (optional)

An array containing the types of names which should be replaced. Valid values are:

#### variables (default)

Replaces all matching variable names. This includes local (`var`, `let`, etc) and global variables, as well as argument names in function declarations and function expressions.

#### properties

Replaces all matching property names. This includes names used in object literals (`foo` in `{foo: 2}`, `{'foo': 2}` and `{"foo": 2}`) as well as in property references (`foo` in `bar.foo`, `bar['foo']` and `bar["foo"]`).

#### functions

Replaces all matching function names. This includes function declarations as well as named function expressions.

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/renameify/blob/master/UNLICENSE) file.