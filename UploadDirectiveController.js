

$UploadTargetController.$inject = ['$scope'];
function $UploadTargetController ($scope) {




}


$UploadTargetDirective.$inject = ['$timeout'];
function $UploadTargetDirective ($timeout) {

  return {

    restrict: 'E',
    replace: true,
    templateUrl: 'UploadDirectiveView.html',

    scope: {
      uploadPcnt: '=',
      drop: '&'
    },

    link: function(scope, elem, attrs) {

      angular.element(elem).attr("draggable", "true");

      scope.$watch('uploadPcnt', function(newValue, oldValue){
        scope.percentage = 53;
      });

      var dropdiv = elem[0];
      var cancel = null;
      var ogClass = dropdiv.className;

			// var fn = $parse(attr['ngFileDrop']);

			dropdiv.addEventListener("dragover", function(evt) {
        // console.log('dragover');

				$timeout.cancel(cancel);
				evt.stopPropagation();
				evt.preventDefault();

        elem.removeClass(ogClass);
				elem.addClass(attrs['mvUploadOverClass'] || "dragover");
			}, false);

			dropdiv.addEventListener("dragleave", function(evt) {
        // console.log('dragleave');

				cancel = $timeout(function() {
					elem.removeClass(attrs['mvUploadOverClass'] || "dragover");
          elem.addClass(ogClass);
				});
			}, false);

			dropdiv.addEventListener("drop", function(evt) {
				evt.stopPropagation();
				evt.preventDefault();

				elem.removeClass(attrs['mvUploadOverClass'] || "dragover");
        elem.addClass(ogClass);

        var files = [], fileList = evt.dataTransfer.files, i;

				if (fileList != null) {
					for (i = 0; i < fileList.length; i++) {
            console.log('drop; file added', fileList.item(i));
						// files.push(fileList.item(i));
					}
				}

        // $timeout(function() {
				// 	fn(scope, {
				// 		$files : files,
				// 		$event : evt
				// 	});
				// });

			}, false);

    }

  };

};

var UploadModule = angular.module('upload', []);
UploadModule.directive('mvUploadTarget', $UploadTargetDirective);
UploadModule.controller('UploadTargetCtrl', $UploadTargetController);
UploadModule.factory('UploadUtils', function() {

  this.isDraggable = function(element) {

  };




  return this;

});

UploadModule.directive('mvUploadProgress', function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      mvWidth: '=',
      mvHeight: '=',
      mvRadius: '=',
      mvUploadPercentage: '@'
    },
    template: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="status-icon" width="1em" height="1em">' +
	      '<clipPath id="inner-stroke">' +
	        '<circle cx="50%" cy="50%" r="50%"/>' +
	      '</clipPath>' +
				'<circle class="{{statusClasses[status]}}" cx="50%" cy="50%" r="50%" clip-path="url(#inner-stroke)">' +
					'<pre>status</pre>' +
				'</circle>' +
			'</svg>',
    // template: '<div style="width:{{mvWidth}}px;height:{{mvHeight}}px;background-color:#ccc">{{subValue}}</div>',
    link: function(scope, elem, attrs) {

      scope.$watch('mvUploadPercentage', function (newValue, oldValue) {
        console.log('pcnt value changed:', newValue);
        scope.subValue = newValue;
      });


    }
  }

});

// UploadModule.directive('mvUploadProgress', [function () {
//   var compilationFunction = function (templateElement, templateAttributes, transclude) {
//     if (templateElement.length === 1) {
//       var node = templateElement[0];
//
//       var width = node.getAttribute('data-round-progress-width') || '60';
//       var height = node.getAttribute('data-round-progress-height') || '60';
//
//       var canvas = document.createElement('canvas');
//       canvas.setAttribute('width', width);
//       canvas.setAttribute('height', height);
//       canvas.setAttribute('data-round-progress-model', node.getAttribute('data-round-progress-model'));
//
//       node.parentNode.replaceChild(canvas, node);
//
//       var outerCircleWidth = node.getAttribute('data-round-progress-outer-circle-width') || '20';
//       var innerCircleWidth = node.getAttribute('data-round-progress-inner-circle-width') || '5';
//
//       var outerCircleBackgroundColor = node.getAttribute('data-round-progress-outer-circle-background-color') || '#505769';
//       var outerCircleForegroundColor = node.getAttribute('data-round-progress-outer-circle-foreground-color') || '#12eeb9';
//       var innerCircleColor = node.getAttribute('data-round-progress-inner-circle-color') || '#505769';
//       var labelColor = node.getAttribute('data-round-progress-label-color') || '#12eeb9';
//
//       var outerCircleRadius = node.getAttribute('data-round-progress-outer-circle-radius') || '100';
//       var innerCircleRadius = node.getAttribute('data-round-progress-inner-circle-radius') || '70';
//
//       var labelFont = node.getAttribute('data-round-progress-label-font') || '50pt Calibri';
//
//       return {
//         pre: function preLink(scope, instanceElement, instanceAttributes, controller) {
//           var expression = canvas.getAttribute('data-round-progress-model');
//           scope.$watch(expression, function (newValue, oldValue) {
//             // Create the content of the canvas
//             var ctx = canvas.getContext('2d');
//             ctx.clearRect(0, 0, width, height);
//
//             // The "background" circle
//             var x = width / 2;
//             var y = height / 2;
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(outerCircleRadius), 0, Math.PI * 2, false);
//             ctx.lineWidth = parseInt(outerCircleWidth);
//             ctx.strokeStyle = outerCircleBackgroundColor;
//             ctx.stroke();
//
//             // The inner circle
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(innerCircleRadius), 0, Math.PI * 2, false);
//             ctx.lineWidth = parseInt(innerCircleWidth);
//             ctx.strokeStyle = innerCircleColor;
//             ctx.stroke();
//
//             // The inner number
//             ctx.font = labelFont;
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'middle';
//             ctx.fillStyle = labelColor;
//             ctx.fillText(newValue.label, x, y);
//
//             // The "foreground" circle
//             var startAngle = - (Math.PI / 2);
//             var endAngle = ((Math.PI * 2 ) * newValue.percentage) - (Math.PI / 2);
//             var anticlockwise = false;
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(outerCircleRadius), startAngle, endAngle, anticlockwise);
//             ctx.lineWidth = parseInt(outerCircleWidth);
//             ctx.strokeStyle = outerCircleForegroundColor;
//             ctx.stroke();
//           }, true);
//         },
//         post: function postLink(scope, instanceElement, instanceAttributes, controller) {}
//       };
//     }
//   };
//
//   var roundProgress = {
//     compile: compilationFunction,
//     replace: true
//   };
//   return roundProgress;
// }]);
