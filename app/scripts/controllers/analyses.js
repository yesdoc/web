'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:EpicrisisCtrl
 * @description
 * # EpicrisisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysesCtrl', function (
      $scope,
      $location , 
      Auth,
      MyAnalyses,
      AnalysisFile,
      $filter){

    Auth.isLogged();

    var r = MyAnalyses.query(function(){

      $scope.analyses = r.resource;

      $.each($scope.analyses,function(i,a){
        a.date = new Date(a.datetime)
        a.date = a.date.getDate()+'-'+a.date.getMonth()+'-'+a.date.getFullYear();
        });

      });

  });
