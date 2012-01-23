var PdfController = (function() {

var getSelectedOptionIndex = compose('.val()', jQuerySelect('#labels'));

var selectLabel = function(i) {
	return select(lambda('i == label.id').p(i), Labels);
}

var getLabelOption = compose(log, compose(first, selectLabel), log, getSelectedOptionIndex);

var selectRecords = compose(map(Records.toRecord), map(ShowView.getAllFields), map('x.id'), jQuerySelect('.ui-state-highlight'));

var makePdf = Combinators.f_g_h.p(Pdf.generate, getLabelOption, selectRecords);

return {makePdf : makePdf, selectRecords: selectRecords}
})();
