var Combinators = (function() {

var f_g_h = defn(function(f, g, h) { return f(g(), h()); });

var f_g_h_x = defn(function(f, g, h, x) { return f(g(), h(x)); });

var f_g_x_h = defn(function(f, g, h, x) { return f(g(x), h()); });

var f_g_x_y = defn(function(f, g, x, y) { return f(g(x), y); });

var f_x_h_g_x = defn(function(f, g, h, x) { return f(x, h(g(x))); });


return {f_g_h : f_g_h, f_g_h_x : f_g_h_x, f_g_x_h : f_g_x_h, f_g_x_y: f_g_x_y, f_x_h_g_x: f_x_h_g_x}

})();
