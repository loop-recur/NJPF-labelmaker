var ShowView = (function() {
	
var _makeSelector = map(compose("'[aria-describedby=list_'+", "+']'"));

var getSelectedFields = compose($.find, join(", "), map('".ui-state-highlight > "+'), _makeSelector);

var _makeId = lambda("'#'+");
var _makeSelectionFields = compose(join(", "), _makeSelector.p(Grid.fieldNames));
var getAllFields = Combinators.f_g_x_h(lambda("x.find(y)"), compose($, _makeId), _makeSelectionFields);

var allTextFields = getSelectedFields.p(["owner", "location", "owneraddr"]);

var ownerField = getSelectedFields.p(['owner']);

var ownerSelected = function() { return $("#Address .active").attr('id') == "Owner"; }

var useCustomField = function() { return $("#use_custom").is(":checked"); }

var onlyWhenOwnerDoesNotReside = function() { return $("#use_only_if_owner_does_not_reside_at_address").is(":checked"); }

var customFieldText = function(){ return $("#CustomNameField").val(); }

var init = function() {
	populateSelect(sortBy('x.id', Labels));
	Grid.setup(Records.all());
	PushSwitch($("#Address li"));	
	
	var reloadPreview = function(){
		var selectedId = Grid.lastSelection();
		if(selectedId) showPreview([selectedId]);
	};
	
	var clearGrid = function(){
		$(".jqgrow").html("");
		$("#upload-form").show();
		$("#preview").html("");
		$("#NumberSelected").html("");
	}
	
	$("#export").click(function() {
		getRecords = compose(map(getAllFields), map('x.id'), jQuerySelect('.ui-state-highlight'));
		var getText = map(compose(".text()", $));
		var csv = compose(CSV.create('\t'), cons(Grid.fieldNames), map(getText), getRecords);
		$('#CsvData').val(csv);
		$(this).parents('form').submit();
		return false;
	});
	
	$("#Address li").click(reloadPreview);
	$("#use_custom").change(reloadPreview);
	$("#use_only_if_owner_does_not_reside_at_address").change(reloadPreview);
	$("#CustomNameField").change(reloadPreview);
	$("#ClearGrid").click(confirmBox("Clear everything? This can't be undone.", clearGrid, id));
	
	
	var updateCount =function() {
		setTimeout(function(){$("#NumberSelected").html($(".cbox:checked").length)}, 100);
	};
	
	var setHighlight = function($cbox) {
		var $tr = $($cbox.parents("tr"));
		if($tr.hasClass('ui-jqgrid-labels')) return true;
		$cbox.is(":checked") ? $tr.addClass('ui-state-highlight') : $tr.removeClass('ui-state-highlight');
	}
	
	$('.jqgrow').click(function(e){ Grid.selectRow(this.id); showPreview(); e.stopPropagation(); })
	$('.cbox').change(function(){ setHighlight($(this)); Grid.selectRow(this.id); updateCount(); showPreview(); });
	
	$("#use_custom").change(function() {
		$(this).is(':checked') ? $("#CustomOptions").show() : $("#CustomOptions").hide();
	});
	
	$("#Az").click(compose(reloadPreview, compose(CleanerController.toggleUpperCase, allTextFields)));
	$("#Flip").click(compose(reloadPreview, compose(CleanerController.flipNames, ownerField)));
	
	$("#generate").click(function() {
		window.open(PdfController.makePdf(), "labels");
	});
}

function showPreview(ids) {
	if(!ids && Grid.lastSelection()) ids = [Grid.lastSelection()];
	if(!ids || ids.length < 1) return;
	var _getLines = compose(join('<br>'), Formatter.line);
	var _getHtml = compose(_getLines, Records.toRecord, getAllFields);
	
	return Combinators.f_g_h_x(lambda('x.html(y)'), jQuerySelect("#preview"), _getHtml)(ids);
}

function populateSelect(labels) {	
	var makeOptions = function(label) {
		var text = Formatter.labelOption(label);
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
				customFieldText: customFieldText, ownerField: ownerField, allTextFields: allTextFields, getAllFields: getAllFields,
				onlyWhenOwnerDoesNotReside: onlyWhenOwnerDoesNotReside}
})();
