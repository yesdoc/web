'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the saludWebApp
 */

angular.module('saludWebApp')
.controller(
    'UserCtrl',
    function(
      $scope,
      $cookies,
      Auth,
      Profile,
      User,
      $location) {

        Auth.isLogged(function(){

        var profile_id = $cookies.get('profile_id');
        var user_data = User.get({id:profile_id},function(){
            var user = user_data.resource;
            $scope.user = user;
        });
    });
  });
