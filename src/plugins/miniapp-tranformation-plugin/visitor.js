const sharedState = require('./sharedState');
var t = require('@babel/types');

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
  ClassMethod: {
    enter(path) {
      console.log(path.node);
      const methodName = path.node.key.name;
      //构造method的ast节点
      const fn = t.ObjectProperty(
        t.identifier(methodName),
        t.functionExpression(null, path.node.params, path.node.body, path.node.generator,path.node.async)
      )
      //component?
      sharedState.methods.push(fn);
    },
    exit(path) {
      
    }
  }
}