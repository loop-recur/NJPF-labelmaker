var Grid = (function() {	
	function setup(selectFun, records) {
		var $el = $("#list");
		var lastSel;

		$el.jqGrid({
			datatype: "local",
			height: 300,
			autowidth:true,
			shrinkToFit:false,
		   	colNames:["District","Block","Lot","Qualify","Location","City","State","Zip","Devpt","Owner","Owner Address","Owner City","Owner State","Owner Zip","Owner Devpt","Class","Zoning","Acreage","Land Value","Improvement Value","Total Value"],
		   	colModel:[
		   		{name:'district',index:'district', sorttype:"string", editable:true},
		   		{name:'block',index:'block', width: 50, sorttype:"float", editable:true},
		   		{name:'lot',index:'name', width: 50, sorttype: "float", editable:true},
					{name:'qualify',index:'qualify', width: 50, sorttype: "float", editable:true},
					{name:'location',index:'location', sorttype: "string", editable:true},
					{name:'city',index:'city', sorttype: "string", editable:true},
					{name:'state',index:'state', width: 40, sorttype: "string", editable:true},
					{name:'zip',index:'zip', sorttype: "int", editable:true},
					{name:'devpt',index:'devpt', width: 40, sorttype: "string", editable:true},
					{name:'owner',index:'owner', width:120, sorttype: "string", editable:true},
					{name:'owneraddr',index:'owneraddr', sorttype: "string", editable:true},
					{name:'ownercity',index:'ownercity', sorttype: "string", editable:true},
					{name:'ownerstate',index:'ownerstate', width: 40, sorttype: "string", editable:true},
					{name:'ownerzip',index:'ownerzip', sorttype: "int", editable:true},
					{name:'ownerdevpt',index:'ownerdevpt', width: 60, sorttype: "string", editable:true},
					{name:'class',index:'class', sorttype: "string", editable:true},
					{name:'zoning',index:'zoning', sorttype: "string", editable:true},
					{name:'acreage',index:'acreage', sorttype: "string", editable:true},
					{name:'landvalue',index:'landvalue', sorttype: "string", editable:true},
					{name:'improvevalue',index:'improvevalue', sorttype: "string", editable:true},
					{name:'totalvalue',index:'totalvalue', sorttype: "string", editable:true},
		   	],
		   	multiselect: true,
				ondblClickRow: function(id){
					$el.editRow(id, true);
				},
			  onSelectRow: function(id) {
					if(id !== lastSel) {
						$el.saveRow(lastSel); //todo, save record too.
						selectFun([id]);
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
