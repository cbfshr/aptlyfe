/*var appd = angular.module("app", [])

appd.directive("pageHeader", function () {
	return {
		restrict: "A",
		template: "<div>I am a header, yo</div>"
	}
});
*/

angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
angular.module('LoadingBarExample', ['chieffancypants.loadingBar', 'ngAnimate'])
	.config(function (cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = true;
	});

angular.module("app", [
		'app.controllers',
		'app.directives',
		'app.filters',
		'LoadingBarExample',
		'ngRoute'
	])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: './Angular/Controllers/Home/Home.html',
			controller: 'Home.Controller'
		});

		/*$routeProvider.when('/Login', {
			templateUrl: './Angular/Controllers/Login/Login.html',
			controller: 'Login.Controller'
		});*/
		

		$routeProvider.otherwise({
			templateUrl: './Angular/Controllers/Home/Home.html',
			controller: 'Home.Controller'
		});
	}]);
