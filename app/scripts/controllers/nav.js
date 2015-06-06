'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('NavCtrl', function ($scope,$location) {
      $scope.isActive = function (navLocation) {
          return (navLocation===$location.path());
      };
  
});
