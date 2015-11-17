'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller(
    'ProfileMeasurementsCtrl',
    function (
      $scope,
      $location,
      $cookies,
      Auth,
      MeasurementType,
      ProfileMeasurements,
      ProfileMeasurementsLatest) {

        Auth.isLogged(function(){

          // Se traen y muestran las ultimas mediciones de un perfil
          var data = ProfileMeasurementsLatest.get(function(){
            $scope.measurements=data.resource;
            $.each($scope.measurements,function(i,m){
              m.datetime = (new Date(m.datetime+'Z'));
            });
          });   

        });
    });
