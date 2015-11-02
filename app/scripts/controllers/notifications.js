'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('NotificationsCtrl', function ($scope,Auth,Notifications) {

    Auth.isLogged(function(){

      $scope.notifications = [];
      Notifications.query({quantity:20},function(response){
        $scope.notifications = response.resource;
        });

    });
  });
