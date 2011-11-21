var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var _getText = map(compose('.text()', $));

var _transformToRecord = compose(tupleToObj, zip.p(Grid.fieldNames));

var _getRecord = compose(_transformToRecord, _getText);

var _setCustomAddressee = ifelse(ShowView.useCustomField, set('owner', ShowView.customFieldText), id);

var _ownerAddressSameAsLocation = Combinators.f_g_x_h_x(lambda("!=="), pluck('location'), pluck('owner_addr'));

var _setCustomAddresseeIfNotOwner = ifelse(_ownerAddressSameAsLocation, _setCustomAddressee, id);

var _setAddressee = ifelse(ShowView.onlyWhenOwnerDoesNotReside, _setCustomAddresseeIfNotOwner, _setCustomAddressee);

var _setForOwner = function(name, mapping) { return set(name, pluck('owner'+ (mapping || name))); };

var _setOwnerAddress = compose(_setForOwner('city'), _setForOwner('state'), _setForOwner('zip'), _setForOwner('location', 'addr'));

var _setAddress = ifelse(ShowView.ownerSelected, _setOwnerAddress, id);

var toRecord = compose(_setAddress, _setAddressee, _getRecord);

return {setup: setup, all: all, toRecord: toRecord}
})();
