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
      fileReader,
      global,
      User,
      $http,
      $filter){

    var token = Auth.isLogged();
    token = token.split(' ')[2];

    User.get({},function(response){

    var user = response.resource;

    var q_a = MyAnalyses.query(function(){

      $scope.analyses = q_a.resource;

      $.each($scope.analyses,function(i,a){

        var q_af = Analysis.get({id:a.id,element:'files'},function(){
          $.each(q_af.resource,function(i,af){
            a.af_id = af.id 
            });
          if ( a.af_id ){
            a.imageSrc = (
                global.getApiUrl(user.username+':'+token+'@')+
                '/analysis_files/'+
                a.af_id+
                '/thumbnail');
            }
          else{
            a.imageSrc = 'images/escul.jpeg';
            }
          });

        a.datetime = new Date(a.datetime)

        });

      });
    });
  });
