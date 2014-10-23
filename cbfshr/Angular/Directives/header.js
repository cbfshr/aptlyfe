angular
	.module('app.directives')
	.directive('pageHeader', function () {
		return {
			restrict: 'A',
			templateUrl: './Angular/Directives/Header/Header.html',
			replace: true,
			controller: 'HeaderController'
		};
	});