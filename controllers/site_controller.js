var Labels = require("../models/labels");
var fs = require("fs");
	
SiteController = function(app, db) {
	app.get('/', function(req, res) {
		res.render('show', {locals: {records: []}});
	});
	
	app.post('/create', function(req, res) {
		var _finish = function(records) {
			log("RECORDS");
			log(records);
			res.render('show', {locals:{
				records: JSON.stringify(records)
			}});
		}
		
		if(req.body) {
			log(req.body.labels);
			Labels.create(req.body.labels, _finish);
		} else {
			req.form.complete(function(err, fields, files){
				Labels.create_from_file(files.labels.path, _finish);
		  });
		}
	});
	
	app.post("/export.wtg", function(req, res) {
		var path = 'public/temp/export.wtg';
		var full_path = __dirname+'/../'+path;
		
		fs.unlink(full_path, function() {
			fs.writeFile(full_path, req.body.csv_data, function() {
				res.sendfile(path);
			});
		});
	});
	
	app.post('/stub', function(req, res) {
		res.send("");
	});
}


module.exports = SiteController;
