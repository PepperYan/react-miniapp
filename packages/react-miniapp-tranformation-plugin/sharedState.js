
class SharedState {
  constructor() {
    this.output = {
      wxml:'',
      wxss:'',
      js:'',
      json:'',
      type:''//App||Page||Component
    }
    this.isTemplate = false
    this.methods = [] //编译文件的类方法
    this.unRecognizeImportedModule = {} //存储非Component的依赖
    this.importedComponent = {} //导入的组件
    this.sourcePath = ''//当前文件路径, 用于css抽取
  }
  
  reset() {
    this.output = {
      wxml:'',
      wxss:'',
      js:'',
      json:{},
      type:''//App||page||component
    }
    this.isTemplate = false
    this.methods = [] 
    this.unRecognizeImportedModule = {} 
    this.importedComponent ={} 
    this.sourcePath = ''
  }
}


module.exports = new SharedState();