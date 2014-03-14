

var app = angular.module( 'app', [  'upload' ] );

// app.factory('BaseMixin', function() {
//   return function BaseMixin() {

//     angular.extend(this, {
//       _id: Math.random().toString(16).slice(2)
//     });

//     return this;
//   }
// });

// app.factory('DatedEntityMixin', function() {
//   return function DatedEntityMixin() {

//     angular.extend(this, {
//       createdDate: new Date()
//     });

//     return this;
//   }
// });

// app.factory('ModelDecorator',function($injector) {

//     var cachedDecorators = {};

//     function getDecoratorByName(name) {
//       var decorator;
//       decorator = cachedDecorators[name] || $injector.get(name);
//       if (decorator && !cachedDecorators[name]) {
//         cachedDecorators[name] = decorator;
//       }

//       return decorator;
//     }

//   return {
//       decorate: function(mixins, model){

//         mixins.forEach(function(mixinName) {

//           var decorator = getDecoratorByName(mixinName);
//           if (decorator) {
//             decorator.call(model);
//           }
//         });

//         return model;
//       }
//   }

// });

// app.controller('MyCtrl', function($scope, ModelDecorator) {

//   var base = {
//     name: 'name'
//   }

//   var newBase = ModelDecorator.decorate(['BaseMixin'], base);
//   // var xbase = ModelDecorator.decorate(['BaseMixin', 'DatedEntityMixin'], newBase);

//   $scope.base = base;
//   $scope.newBase = newBase;
//   // $scope.xBase = xbase;
// });
