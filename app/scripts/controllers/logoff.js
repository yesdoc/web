'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:LogoffCtrl
 * @description
 * # LogoffCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('LogoffCtrl', function ($scope,$cookies,$window) {
      $cookies.remove('profile_id');
      $window.location=('/#/login');
  });