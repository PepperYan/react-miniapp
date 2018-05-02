const wxTag = require('../../wx/tag')
const ConvertJSXOpeningElement = require('./common').ConvertJSXOpeningElement

module.exports = {
  JSXOpeningElement:{
    enter(path){
      ConvertJSXOpeningElement(path);
    },
    exit(path) {
      const tag = path.node.name.name;

    }
  }
}