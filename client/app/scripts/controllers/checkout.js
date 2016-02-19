'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $window, $location, $http, UserFactory) {
    // Check if user is logged in
    if (UserFactory.currentUser) {
      // TODO: Validate token
      // The user has a token validate to proceed checkout
      $scope.showForm = true;
    } else {
      // The user does not have a token (not logged in)
      $scope.showLogins = true;
      $scope.showForm = false;
    } 

    $scope.hideLogins = function () {
      $scope.showLogins = false;
      $scope.showForm = true;
    };
    
    $scope.process = function (status, response) {
      if (response.error) {
        // TODO: Do something meaningful with validation error from stripe
        alert(response.error.message);
        return;
      } else {
        $http.post('/api/checkout', {
          card: response.card,
          stripeToken: response.id,
          user: UserFactory.currentUser
        }).then(function success (response) {
          //TODO: Make response the user?
          console.log(response);
          // Only valid if user is checking out as guest
          $window.localStorage.removeItem('cart');
          // TODO: Return user as null instead of getting it here
          UserFactory.getUser();
          $location.path('/congratulations');
        }, function error (response) {
          // TODO: Do something meaningful with  error from server
          console.log(response);          
          alert(response.data.error.message);
          return;
        });
      }
    };

  });

