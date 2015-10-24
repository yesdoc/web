'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:BloodcholesterolCtrl
 * @description
 * # BloodcholesterolCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
.controller(
    "BloodcholesterolCtrl",
    function (
      $scope,
      $cookies,
      Auth,
      $location,
      $rootScope) {

        Auth.isLogged(function(){

        });

      });
  
