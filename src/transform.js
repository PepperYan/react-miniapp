const babylon = require('babylon');
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
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
  let outPut = {
    wxml:'',
    wxss:'',
    js:'',
    json:'',
    type:''//App||page||component
  }
  const ast = parseCode(code);
  // const plugin = Object.assign({}, visitor)
  // traverse(ast, transformPlugin);
  return ast;
}

module.exports = {
  transform,
  parseCode
}