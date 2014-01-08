/*global describe, it */
/*jshint multistr:true */
var expect = require('expect.js'),
  renameify = require('../');

var src = 'var foo = {};\
foo = function foo(foo) {\
  function foo() {\
    var foo = 5;\
  }\
};\
foo.foo = {foo: {\'foo\': {"foo": 5}}};\
foo[\'foo\'] = 5;\
foo["foo"] = 5;';

var replacedVariables = 'var bar = {};\
bar = function foo(bar) {\
  function foo() {\
    var bar = 5;\
  }\
};\
bar.foo = {foo: {\'foo\': {"foo": 5}}};\
bar[\'foo\'] = 5;\
bar["foo"] = 5;';

var replacedFunctions = 'var foo = {};\
foo = function bar(foo) {\
  function bar() {\
    var foo = 5;\
  }\
};\
foo.foo = {foo: {\'foo\': {"foo": 5}}};\
foo[\'foo\'] = 5;\
foo["foo"] = 5;';

var replacedProperties = 'var foo = {};\
foo = function foo(foo) {\
  function foo() {\
    var foo = 5;\
  }\
};\
foo.bar = {bar: {\'bar\': {"bar": 5}}};\
foo[\'bar\'] = 5;\
foo["bar"] = 5;';

describe('renameify', function() {
  it('is a function', function() {
    expect(renameify).to.be.a('function');
  });
  it('replaces matching variable names', function(done) {
    var tr = renameify.configure({variables: {foo: 'bar'}})('qux.js');
    var data = '';
    tr.on('data', function(chunk) {
      data += chunk;
    });
    tr.on('end', function() {
      expect(data).to.equal(replacedVariables);
      done();
    });
    tr.write(src);
    tr.end();
  });
  it('replaces matching function names', function(done) {
    var tr = renameify.configure({functions: {foo: 'bar'}})('qux.js');
    var data = '';
    tr.on('data', function(chunk) {
      data += chunk;
    });
    tr.on('end', function() {
      expect(data).to.equal(replacedFunctions);
      done();
    });
    tr.write(src);
    tr.end();
  });
  it('replaces matching property names', function(done) {
    var tr = renameify.configure({properties: {foo: 'bar'}})('qux.js');
    var data = '';
    tr.on('data', function(chunk) {
      data += chunk;
    });
    tr.on('end', function() {
      expect(data).to.equal(replacedProperties);
      done();
    });
    tr.write(src);
    tr.end();
  });
});