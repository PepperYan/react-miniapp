/*
 * @Author: hibad 
 * @Date: 2018-06-24 10:36:07 
 * @Last Modified by: hibad
 * @Last Modified time: 2018-06-28 00:52:54
 */
const sharedState = require('./sharedState');
const t = require('@babel/types');
const template = require('@babel/template').default;
const generate = require('@babel/generator').default;
const prettifyXml = require('./utils').prettifyXml;
const nPath = require('path');
const fs = require('fs-extra');
const converters = require('./converters');

const componentLiftMethods = {
  created: 1,
  attached: 1,
  ready: 1,
  moved: 1,
  detached: 1,
  relations: 1,
  externalClasses: 1,
  options: 1,
  data: 1,
  properties: 1
}

const Pages = [];

function loadCSSFromFile(filePath){
  const content = fs.readFileSync(filePath, "utf8");
  sharedState.output.wxss += content;
}

module.exports = {
  ClassDeclaration: {
    enter(path) {      
      //取得组件的父类
      let className = path.node.superClass ? path.node.superClass.name : "";
      let match = className.match(/\.?(App|Page|Component)/);
      if (match) {
        var clazzName = match[1];
        //取得或清理组件名，组件名可以用于defaultProps
        sharedState.componentName =
        clazzName === "Component" ? path.node.id.name : null;
        sharedState.output.type = clazzName;
      }
    },
    exit(path) {
      // 把该节点从path中移除?
      /*const call = t.expressionStatement(
        t.callExpression(
          t.identifier(sharedState.output.type),
          [t.objectExpression(sharedState.compiled.methods)]
        )
      );*/
      const call = t.expressionStatement(
        t.callExpression(t.identifier(sharedState.output.type), [
          t.callExpression(t.identifier("onInit"), [
            t.objectExpression(sharedState.compiled.methods)
          ])
        ])
      );
      var onInit = template(`const onInit = function (config){
        if(config.hasOwnProperty("constructor")){
          config.constructor.call(config)
        }
        config.data = obj.state;
        return config;
      }`)({});
      //插入到最前面
      path.insertBefore(onInit)
      //可以通过`console.log(generate(call).code)`验证
      path.replaceWith(call);
    }
  },
  MemberExpression(path) {    
    //转换constructor与render外的方法中的this.state为this.data
    if (
      sharedState.walkingMethod !== "constructor" &&
      sharedState.walkingMethod !== "render"
    ) {
      const code = generate(path.node).code;
      if (code === "this.state") {
        path.node.property.name = "data";
      }
    }
  },
  AssignmentExpression(path){
    // 转换微信小程序component的properties对象为defaultProps
    if(path.node.left.property.name === "defaultProps"){
      if(sharedState.output.type !== 'Component') return;
      converters.defaultProps(path.node.right.properties);
      path.remove();
    }
  },
  ClassProperty(path) {
    const propName = path.node.key.name;
    if (/window/.test(propName) && path.node.static) {
      let config = {};
      path.node.value.properties.forEach(prop => {
        config[prop.key.name] = prop.value.value;
      })
      if (sharedState.output.type === 'App') {
        config = {
          window: config,
          pages: Pages
        };
      }
      // TODO 考虑下如何更合理配置
      sharedState.output.json = config !== ''? config: "{}";
    }else if (/defaultProps/.test(propName) && path.node.static) {
      if(sharedState.output.type !== 'Component') return; // 只有Component有properties
      converters.defaultProps(path.node.value.properties);
      path.remove();
    }
  },
  ImportDeclaration(path) {    
    const source = path.node.source.value;
    if (/wechat/.test(source)) {
    } else if (/pages/.test(source)) {
      const pagePath = source.replace('./', '');
      Pages.push(pagePath);
    } else if (/components/.test(source)) {
      const { specifiers } = path.node;
      for (let sp of specifiers) {
        const componentName = sp.local.name;
        sharedState.importedComponent[componentName] = source;
      }
    } else if (/.css/.test(source)) {
      loadCSSFromFile(nPath.resolve(sharedState.sourcePath, '..' , source));
    }
    path.remove()
  },
  ClassMethod: {
    enter(path) {
      const methodName = path.node.key.name;
      sharedState.walkingMethod = methodName;
      if (methodName === 'render') return;
      
      //构造method的ast节点
      const fn = t.ObjectProperty(
        t.identifier(methodName),
        t.functionExpression(null, path.node.params, path.node.body, path.node.generator,path.node.async)
      );

      //component?
      sharedState.compiled.methods.push(fn);
    },
    exit(path) {
      const methodName = path.node.key.name;
      if (methodName === 'render') { //当render域里有赋值时, BlockStatement下面有的不是returnStatement,而是VariableDeclaration
        const wxmlAST = path.node.body.body.find(i => i.type === 'ReturnStatement');
        // TODO 使用Dom el转换,而不是直接用小程序el转换
        const wxml = generate(wxmlAST.argument).code;
        sharedState.output.wxml = wxmlAST && prettifyXml(wxml);
        path.remove();
      } else if (methodName === 'constructor') {
        // for(const body of path.node.body.body ){
        //   if(t.isExpressionStatement(body)){
        //     converters.dataProps.dataHandler(body);
        //   }
        // }
      }
    }
  }
}