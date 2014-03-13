// MediaController.js

MediaModule.controller('MediaModuleCtrl', ['$scope', 'MVStateProvider', function($scope, MVStateProvider) {

	'use strict';

	console.log('hello from MediaModuleCtrl');

	// $scope.format = 'M/d/yy h:mm:ss a';

	$scope.navs = ['one', 'two'];
	$scope.stateModel = MVStateProvider;

}]);

MediaModule.factory('MVStateProvider', function() {

	this.errorsForState = function() {
		console.log('does it');
		return true;
	};

	return this;

});


MediaModule.directive('mvState', function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      states: '=states',
      modeler: '=model'
    },
    link: function(scope, elem, attrs) {

      scope.$watch('validationModel', function() {
        console.log('validationModel changed', arguments, scope.validationModel);
      });

      scope.stateHasErrors = function(state) {
        return scope.modeler.errorsForState(state.stateName);
      };

    },
    template: '<ul class="nav nav-pills nav-stacked">' +
        '<li data-ng-repeat="state in states" ui-sref-active="active">' +
          '<a ui-sref="{{ state.stateName }}">{{ state.title }}' +
          '<i ng-if="!stateHasErrors(state)" class="icon-warning-sign icon-large pull-right"></i></a>' +
        '</li>' +
      '</ul>'
  }

});