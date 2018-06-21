const sharedState = require('../sharedState')
const t = require('@babel/types');

module.exports = function(properties) {
  if(sharedState.output.type !== 'Component'){
    throw new Error('Only Component can use defaultProps, please check wechat miniapp doc/Component chapter for details')
  } 
	sharedState.methods.push(
		t.objectProperty(
			t.identifier('properties'), 
			t.objectPattern(properties)
		)
	)
}