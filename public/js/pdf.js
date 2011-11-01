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
		doc.setFontSize(11);
		
		var starting_left = 10;
		var starting_top = 15;
		var line_height = 6;

		// addLabel :: Position -> Row -> IO()
		var addLabel = function(position, row) {
			doc.text(position.left, position.top, row.owner);
			doc.text(position.left, position.top+line_height, row.district);
			doc.text(position.left, position.top+line_height*2, row.location);
			doc.text(position.left, position.top+line_height*3, row.city + ", " + row.state + " " +row.zip);
		}

		// buildLabels :: Position -> Row -> Position
		var buildLabels = function(position, row) {
			var row_length = 3;
			var horizontal_spacing = 75;
			var vertical_spacing = 40;

			addLabel(position, row);

			var new_left = position.left + horizontal_spacing;
			var new_top = position.top;

			if(new_left >= (horizontal_spacing * row_length)) {
				new_top = position.top + vertical_spacing;
				new_left = starting_left;
			}

			return {left: new_left, top: new_top}
		}
		
		reduce(buildLabels, {left : starting_left, top : starting_top}, records);
		
		window.location.href = doc.output('datauri');		
	}
	
return { preview : preview, generate: generate}

})();
