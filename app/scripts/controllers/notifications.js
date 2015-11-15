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

      $scope.icon='fa-globe';
      $scope.title='Notificaciones';
      
      $scope.items = [];
      Notifications.query({quantity:20,type:"event"},function(response){
        $scope.items = response.resource;
        $.each($scope.items,function(i,n){
          n.created_datetime = (new Date(n.created_datetime+'Z'));
          });
        });
      
      $scope.redirect = function(n){
        global.notificationRedirect(n);
        }
    });
  });
