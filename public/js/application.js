$(function(){
	$('select[multiple!=true]').customStyle();

	var isShowPage = $("#list")[0];	

	if(isShowPage) {
		var Controller = PdfController(records, labels);
		
		var _makeSelector = compose(join(", "), map(compose("'[aria-describedby=list_'+", "+']'")));
		var getTextFields = compose($.find, '".ui-state-highlight >"+', _makeSelector);
		
		$('#Az').click(compose(DataCleaner.fixCapitalization, getTextFields.p(["owner", "location", "owneraddr"])));
		
		var _getLines = compose(join('<br>'), Formatter.line);
		var _getHtml = compose(_getLines, index.p(0), Controller.getRecords);
		var _showPreview = Combinators.f_g_h_x(lambda('x.html(y)'), jQuerySelect("#preview"), _getHtml);
		
		populateSelect(labels); // labels from config
		Grid.setup(_showPreview, records); // records set in show template
		$("#generate").click(function() {
			window.location.href = Controller.makePdf();
		});
		
		PushSwitch($("#Address li"));
	}
});


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