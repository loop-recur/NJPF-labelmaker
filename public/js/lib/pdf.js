var Pdf = (function() {
	
	var generate = defn(function(label, records) {
		var doc = new jsPDF();
		var pixel_conversion_number = 25.6;
		
		var width = label.width;
		var height = label.height;
		var amount_per_page = label.amount_per_page;
		
		var paper_width = 8.5;
		
		var left_margin = 6 + label.left_margin;
		var top_margin = 37 + label.top_margin; // what is 20?

		var horizontal_spacing = (width + label.horizontal_spacing) * pixel_conversion_number;
		var vertical_spacing = (height + label.vertical_spacing) * pixel_conversion_number;
		
		var font_size = (width + height) * 3;
		var line_height = font_size / 2;
		
		var column_amount = Math.floor(paper_width / width);
		
		var writeLine = defn(function(top, left, number, text) {
			doc.text(left, top+line_height*number, text);
			return number+1;
		});

		var addLabel = function(top, left, row) {
			reduce(writeLine(top, left), 0, Formatter.line(row));
		}

		var buildLabels = function(state, row) {
			addLabel(state.top, state.left, row);
			
			var next_column = (state.current_column >= column_amount) ?  1 : (state.current_column + 1);

			var next_amount = state.current_amount+1;
			var next_left = horizontal_spacing * state.current_column + left_margin;
			var next_top = state.top;
			
			if(next_column == 1) {
				next_top = state.top + vertical_spacing;
				next_left = left_margin;
			}

			if(next_amount >= amount_per_page) {
				doc.addPage();
				next_amount = 0;
				next_top = top_margin;
				next_left = left_margin;
			}
			
			return {left: next_left, top: next_top, current_amount: next_amount, current_column: next_column}
		}
		
		doc.setFontSize(font_size);
		reduce(buildLabels, {left : left_margin, top : top_margin, current_amount: 0, current_column: 1}, records);
		return doc.output();
	});
	
	
return { generate: generate }

})();
