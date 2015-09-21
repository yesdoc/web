'use strict';

/**
 * @ngdoc function
 * @name saludWebApp.controller:BloodcholesterolCtrl
 * @description
 * # BloodcholesterolCtrl
 * Controller of the saludWebApp
 */
angular.module('saludWebApp')
  .controller("BloodcholesterolCtrl", function ($scope,$cookies,$location, $rootScope) {
    if(!$cookies.get('profile_id')){                                        
      $location.path('/login');                                           
     }else{                                                                  
      var profile_id=$cookies.get('profile_id');                         
     }
  }); 
  
