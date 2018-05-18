const t = require('@babel/types')
const generate = require('@babel/generator').default
const WXML_EVENTS = require('../../wx/events');

module.exports = {
  ConvertJSXOpeningElement: function(path){
    path.node.attributes.forEach(attr => {
      const originName = attr.name.name;
      const attrName = attr.name.name.toLowerCase();
      if(WXML_EVENTS[attrName]){
        attr.name = t.identifier(WXML_EVENTS[attrName]);
        const funName = generate(attr.value.expression.property).code;
        attr.value = t.stringLiteral(funName);
        // console.log(attr.value);
      }
      if(attrName === 'style'){
        let tempAttrs = ''
        attr.value.expression.properties.forEach(style => {
          const key = generate(style.key).code;
          // console.log(style.key)
        })
      }
    });
  }
}