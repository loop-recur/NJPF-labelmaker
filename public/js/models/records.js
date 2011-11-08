var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var toRecord = function($elements) {
	var fields = map(compose('.text()', $), $elements);
	return {location : fields[0], city : fields[1], state : fields[2], zip: fields[3], owner: fields[4], owner_addr: fields[5] }
}
return {setup: setup, all: all, toRecord: toRecord}
})();
