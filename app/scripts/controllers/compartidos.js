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
      Profile,
      $http,
      $filter){

    Auth.isLogged(function(){

      Auth.getAuth(function(token){
        
        $scope.profile_id = $routeParams.id;
        $scope.analyses = [];

        MySharedProfiles.query(function(response){
          $scope.profiles = response.resource;
          });

        $scope.load = function(profile_id){
            get_analyses(profile_id);
        }

        function get_analyses(profile_id){
          
            Profile.query({id:profile_id},function(response){
              $scope.selected = response.resource;
              });

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

        if(!($scope.profile_id == 0)){ 
            get_analyses($scope.profile_id);
            }

      });
    });
  });
