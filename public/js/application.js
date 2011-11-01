$(function(){
	if($("#list")[0]) Grid.setup(records); //records set in show template
	
	var getSelected = function(){ return $('.ui-state-highlight'); }
	
	var getRecordIndexes = compose(subtract(1), parseInt, 'x.id');
	
	var getRecords = map(flip(index).p(records));
	
	var selectRecords = compose(getRecords, map(getRecordIndexes), getSelected);	
		
	$("#generate").click(compose(Pdf.generate, selectRecords));
});
