'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileMeasurementsCtrl', function ($scope, ProfileMeasurements,$routeParams) {
        //Profile.get({id: $routeParams.id}); 
        var data = ProfileMeasurements.get({id:"1"},function(){
            $scope.measurements=data.resource;
        });   
});
