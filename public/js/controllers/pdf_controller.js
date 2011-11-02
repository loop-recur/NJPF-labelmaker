var PdfController = function(records) {
	var jQuerySelect = compose($, id);
	
	var getLabelOption = compose('.val()', log, jQuerySelect.curry('#labels'));
		
	var getSelected = jQuerySelect.curry('.ui-state-highlight');
	
	var getRecordIndexes = compose(subtract(1), parseInt, 'x.id');
	
	var getRecords = map(flip(index).p(records));
	
	var selectRecords = compose(getRecords, map(getRecordIndexes), getSelected);
	
	var generator = compose(Pdf.generate, getLabelOption);
	
	var makePdf = compose(generator(), selectRecords);
	
	return {makePdf : makePdf}
}
