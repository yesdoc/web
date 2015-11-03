'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:EpicrisisCtrl
 * @description
 * # EpicrisisCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('CompartidosCtrl', function (
      $scope,
      $location ,
      $routeParams,
      Auth,
      MySharedAnalyses,
      MySharedProfiles,
      Analysis,
      AnalysisFile,
      fileReader,
      global,
      User,
      $http,
      $filter){

    Auth.isLogged(function(){

      Auth.getAuth(function(token){

        $scope.analyses = [];

        MySharedProfiles.query(function(response){
          $scope.profiles = response.resource;
          });

        $scope.load = function(profile_id){

        var profile_id = profile_id;

        MySharedAnalyses.get({profile : profile_id},function(response){

          $scope.analyses = response.resource;


          $.each($scope.analyses,function(i,a){
            a.datetime = a.datetime+'Z'; 
            var q_af = Analysis.get({id:a.id,element:'files'},function(){
              $.each(q_af.resource,function(i,af){
                a.af_id = af.id 
              });
              if ( a.af_id ){
                a.imageSrc = ( global.getApiUrl() + '/analysis_files/' + a.af_id + '/thumbnail_by_query?token='+token);
              }
              else{
                a.imageSrc = 'images/escul.jpeg';
              }
            });

            a.datetime = new Date(a.datetime)

          });

          if(!$scope.$$phase) {
            $scope.apply();
            }

        });

        }


      });
    });
  });
