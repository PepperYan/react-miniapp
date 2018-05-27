const prettifyXml = require('prettify-xml');
const babylon = require('@babel/parser');

module.exports = {
  prettifyXml(wxml) {
    return prettifyXml(wxml, { indent: 2 })
  },
  parseCode(code) {
    var options = {
      babelrc: false,
      sourceType: 'module',
      plugins: ['jsx', 'objectRestSpread', 'classProperties','classPrivateProperties','decorators'],
    }
  
    return babylon.parse(code, options);
  }
}