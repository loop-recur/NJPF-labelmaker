var DataCleaner = (function() {

var _setText = function(x, y) { $(x).text(y); }
var _getText = compose('.text()', $);

var _firstToUpper = Match (
	[], function(arr) {
		return arr;
	},

	["H:T"], function(head, tail) {
		return cons(head.toUpperCase(), map('.toLowerCase()', tail)).join('');
	}
);

var updateTableData = Combinators.f_x_h_g_x(_setText, _getText);
var _capitalizeFirstLetter = compose(unwords, map(_firstToUpper), words);
var fixCapitalization = compose(map(updateTableData.p(_capitalizeFirstLetter)));

	
return { fixCapitalization: fixCapitalization }

})();
