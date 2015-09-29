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
        MeasurementType,
        ProfileMeasurements,
        ProfileMeasurementsLatest) {

    if(!$cookies.get('Token')){
        $location.path('/login');
    }else{

        // Se traen y muestran las ultimas mediciones de un perfil
        var data = ProfileMeasurementsLatest.get(
            function(){
              $scope.measurements=data.resource;
              });   
        }

});
