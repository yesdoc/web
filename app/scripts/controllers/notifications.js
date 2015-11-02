'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('NotificationsCtrl', function ($scope,Auth,Notifications,moment,global) {

    Auth.isLogged(function(){

      $scope.notifications = [];
      Notifications.query({quantity:20},function(response){
        $scope.notifications = response.resource;
        $.each($scope.notifications,function(i,n){
          n.created_datetime = (new Date(n.created_datetime+'Z'));
          });
        });

      $scope.redirect = function(n){
        global.notificationRedirect(n);
        }
    });
  });
