var Labels = require("../models/labels");
var fs = require("fs");
	
SiteController = function(app, db) {
	app.get('/', function(req, res) {
		res.render('show', {locals: {records: []}});
	});
	
	app.post('/create', function(req, res) {		
		req.form.complete(function(err, fields, files){
				var _finish = function(records) {
					res.render('show', {locals:{
						records: JSON.stringify(records)
					}});
				}

				Labels.create(files.labels.path, _finish);
	  });
	});
	
	app.post("/export.wtg", function(req, res) {
		res.sendfile('public/temp/export.wtg');
	});
	
	app.post('/stub', function(req, res) {
		res.send("");
	});
}


module.exports = SiteController;
