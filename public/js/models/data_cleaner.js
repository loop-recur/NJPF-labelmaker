var DataCleaner = (function() {

var _setText = Combinators.f_g_x_y(lambda('x.text(y)'), $);

var _getText = compose('.text()', $);

var _firstToUpper = Match (
	["H:T"], function(head, tail) {
		return cons(head.toUpperCase(), map('.toLowerCase()', tail)).join('');
	}
);

var _flipNames = compose(replace(/(.*),(.*)/, "$2 $1"), replace(/(.*),(.*) & (.*),(.*)/, "$2 $1 & $4 $3"));

var _updateTableData = Combinators.f_x_h_g_x(_setText, _getText);

var _capitalizeFirstLetter = compose(unwords, map(_firstToUpper), filter(id), words);

var fixCapitalization = map(_updateTableData.p(_capitalizeFirstLetter));

var toUpperCase = map(_updateTableData.p(lambda('.toUpperCase()')));

var flipNames = map(_updateTableData.p(_flipNames));
	
return { fixCapitalization: fixCapitalization, toUpperCase : toUpperCase, flipNames : flipNames }
})();
