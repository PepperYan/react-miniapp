var assert = require('assert');
var transform = require('../src/transform').transform
var parseCode = require('../src/transform').parseCode

var t = require('@babel/types')
const Codes = require('./testCode');

const testJSX = Codes.testJSX;
const testJSXEvent = Codes.testJSXEvent

describe('transformjs 代码转换',function(){
 
  // it('JSX转换', function(){
  //   var ast = transform(testJSX);
  //   console.log(t.jSXIdentifier("hello"));
    
  // })

  it("JSX 事件", function(){
    const ast = transform(testJSXEvent)
    console.log(ast);
  })
});
