const sharedState = require('../sharedState')
const t = require('@babel/types');

module.exports = function(properties) {
	sharedState.methods.push(
		t.objectProperty(
			t.identifier('properties'), 
			t.objectPattern(properties)
		)
	)
}