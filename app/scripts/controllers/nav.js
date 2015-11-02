'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('NavCtrl', function ($scope,Auth,$rootScope,Notifications , $location) {


  // Evento informante del estado de logueo del usuario. 
  // (ver archivo services/authorization.js)
  $rootScope.$on('isLoggedEvent', function(event, args) {
    $scope.d = new Date();
    
    // El usuario está logueado
    if (args[0]){

      $scope.is_logged = true;

      $scope.msgs = ["Bienvenido a YesDoc..."]

      Notifications.query({quantity:10},function(response){
        $scope.notifications = response.resource;
        });



    // El usuario NO está logueado
    }else{

      $scope.is_logged = false;

      $scope.msgs = []

      $scope.notifications = []

    }



    if(!$scope.$$phase) {
      $scope.$apply();
    }

  });

  $scope.redirect = function(notification){
    switch(notification.detail_object_type){
      case 'analysis':
        $location.path('/analyses/'+notification.detail_object_id);
        break;
      default:
        break;
    }
  }

});
