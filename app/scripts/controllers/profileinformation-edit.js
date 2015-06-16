'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileinformationEditCtrl
 * @description
 * # ProfileinformationEditCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('ProfileInformationEditCtrl', function ($scope,$location,$cookies,Profile,Gender) {
        if(!$cookies.get('profile_id')){
            $location.path('/login');
        }
        var profile_id=$cookies.get('profile_id');
        var p = Profile.get({id: profile_id},function(){//p is profile
            var profile = p.resource;
            profile.gender_id=profile.gender.id;
            $scope.profile=profile;
            var genders_data = Gender.query(function(){
                $scope.genders = genders_data.resource;
            });
        }); 
        $scope.updateProfile = function(){
            Profile.update({"id":p.resource.id},$scope.profile,function(){
                $location.path('/myProfileInformation');
            });
        };
  });
