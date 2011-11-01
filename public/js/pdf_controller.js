var PdfController = function(records) {
		
	var getSelected = compose($, id.curry('.ui-state-highlight'));
	
	var getRecordIndexes = compose(subtract(1), parseInt, 'x.id');
	
	var getRecords = map(flip(index).p(records));
	
	var selectRecords = compose(getRecords, map(getRecordIndexes), getSelected);
	
	var makePdf = compose(Pdf.generate, selectRecords);
	
	return {makePdf : makePdf}
}
