var Formatter = (function() {
	
	var address = function(city, state, zip) {
		return city +", "+ state + " " + zip;
	}
	
	var line = function(row) {
		return [row.owner, row.location, address(row.city, row.state, row.zip)];
	}
	
	var labelOption = function(label) {
		return label.manufacturer+ "-" +label.id+ ' ('+label.height+'"'+' x '+ label.width+ '", ' + label.amount_per_page+ ' per page)';
	}
	
	return {line : line, labelOption : labelOption}
})();