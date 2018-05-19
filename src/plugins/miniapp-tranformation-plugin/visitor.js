const sharedState = require('./sharedState');

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
    enter(path){
      console.log("enter")
      const superClz = path.node.superClass && path.node.superClass.name;
      if(superClz){
        if(superClz !== 'App' && superClz !== 'Page' && superClz !== 'Component') return;
        sharedState.output.type = superClz;
      }
    },
    exit(path){
      //把该节点从path中移除?
      path.remove()
    }
  },
  ClassMethod: {
    enter(path) {

    },
    exit(path) {
      
    }
  }
}