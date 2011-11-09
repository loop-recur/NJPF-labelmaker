var CleanerController = (function() {
	
var _fixCapitalization = compose(DataCleaner.fixCapitalization, ShowView.allTextFields);

var _upperCaseEverything = compose(DataCleaner.toUpperCase, ShowView.allTextFields);

var _allCaps = compose(match(/[A-Z]$/), '.text()', $, first, ShowView.ownerField);

var toggleUpperCase = ifelse.p(_allCaps, _fixCapitalization, _upperCaseEverything);

var flipNames = compose(DataCleaner.flipNames, ShowView.ownerField);

return {toggleUpperCase: toggleUpperCase, flipNames: flipNames}
})();
