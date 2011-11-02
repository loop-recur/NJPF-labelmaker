var Combinators = (function() {
	
var f_g_h = function(f, g, h) { return f(g(), h()); }

return {f_g_h : f_g_h}

})();
