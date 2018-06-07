var visitor = require('./visitor');
var t = require('@babel/types');
const visitJsx = require('./visitjsx');
const declare = require('@babel/helper-plugin-utils').declare;
const syntaxClassProperties = require("@babel/plugin-syntax-class-properties").default;

module.exports = declare(function(api, options){
  return {
    inherits: syntaxClassProperties,
    visitor: Object.assign({}, visitor, visitJsx)
  }
})


