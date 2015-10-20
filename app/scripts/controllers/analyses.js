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
      Analysis,
      AnalysisFile,
      global,
      $filter){

    Auth.isLogged();

    var q_a = MyAnalyses.query(function(){

      $scope.analyses = q_a.resource;

      $.each($scope.analyses,function(i,a){

        var q_af = Analysis.get({id:a.id,element:'files'},function(){
          $.each(q_af.resource,function(i,af){
                a.af_id = af.id
            });
          if ( a.af_id ){
            a.imageSrc = (global.getApiUrl()+'/analysis_files/'+a.af_id+'/download');
          }else{
            a.imageSrc = '/images/escul.jpeg';
          }
          });

        a.datetime = new Date(a.datetime)

        });

      });

  });
