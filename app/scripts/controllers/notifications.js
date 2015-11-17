'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('NotificationsCtrl', function ($scope,Auth,Notifications,moment,global,Profile) {

    Auth.isLogged(function(){

      $scope.icon='fa-globe';
      $scope.title='Notificaciones';
      
      $scope.items = [];
      Notifications.query({quantity:20,type:"event"},function(response){
        $scope.items = response.resource;
        $.each($scope.items,function(i,n){
          n.created_datetime = (new Date(n.created_datetime+'Z'));

          Profile.get({id: n.notification_author.id,element:'gravatar',size: 64},function(response){
            n.src = response.resource.gravatar_url;
            });

          });
        });
      
      $scope.redirect = function(n){
        global.notificationRedirect(n);
        }
    });
  });
