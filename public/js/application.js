$(function(){
	if($("#list")[0]) Grid.setup(records); //records set in show template
	$("#generate").click(PdfController(records).makePdf);
});
