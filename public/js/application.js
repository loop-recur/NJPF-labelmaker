$(function(){
	$('select[multiple!=true]').customStyle();
	$('select').css({width: "380px"})

	var isShowPage = $("#list")[0];	

	if(isShowPage) {
		
		$("#Az").click(CleanerController.toggleUpperCase);
		
		populateSelect(Labels);

		Grid.setup(showPreview(), Records.all()); // set in show template
		
		$("#generate").click(function() {
			window.location.href = PdfController.makePdf();
		});
		
		PushSwitch($("#Address li"));
	}
});

function showPreview() {
	var _getLines = compose(join('<br>'), Formatter.line);
	var _getHtml = compose(_getLines, Records.toRecord, CleanerController.getAllFields);
	return Combinators.f_g_h_x(lambda('x.html(y)'), jQuerySelect("#preview"), _getHtml);
}

function populateSelect(labels) {
	var dashJoin = compose("+'-'+");
	
	var makeOptions = function(label) {
		var text = dashJoin(label.manufacturer, label.id);
		$("#labels").append($('<option></option>').val(labels.indexOf(label)).html(text));
	}
	
	map(makeOptions, labels);
	$("#labels").trigger("change");
}


function PushSwitch($element) {
	$element.click(function() {
		var isActive = $(this).hasClass("active");
		$element.removeClass("active");			
		if(!isActive) $(this).addClass('active');
	});
}