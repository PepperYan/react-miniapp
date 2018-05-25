var visitor = require('./visitor');
var t = require('@babel/types');
const visitJSX = require('./visitjsx');

module.exports = Object.assign({}, visitor, visitJSX)


