var assert = require('assert');
var transform = require('../src/transform').transform
var parseCode = require('../src/transform').parseCode
const generate = require('@babel/generator').default
var t = require('@babel/types')
const Codes = require('./testCode');

const testJSX = Codes.testJSX;
const testJSXEvent = Codes.testJSXEvent

describe('transformjs 代码转换',function() {
 
  // it('JSX转换', function(){
  //   var ast = transform(testJSX);
  //   console.log(t.jSXIdentifier("hello"));
  // })

  it("JSX 事件", function() {
    // const result = transform(testJSXEvent)
    // console.log(result);
  })

  it('JSX props',function() {
    // const result = transform(Codes.testProps)
    // console.log(result);
  })

  it('JSX map', function(){
    // const result = transform(Codes.testMap);
    // console.log(result);
  })

  it('JSX map嵌套', function(){
    const result = transform(Codes.testMapCycle);
    console.log(result);
  })

  it('JSX 多层map嵌套', function(){
    // const result = transform(Codes.testMapCycleBigger);
    // console.log(result);
  })
});
