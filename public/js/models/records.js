var Records = (function() {
	
var records = [];

var setup = function(r) { records = r }

var all = function() { return records };

var _getText = map(compose('.text()', $));

var _transformToRecord = compose(tupleToObj, zip.p(["location", "city", "state", "zip", "owner", "owner_addr"]));

var _getRecord = compose(_transformToRecord, _getText);

var _setOwnerAddress = ifelse(ShowView.ownerSelected, set('location', pluck('owner_addr')), id);

var _setCustomAddressee = ifelse(ShowView.useCustomField, set('owner', ShowView.customFieldText), id);

var _ownerAddressSameAsLocation = Combinators.f_g_x_h_x(lambda("!=="), pluck('location'), pluck('owner_addr'));

var _setCustomAddresseeIfNotOwner = ifelse(_ownerAddressSameAsLocation, _setCustomAddressee, id);

var _setAddressee = ifelse(ShowView.onlyWhenOwnerDoesNotReside, _setCustomAddresseeIfNotOwner, _setCustomAddressee);

var toRecord = compose(_setOwnerAddress, _setAddressee, _getRecord);

return {setup: setup, all: all, toRecord: toRecord}
})();
