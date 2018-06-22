const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const babel = require('@babel/core')
var t = require('@babel/types');
const transformPlugin = require('../packages/react-miniapp-tranformation-plugin');
const sharedState = require('../packages/react-miniapp-tranformation-plugin/sharedState');
const parseCode = require('../packages/react-miniapp-tranformation-plugin/utils').parseCode;

function transform(code, sourcePath) {
  let output = {
    wxml:'',
    wxss:'',
    js:'',
    json:'',
    type:''//App||page||component
  }
  sharedState.sourcePath = sourcePath;
  const result = babel.transform(code, {
    babelrc: false,
    plugins: [
      '@babel/plugin-syntax-jsx', 
      transformPlugin, 
      '@babel/plugin-proposal-object-rest-spread',  
      ['@babel/plugin-proposal-decorators',{"legacy": true}] 
    ]
  })
  // tranform后, 结果都会写入sharedState.output
  output = sharedState.output;
  // const obj = t.objectExpression(sharedState.methods);
  output.js = result.code;
  sharedState.reset();

  return output;
}

module.exports = {
  transform,
  parseCode
}