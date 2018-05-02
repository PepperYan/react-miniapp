const babylon = require('babylon');
const traverse = require('@babel/traverse').default
const transformPlugin = require('./plugins/miniapp-tranformation-plugin');

function parseCode(code){
  var options = {
    babelrc: false,
    sourceType: 'module',
    plugins: ['jsx', 'objectRestSpread', 'classProperties'],
  }

  return babylon.parse(code, options);
}

function transform(code){
  const ast = parseCode(code);
  // const plugin = Object.assign({}, visitor)
  traverse(ast, transformPlugin);
}

module.exports = {
  transform,
  parseCode
}