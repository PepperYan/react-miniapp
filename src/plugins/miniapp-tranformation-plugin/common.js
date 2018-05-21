const t = require('@babel/types')
const generate = require('@babel/generator').default
const WXML_EVENTS = require('./wx/events');
const chalk = require('chalk').default;
const wxTags = require('./wx/tag');

module.exports = {
  ConvertJSXOpeningElement: function(path){
    
    path.node.attributes.forEach(attr => {
      const originName = attr.name.name;
      const attrName = attr.name.name.toLowerCase();
      if(WXML_EVENTS[attrName]){
        //映射事件
        attr.name = t.identifier(WXML_EVENTS[attrName]);
        const funName = generate(attr.value.expression.property).code;
        if (t.isCallExpression(attr.value.expression) || t.isArrowFunctionExpression(attr.value.expression)) {
            const warningCode = generate(attr.value.expression).code
            console.log(
              `警告：小程序不支持在模板中使用function/arrow function，因此 '${warningCode}' 不会被编译`
            );
        }
        attr.value = t.stringLiteral(funName);
        // console.log(attr.value);
      }
      if(attrName === 'style'){
        let tempAttrs = ''
        attr.value.expression.properties.forEach(style => {
          const key = generate(style.key).code;
          // TODO 未支持变量
          const value = style.value.value;
          // console.log(style.value.value);
          tempAttrs += `${key}:${value}`;
        })
        attr.value = t.stringLiteral(`${tempAttrs}`);
      }
    });
  }
}