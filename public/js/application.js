$(function(){
	if($("#list")[0]) Grid.setup(records); //records from template
	
	$("#generate").click(function(){
		Pdf.generate(records);
	});
});
