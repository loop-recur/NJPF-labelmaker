var DataCleaner = (function() {

var _setText = Combinators.f_g_x_y(lambda('x.text(y)'), $);
var _getText = compose('.text()', $);

var _firstToUpper = Match (
	["H:T"], function(head, tail) {
		return cons(head.toUpperCase(), map('.toLowerCase()', tail)).join('');
	}
);

var _updateTableData = Combinators.f_x_h_g_x(_setText, _getText);
var _capitalizeFirstLetter = compose(unwords, map(_firstToUpper), words);
var fixCapitalization = compose(map(_updateTableData.p(_capitalizeFirstLetter)));
	
return { fixCapitalization: fixCapitalization }
})();
