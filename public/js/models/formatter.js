var Formatter = (function() {
	
	var address = function(city, state, zip) {
		return city +", "+ state + " " + zip;
	}
	
	return {address : address}
})();