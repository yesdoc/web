'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:PatientsCtrl
 * @description
 * # PatientsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller(
    'PatientsCtrl',
    function (
      $scope,
      $location,
      $cookies,
      Auth,
      MeasurementType,
      MySharedProfiles,
      MySharedAnalyses,
      ProfileMeasurements,
      Profile,
      ProfileMeasurementsLatest) {
          Auth.isLogged(function(){

              MySharedProfiles.query(function(response){
                  $scope.patients = response.resource;
                  $.each($scope.patients,function(i , c){
                      Profile.get({id:c.id,element:'gravatar',size: 64},function(response){
                          c.src = response.resource.gravatar_url;
                      });
                  });
              });

          }); 
      });
