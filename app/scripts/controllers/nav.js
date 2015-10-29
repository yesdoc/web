'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('NavCtrl', function ($scope,Auth,$rootScope) {

  // Evento informante del estado de logueo del usuario. 
  // (ver archivo services/authorization.js)
  $rootScope.$on('isLoggedEvent', function(event, args) {
    // El usuario está logueado
    if (args[0]){

      $scope.is_logged = true;

      $scope.msgs = ["Bienvenido a YesDoc..."]

      $scope.notifications = [
        {
          "text": "Iniciar Sesión",
          "href": "/#/login"
        }
      ];



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

});
