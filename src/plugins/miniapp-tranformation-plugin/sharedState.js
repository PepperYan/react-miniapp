
const sharedState = {
  output: {
    wxml:'',
    wxss:'',
    js:'',
    json:'',
    type:''//App||page||component
  },
  isTemplate:false,
  methods:[], //编译文件的类方法
  unRecognizeImportedModule:{}, //存储非Component的依赖
  importedComponent:{}, //导入的组件
}
module.exports = sharedState; 