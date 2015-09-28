'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('HomeCtrl',
     function (
        $scope,
        $cookies,
        $location,
        $rootScope) {

        if(!$cookies.get('Token')){ 
            $location.path('/login');                                           
            }else{                                                              

                }
        }
    );
