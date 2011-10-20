require('../lib/functional');
require('../lib/more_functional');
var fs = require('fs');

_setFromArray = function(obj, vals){
	obj[vals[0]] = vals[1];
	return obj;
}

_makeJSON = defn(function(keys, vals) {
	var arrs = zip(keys, vals);
	return reduce(_setFromArray, {}, arrs);
});

create = function(path, cb) {
	fs.readFile(path, 'ascii', function (err, data) {
	  if(err) throw err;
		
		var fs = split("\n", data);
		var fs1 = map(split("\t"), fs);
		var header = fs1.splice(0,1)[0];
		var rest = filter('.length > 1', fs1);

		var hd1 = map('.toLowerCase()', header);
		var records = map(_makeJSON(hd1), rest);
		
		cb(records);
	});
}

module.exports = {create: create}
