var PdfController = function(records, labels) {

var getSelectedOptionIndex = compose('.val()', jQuerySelect('#labels'));

var getLabelOption = compose(flip(index).p(labels), getSelectedOptionIndex);

var getRecordIndexes = compose(subtract(1), parseInt, 'x.id');

var getRecords = map(flip(index).p(records));

var selectRecords = compose(getRecords, map(getRecordIndexes), jQuerySelect('.ui-state-highlight'));

var makePdf = Combinators.f_g_h.p(Pdf.generate, getLabelOption, selectRecords);

return {makePdf : makePdf, getRecords : getRecords}
}
