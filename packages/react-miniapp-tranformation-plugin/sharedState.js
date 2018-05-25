
class SharedState {
  constructor() {
    this.output = {
      wxml:'',
      wxss:'',
      js:'',
      json:'',
      type:''//App||page||component
    }
    this.isTemplate = false
    this.methods = [] //编译文件的类方法
    this.unRecognizeImportedModule = {} //存储非Component的依赖
    this.importedComponent = {} //导入的组件
  }
  
  reset() {
    this.output = {
      wxml:'',
      wxss:'',
      js:'',
      json:'',
      type:''//App||page||component
    }
    this.isTemplate = false
    this.methods = [] 
    this.unRecognizeImportedModule = {} 
    this.importedComponent ={} 
  }
}


module.exports = new SharedState();