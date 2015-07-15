'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('LoginCtrl', function ($scope,$window,$cookies,Profile) {
      $scope.login=function(){
          Profile.get({id:$scope.profile_id},function(){
            $cookies.put('profile_id',$scope.profile_id);
            $window.location='/#/myProfileInformation'
          });
      };
  });
