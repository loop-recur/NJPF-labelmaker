var Labels = require("../models/labels");
	
SiteController = function(app, db) {
	app.get('/', function(req, res) {
		res.render('index');
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
	
	app.post('/stub', function(req, res) {
		res.send("");
	});
}


module.exports = SiteController;
