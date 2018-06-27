/*
 * @Author: hibad 
 * @Date: 2018-06-24 10:36:14 
 * @Last Modified by: hibad
 * @Last Modified time: 2018-06-26 08:57:44
 * @Description: 
 */

const sharedState = require('../sharedState')
const t = require('@babel/types');
const generate = require('@babel/generator').default;

/**
 * 
 * @param {*} node path.node
 */
function convertComponent (node) {
  const methods = sharedState.compiled.methods;
  const data = sharedState.compiled.data;

  const call = t.expressionStatement(
    t.callExpression(
      t.identifier(sharedState.output.type),
      [t.objectExpression(data),t.objectExpression(methods)]
    )
  );
}

/**
 * 收集constructor state. 
 * 需要考虑的情况包括 this.state = {xxx:yyy} this.state.zzz= aaa 
 * @param {ExpressionStatement} expression  括号部分(this.state) = xxx
 */
function dataHandler (expression) {
  if (!t.isExpressionStatement(expression)) throw new Error('传入参数不正确, 请传入ExpressionStatement');

  /**
   * identifier (this.state = {}) or memberexpression (this.state.xxx = yyy) 
   * property太多变了,可能是identifier又可能是MemberExpression的嵌套,不如用generate
   */
  const property = expression.expression.left.property;
  const code = generate(expression).code;

  if(code.startsWith('this.state')) {
    if(!sharedState.compiled.data) {
      sharedState.compiled.data = _initDataProperty(expression);
    } else {
      const stack = []
      _memberIterator(expression.expression.left, stack);
      // console.log(stack)
      _walkData2Insert(expression, stack, sharedState.compiled.data.value.properties, 0); // this.state后的properties
      console.log(generate(sharedState.compiled.data).code)
      // sharedState.compiled.data = t.objectProperty(
      //   t.identifier(property.name),
      //   expression.expression.right
      // )
    }
  }
}

/**
 * @param {*} originExpression 
 * @param {*} stack 
 * @param {*} properties 
 * @param {*} index 
 */
function _walkData2Insert(originExpression, stack, properties, index) {
  const level = 0
  
  for(const property of properties){
    if(level != stack.length - 1){
      if(property.key.name === stack[index].property.name){
        _walkData2Insert(originExpression, stack, property.value.properties, ++index);
      }
    }
    if(t.isObjectExpression(property.value) && stack.length - 1 === index){
      if(property.value.properties.length === 0) {  // 如this.state.name.a = {} 但未定义b
        property.value.properties.push(
          t.objectProperty(t.identifier(stack[index].property.name), originExpression.expression.right)
        );
        return;
      } else {
        // _walkData2Insert(originExpression, stack, properties.value.properties, index);
      }
    }
    if(property.key.name === stack[index].property.name){
      _walkData2Insert(originExpression, stack, property.value.properties, ++index);
    }
  }
}

/**
 * memberexpression.left.object => memberexpression || identifier =>
 * @param {*} memberExpression 
 */
function _memberIterator(memberExpression, stack) {
  if (t.isThisExpression(memberExpression.object)) { // 可能需要把this.state打入栈
    return;
  } else { //member expression
    stack.unshift(memberExpression);
    _memberIterator(memberExpression.object, stack);
  }
} 

function _initDataProperty(expression){
  return t.objectProperty(
    t.identifier('data'),
    expression.expression.right
  );
}


module.exports = {
  convertComponent,
  dataHandler
}