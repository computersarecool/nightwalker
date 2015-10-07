'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:stripeForm
 * @description
 * # stripeForm
 */
angular.module('nightwalkerApp')
  .directive('stripeForm', function ($window) {
    return {
      restrict: 'A',
      
      link: function postLink(scope, element, attrs) {
        var form = angular.element(element);
        
        form.bind('submit', function () {
          var button = form.find('button');
          button.prop('disabled', true);
          $window.Stripe.createToken(form[0], function () {
            var args = arguments;
            // TODO: Is scope.$apply neccesary
            scope.$apply(function () {
              scope[attrs.stripeForm].apply(scope, args);
            });
          });

        });
      }
    };
  });

