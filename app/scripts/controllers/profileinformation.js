'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the saludWebApp
 */

angular.module('saludWebApp')
.controller(
    'ProfileInformationCtrl',
    function(
      $scope,
      $cookies,
      MyProfile,
      Auth,
      $location) {       

        Auth.isLogged();

        var dataProfile = MyProfile.get(function(){
          var profile=dataProfile.resource;
          profile.gender=profile.gender.name;
          $scope.profile=profile;
          }); 

    });
