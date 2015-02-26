'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('nightwalkerApp')
  .directive('siteLogin', function (UserFactory) {
    return {
      templateUrl: 'partials/login.html', 
      restrict: 'E',
      controller: 'LoginCtrl'        
    };
  });
