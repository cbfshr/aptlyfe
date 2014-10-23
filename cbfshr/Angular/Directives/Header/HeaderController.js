angular
	.module('app.controllers')
	.controller('HeaderController', [
		'$scope',
		function ($scope) {
			$scope.hover = false;

			$scope.username = 'Cal';

		}
	]);
