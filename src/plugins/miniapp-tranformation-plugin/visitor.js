const sharedState = require('./sharedState');
var t = require('@babel/types');
const generate = require('@babel/generator').default
const prettifyXml = require('./utils').prettifyXml

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

module.exports = {
  ClassDeclaration: {
    enter(path) {
      const superClz = path.node.superClass && path.node.superClass.name;
      if(superClz){
        if(superClz !== 'App' && superClz !== 'Page' && superClz !== 'Component') return;
        sharedState.output.type = superClz;
      }
    },
    exit(path) {
      //把该节点从path中移除?
      path.remove()
    }
  },
  ImportDeclaration(path){
    const source = path.node.source.value
  },
  ClassMethod: {
    enter(path) {
      const methodName = path.node.key.name;
      if (methodName === 'render') return
      
      //构造method的ast节点
      const fn = t.ObjectProperty(
        t.identifier(methodName),
        t.functionExpression(null, path.node.params, path.node.body, path.node.generator,path.node.async)
      )
      //component?
      sharedState.methods.push(fn);
    },
    exit(path) {
      const methodName = path.node.key.name;
      if (methodName === 'render') { //当render域里有赋值时, BlockStatement下面有的不是returnStatement,而是VariableDeclaration
        const wxmlAST = path.node.body.body.find(i => i.type === 'ReturnStatement');
        // TODO 使用Dom el转换,而不是直接用小程序el转换
        const wxml = generate(wxmlAST.argument).code;
        sharedState.output.wxml = wxmlAST && prettifyXml(wxml)
        path.remove();
      }
    }
  }
}