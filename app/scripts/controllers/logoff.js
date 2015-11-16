'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:LogoffCtrl
 * @description
 * # LogoffCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('LogoffCtrl', function ($scope, localStorageService, $window) {
      localStorageService.clearAll();
      $window.location=('#/login');
  });
