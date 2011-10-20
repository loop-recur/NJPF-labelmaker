
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app')
  , assert = require('assert');


module.exports = {
  'GET /admin/discussions': function(){
    assert.response(app,
      { url: '/admin/discussions?callback=nancy' },
      { status: 200 },
      function(res){
				// wraps the response with jsonp
        assert.includes(res.body, 'nancy([{');

				// finds discussions
				assert.includes(res.body, '{"messages":[{"_id":');
      });
  }
};
