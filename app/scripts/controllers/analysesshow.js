'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AnalysesshowCtrl
 * @description
 * # AnalysesshowCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysesShowCtrl', function ($scope,$routeParams,Analysis) {

    var r = Analysis.get({id : $routeParams.id},function(){
      $scope.a = r.resource;
      $scope.a.date = new Date($scope.a.datetime);
      $scope.a.date = ($scope.a.date.getDate() + '-' + 
        $scope.a.date.getMonth() + '-' +
        $scope.a.date.getFullYear());
      });

  });
