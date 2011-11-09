var ShowView = (function() {
	
var _makeSelector = map(compose("'[aria-describedby=list_'+", "+']'"));

var getSelectedFields = compose($.find, join(", "), map('".ui-state-highlight > "+'), _makeSelector);

var _makeId = lambda("'#'+");
var _makeSelectionFields = compose(join(", "), _makeSelector.p(["owner", "location", "owneraddr", "city", "state", "zip"]));
var getAllFields = Combinators.f_g_x_h(lambda("x.find(y)"), compose($, _makeId), _makeSelectionFields);

var allTextFields = getSelectedFields.p(["owner", "location", "owneraddr"]);

var ownerField = getSelectedFields.p(['owner']);

var ownerSelected = function() { return $("#Address .active").attr('id') == "Owner"; }

var useCustomField = function() { return $("#use_custom").is(":checked"); }

var customFieldText = function(){ return $("#CustomNameField").val(); }

var init = function() {
	populateSelect(Labels);
	Grid.setup(showPreview, Records.all());
	PushSwitch($("#Address li"));	
	
	var reloadPreview = function(){
		var selectedId = $(".ui-state-highlight").attr("id");
		if(selectedId) showPreview([selectedId]);
	};
	
	$("#Address li").click(reloadPreview);
	$("#use_custom").change(reloadPreview);
	$("#CustomNameField").change(reloadPreview);
	
	$("#Az").click(compose(reloadPreview, compose(CleanerController.toggleUpperCase, allTextFields)));
	$("#Flip").click(compose(reloadPreview, compose(CleanerController.flipNames, ownerField)));
	
	$("#generate").click(function() {
		window.location.href = PdfController.makePdf();
	});
}

function showPreview(ids) {
	var _getLines = compose(join('<br>'), Formatter.line);
	var _getHtml = compose(_getLines, Records.toRecord, getAllFields);
	
	return Combinators.f_g_h_x(lambda('x.html(y)'), jQuerySelect("#preview"), _getHtml)(ids);
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
		isActive ? $(this).siblings().addClass("active") : $(this).addClass('active');
	});
}


return {init: init, ownerSelected : ownerSelected, useCustomField: useCustomField,
				customFieldText: customFieldText, ownerField: ownerField, allTextFields: allTextFields}
})();
