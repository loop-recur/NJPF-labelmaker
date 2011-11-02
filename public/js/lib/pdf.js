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
	
	var generate = defn(function(label, records) {
		var doc = new jsPDF();
		
		var width = label.width;
		var height = label.height;
		var amount_per_page = label.amount_per_page;
		
		var starting_row_length = 8;
		var starting_font_size = 11;
		var starting_left = 10;
		var starting_top = 15;
		var starting_line_height = 6;
		var starting_horizontal_spacing = 27;
		var starting_vertical_spacing = 40;
		
		var font_size = height * starting_font_size;
		var horizontal_spacing = width * starting_horizontal_spacing;
		var vertical_spacing = height * starting_vertical_spacing;
		var line_height = height * starting_line_height;
		var row_length = Math.floor(starting_row_length / width);
		
		var writeLine = defn(function(top, left, number, text) {
			doc.text(left, top+line_height*number, text);
			return number+1;
		});

		var addLabel = function(top, left, row) {
			var lines = [row.owner, row.district, row.location, Formatter.address(row.city, row.state, row.zip)];
			reduce(writeLine(top, left), 0, lines);
		}

		var buildLabels = function(state, row) {
			addLabel(state.top, state.left, row);
			
			var new_amount = state.current_amount+1;
			var new_left = state.left + horizontal_spacing;
			var new_top = state.top;

			if(new_left >= (horizontal_spacing * row_length)) {
				new_top = state.top + vertical_spacing;
				new_left = starting_left;
			}
			
			if(new_amount >= amount_per_page) {
				doc.addPage();
				new_amount = 0;
				new_top = starting_top;
				new_left = starting_left;
			}
			
			return {left: new_left, top: new_top, current_amount: new_amount}
		}
		
		doc.setFontSize(font_size);
		reduce(buildLabels, {left : starting_left, top : starting_top, current_amount: 0}, records);
		window.location.href = doc.output('datauri');		
	});
	
return { preview : preview, generate: generate}

})();
