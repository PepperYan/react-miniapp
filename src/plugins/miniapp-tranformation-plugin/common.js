const t = require('@babel/types')
const generate = require('@babel/generator').default

module.exports = {
  ConvertJSXOpeningElement: function(path){
    path.node.attributes.forEach(attr => {
      const originName = attr.name.name;
      const attrName = attr.name.name.toLowerCase();
      console.log(originName);
      console.log(attr.value.expression);
    });
  }
}