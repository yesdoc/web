'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileinformationEditCtrl
 * @description
 * # ProfileinformationEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileinformationEditCtrl', function ($scope,Profile,$routeParams) {

        //$scope.data  = Profile.get({id: $routeParams.id}); 
        var data = Profile.query(function(){
            $scope.profile=data[0].profile;
            $scope.genders=data[0].genders;
        }); 
  });
