$(function(){
	var isShowPage = $("#list")[0];
	
	if(isShowPage) {
		populateSelect(labels); // labels from config
		Grid.setup(records); // records set in show template
		$("#generate").click(function(){
			PdfController(records).makePdf();
		});
	}

	$("#generate").click(function(){
		Pdf.generate(records);
	});
	
});


function populateSelect(labels) {
	var dashJoin = compose("+'-'+");
	
	var makeOptions = function(label) {
		var value = dashJoin(label.width, label.height);
		var text = dashJoin(label.manufacturer, label.id);
		$("#labels").append($('<option></option>').val(value).html(text));
	}
	
	map(makeOptions, labels);
}
