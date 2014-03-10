/*! renameify 0.3.0 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
var transformTools = require('browserify-transform-tools');

function isFunctionName(node) {
  return (
    node.parent.type === 'FunctionDeclaration' ||
    node.parent.type === 'FunctionExpression'
  ) && !~node.parent.params.indexOf(node);
}

function isPropertyName(node) {
  return (
    node.parent.type === 'MemberExpression' &&
    node.parent.property === node
  ) || (
    node.parent.type === 'Property' &&
    node.parent.key === node
  );
}

function getReplacementValue(name, node, config) {
  if (!name) {
    return undefined;
  }
  if (isFunctionName(node)) {
    return config.functions ? config.functions[name] : undefined;
  }
  if (isPropertyName(node)) {
    return config.properties ? config.properties[name] : undefined;
  }
  return config.variables ? config.variables[name] : undefined;
}

module.exports = transformTools.makeFalafelTransform('renameify', {}, function(node, opts, done) {
  var name = (
    node.type === 'Identifier' ?
    node.name :
      node.type === 'Literal' ?
      node.value : null
  );
  var replacement = getReplacementValue(name, node, opts.config);
  if (replacement !== undefined) {
    if (node.type === 'Literal') {
      node.update(node.raw.replace(name, replacement));
    } else {
      node.update(replacement);
    }
  }
  done();
});