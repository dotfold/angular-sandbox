
angular.module("movideo.admin.model", [])
	.provider("$ModuleNavigation", function(){

		console.log('movideo.admin.model');

		// TODO: inject $state

		this.$get = function () {

			this._routes;

			function Model(Routes) {
				console.log('DEFAULT:', Routes);
				this._routes = Routes;
			}

			Model.prototype.goDefault = function() {
				console.log('goDefault');
			};

			Model.prototype.goParent = function() {
				console.log('goParent');
			};

			Model.prototype.getRoutes = function() {
				console.log('getRoutes');
				return this._routes;
			};

			Model.prototype.isCurrentStateValidChildState = function() {
				console.log('isCurrentStateValidChildState');
			};

			// Model.prototype.getRoute = function getRoute(name){
			// 	return this.message;
			// };

			return {

				RouterModel: Model
			};
		};
	});

angular.module('movideo.admin.playlist', ['movideo.admin.model'])
	.constant('PlaylistRoutes', {
	
		edit: {
			name: 'editRoute',
			route: '/edit/:mediaId',
			parent: true
		},

		editEssentials: {
			name: 'editRoute.essentials',
			route: '/essentials',
			parent: false,
			default: true
		}
	
	})
	.provider("$PlaylistModuleNavigation", function() {

		console.log('$PlaylistModuleNavigationProvider');

		this.$get = ['$ModuleNavigation', 'PlaylistRoutes', function($ModuleNavigation, PlaylistRoutes) {

			// console.log('hi', PlaylistRoutes, $ModuleNavigation);

			return {

				routeModel: function() {
					return new $ModuleNavigation.RouterModel(PlaylistRoutes);
				}

			};
		}];
	});

angular.module('movideo.admin.playlist')
	.controller('PlaylistCtrl', ['$scope', '$injector', '$PlaylistModuleNavigation',
		function($scope, $injector, $PlaylistModuleNavigation) {

		'use strict';

		console.log('hello from PlaylistCtrl');

		// $scope.format = 'M/d/yy h:mm:ss a';
		// $scope.inj = $injector.$get('$PlaylistN')


		$scope.navs = ['one', 'two'];
		// $scope.PlaylistModuleNavigationProvider = PlaylistModuleNavigationProvider;

		console.log($PlaylistModuleNavigation.routeModel);

		$scope.routes = $PlaylistModuleNavigation.routeModel().getRoutes();
		console.log($scope.routes);


	}]);
