var Grid = (function() {	
	var $el = null;
	var lastSel, lastCheckedSel;
	var fieldNames = ["location", "city", "state", "zip", "owner", "owneraddr", "ownercity", "ownerstate", "ownerzip"];
	
	function selectRow(id) {
		if(id !== lastSel) {
			$el.saveRow(lastSel); //todo, save record too.
			lastSel = id;
			if($('#'+id).find('.cbox').is(":checked")) lastCheckedSel = id;
		}
	}
	
	function setup(records) {
		$el = $("#list");
		
		$el.jqGrid({
			datatype: "local",
			height: 300,
			autowidth:true,
			shrinkToFit:false,
		   	colNames:["Location","City","State","Zip","Owner","Owner Address","Owner City","Owner State","Owner Zip"],
		   	colModel:[
					{name:'location',index:'location', sorttype: "string", editable:true},
					{name:'city',index:'city', sorttype: "string", editable:true},
					{name:'state',index:'state', width: 40, sorttype: "string", editable:true},
					{name:'zip',index:'zip', width: 40, sorttype: "int", editable:true},
					{name:'owner',index:'owner', width:150, sorttype: "string", editable:true},
					{name:'owneraddr',index:'owneraddr', sorttype: "string", editable:true},
					{name:'ownercity',index:'ownercity', sorttype: "string", editable:true},
					{name:'ownerstate',index:'ownerstate', width: 40, sorttype: "string", editable:true},
					{name:'ownerzip',index:'ownerzip', width: 90, sorttype: "int", editable:true}
		   	],
		   	multiselect: true,
				multiboxonly: true,
				ondblClickRow: function(id){
					$el.editRow(id, true);
				},
			  onSelectRow: selectRow,
				editurl: "/stub",
		   	caption: "Mailing Labels"
		});
		
		if(records) for(var i=0;i<=records.length;i++) $el.jqGrid('addRowData',i+1,records[i]);
	}
	
	var lastSelection = function() {
		return lastCheckedSel;
	}
	
	return {setup: setup, lastSelection : lastSelection, fieldNames: fieldNames, selectRow: selectRow}
})();
