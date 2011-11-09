var express = require('express')
	, form = require('connect-form')
	,	controllers = require('./controllers');

var app = module.exports = express.createServer(form({ keepExtensions: true }));

// Configuration
var pub = __dirname + '/public';

app.configure(function(){
  app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));
  app.use(app.router);
	app.use(express.cookieParser());
	app.use(express.logger({ format: ':method :url' }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

controllers.setup(app);

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(5000);
  console.log("Express server listening on port %d", app.address().port);
}
