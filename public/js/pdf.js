var Pdf = (function() {
	
	var _makeLabel = defn(function(doc, row) {
		doc.text(20, 20, row.district);
		doc.text(20, 35, row.location);
	});
	
	var preview = function(row) {
		var doc = new jsPDF();
		doc.setFontSize(28);
		_makeLabel(doc, row);
		var output = doc.output('datauri');

		$("#preview").attr('src', output);
	}
	
	var generate = function(records) {
		var doc = new jsPDF();
		doc.setFontSize(28);
				
		// addLabel :: Position -> Row -> IO()
		var addLabel = function(position, row) {
			doc.text(position.top, position.left, row.district);
			doc.text(position.top+10, position.left, row.location);
		}

		// buildLabels :: Position -> Row -> Position
		var buildLabels = function(position, row) {
			var horizontal_spacing = 245;
			var vertical_spacing = 130;

			addLabel(position, row);

			var new_left = position.left + horizontal_spacing;
			var new_top = position.top;

			if(new_left > 184) {
				new_top = position.top + vertical_spacing;
				new_left = 20;
			}

			return {left: new_left, top: new_top}
		}
		
		reduce(buildLabels, {left : 20, top : 35}, records);
		
		window.location.href = doc.output('datauri');		
	}
	
return { preview : preview, generate: generate}

})();
