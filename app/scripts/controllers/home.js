'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller('HomeCtrl',
    function (
      $scope,
      $cookies,
      Auth,
      $location,
      $rootScope) {

        Auth.isLogged(function(){

        });

    });
