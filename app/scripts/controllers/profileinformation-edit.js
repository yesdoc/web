'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileinformationEditCtrl
 * @description
 * # ProfileinformationEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileInformationEditCtrl', function ($scope,Profile,Gender,$routeParams) {
        
        var p = Profile.get({id: $routeParams.id},function(){//p is profile
            var profile = p.resource;
            profile.gender=profile.gender;
            $scope.profile=profile;
            var genders_data = Gender.query(function(){
                $scope.genders = genders_data[0].data.genders;
            });
        }); 
        $scope.updateProfile = function(){
            p.$update(function(){
                alert("Saved");
            });
        };
  });
