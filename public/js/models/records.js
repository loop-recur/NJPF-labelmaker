var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var _getText = map(compose('.text()', $));

var _transformToRecord = compose(tupleToObj, zip.p(Grid.fieldNames));

var _getRecord = compose(_transformToRecord, _getText);

var _setCustomAddressee = ifelse(ShowView.useCustomField, set('owner', ShowView.customFieldText), id);

var _removeSuffix = function(str) {
	var xs = split(" ", str);
	xs.splice(-1,1);
	return join(" ", xs);
}

var _everythingButSuffixEqual = function(str, str2) {
	var s = _removeSuffix(str);
	var s1 = _removeSuffix(str2)
	return s != s1;
}

var _ownerAddressSameAsLocation = Combinators.f_g_x_h_x(_everythingButSuffixEqual, pluck('location'), pluck('owneraddr'));

var _setCustomAddresseeIfNotOwner = ifelse(_ownerAddressSameAsLocation, _setCustomAddressee, id);

var _setAddressee = ifelse(ShowView.onlyWhenOwnerDoesNotReside, _setCustomAddresseeIfNotOwner, _setCustomAddressee);

var _setForOwner = function(name, mapping) { return set(name, pluck('owner'+ (mapping || name))); };

var _setOwnerAddress = compose(_setForOwner('city'), _setForOwner('state'), _setForOwner('zip'), _setForOwner('location', 'addr'));

var _setAddress = ifelse(ShowView.ownerSelected, _setOwnerAddress, id);

var toRecord = compose(_setAddress, _setAddressee, _getRecord);

return {setup: setup, all: all, toRecord: toRecord}
})();
