const babylon = require('babylon');
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
var t = require('@babel/types');
const transformPlugin = require('./plugins/miniapp-tranformation-plugin');
const sharedState = require('./plugins/miniapp-tranformation-plugin/sharedState');

function parseCode(code) {
  var options = {
    babelrc: false,
    sourceType: 'module',
    plugins: ['jsx', 'objectRestSpread', 'classProperties'],
  }

  return babylon.parse(code, options);
}

function transform(code) {
  let output = {
    wxml:'',
    wxss:'',
    js:'',
    json:'',
    type:''//App||page||component
  }

  const ast = parseCode(code);
  
  // const plugin = Object.assign({}, visitor)
  traverse(ast, transformPlugin);
  output = sharedState.output;

  const obj = t.objectExpression(sharedState.methods);
  output.js = generate(obj).code;

  return output;
}

module.exports = {
  transform,
  parseCode
}