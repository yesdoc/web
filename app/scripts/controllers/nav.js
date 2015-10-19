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

  $rootScope.$on('isLoggedEvent', function(event, args) {
    if (args[0]){
      $scope.dropdown = [
        {
          "text": "<i class=\"fa fa-user\"></i>&nbsp;Información Personal",
          "href": "/#/myProfileInformation"
        },
        {
          "text": "<i class=\"fa fa-hdd-o\"></i>&nbsp;Configurar almacenamiento",
          "href": "/#/dropbox-auth-start",
        },
        {
          "divider": true
        },
        {
          "text": "<i class=\"fa fa-sign-out\"></i>&nbsp;Cerrar Sesión",
          "href": "#/logoff",
        }
      ];
    }else{
      $scope.dropdown = [
        {
          "text": "<i class=\"fa fa-sign-in\"></i>&nbsp;Iniciar Sesión",
          "href": "/#/login"
        }
      ];
    }
    if(!$scope.$$phase) {
      $scope.$apply();
    }
  });

});
