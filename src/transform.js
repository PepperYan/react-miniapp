const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
var t = require('@babel/types');
const transformPlugin = require('../packages/react-miniapp-tranformation-plugin');
const sharedState = require('../packages/react-miniapp-tranformation-plugin/sharedState');
const parseCode = require('../packages/react-miniapp-tranformation-plugin/utils').parseCode;

function transform(code) {
  let output = {
    wxml:'',
    wxss:'',
    js:'',
    json:'',
    type:''//App||page||component
  }

  const ast = parseCode(code);
  traverse(ast, transformPlugin);
  output = sharedState.output;

  const obj = t.objectExpression(sharedState.methods);
  output.js = generate(obj).code;
  sharedState.reset();
  return output;
}

module.exports = {
  transform,
  parseCode
}