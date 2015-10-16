'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:AnalysesshowCtrl
 * @description
 * # AnalysesshowCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('AnalysesShowCtrl', function (
        $scope,
        global,
        MyMeasurements,
        $routeParams,
        AnalysisFile,
        Analysis,
        fileReader) {

    var g_a = Analysis.get({id : $routeParams.id},function(){
      $scope.a = g_a.resource;
      $scope.a.datetime = new Date($scope.a.datetime);

      $scope.mySlides = [];
      var q_af = Analysis.get({id : $routeParams.id , element : 'files'},function(){
        $.each(q_af.resource,function(i,af){
              $scope.mySlides.push(global.getApiUrl()+'/analysis_files/'+af.id+'/download');
          });
        });
      
      });

      $scope.measurements = [];
      var g_am =  Analysis.get({id: $routeParams.id , element:'measurements'},function(){
        g_am = g_am.resource;
        $.each(g_am, function(i , am){
          am.datetime = new Date(am.datetime)
          $scope.measurements.push(am);
          });
        });


  });
