const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default
const chalk = require('chalk').default;
const WXML_EVENTS = require('./wx/events');
const wxTags = require('./wx/tag');
const parseCode = require('./utils').parseCode


let cache = {};

function getMapVisitor(){
  return {
    CallExpression(path){
      cache.object = generate(path.node.callee.object).code;
    },
    ReturnStatement:{
      exit(path){
        if(path.node){
          // console.log(path.node)
          const result = generate(path.node.argument).code;
          cache.return = result;
        }
      }
    },
    FunctionExpression(path) {
      path.node.params.forEach((arg, index) => {
          if (index === 0) cache.item = generate(arg).code
          if (index === 1) cache.index = generate(arg).code
      })
    },
    ArrowFunctionExpression(path) {
      path.node.params.forEach((arg, index) => {
          if (index === 0) that.item = generate(arg).code
          if (index === 1) that.index = generate(arg).code
      })
    },
    JSXOpeningElement:{
      enter(path){
        // console.log(path.parent);
        const tag = path.parent.openingElement.name.name;
        // TODO 处理key

        const jsx = t.jsxOpeningElement(t.jsxIdentifier(wxTags[tag]),[
          t.jSXAttribute(t.jSXIdentifier('wx:for'), t.stringLiteral(`{{${cache.object}}}`)),
          t.jSXAttribute(t.jSXIdentifier('wx:for-item'), t.stringLiteral(`{{${cache.item}}}`)),
          t.jSXAttribute(t.jSXIdentifier('wx:for-index'), t.stringLiteral(`{{${cache.index}}}`)),
        ])

        path.parent.openingElement = jsx;
      },
      exit(path){
        common.convertJSXOpeningElement(path);
      }
    },
    JSXExpressionContainer(path){
      common.convertJSXExpressionContainer(path);
    },
    JSXClosingElement(path){
      if (!path.node.selfClosing) {
        path.node.name = t.identifier(wxTags[path.node.name.name]);
      }
    }
  }
}


const common = {
  convertJSXOpeningElement: function(path){
    path.node.name = t.identifier(wxTags[path.node.name.name]);
    path.node.attributes.forEach((attr, index) => {
      const originName = attr.name.name;
      const attrName = attr.name.name.toLowerCase();
      if(attrName === 'classname'){ // 转换className到class
        path.node.attributes[index] = t.jsxAttribute(t.jsxIdentifier('class'), t.stringLiteral('app'));
        return;
      }
      if(WXML_EVENTS[attrName]){ // 事件转换
        //映射事件
        attr.name = t.identifier(WXML_EVENTS[attrName]);
        const funName = generate(attr.value.expression.property).code;
        if (t.isCallExpression(attr.value.expression) || t.isArrowFunctionExpression(attr.value.expression)) {
            const warningCode = generate(attr.value.expression).code
            console.log(
              `小程序不支持在模板中使用function/arrow function，因此 '${warningCode}' 不会被编译`
            );
        }
        attr.value = t.stringLiteral(funName);
        return;
      }
      if(attrName === 'style'){ // 样式转换
        let tempAttrs = ''
        attr.value.expression.properties.forEach(style => {
          const key = generate(style.key).code;``
          // TODO 未支持变量转换 'position:{{p}}'
          const value = style.value.value;
          tempAttrs += `${key}:${value}`;
        })
        attr.value = t.stringLiteral(`${tempAttrs}`);
      }
    });
  },
  convertJSXExpressionContainer(path) {
    if(t.isJSXAttribute(path.parent)) { //<img src={this.props.imgSrc}>
      const varibleName = generate(path.node.expression).code;
      path.replaceWith(t.stringLiteral(`{{${varibleName}}}`));
      return
    }
    if(
      t.isMemberExpression(path.node.expression)|| //{this.props.children}
      // t.isIdentifier(path.node.expression)||  //{}
      t.isBinaryExpression(path.node.expression)  //{1+2}
    ){
      const code = generate(path.node.expression).code
      if(code === 'this.props.children'){
        const openningTag = t.jsxOpeningElement(t.jsxIdentifier('slot'), [], true);
        path.replaceWith(openningTag);
      }else{
        path.node.expression = t.identifier(`{${code}}`);
      }
      return
    }
    if(t.isJSXExpressionContainer(path.node)){
      if(path.node.expression.callee.property.name === 'map'){
        const mapAST = parseCode(generate(path.node.expression).code)
        traverse(mapAST, getMapVisitor.call(this));
        path.replaceWith(t.identifier(cache.return));
        cache = {}
      }else{
        path.remove();
      }
    }
  },

}




module.exports = Object.assign({},common,{getMapVisitor});