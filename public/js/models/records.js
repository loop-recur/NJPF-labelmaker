var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var toRecord = defn(function($elements) {
	var fields = map(compose('.text()', $), $elements);
	var record = {location : fields[0], city : fields[1], state : fields[2], zip: fields[3], owner: fields[4] };
	if(ShowView.ownerSelected()) record.location = fields[5];
	if(ShowView.useCustomField()) record.owner = ShowView.customFieldText();
	
	return record;
});

return {setup: setup, all: all, toRecord: toRecord}
})();
