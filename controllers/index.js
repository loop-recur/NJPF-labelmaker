var controllers = [
    require('./site_controller')
];

setup = function(app) {
	controllers.forEach(function(controller) {
		controller(app);
	});
};

module.exports = {setup: setup};
