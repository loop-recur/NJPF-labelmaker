var PdfController = function(records, labels) {
	
var jQuerySelect = compose($, id);

var getSelectedOptionIndex = compose('.val()', jQuerySelect.curry('#labels'));

var getLabelOption = compose(log, flip(index).p(labels), getSelectedOptionIndex);

var getRecordIndexes = compose(subtract(1), parseInt, 'x.id');

var getRecords = map(flip(index).p(records));

var selectRecords = compose(getRecords, map(getRecordIndexes), jQuerySelect.curry('.ui-state-highlight'));

var makePdf = Combinators.f_g_h(Pdf.generate, getLabelOption, selectRecords);

return {makePdf : makePdf}
}
