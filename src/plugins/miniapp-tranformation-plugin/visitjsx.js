var t = require('@babel/types');
const wxTags = require('./wx/tag')
const ConvertJSXOpeningElement = require('./common').ConvertJSXOpeningElement

module.exports = {
  JSXOpeningElement:{
    enter(path){
      // console.log(path.node)
      path.node.name = t.identifier(wxTags[path.node.name.name]);
      ConvertJSXOpeningElement(path);
    },
    exit(path) {
      const tag = path.node.name.name;
    }
  },
  JSXClosingElement: function(path){
    if(!path.node.selfClosing){
      const tag = path.node.name.name;
      path.node.name = t.identifier(wxTags[tag]);
    }
  }
}