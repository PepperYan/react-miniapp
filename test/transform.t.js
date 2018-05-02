var assert = require('assert');
var transform = require('../src/transform').transform
var parseCode = require('../src/transform').parseCode

var t = require('@babel/types')


var testCode = "class A extends Component {"+
  "render() {"+
    "let { msg } = this.props.hello"+
    "return ("+
    '<div className="app">'+
        '<img className="logo" src={LogoWithTitileImg}/>'+
        '<div className="helloworld">'+
        '<h1>Welcome to Restackx for React</h1>'+
          "Let's begin in <code>demo/index.jsx</code>, change the <i>{msg}</i>."+
          '</div>'+
        '</div>'+
    ')'+
  '}'+
'}'

var testJSX = "<div/>"


describe('transformjs 代码转换',function(){
  // describe('AST转换', function(){
  //   var ast =  parseCode(testCode);
  //   console.log(JSON.stringify(ast));
  // })
  describe('JSX转换', function(){
    var ast = transform(testCode);
    console.log(t.jSXIdentifier("hello"));
    
  })
});
