'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileMeasurementsCtrl
 * @description
 * # ProfileMeasurementsCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileMeasurementsCtrl', function ($scope,$location,$cookies, ProfileMeasurements) {
        if(!$cookies.get('profile_id')){
            $location.path('/login');
        }else{
            var data = ProfileMeasurements.get({id: $cookies.get('profile_id')},function(){
                $scope.measurements=data.resource;
            });   
        }
});
