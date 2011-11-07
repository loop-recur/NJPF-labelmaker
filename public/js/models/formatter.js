var Formatter = (function() {
	
	var address = function(city, state, zip) {
		return city +", "+ state + " " + zip;
	}
	
	var line = function(row) {
		return [row.owner, row.location, address(row.city, row.state, row.zip)];
	}
	
	return {line : line}
})();