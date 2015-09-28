'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller('HomeCtrl', function ($scope,$cookies,$location, $rootScope) {

    if(!$cookies.get('profile_id')){                                        
        $location.path('/login');                                           
    }else{                                                              

        var profile_id=$cookies.get('profile_id');                         


    }
  });
