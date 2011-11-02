when = function(arg,f){
	var bool = (typeof arg == "boolean") ? arg : arg();
	if(bool) f();
}

take = function(n, xs) {
	var result = [];
	
	for(var i=0;i<xs.length;i++ ) {
		if(xs[i] != null) result.push(xs[i]);
		if(result.length>=n) break;
	};
	return result;
}

drop = function(n, xs) {
	xs.splice(0, n);
	return xs;
}

nTimes = function(times, fun) {
	var result = [];
	for(var i=0;i<times;i++ ){ result = cons(fun(), result); }
	return result;
}

log = function(s) {
	console.log(s);
	return s;
}

apply = function(f, args) {
	return f.apply(f, args);
}

cons = function(xs, other) {
	return [xs].concat(other);
}

repeat = function(arg, n) {	
	return nTimes(n, id.curry(arg));
}

index = function(i, xs) {
	return xs[i];
}

random = function(i) {
	return Math.floor(Math.random()*i);
}

groups_of = function(n, xs) {
	if(xs.length === 0) return [];
	return cons(take(n, xs), groups_of(n, drop(n,xs)));
}

strip = function(str) {
	return str.replace(/\s+/, "");
}

split = defn(function(token, xs) {
	return xs.split(token);
});

join = defn(function(token, xs) {
	return xs.join(token);
});

reverse = defn(function(xs) {
	return xs.reverse();
});

match = defn(function(expr, x) {
	return x.match(expr);
})

nnnot = function(bool) {
	return !bool;
}

replace = function(pattern, sub, str) {
	return str.replace(pattern, sub);
}

flip = function(fn) {
	return fn.flip();
}

subtract = defn(function(x,y){
	return y - x;
});
