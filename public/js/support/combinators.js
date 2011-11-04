var Combinators = (function() {
	
var f_g_h = defn(function(f, g, h) { return f(g(), h()); });
var f_g_h_x = defn(function(f, g, h, x) { return f(g(), h(x)); });
var f_g_x_h = defn(function(f, g, h, x) { return f(g(x), h()); });

return {f_g_h : f_g_h, f_g_h_x : f_g_h_x, f_g_x_h : f_g_x_h}

})();