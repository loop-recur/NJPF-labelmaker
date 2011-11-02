var Grid = (function() {	
	function setup(records) {
		var $el = $("#list");
		var lastSel;

		$el.jqGrid({
			datatype: "local",
			height: 300,
		   	colNames:["District","Block","Lot","Qualify","Location","City","State","Zip","Devpt","Owner","Owner Address","Owner City","Owner State","Owner Zip","Owner Devpt","Class","Zoning","Acreage","Land Value","Improvement Value","Total Value"],
		   	colModel:[
		   		{name:'district',index:'district', width:120, sorttype:"string", editable:true},
		   		{name:'block',index:'block', width:50, sorttype:"float", editable:true},
		   		{name:'lot',index:'name', width:50, sorttype: "float", editable:true},
					{name:'qualify',index:'qualify', width:40, sorttype: "float", editable:true},
					{name:'location',index:'location', width:120, sorttype: "string", editable:true},
					{name:'city',index:'city', width:90, sorttype: "string", editable:true},
					{name:'state',index:'state', width:30, sorttype: "string", editable:true},
					{name:'zip',index:'zip', width:50, sorttype: "int", editable:true},
					{name:'devpt',index:'devpt', width:50, sorttype: "string", editable:true},
					{name:'owner',index:'owner', width:50, sorttype: "string", editable:true},
					{name:'owneraddr',index:'owneraddr', width:50, sorttype: "string", editable:true},
					{name:'ownercity',index:'ownercity', width:50, sorttype: "string", editable:true},
					{name:'ownerstate',index:'ownerstate', width:50, sorttype: "string", editable:true},
					{name:'ownerzip',index:'ownerzip', width:50, sorttype: "int", editable:true},
					{name:'ownerdevpt',index:'ownerdevpt', width:50, sorttype: "string", editable:true},
					{name:'class',index:'class', width:50, sorttype: "string", editable:true},
					{name:'zoning',index:'zoning', width:50, sorttype: "string", editable:true},
					{name:'acreage',index:'acreage', width:50, sorttype: "string", editable:true},
					{name:'landvalue',index:'landvalue', width:50, sorttype: "string", editable:true},
					{name:'improvevalue',index:'improvevalue', width:50, sorttype: "string", editable:true},
					{name:'totalvalue',index:'totalvalue', width:50, sorttype: "string", editable:true},
		   	],
		   	multiselect: true,
				ondblClickRow: function(id){
					$el.editRow(id, true);
				},
			  onSelectRow: function(id) {
					if(id !== lastSel) {
						$el.saveRow(lastSel); //todo, save record too.
						Pdf.preview(records[id-1]);
						lastSel = id;
					}
				},
				editurl: "/stub",
		   	caption: "Mailing Labels"
		});
		for(var i=0;i<=records.length;i++)
			$el.jqGrid('addRowData',i+1,records[i]);
	}
	
	return {setup: setup}
})();
