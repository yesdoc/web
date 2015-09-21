'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:HeightCtrl
 * @description
 * # HeightCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller("HeightCtrl", function ($scope,$cookies,$location, $rootScope) {
    if(!$cookies.get('profile_id')){                                        
      $location.path('/login');                                           
     }else{                                                                  
      var profile_id=$cookies.get('profile_id');                         
     }
  }); 
  
