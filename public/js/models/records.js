var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var _getText = map(compose('.text()', $));

var _transformToRecord = compose(tupleToObj, zip.p(["location", "city", "state", "zip", "owner", "owner_addr"]));

var _getRecord = compose(_transformToRecord, _getText);

var _setOwnerAddress = ifelse(ShowView.ownerSelected, set('location', pluck('owner_addr')), id);

var _setCustomAddressee = ifelse(ShowView.useCustomField, set('owner', ShowView.customFieldText), id);

var toRecord = compose(_setCustomAddressee, _setOwnerAddress, _getRecord);

return {setup: setup, all: all, toRecord: toRecord}
})();
