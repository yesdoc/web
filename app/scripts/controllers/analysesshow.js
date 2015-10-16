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
        $modal,
        fileReader) {

    /* Show Analysis File Image on a new Modal */
    $scope.showImage = function($index,a){
      var af = $scope.afs[$index];
      var modalImage = $modal({ 
        title: af.description,
        content: '<div class="thumbnail"> <img src="' + af.imageSrc + '" /> </div>', 
        show: false});
    
      modalImage.$promise.then(modalImage.show);
    }

    var g_a = Analysis.get({id : $routeParams.id},function(){
      $scope.a = g_a.resource;
      $scope.a.datetime = new Date($scope.a.datetime);

      $scope.afs = []; //analysis files list
      var q_af = Analysis.get({id : $routeParams.id , element : 'files'},function(){
        $.each(q_af.resource,function(i,af){
              af.imageSrc = (global.getApiUrl()+'/analysis_files/'+af.id+'/download');
              $scope.afs.push(af);
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
