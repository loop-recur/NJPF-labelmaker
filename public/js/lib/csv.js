var CSV = (function() {
	
var create = function(delimiter) {
	return compose(join("\n"), map(join(delimiter)));
};
	

return { create: create }
})();
