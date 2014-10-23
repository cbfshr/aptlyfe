var Login;
(function (Login) {
	var Controller = (function () {
		function Controller($scope, $http, $location, $routeParams, $filter, $anchorScroll) {
			this.$scope = $scope;
			this.$http = $http;
			this.$location = $location;
			this.$routeParams = $routeParams;
			//$scope.$dialog = $dialog;
			$scope.$filter = $filter;
			//this.$navigation = $navigation;
			//this.$util = $util;
			this.$anchorScroll = $anchorScroll;
			var _this = this;

			$scope.userCredentials = [];
			$scope.loggedIn = false;
			
			$scope.initialize = function () {
				return _this.initialize();
			};
			$scope.login = function (userin, passin) {
				return _this.login(userin, passin);
			};
			
			_this.initialize();
		}
		Controller.$inject = [
			'$scope',
			'$http',
			'$location',
			'$routeParams',
			//'$dialog',
			'$filter',
			//'$navigation',
			//'$util',
			'$anchorScroll'
		];

		Controller.prototype.initialize = function () {
			var _this = this;

			if (!_this.$scope.loggedIn) {
				this.$http.get('api/UserCredentials')
					.success(function (data) {
						_this.$scope.userCredentials = data;
						//alert('yay');
					});
			} else {
				_this.$location.path('/Home');
			}
		};

		Controller.prototype.login = function (userin, passin) {
			var _this = this;
			var userIndex = -1;

			for (var i = 0; i < _this.$scope.userCredentials.length; i++) {
				if (_this.$scope.userCredentials[i].Username === userin) {
					userIndex = i;
				}
			}
			if (userIndex === -1) {
				//error message
				return;
			}
			
			if (_this.$scope.userCredentials[userIndex].Password === passin) {
				_this.$scope.loggedIn = true;
				_this.$location.path('/Home');
			} else {
				//error message
				return;
			}
		};

		return Controller;
	})();
	Login.Controller = Controller;
})(Login || (Login = {}));