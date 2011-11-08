var CleanerController = (function() {
	
var _makeSelector = map(compose("'[aria-describedby=list_'+", "+']'"));

var getSelectedFields = compose($.find, join(", "), map('".ui-state-highlight > "+'), _makeSelector);

// var getAllFields = compose(join(", "), compose(lambda("+").p());
var getAllFields = function(id) {
	return $('#' + id).find(_makeSelector(["owner", "location", "owneraddr", "city", "state", "zip"]).join(","));
}

var allTextFields = getSelectedFields.p(["owner", "location", "owneraddr"]);

var _fixCapitalization = compose(DataCleaner.fixCapitalization, allTextFields);

var _upperCaseEverything = compose(DataCleaner.toUpperCase, allTextFields);

var _allCaps = compose(match(/[A-Z]$/), '.text()', $, first, getSelectedFields.p(['owner']));

var toggleUpperCase = ifelse.p(_allCaps, _fixCapitalization, _upperCaseEverything);

return {toggleUpperCase: toggleUpperCase, getAllFields : getAllFields}
})();
