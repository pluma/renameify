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

function isMatchingNode(node, types) {
  if (isFunctionName(node)) {
    return types && ~types.indexOf('functions');
  }
  if (isPropertyName(node)) {
    return types && ~types.indexOf('properties');
  }
  return !types || ~types.indexOf('variables');
}

module.exports = transformTools.makeFalafelTransform('renameify', {}, function(node, opts, done) {
  var name = (
    node.type === 'Identifier' ?
    node.name :
      node.type === 'Literal' ?
      node.value : null
  );
  if (name && name in opts.config.names && isMatchingNode(node, opts.config.replace)) {
    if (node.type === 'Literal') {
      node.update(node.raw.replace(name, opts.config.names[name]));
    } else {
      node.update(opts.config.names[name]);
    }
  }
  done();
});