var Pdf = (function() {
	
	var generate = defn(function(label, records) {
		var doc = new jsPDF();
		
		var width = label.width;
		var height = label.height;
		var amount_per_page = label.amount_per_page;
		
		var starting_row_length = 8;
		var starting_font_size = (width > 2) ? 7 : 11;
		var starting_left = 0;
		var starting_top = 20.5;
		var starting_line_height = 6;

		var starting_horizontal_spacing = 36;
		var starting_vertical_spacing = 30.5;
		
		var font_size = height * starting_font_size;
		var horizontal_spacing = width * starting_horizontal_spacing;
		var vertical_spacing = height * starting_vertical_spacing;
		var line_height = height * starting_line_height;
		var row_length = Math.floor(starting_row_length / width);
		log(horizontal_spacing);
		
		var writeLine = defn(function(top, left, number, text) {
			doc.text(left, top+line_height*number, text);
			return number+1;
		});

		var addLabel = function(top, left, row) {
			reduce(writeLine(top, left), 0, Formatter.line(row));
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
		return doc.output('datauri');
	});
	
	
return { generate: generate }

})();
