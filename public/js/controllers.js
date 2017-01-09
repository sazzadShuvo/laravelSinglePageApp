myApp.controller('globalController', ['$scope', '$log', function($scope, $log) {
	$scope.globals = {};
	$scope.globals.navTemplate = 'templates/partials/nav.html';
}]);
myApp.controller('usersController', ['$scope', '$log', 'usersModel', function($scope, $log, usersModel) {
	angular.extend($scope, {
		loginUser: function() {
			var credentials = {
				email: $scope.email,
				password: $scope.password
			};

			usersModel.attemptLogin(credentials);
		},

		logoutUser: function() {
			usersModel.attemptLogout();
		}
	});
}]);
myApp.controller('navController', ['$scope', '$location', '$log', 'usersModel', function($scope, $location, $log, usersModel) {
	/*variables*/
	angular.extend($scope, {
		user: usersModel.getUserObject(),
		navigations: [
			{
				menuName: 'Home',
				url: '/#!/dashboard',
				submenu: [
					{
						menuName: 'View Gallery',
						url: '/#!/gallery/view'
					},
					{
						menuName: 'Add Gallery',
						url: '/#!/gallery/add'
					}
				]
			}
		]
	});

	/*methods*/
	angular.extend($scope, {
		checkActiveLink: function(routeLink) {
			var requestLink = '/#!' + $location.path();

			if (requestLink == routeLink) {
				return 'make-active';
			}
		}
	});
}]);
myApp.controller('galleryController', ['$scope', '$location', '$timeout', '$routeParams', '$log', 'galleryModel', function($scope, $location, $timeout, $routeParams, $log, galleryModel) {
	angular.extend($scope, {
		newGallery: {},
		singleGallery: {},
		errorDiv: false,
		errorMessages: []
	});

	galleryModel.getAllGalleries().then(function(successResponse) {
		$scope.galleries = successResponse.data;
		$scope.showGalleries = true;
	});

	if ($routeParams.galleryID) {
		galleryModel.getGalleryById($routeParams.galleryID).then(function(successResponse) {
			$scope.singleGallery = successResponse.data;
			$log.log($scope.singleGallery);
        });
	}

	angular.extend($scope, {
		saveNewGallery: function(addGalleryForm) {
			if (addGalleryForm.$valid) {
				$scope.submitWithError = false;
				galleryModel.saveGallery($scope.newGallery);
			} else {
				$scope.submitWithError = true;
			}
		},

		viewGallery: function(galleryID) {
			$location.path('/gallery/view/' + galleryID);
		}
	});
}]);
//# sourceMappingURL=controllers.js.map
