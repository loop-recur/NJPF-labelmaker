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
	
	var generate = defn(function(width_height, records) {
		var doc = new jsPDF();
		
		var width = width_height.split("-")[0];
		var height = width_height.split("-")[1];
		
		var row_length = 3;
		var starting_font_size = 11;
		var starting_left = 10;
		var starting_top = 15;
		var line_height = 6;
		
		var starting_horizontal_spacing = 27;
		var starting_vertical_spacing = 40;
		
		var font_size = height * starting_font_size;
		
		var horizontal_spacing = width * starting_horizontal_spacing;
		var vertical_spacing = height * starting_vertical_spacing;
		
		doc.setFontSize(font_size);
		
		var writeLine = defn(function(position, number, text) {
			doc.text(position.left, position.top+line_height*number, text);
			return number+1;
		});

		var addLabel = function(position, row) {
			var lines = [row.owner, row.district, row.location, Formatter.address(row.city, row.state, row.zip)];
			reduce(writeLine(position), 0, lines);
		}

		var buildLabels = function(position, row) {
			
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
	});
	
return { preview : preview, generate: generate}

})();
