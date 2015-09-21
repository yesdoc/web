'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:WeightCtrl
 * @description
 * # WeightCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller("WeightCtrl", function ($scope,$cookies,$location, $rootScope) {
    if(!$cookies.get('profile_id')){                                        
      $location.path('/login');                                           
     }else{                                                                  
      var profile_id=$cookies.get('profile_id');                         
     }
  }); 
  
