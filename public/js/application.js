$(function(){
	var isShowPage = $("#list")[0];	

	if(isShowPage) {
		var Controller = PdfController(records, labels);
		
		$('#Az').click(function() {
			var _fixNames = function(e) {
				var $e = $(e);
				$e.text($e.text().toLowerCase());
			}
			map(_fixNames, $("[aria-describedby=list_owner]"))
		});
		
		var _showPreview = function(id) {
			var _getLines = compose(join('<br>'), Formatter.line);
			var _getHtml = compose(_getLines, index.p(0), Controller.getRecords);
			$("#preview").html(_getHtml(id));
		}
		
		populateSelect(labels); // labels from config
		Grid.setup(_showPreview, records); // records set in show template
		$("#generate").click(function() {
			window.location.href = Controller.makePdf();
		});
	}
});


function populateSelect(labels) {
	var dashJoin = compose("+'-'+");
	
	var makeOptions = function(label) {
		var text = dashJoin(label.manufacturer, label.id);
		$("#labels").append($('<option></option>').val(labels.indexOf(label)).html(text));
	}
	
	map(makeOptions, labels);
}
