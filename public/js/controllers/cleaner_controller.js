var CleanerController = (function() {
	
var _fixCapitalization = compose(DataCleaner.fixCapitalization, ShowView.allTextFields);

var _upperCaseEverything = compose(DataCleaner.toUpperCase, ShowView.allTextFields);

var _allCaps = compose(match(/\b[A-Z]{2,}/), join(""), map('.text()'), map($), ShowView.allTextFields);

var toggleUpperCase = ifelse(_allCaps, _fixCapitalization, _upperCaseEverything);

var flipNames = compose(DataCleaner.flipNames, ShowView.ownerField);

return {toggleUpperCase: toggleUpperCase, flipNames: flipNames}
})();
