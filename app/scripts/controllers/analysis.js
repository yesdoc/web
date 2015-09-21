'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AboutCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
   .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{{');
            $interpolateProvider.endSymbol('}}');
    })
  .controller('AnalysisCtrl', function ($scope, $http) {
      $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
      ];
      $scope.imageSource = "";
      $scope.fileNameChaged = function(element)
      {
          var reader = new FileReader();
          reader.onload = function (e) {
              $scope.$apply(function()
                  {
                      $scope.imageSource = e.target.result;
                  });
          }
          reader.readAsDataURL(element.files[0]);
      }
  });
