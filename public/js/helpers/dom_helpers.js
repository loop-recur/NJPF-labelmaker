jQuerySelect = function(selector){ return function() { return $(selector);} };
confirmBox = function(message, yesFun, noFun) {
	return function() {
		confirm(message) ? yesFun() : noFun();
	}
}
